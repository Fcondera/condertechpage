const DataGovernancePage = () => {
  return (
    <main className="min-h-screen bg-white px-4 pb-16 pt-24 sm:px-6 sm:pb-24 sm:pt-28">
      <div className="mx-auto max-w-4xl">
        <p className="font-switzer text-xs font-semibold uppercase tracking-[0.3em] text-[#8d6a44]">
          Governança de Dados
        </p>
        <h1 className="mt-4 font-cabinet text-3xl font-bold tracking-[-0.03em] text-gray-900 sm:text-5xl">
          Diretrizes de tratamento de dados alinhadas à LGPD.
        </h1>
        <div className="mt-10 space-y-6 text-sm leading-7 text-gray-700 sm:text-base sm:leading-8">
          <p>
            A ConderTech trata dados pessoais com base em princípios de
            necessidade, finalidade, segurança e transparência, adotando
            controles técnicos e organizacionais compatíveis com a criticidade
            das informações processadas.
          </p>
          <p>
            Dados enviados por formulários, canais de contato e fluxos de
            atendimento podem ser utilizados para retorno comercial,
            qualificação de demanda, elaboração de propostas e manutenção do
            relacionamento institucional, sempre dentro de bases legais
            adequadas.
          </p>
          <p>
            Mantemos práticas voltadas à integridade, rastreabilidade e acesso
            controlado, com revisão periódica de processos para reforçar
            conformidade com a LGPD e padrões de governança aplicáveis às
            operações digitais que suportamos.
          </p>
          <p>
            Solicitações relacionadas a direitos do titular, atualização de
            dados ou esclarecimentos adicionais podem ser encaminhadas pelos
            canais oficiais informados no rodapé do site.
          </p>
        </div>
      </div>
    </main>
  );
};

export default DataGovernancePage;
