import { createClient } from "https://esm.sh/@supabase/supabase-js@2.107.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("VITE_SUPABASE_URL") ?? Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Create admin user in auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: "anchorditgitalscale@gmail.com",
      password: "Anchor@1234",
      email_confirm: true,
    });

    if (authError) {
      // User might already exist
      if (authError.message?.includes("already been registered")) {
        // Try to get existing user
        const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
        const existingUser = existingUsers?.users?.find((u: any) => u.email === "anchorditgitalscale@gmail.com");
        if (existingUser) {
          // Insert into admin_users if not already there
          const { error: insertError } = await supabaseAdmin
            .from("admin_users")
            .upsert({
              user_id: existingUser.id,
              email: existingUser.email,
            }, { onConflict: "email" });

          if (insertError) throw insertError;

          return new Response(
            JSON.stringify({ message: "Admin user already exists and has been linked", userId: existingUser.id }),
            { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
          );
        }
      }
      throw authError;
    }

    // Insert into admin_users table
    const { error: insertError } = await supabaseAdmin
      .from("admin_users")
      .insert({
        user_id: authData.user!.id,
        email: authData.user!.email!,
      });

    if (insertError) throw insertError;

    return new Response(
      JSON.stringify({ message: "Admin user created successfully", userId: authData.user!.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : String(error) }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
    );
  }
});