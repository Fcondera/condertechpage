import { authenticatedMarket, authRedirectOrigin, clearSession, json, marketClient, publicUser, sameOrigin, saveSession, unavailable } from "@/lib/marketplace/server";

export async function GET() {
  try {
    const session = await authenticatedMarket();
    return json({ user: session ? publicUser(session.user) : null });
  } catch { return unavailable(); }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: "Origem inválida." }, 403);
  let body;
  try { body = await request.json(); } catch { return json({ error: "Dados inválidos." }, 400); }
  if (!body || typeof body !== "object") return json({ error: "Dados inválidos." }, 400);
  try {
    if (body.action === "logout") {
      const session = await authenticatedMarket();
      if (session) await session.client.auth.admin.signOut(session.access, "local");
      await clearSession();
      return json({ success: true });
    }
    const client = marketClient();
    if (body.action === "recovery-session") {
      if (typeof body.refreshToken !== "string" || body.refreshToken.length > 4096) return json({ error: "Link inválido." }, 400);
      const { data, error } = await client.auth.refreshSession({ refresh_token: body.refreshToken });
      if (error || !data.session) return json({ error: "Link expirado. Solicite uma nova recuperação." }, 400);
      await saveSession(data.session);
      return json({ user: publicUser(data.session.user) });
    }
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: "Informe um e-mail válido." }, 400);
    if (body.action === "recover") {
      const { error } = await client.auth.resetPasswordForEmail(email, { redirectTo: `${authRedirectOrigin(request)}/marketplace/redefinir-senha` });
      if (error?.status === 429) return json({ error: "Aguarde alguns minutos antes de tentar novamente." }, 429);
      if (error) return unavailable();
      return json({ message: "Se houver uma conta com esse e-mail, você receberá as instruções de recuperação." });
    }
    if (typeof body.password !== "string" || body.password.length > 128 || body.password.length < 8) return json({ error: "A senha precisa ter entre 8 e 128 caracteres." }, 400);
    if (body.action === "signup") {
      const name = typeof body.name === "string" ? body.name.trim() : "";
      if (name.length < 2 || name.length > 100 || body.acceptTerms !== true) return json({ error: "Informe seu nome e aceite os termos para continuar." }, 400);
      const { data, error } = await client.auth.signUp({ email, password: body.password, options: { data: { name }, emailRedirectTo: `${authRedirectOrigin(request)}/marketplace/entrar?confirmado=1` } });
      if (error) return json({ error: error.status === 429 ? "Muitas tentativas. Aguarde alguns minutos." : "Não foi possível criar a conta. Verifique os dados ou tente entrar." }, error.status === 429 ? 429 : 400);
      if (data.session) await saveSession(data.session);
      return json({ user: data.session ? publicUser(data.session.user) : null, message: "Confira seu e-mail para confirmar o cadastro. Se já tem uma conta, entre com sua senha." });
    }
    if (body.action !== "login") return json({ error: "Ação inválida." }, 400);
    const { data, error } = await client.auth.signInWithPassword({ email, password: body.password });
    if (error || !data.session) return json({ error: error?.status === 429 ? "Muitas tentativas. Aguarde alguns minutos." : "Não foi possível entrar. Confira e-mail, senha e a confirmação do cadastro." }, error?.status === 429 ? 429 : 401);
    await saveSession(data.session);
    return json({ user: publicUser(data.session.user) });
  } catch { return unavailable(); }
}

export async function PATCH(request: Request) {
  if (!sameOrigin(request)) return json({ error: "Origem inválida." }, 403);
  try {
    const session = await authenticatedMarket();
    if (!session) return json({ error: "Entre na sua conta para continuar." }, 401);
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") return json({ error: "Dados inválidos." }, 400);
    // Only allowed profile fields are updated. Role/permission fields are never accepted.
    const data: Record<string, string> = {};
    for (const [field, limit] of [["name", 100], ["company", 160], ["phone", 30]] as const) {
      if (body[field] !== undefined) {
        if (typeof body[field] !== "string" || body[field].length > limit || (field === "name" && body[field].trim().length < 2)) return json({ error: "Revise os dados do perfil." }, 400);
        data[field] = body[field].trim();
      }
    }
    if (body.password !== undefined && (typeof body.password !== "string" || body.password.length < 8 || body.password.length > 128)) return json({ error: "A senha precisa ter entre 8 e 128 caracteres." }, 400);
    if (!session.refresh) return json({ error: "Entre novamente para atualizar sua conta." }, 401);
    const restored = await session.client.auth.setSession({ access_token: session.access, refresh_token: session.refresh });
    if (restored.error) return json({ error: "Sessão expirada. Entre novamente." }, 401);
    const { data: updated, error } = await session.client.auth.updateUser({ ...(Object.keys(data).length ? { data } : {}), ...(body.password ? { password: body.password } : {}) });
    if (error || !updated.user) return json({ error: "Não foi possível salvar. Verifique os dados e tente novamente." }, 400);
    return json({ user: publicUser(updated.user), message: "Dados atualizados." });
  } catch { return unavailable(); }
}
