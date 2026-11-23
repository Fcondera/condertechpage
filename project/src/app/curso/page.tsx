import type { Metadata } from "next";
import Link from "next/link";
import "./curso.css";

export const metadata: Metadata = {
  title: "Flutter + IA | Do zero ao seu projeto publicado",
  description: "Aprenda a criar sites, sistemas e aplicativos com Flutter + Vibe Coding. Entre no grupo VIP gratuito e acompanhe o pré-lançamento.",
  alternates: { canonical: "/curso", languages: { "pt-BR": "/curso" } },
  openGraph: {
    title: "Suas ideias merecem sair do papel. Flutter + IA.",
    description: "Da primeira ideia à publicação. Conheça o treinamento e acompanhe o pré-lançamento no grupo VIP.",
    url: "/curso",
    locale: "pt_BR",
    type: "website",
  },
};

function safeHttps(value: string | undefined) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : undefined;
  } catch {
    return undefined;
  }
}

const outcomes = [
  { title: "Sites que saem do papel", text: "Transforme uma ideia em uma experiência na web, da estrutura às primeiras telas." },
  { title: "Sistemas com propósito", text: "Aprenda a organizar funcionalidades e construir soluções para problemas reais." },
  { title: "Aplicativos de verdade", text: "Explore o Flutter para levar seus projetos a diferentes telas e plataformas." },
];

export default function CursoPage() {
  const whatsappUrl = safeHttps(process.env.CURSO_WHATSAPP_URL) || "https://chat.whatsapp.com/JmfpfXgmijHJpn3pY6pExX";
  const videoUrl = safeHttps(process.env.CURSO_VSL_VIDEO_URL);
  const embedUrl = safeHttps(process.env.CURSO_VSL_EMBED_URL);
  const cta = (label: string) => (
    <a className="curso-cta" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
      <span>{label}</span>
    </a>
  );

  return (
    <main className="curso">

      <section className="curso-hero curso-container" aria-labelledby="curso-title">
        <div className="curso-eyebrow"> Flutter + IA | Vibe Coding</div>
        <h1 id="curso-title">Aprenda a criar sites, sistemas e aplicativos <span>com Flutter + IA.</span></h1>
        <p className="curso-intro">Transforme suas ideias em projetos reais, mesmo começando do zero. Da criação à publicação.</p>

        <div className="curso-video-shell" id="apresentacao">
          <div className="curso-video">
            {videoUrl ? <video controls preload="metadata" playsInline aria-label="Apresentação do treinamento Flutter + IA"><source src={videoUrl} />Seu navegador não suporta este vídeo.</video>
              : embedUrl ? <iframe src={embedUrl} title="Apresentação do treinamento Flutter + IA" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                : <div className="curso-video-placeholder"><span className="curso-video-kicker">DA IDEIA À PUBLICAÇÃO</span><h2>Da sua ideia.<br />Para o mundo.</h2><p>O vídeo de apresentação estará aqui em breve.</p></div>}
          </div>
        </div>
        <div className="curso-hero-action">{cta("Entrar no grupo VIP e garantir meu lugar")}<p> Participação gratuita <span>•</span> Novidades em primeira mão</p></div>
      </section>

      <section className="curso-outcomes curso-container" aria-labelledby="curso-outcomes-title">
        <div className="curso-section-heading"><div><span className="curso-eyebrow">MENOS DISTÂNCIA ENTRE IMAGINAR E CRIAR</span><h2 id="curso-outcomes-title">O que você quer construir?</h2></div><p>Use a inteligência artificial como parceira<br className="curso-desktop-break" /> para transformar suas ideias em projetos.</p></div>
        <div className="curso-cards">{outcomes.map(({ title, text }, index) => <article className="curso-card" key={title}><div className="curso-card-top"><span>0{index + 1}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="curso-journey curso-container" aria-labelledby="curso-journey-title"><div className="curso-journey-heading"><h2 id="curso-journey-title">Do zero. Com direção.<br /><span>Até colocar no mundo.</span></h2></div><div><p>Estou preparando um treinamento completo de <strong>Flutter + Vibe Coding</strong> para ensinar você a usar inteligência artificial em cada etapa da criação dos seus projetos.</p><div className="curso-steps"><span>01. Idealizar</span><span>02. Construir com IA</span><span>03. Publicar</span></div></div></section>

      <section className="curso-vip curso-container" id="grupo-vip" aria-labelledby="curso-vip-title"><div className="curso-vip-panel"><span className="curso-eyebrow"><span className="curso-live-dot" /> O PRÉ-LANÇAMENTO ESTÁ CHEGANDO</span><h2 id="curso-vip-title">Seu próximo projeto<br />começa com um passo.</h2><p>Entre no grupo VIP do WhatsApp para receber as novidades,<br className="curso-desktop-break" /> conhecer o treinamento e acessar as condições especiais de lançamento.</p><ul><li> Novidades em primeira mão</li><li> Condições especiais de lançamento</li><li> Acesso gratuito ao grupo</li></ul>{whatsappUrl ? cta("Quero entrar no grupo VIP") : <p className="curso-pending" role="status"> O link do grupo VIP será disponibilizado em breve.</p>}<small>Participação gratuita. As inscrições para o treinamento ainda não estão abertas.</small></div></section>

      <footer className="curso-footer curso-container"><p>Flutter + IA</p><Link href="/termos-de-uso">Termos de uso</Link></footer>
    </main>
  );
}
