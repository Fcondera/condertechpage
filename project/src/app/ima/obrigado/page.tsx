import Link from "next/link";
import { Anton, Inter } from "next/font/google";
import { Download, MessageCircle } from "lucide-react";
import { CONTACT_PHONE } from "@constants/navigation";

const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap" });
const inter = Inter({ subsets: ["latin"], display: "swap" });

const PDF_URL =
  "https://zimgmqvqgawcnzdyrncv.supabase.co/storage/v1/object/public/materiais/guias-pdfs/guia-condertech.pdf";
const PDF_DOWNLOAD_URL = `${PDF_URL}?download=guia-condertech.pdf`;

const whatsappMessage =
  "Olá, quero tirar os gargalos da minha empresa e melhorar os processos com suas tecnologias.";

const whatsappHref = `https://wa.me/${CONTACT_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;

export default function ObrigadoPage() {
  return (
    <main
      className={`${inter.className} min-h-screen bg-white text-neutral-900`}
    >
      <header className="flex items-center px-6 py-5 sm:px-10">
        <img src="/image/logo02.png" alt="ConderTech" className="h-7 sm:h-9" />
      </header>

      <section className="mx-auto max-w-2xl px-6 pb-20 pt-10 sm:pt-16">
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-[0_8px_40px_rgba(0,0,0,0.06)] sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FF0000]">
            Contato recebido
          </p>

          <h1
            className={`${anton.className} mt-3 text-3xl uppercase leading-[1.02] tracking-tight sm:text-5xl`}
          >
            Agora escolha o próximo passo
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
            Seu acesso está liberado. Baixe o guia e, se quiser aceleração com o
            time da Condertech, fale no WhatsApp para mapear gargalos e
            oportunidades no seu processo.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <a
              href={PDF_DOWNLOAD_URL}
              target="_self"
              className={`${anton.className} inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-900 px-5 py-3 text-sm uppercase tracking-wide text-neutral-900 transition hover:scale-[1.02]`}
            >
              <Download className="h-4 w-4" />
              Baixar o guia PDF
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`${anton.className} inline-flex items-center justify-center gap-2 rounded-lg bg-[#FF0000] px-5 py-3 text-sm uppercase tracking-wide text-white transition hover:scale-[1.02]`}
            >
              <MessageCircle className="h-4 w-4" />
              Falar no WhatsApp
            </a>
          </div>

          <div className="mt-8 border-t border-neutral-200 pt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
              Processo de fechamento
            </p>
            <ol className="mt-3 space-y-2 text-sm text-neutral-600">
              <li>1. Você envia sua dor principal no WhatsApp.</li>
              <li>2. Nosso time responde com diagnóstico inicial.</li>
              <li>3. Definimos escopo e proposta para execução rápida.</li>
            </ol>
          </div>

          <Link
            href="/ima"
            className="mt-8 inline-block text-sm font-medium text-neutral-500 underline-offset-4 transition hover:text-neutral-800 hover:underline"
          >
            Voltar para a página do material
          </Link>
        </div>
      </section>
    </main>
  );
}
