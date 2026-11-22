import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { businessSolutions } from "@/data/businessSolutions";

const site = "https://www.condertech.com.br";
type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return businessSolutions.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = businessSolutions.find(item => item.slug === slug);
  if (!solution) notFound();
  const title = `${solution.name} | ConderTech`;
  const url = `${site}/solucoes/${slug}`;
  return { title, description: solution.description, alternates: { canonical: url, languages: {} },
    openGraph: { title, description: solution.description, url, type: "website", locale: "pt_BR", images: ["/image/logocondertech.png"] },
    twitter: { card: "summary_large_image", title, description: solution.description, images: ["/image/logocondertech.png"] } };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const solution = businessSolutions.find(item => item.slug === slug);
  if (!solution) notFound();
  const url = `${site}/solucoes/${slug}`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Service", "@id": `${url}#service`, name: solution.name, description: solution.description, url, provider: { "@id": `${site}/#organization` }, areaServed: { "@type": "Country", name: "Brasil" } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Início", item: site }, { "@type": "ListItem", position: 2, name: "Soluções de tecnologia", item: `${site}/solucoes-de-tecnologia` }, { "@type": "ListItem", position: 3, name: solution.name, item: url }] },
    { "@type": "FAQPage", mainEntity: solution.faq.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
  ] };
  return <main className="bg-white text-[#383E42]">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <section className="bg-[#101213] px-6 pb-20 pt-32 text-white sm:pt-40"><div className="mx-auto max-w-6xl">
      <nav aria-label="Navegação estrutural" className="flex flex-wrap gap-3 text-sm text-white/70"><Link href="/">Início</Link><span>/</span><Link href="/solucoes-de-tecnologia">Soluções</Link><span>/</span><span aria-current="page">{solution.name}</span></nav>
      <p className="mt-12 text-sm font-semibold uppercase tracking-widest text-red-400">Tecnologia para empresas</p>
      <h1 className="mt-5 max-w-4xl text-4xl font-medium leading-tight sm:text-6xl">{solution.name}</h1>
      <p className="mt-7 max-w-3xl text-lg leading-8 text-white/80">{solution.intro}</p>
      <Link href={`/#contato`} className="mt-9 inline-flex rounded-full bg-[#e22d2e] px-7 py-4 font-semibold text-white">Conversar sobre meu projeto</Link>
    </div></section>
    <div className="mx-auto max-w-6xl space-y-16 px-6 py-16 sm:py-24">
      <section className="max-w-3xl"><h2 className="text-3xl font-medium">Para quem é esta solução</h2><p className="mt-5 text-lg leading-8 text-slate-600">{solution.audience}</p></section>
      <div className="grid gap-8 md:grid-cols-2">{[{ title: "Necessidades que podemos avaliar", items: solution.needs }, { title: "O que definir na proposta", items: solution.scope }].map(section => <section key={section.title} className="rounded-2xl border border-slate-200 p-7"><h2 className="text-2xl font-medium">{section.title}</h2><ul className="mt-6 list-disc space-y-4 pl-5 leading-7 text-slate-600">{section.items.map(item => <li key={item}>{item}</li>)}</ul></section>)}</div>
      <section className="rounded-2xl bg-slate-50 p-7 sm:p-10"><h2 className="text-3xl font-medium">Como preparar o primeiro contato</h2><p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{solution.preparation}</p><Link href="/#contato" className="mt-7 inline-flex rounded-full bg-[#e22d2e] px-7 py-4 font-semibold text-white">Solicitar avaliação</Link></section>
      <section><h2 className="text-3xl font-medium">Perguntas frequentes</h2><div className="mt-7 divide-y divide-slate-200">{solution.faq.map(item => <details key={item.question} className="py-5"><summary className="cursor-pointer text-lg font-semibold">{item.question}</summary><p className="mt-4 max-w-3xl leading-8 text-slate-600">{item.answer}</p></details>)}</div></section>
      <section><h2 className="text-2xl font-medium">Conheça também</h2><div className="mt-5 flex flex-wrap gap-4">{solution.related.map(item => <Link key={item.href} href={item.href} className="rounded-full border border-slate-300 px-5 py-3 font-medium hover:border-red-500">{item.name}</Link>)}</div></section>
    </div>
  </main>;
}
