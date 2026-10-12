import {
  authenticatedMarket,
  json,
  marketClient,
  sameOrigin,
  unavailable,
} from "@/lib/marketplace/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const mine = url.searchParams.get("mine") === "1";
    const session = mine ? await authenticatedMarket() : null;
    if (mine && !session)
      return json({ error: "Entre para gerenciar seus anúncios." }, 401);
    const client = session?.client || marketClient();
    let query = client
      .from("marketplace_listings")
      .select(
        "id, title, description, category, price_cents, stock, image_path, status, seller_id, created_at, marketplace_sellers(name)",
      )
      .order("created_at", { ascending: false })
      .limit(100);
    query = mine
      ? query.eq("seller_id", session!.user.id)
      : query.eq("status", "aprovado").gt("stock", 0);
    const id = url.searchParams.get("id");
    if (id) query = query.eq("id", id);
    const { data, error } = await query;
    if (error) return unavailable();
    const listings = await Promise.all(
      (data || []).map(async (row) => {
        const image = await client.storage
          .from("marketplace-products")
          .createSignedUrl(row.image_path, 3600);
        const image_url = image.data?.signedUrl || "";
        if (mine) return { ...row, image_url };
        return {
          id: row.id,
          title: row.title,
          description: row.description,
          category: row.category,
          price_cents: row.price_cents,
          stock: row.stock,
          status: row.status,
          created_at: row.created_at,
          marketplace_sellers: row.marketplace_sellers,
          image_url,
        };
      }),
    );
    return json({ listings });
  } catch {
    return unavailable();
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: "Origem inválida." }, 403);
  try {
    const session = await authenticatedMarket();
    if (!session) return json({ error: "Entre para anunciar." }, 401);
    const body = await request.json().catch(() => null);
    if (
      !body ||
      typeof body.title !== "string" ||
      body.title.trim().length < 5 ||
      body.title.length > 100 ||
      typeof body.description !== "string" ||
      body.description.trim().length < 20 ||
      body.description.length > 4000 ||
      !["PDV", "Ponto", "NFC", "Software", "Outros"].includes(body.category) ||
      !Number.isInteger(body.price_cents) ||
      body.price_cents < 100 ||
      body.price_cents > 100000000 ||
      !Number.isInteger(body.stock) ||
      body.stock < 1 ||
      body.stock > 99999 ||
      typeof body.image_path !== "string" ||
      !body.image_path.startsWith(`${session.user.id}/`) ||
      !/^[0-9a-f-]+\/[0-9a-f-]+\.(png|jpg|webp)$/.test(body.image_path)
    )
      return json(
        {
          error: "Revise nome, descrição, preço, quantidade e foto do anúncio.",
        },
        400,
      );
    const seller = await session.client
      .from("marketplace_sellers")
      .select("user_id")
      .eq("user_id", session.user.id)
      .maybeSingle();
    if (!seller.data)
      return json({ error: "Cadastre sua loja antes de anunciar." }, 400);
    const image = await session.client.storage
      .from("marketplace-products")
      .createSignedUrl(body.image_path, 60);
    if (image.error)
      return json({ error: "Envie a foto do produto novamente." }, 400);
    const { data, error } = await session.client
      .from("marketplace_listings")
      .insert({
        seller_id: session.user.id,
        title: body.title.trim(),
        description: body.description.trim(),
        category: body.category,
        price_cents: body.price_cents,
        stock: body.stock,
        image_path: body.image_path,
        status: "pendente",
      })
      .select("id")
      .single();
    if (error) return unavailable();
    return json({ id: data.id }, 201);
  } catch {
    return unavailable();
  }
}

export async function PATCH(request: Request) {
  if (!sameOrigin(request)) return json({ error: "Origem inválida." }, 403);
  try {
    const session = await authenticatedMarket();
    if (!session) return json({ error: "Entre para gerenciar anúncios." }, 401);
    const body = await request.json().catch(() => null);
    if (
      typeof body?.id !== "string" ||
      !["pausado", "pendente"].includes(body?.status)
    )
      return json({ error: "Ação inválida." }, 400);
    const { data, error } = await session.client
      .from("marketplace_listings")
      .update({ status: body.status })
      .eq("id", body.id)
      .eq("seller_id", session.user.id)
      .select("id")
      .maybeSingle();
    if (error) return unavailable();
    if (!data) return json({ error: "Anúncio não encontrado." }, 404);
    return json({ success: true });
  } catch {
    return unavailable();
  }
}
