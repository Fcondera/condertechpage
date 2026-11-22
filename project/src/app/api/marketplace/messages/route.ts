import { authenticatedMarket, json, sameOrigin, unavailable } from "@/lib/marketplace/server";
import { chatSide, isUuid, validMessage, type ChatThread } from "@/lib/marketplace/chat";

// Never accept buyer/seller identities, timestamps or read status from the browser.
export async function GET(request: Request) {
  try {
    const session = await authenticatedMarket();
    if (!session) return json({ error: "Entre para acessar suas mensagens." }, 401);
    const { client, user } = session;
    const params = new URL(request.url).searchParams;
    const id = params.get("thread");
    if (id) {
      if (!isUuid(id)) return json({ error: "Conversa inválida." }, 400);
      const { data: thread, error } = await client.from("marketplace_threads").select("*").eq("id", id).maybeSingle();
      if (error) return unavailable();
      const side = thread && chatSide(thread, user);
      if (!side) return json({ error: "Conversa indisponível." }, 404);
      let query = client.from("marketplace_messages").select("id, body, sender_side, created_at, read_at").eq("thread_id", id).order("id", { ascending: false }).limit(100);
      const before = params.get("before");
      if (before) {
        if (!/^\d{1,15}$/.test(before)) return json({ error: "Página inválida." }, 400);
        query = query.lt("id", before);
      }
      const messages = await query;
      if (messages.error) return unavailable();
      return json({ messages: (messages.data || []).reverse(), side, hasMore: messages.data?.length === 100 });
    }
    const admin = user.app_metadata?.marketplace_role === "admin";
    const buyer = await client.from("marketplace_quotes").select("id, user_id, items").eq("user_id", user.id).order("created_at", { ascending: false }).limit(100);
    const seller = await client.from("marketplace_quotes").select("id, user_id, items").contains("items", [{ seller_id: user.id }]).order("created_at", { ascending: false }).limit(100);
    if (buyer.error || seller.error) return unavailable();
    const quotes = [...(buyer.data || []), ...(seller.data || [])];
    if (admin) {
      const own = await client.from("marketplace_quotes").select("id, user_id, items").contains("items", [{ seller_id: null }]).order("created_at", { ascending: false }).limit(100);
      if (own.error) return unavailable();
      quotes.push(...(own.data || []));
    }
    const seeds = new Map<string, Omit<ChatThread, "id">>();
    for (const quote of quotes) for (const item of quote.items) {
      const key = item.seller_id || "condertech";
      if (quote.user_id !== user.id && key !== user.id && !(admin && key === "condertech")) continue;
      seeds.set(`${quote.id}:${key}`, { quote_id: quote.id, buyer_id: quote.user_id, seller_key: key, subject: `${key === "condertech" ? "ConderTech" : "Vendedor"} · ${String(item.name).slice(0,100)}` });
    }
    if (seeds.size) {
      const seeded = await client.from("marketplace_threads").upsert([...seeds.values()], { onConflict: "quote_id,seller_key", ignoreDuplicates: true });
      if (seeded.error) return unavailable();
    }
    const result = await client.from("marketplace_threads").select("*").or(`buyer_id.eq.${user.id},seller_key.eq.${user.id}${admin ? ",seller_key.eq.condertech" : ""}`).order("created_at", { ascending: false }).limit(300);
    if (result.error) return unavailable();
    const counts = await client.rpc("marketplace_unread_counts", { p_user_id: user.id, p_admin: admin });
    if (counts.error) return unavailable();
    const unreadCounts = new Map<string, number>((counts.data || []).map((row: { thread_id: string; unread: number }) => [row.thread_id, Number(row.unread)]));
    const threads = (result.data || []).map(thread => {
      const side = chatSide(thread, user)!;
      return { id: thread.id, quote_id: thread.quote_id, subject: thread.subject, side, unread: unreadCounts.get(thread.id) || 0 };
    });
    return json({ threads });
  } catch { return unavailable(); }
}

async function write(request: Request, read: boolean) {
  if (!sameOrigin(request)) return json({ error: "Origem inválida." }, 403);
  try {
    const session = await authenticatedMarket();
    if (!session) return json({ error: "Entre para acessar suas mensagens." }, 401);
    const body = await request.json().catch(() => null);
    if (!isUuid(body?.thread)) return json({ error: "Conversa inválida." }, 400);
    const { client, user } = session;
    const { data: thread, error } = await client.from("marketplace_threads").select("*").eq("id", body.thread).maybeSingle();
    if (error) return unavailable();
    const side = thread && chatSide(thread, user);
    if (!side) return json({ error: "Conversa indisponível." }, 404);
    if (read) {
      if (!Array.isArray(body.ids) || body.ids.length > 100 || body.ids.some((id: unknown) => !Number.isSafeInteger(id) || Number(id) < 1)) return json({ error: "Mensagens inválidas." }, 400);
      if (body.ids.length) {
        const result = await client.from("marketplace_messages").update({ read_at: new Date().toISOString() }).eq("thread_id", thread.id).neq("sender_side", side).is("read_at", null).in("id", body.ids);
        if (result.error) return unavailable();
      }
      return json({ ok: true });
    }
    if (!validMessage(body.text) || !isUuid(body.requestId)) return json({ error: "Escreva uma mensagem de até 2.000 caracteres." }, 400);
    const result = await client.from("marketplace_messages").insert({ thread_id: thread.id, sender_id: user.id, sender_side: side, request_id: body.requestId, body: body.text.trim() }).select("id").single();
    if (result.error) {
      if (result.error.code === "23505") {
        const prior = await client.from("marketplace_messages").select("id").eq("thread_id", thread.id).eq("sender_id", user.id).eq("request_id", body.requestId).maybeSingle();
        if (prior.data) return json({ id: prior.data.id });
      }
      return unavailable();
    }
    return json({ id: result.data.id }, 201);
  } catch { return unavailable(); }
}
export const POST = (request: Request) => write(request, false);
export const PATCH = (request: Request) => write(request, true);
