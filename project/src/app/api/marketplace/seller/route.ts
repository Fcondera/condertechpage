import {
  authenticatedMarket,
  json,
  requireVerifiedProfile,
  sameOrigin,
  unavailable,
} from "@/lib/marketplace/server";
import { marketProducts, marketProductImage } from "@/data/marketplace";
import { isCondertechOwner } from "@/lib/marketplace/admin";
import type { MarketQuote } from "@/data/marketplace";

type SellerRequest = Omit<MarketQuote, "items"> & {
  items: { id: string; name: string; quantity: number; seller_id?: string | null }[];
  customer_contact: { name: string; email: string };
};

export async function GET() {
  try {
    const session = await authenticatedMarket();
    if (!session) return json({ error: "Entre para acessar sua loja." }, 401);
    if (!(await requireVerifiedProfile(session.user)))
      return json(
        {
          error:
            "Complete seu cadastro antes de acessar a área do vendedor.",
        },
        403,
      );
    const { data, error } = await session.client
      .from("marketplace_sellers")
      .select("name, city, description")
      .eq("user_id", session.user.id)
      .maybeSingle();
    if (error) return unavailable();
    const owner = isCondertechOwner(session.user);
    const ownsItem = (item: { id: string; seller_id?: string | null }) =>
      item.seller_id === session.user.id || (owner && item.seller_id == null && marketProducts.some(product => product.id === item.id));
    const queryRequests = (withCheckout: boolean) => {
      let query = session.client
      .from("marketplace_quotes")
      .select(withCheckout
        ? "id, created_at, status, items, notes, customer_contact, checkout"
        : "id, created_at, status, items, notes, customer_contact");
      query = owner
        ? query.or(`items.cs.${JSON.stringify([{ seller_id: session.user.id }])},items.cs.${JSON.stringify([{ seller_id: null }])}`)
        : query.contains("items", [{ seller_id: session.user.id }]);
      return query
      .order("created_at", { ascending: false })
      .limit(100)
      .returns<SellerRequest[]>();
    };
    let requests = await queryRequests(true);
    if (requests.error && ["42703", "PGRST204"].includes(requests.error.code) && /\bcheckout\b/i.test(requests.error.message)) {
      requests = await queryRequests(false);
    }
    if (requests.error) return unavailable();
    return json({
      seller: data || (owner ? { name: "ConderTech", city: "", description: "Produtos e sistemas da ConderTech." } : null),
      officialProducts: owner ? marketProducts.map(product => ({ id: product.id, name: product.name, category: product.category, image_url: marketProductImage(product.id) })) : [],
      requests: (requests.data || []).filter(row => row.items.some(ownsItem)).map((row) => ({
        ...row,
        checkout: "checkout" in row && row.checkout ? { address: row.checkout.address, payment_preference: row.checkout.payment_preference } : null,
        items: row.items.filter(ownsItem),
      })),
    });
  } catch {
    return unavailable();
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: "Origem inválida." }, 403);
  try {
    const session = await authenticatedMarket();
    if (!session) return json({ error: "Entre para cadastrar sua loja." }, 401);
    if (!(await requireVerifiedProfile(session.user)))
      return json(
        {
          error:
            "Complete seu cadastro antes de cadastrar a loja.",
        },
        403,
      );
    const body = await request.json().catch(() => null);
    if (
      typeof body?.name !== "string" ||
      body.name.trim().length < 3 ||
      body.name.length > 80 ||
      typeof body.city !== "string" ||
      body.city.trim().length < 2 ||
      body.city.length > 100 ||
      typeof body.description !== "string" ||
      body.description.length > 1000
    )
      return json({ error: "Revise nome, cidade e descrição da loja." }, 400);
    const { error } = await session.client
      .from("marketplace_sellers")
      .upsert({
        user_id: session.user.id,
        name: body.name.trim(),
        city: body.city.trim(),
        description: body.description.trim(),
      });
    if (error) return unavailable();
    return json({ success: true });
  } catch {
    return unavailable();
  }
}
