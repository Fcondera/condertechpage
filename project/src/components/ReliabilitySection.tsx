import { useGsapReveal } from "@hooks/useGsapReveal";

const ReliabilitySection = () => {
  const contentRef = useGsapReveal<HTMLDivElement>();

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div ref={contentRef} className="max-w-4xl">
          <h2 className="font-inter text-3xl font-medium leading-tight text-[#383E42] sm:text-4xl lg:text-5xl">
            Sistemas feitos para o seu negócio nunca parar
          </h2>

          <div className="mt-8 space-y-6 font-inter text-base leading-8 text-slate-600 sm:text-lg sm:leading-9">
            <p>
              Nós não criamos apenas linhas de código; nós construímos a base
              que dá segurança para você tomar decisões e focar no crescimento
              da sua empresa. Desenvolvemos cada solução priorizando a
              estabilidade do seu negócio, o sigilo absoluto dos seus dados e
              uma estrutura forte que não te deixa na mão quando você mais
              precisa.
            </p>

            <p className="font-medium text-[#383E42]">
              A ConderTech é o parceiro tecnológico que traz tranquilidade para
              a sua rotina comercial.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReliabilitySection;
