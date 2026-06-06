import { createClient } from "https://esm.sh/@supabase/supabase-js@2.107.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? Deno.env.get("VITE_SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY")!;

    // Verify caller is an authenticated admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return json({ error: "Missing Authorization header" }, 401);
    }
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData?.user) {
      return json({ error: "Unauthorized" }, 401);
    }

    const admin = createClient(supabaseUrl, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Confirm caller is in admin_users
    const { data: adminCheck } = await admin
      .from("admin_users")
      .select("id")
      .eq("user_id", userData.user.id)
      .maybeSingle();
    if (!adminCheck) {
      return json({ error: "Forbidden: admin access required" }, 403);
    }

    const body = await req.json().catch(() => ({}));
    const action = body?.action as string;

    if (action === "list") {
      const { data: adminRows, error } = await admin
        .from("admin_users")
        .select("id, user_id, email, created_at")
        .order("created_at", { ascending: true });
      if (error) throw error;

      // Enrich with auth metadata (last_sign_in_at, provider)
      const { data: usersData } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
      const byId = new Map<string, any>();
      for (const u of usersData?.users ?? []) byId.set(u.id, u);

      const enriched = (adminRows ?? []).map((row: any) => {
        const u = byId.get(row.user_id);
        return {
          ...row,
          last_sign_in_at: u?.last_sign_in_at ?? null,
          provider: u?.app_metadata?.provider ?? null,
          avatar_url: u?.user_metadata?.avatar_url ?? null,
          full_name: u?.user_metadata?.full_name ?? u?.user_metadata?.name ?? null,
        };
      });
      return json({ admins: enriched });
    }

    if (action === "add") {
      const email = String(body?.email ?? "").trim().toLowerCase();
      if (!email) return json({ error: "Email is required" }, 400);

      // Find existing auth user with this email
      const { data: usersData } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
      const existing = (usersData?.users ?? []).find(
        (u: any) => (u.email ?? "").toLowerCase() === email
      );
      if (!existing) {
        return json(
          {
            error:
              "No account with that email yet. Ask them to sign in with Google first, then add them.",
          },
          404
        );
      }

      const { error: insErr } = await admin
        .from("admin_users")
        .upsert(
          { user_id: existing.id, email: existing.email },
          { onConflict: "email" }
        );
      if (insErr) throw insErr;
      return json({ message: "Admin added", userId: existing.id });
    }

    if (action === "remove") {
      const id = String(body?.id ?? "");
      if (!id) return json({ error: "id is required" }, 400);

      // Block removing yourself to prevent lockout
      const { data: row } = await admin
        .from("admin_users")
        .select("user_id")
        .eq("id", id)
        .maybeSingle();
      if (row?.user_id === userData.user.id) {
        return json({ error: "You cannot remove yourself as an admin." }, 400);
      }

      const { error } = await admin.from("admin_users").delete().eq("id", id);
      if (error) throw error;
      return json({ message: "Admin removed" });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : String(e) }, 500);
  }
});

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}