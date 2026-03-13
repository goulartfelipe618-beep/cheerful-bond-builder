import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ChevronLeft, ChevronRight, Mail, Minus, Plus, Sparkles } from "lucide-react";
import { useState } from "react";

const slides = [
  {
    title: "Seu E-mail Profissional",
    description: "Tenha um endereço como contato@suaempresa.com.br e transmita autoridade e credibilidade para hotéis e clientes executivos.",
  },
  {
    title: "Destaque-se da Concorrência",
    description: "Um e-mail profissional mostra que você leva seu negócio a sério. Impressione clientes corporativos e feche mais contratos.",
  },
  {
    title: "Integração Total",
    description: "Sincronize com Google Business, WhatsApp Business e todas as ferramentas do E-Transporte.pro automaticamente.",
  },
];

const benefits = [
  "Mais autoridade no WhatsApp",
  "Mais confiança para hotéis e empresas",
  "Evita cair no spam",
  "Passa imagem de empresa estruturada",
  "Integração com Google Business",
];

const plans = [
  {
    name: "Email Go 30 GB",
    description: "E-mail profissional para negócios que estão começando",
    originalPrice: "R$ 14,90",
    price: "R$ 13,41",
    perUnit: "/por conta",
    perMonth: "R$ 26,82 por mês*",
    discount: "10% OFF",
    defaultAccounts: 2,
    features: [
      "Domínio grátis por 1 ano",
      "30 GB de armazenamento",
      "Sincronização de e-mails, calendário e contatos",
      "Acesso pelo celular",
      "Antivírus e antispam",
    ],
    recommended: false,
  },
  {
    name: "Email Go 50 GB",
    description: "Mais espaço de armazenamento para empresas em crescimento",
    originalPrice: "R$ 19,90",
    price: "R$ 17,91",
    perUnit: "/por conta",
    perMonth: "R$ 35,82 por mês*",
    discount: "10% OFF",
    defaultAccounts: 2,
    features: [
      "Domínio grátis por 1 ano",
      "50 GB de armazenamento",
      "Sincronização de e-mails, calendário e contatos",
      "Suporte prioritário",
    ],
    recommended: true,
  },
  {
    name: "Email Locaweb 15 GB",
    description: "Múltiplas contas de e-mail com o melhor custo-benefício",
    originalPrice: "R$ 6,90",
    price: "R$ 6,21",
    perUnit: "/por conta",
    perMonth: "R$ 155,25 por mês*",
    discount: "10% OFF",
    defaultAccounts: 25,
    features: [
      "15 GB de armazenamento",
      "Ideal para equipes grandes",
      "Gestão centralizada",
    ],
    recommended: false,
  },
];

export default function EmailBusinessPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [accounts, setAccounts] = useState(plans.map((p) => p.defaultAccounts));

  const updateAccounts = (index: number, delta: number) => {
    setAccounts((prev) => {
      const next = [...prev];
      next[index] = Math.max(1, next[index] + delta);
      return next;
    });
  };

  return (
    <div className="space-y-8">
      {/* Carousel */}
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 h-80 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 z-10 bg-background/20 hover:bg-background/40 text-primary-foreground rounded-full"
          onClick={() => setCurrentSlide((p) => (p === 0 ? slides.length - 1 : p - 1))}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="px-16 max-w-2xl">
          <h2 className="text-3xl font-bold text-primary-foreground mb-3">{slides[currentSlide].title}</h2>
          <p className="text-primary-foreground/80 text-lg">{slides[currentSlide].description}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 z-10 bg-background/20 hover:bg-background/40 text-primary-foreground rounded-full"
          onClick={() => setCurrentSlide((p) => (p === slides.length - 1 ? 0 : p + 1))}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button key={i} className={`w-2.5 h-2.5 rounded-full ${i === currentSlide ? "bg-primary-foreground" : "bg-primary-foreground/40"}`} onClick={() => setCurrentSlide(i)} />
          ))}
        </div>
      </div>

      {/* Badge + Title */}
      <div className="text-center space-y-3">
        <Badge variant="outline" className="gap-2 px-4 py-1.5">
          <Mail className="h-4 w-4" /> E-mail Business
        </Badge>
        <h2 className="text-2xl font-bold text-foreground">Seu e-mail profissional para fechar mais corridas</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Pare de usar Gmail comum. Tenha um e-mail com o nome da sua empresa e passe autoridade para hotéis, empresas e clientes executivos.
        </p>
      </div>

      {/* Example email */}
      <div className="flex justify-center">
        <div className="rounded-xl border-2 border-primary/30 bg-primary/5 px-10 py-6 text-center">
          <p className="text-sm text-muted-foreground mb-1">Exemplo:</p>
          <p className="text-lg font-bold text-foreground">contato@transporteexecutivo.com.br</p>
        </div>
      </div>

      {/* Benefits */}
      <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
        {benefits.map((b) => (
          <div key={b} className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span className="text-sm text-foreground">{b}</span>
          </div>
        ))}
      </div>

      {/* Warning */}
      <div className="rounded-xl border border-border bg-card p-5 max-w-3xl mx-auto">
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-foreground">Pare de parecer amador</p>
            <p className="text-sm text-muted-foreground mt-1">
              Motoristas que usam Gmail comum passam menos confiança para hotéis, empresas e executivos. Com um e-mail profissional você mostra que seu serviço é empresa, não bico.
            </p>
          </div>
        </div>
      </div>

      {/* Plans */}
      <h3 className="text-xl font-bold text-foreground text-center">Escolha seu plano</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, idx) => (
          <div
            key={plan.name}
            className={`rounded-xl border bg-card p-6 flex flex-col relative ${plan.recommended ? "border-primary ring-2 ring-primary/20" : "border-border"}`}
          >
            {plan.recommended && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                Recomendado
              </Badge>
            )}
            <div className="mb-4">
              <h4 className="font-semibold text-foreground text-lg">{plan.name}</h4>
              <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
            </div>

            <div className="mb-4">
              <span className="text-sm text-muted-foreground line-through mr-2">{plan.originalPrice}</span>
              <Badge variant="secondary" className="text-xs">{plan.discount}</Badge>
              <div className="mt-1">
                <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.perUnit}</span>
              </div>
              <p className="text-sm text-muted-foreground">{plan.perMonth}</p>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm text-muted-foreground">Contas de e-mail</span>
              <div className="flex items-center border border-border rounded-lg">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateAccounts(idx, -1)}>
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm font-medium text-foreground">{accounts[idx]}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateAccounts(idx, 1)}>
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Total por ano: <strong className="text-foreground">R$ {(parseFloat(plan.price.replace("R$ ", "").replace(",", ".")) * accounts[idx] * 12).toFixed(2).replace(".", ",")}</strong>
            </p>

            <div className="space-y-2 mb-6 flex-1">
              {plan.features.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm text-foreground">{f}</span>
                </div>
              ))}
            </div>

            <Button variant={plan.recommended ? "default" : "outline"} className="w-full">
              Contratar →
            </Button>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        * Pagamento anual e antecipado. ** Domínio grátis válido por 1 ano nas extensões .BR
      </p>
    </div>
  );
}
