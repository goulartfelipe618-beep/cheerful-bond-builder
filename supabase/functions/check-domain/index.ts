import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// RDAP servers by TLD
const rdapServers: Record<string, string> = {
  "com": "https://rdap.verisign.com/com/v1",
  "net": "https://rdap.verisign.com/net/v1",
  "org": "https://rdap.org/org/v1",
  "com.br": "https://rdap.registro.br/v1",
  "br": "https://rdap.registro.br/v1",
  "io": "https://rdap.nic.io/v1",
  "dev": "https://rdap.nic.google/v1",
  "app": "https://rdap.nic.google/v1",
};

function getTLD(domain: string): string {
  // Check compound TLDs first
  const parts = domain.split(".");
  if (parts.length >= 3) {
    const compound = parts.slice(-2).join(".");
    if (rdapServers[compound]) return compound;
  }
  return parts[parts.length - 1];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { domain } = await req.json();
    if (!domain || typeof domain !== "string") {
      return new Response(JSON.stringify({ error: "Domínio não informado" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Clean domain
    const cleanDomain = domain.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, "").replace(/\/.*$/, "").trim();
    
    if (!cleanDomain.includes(".")) {
      return new Response(JSON.stringify({ error: "Domínio inválido" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const tld = getTLD(cleanDomain);
    const rdapBase = rdapServers[tld];

    if (!rdapBase) {
      // Fallback: try DNS lookup approach
      try {
        const dnsResp = await fetch(`https://dns.google/resolve?name=${cleanDomain}&type=A`);
        const dnsData = await dnsResp.json();
        // Status 3 = NXDOMAIN (domain doesn't exist in DNS)
        const available = dnsData.Status === 3;
        return new Response(JSON.stringify({
          domain: cleanDomain,
          available,
          method: "dns",
          message: available ? "Domínio aparenta estar disponível" : "Domínio já está registrado",
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } catch {
        return new Response(JSON.stringify({
          domain: cleanDomain,
          available: null,
          method: "unknown",
          message: "Não foi possível verificar este TLD. Verifique manualmente.",
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    // Query RDAP
    const rdapUrl = `${rdapBase}/domain/${cleanDomain}`;
    const rdapResp = await fetch(rdapUrl, {
      headers: { "Accept": "application/rdap+json" },
    });

    if (rdapResp.status === 404 || rdapResp.status === 400) {
      // Domain not found = available
      return new Response(JSON.stringify({
        domain: cleanDomain,
        available: true,
        method: "rdap",
        message: "Domínio disponível para registro!",
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (rdapResp.ok) {
      // Domain exists = taken
      const rdapData = await rdapResp.json();
      const events = rdapData.events || [];
      const registration = events.find((e: any) => e.eventAction === "registration");
      const expiration = events.find((e: any) => e.eventAction === "expiration");
      
      return new Response(JSON.stringify({
        domain: cleanDomain,
        available: false,
        method: "rdap",
        message: "Este domínio já está registrado.",
        registrationDate: registration?.eventDate || null,
        expirationDate: expiration?.eventDate || null,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fallback to DNS if RDAP fails
    const dnsResp = await fetch(`https://dns.google/resolve?name=${cleanDomain}&type=A`);
    const dnsData = await dnsResp.json();
    const available = dnsData.Status === 3;
    
    return new Response(JSON.stringify({
      domain: cleanDomain,
      available,
      method: "dns_fallback",
      message: available ? "Domínio aparenta estar disponível" : "Domínio já está registrado",
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("Error checking domain:", error);
    return new Response(JSON.stringify({ error: "Erro interno ao verificar domínio" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
