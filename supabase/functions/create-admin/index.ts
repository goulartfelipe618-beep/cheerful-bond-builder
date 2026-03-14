import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async () => {
  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Create admin user
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: "goulartfelipe618@gmail.com",
    password: "15784268953Fg.",
    email_confirm: true,
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }

  // Assign admin_master role
  const { error: roleError } = await supabaseAdmin.from("user_roles").insert({
    user_id: data.user.id,
    role: "admin_master",
  });

  if (roleError) {
    return new Response(JSON.stringify({ error: roleError.message }), { status: 400 });
  }

  return new Response(JSON.stringify({ success: true, user_id: data.user.id }));
});
