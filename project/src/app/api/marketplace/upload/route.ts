import { authenticatedMarket, json, sameOrigin, unavailable } from "@/lib/marketplace/server";

export async function POST(request: Request) {
  if (!sameOrigin(request)) return json({ error: "Origem inválida." }, 403);
  if (Number(request.headers.get("content-length")) > 6 * 1024 * 1024) return json({ error: "Use uma imagem de até 5 MB." }, 413);
  try {
    const session = await authenticatedMarket();
    if (!session) return json({ error: "Entre para enviar imagens." }, 401);
    const form = await request.formData();
    const file = form.get("image");
    if (!(file instanceof File) || file.size < 12 || file.size > 5 * 1024 * 1024) return json({ error: "Use JPG, PNG ou WebP de até 5 MB." }, 400);
    const bytes = Buffer.from(await file.arrayBuffer());
    const png = bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
    const jpg = bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255;
    const webp = bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP";
    const extension = png ? "png" : jpg ? "jpg" : webp ? "webp" : null;
    if (!extension) return json({ error: "Formato de imagem inválido. Use JPG, PNG ou WebP." }, 400);
    const path = `${session.user.id}/${crypto.randomUUID()}.${extension}`;
    const { error } = await session.client.storage.from("marketplace-products").upload(path, bytes, { contentType: png ? "image/png" : jpg ? "image/jpeg" : "image/webp", upsert: false });
    if (error) return unavailable();
    return json({ path }, 201);
  } catch { return unavailable(); }
}
