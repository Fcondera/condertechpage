import Link from "next/link";
import { businessSolutions } from "@/data/businessSolutions";

export default function BusinessSolutionsSection() {
  return <section className="bg-slate-50 px-6 py-16 sm:py-24" aria-labelledby="business-solutions-title">
    <div className="mx-auto max-w-7xl">
      <p className="text-sm font-semibold uppercase tracking-widest text-[#e22d2e]">Soluções para empresas</p>
      <h2 id="business-solutions-title" className="mt-4 max-w-3xl text-3xl font-medium leading-tight text-[#383E42] sm:text-5xl">Software, IA personalizada e automação para seu negócio.</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-2">{businessSolutions.map(solution => <article key={solution.slug} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7">
        <h3 className="text-xl font-semibold text-[#383E42]">{solution.name}</h3>
        <p className="mb-6 mt-4 leading-7 text-slate-600">{solution.description}</p>
        <Link href={`/solucoes/${solution.slug}`} className="mt-auto font-semibold text-[#c22425] underline underline-offset-4">Conhecer a solução</Link>
      </article>)}</div>
      <Link href="/solucoes-de-tecnologia" className="mt-8 inline-block font-semibold text-[#383E42] underline underline-offset-4">Todas as soluções de tecnologia</Link>
      <p className="mt-8 max-w-3xl leading-7 text-slate-600">Blumenau, SC e AM-070, Amazonas. Para combinar uma reunião ou confirmar a disponibilidade de atendimento presencial, fale com a equipe.</p>
    </div>
  </section>;
}
