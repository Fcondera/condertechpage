import { NextResponse } from "next/server";

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
      createdAt: new Date().toISOString(),
    };

    // ---------- Integração ----------
    // Substitua este bloco pela integração real:
    //
    // Opção 1: Supabase
    // import { createClient } from '@supabase/supabase-js'
    // const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)
    // await supabase.from('leads').insert(lead)
    //
    // Opção 2: Webhook n8n
    // await fetch(process.env.N8N_WEBHOOK_URL!, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(lead),
    // })
    //
    // Opção 3: Resend (enviar PDF por e-mail)
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY!)
    // await resend.emails.send({ ... })
    // ------------------------------------

    console.log("[LEAD CAPTURADO]", lead);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}
