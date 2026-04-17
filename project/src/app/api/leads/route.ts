import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/server";

interface LeadPayload {
  name: string;
  email: string;
  whatsapp: string;
}

function isValidPayload(body: unknown): body is LeadPayload {
  if (typeof body !== "object" || body === null) return false;
  const { name, email, whatsapp } = body as Record<string, unknown>;
  return (
    typeof name === "string" &&
    name.trim().length > 0 &&
    typeof email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    typeof whatsapp === "string" &&
    whatsapp.trim().length >= 10
  );
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (!isValidPayload(body)) {
      return NextResponse.json(
        { error: "Dados inválidos. Verifique nome, e-mail e WhatsApp." },
        { status: 400 },
      );
    }

    const lead = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      whatsapp: body.whatsapp.trim(),
    };

    const { data, error } = await supabase
      .from("leads")
      .insert([lead])
      .select();

    if (error) {
      console.error("Erro ao inserir lead no Supabase:", error);
      return NextResponse.json(
        { error: "Erro ao salvar lead. Tente novamente." },
        { status: 500 },
      );
    }

    console.log("Lead inserido com sucesso:", data);

    if (process.env.N8N_WEBHOOK_URL) {
      fetch(process.env.N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      }).catch((err) => console.error("Erro webhook n8n:", err));
    }

    return NextResponse.json(
      { success: true, message: "Lead capturado com sucesso!" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Erro ao processar requisição:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}
