export const salesLink = (message: string) =>
  `https://wa.me/5592982054683?text=${encodeURIComponent(message)}`;

export const systems = [
  {
    id: "nori-sistemas", name: "Nori Sistemas", category: "Gestão + PDV", number: "01",
    description: "A gestão do seu negócio começa aqui. Organize a rotina da loja e conecte o atendimento no ponto de venda à operação da empresa.",
    features: ["Gestão comercial", "Operação de caixa e PDV", "Organização de produtos e estoque"],
    audience: "Para o comércio e o varejo",
  },
  {
    id: "sistema-de-ponto", name: "Sistema de Ponto", category: "SaaS · Gestão de jornada", number: "02",
    description: "Mais organização para a jornada da sua equipe. Uma solução SaaS para centralizar o acompanhamento de ponto e simplificar a rotina de gestão de pessoas.",
    features: ["Acompanhamento de jornadas", "Organização de registros de ponto", "Gestão em uma plataforma online"],
    audience: "Para empresas e equipes",
  },
  {
    id: "sistema-de-agendamento", name: "Sistema de Agendamento", category: "Agenda · Atendimento", number: "03",
    description: "Uma rotina de atendimentos mais organizada. Reúna horários, clientes e serviços em um só lugar e facilite o planejamento do seu dia.",
    features: ["Organização de horários", "Cadastro de clientes e serviços", "Planejamento dos atendimentos"],
    audience: "Para negócios de serviços",
  },
] as const;

export const equipment = [
  { id: "pdv", name: "Terminal PDV", category: "PDV", description: "Equipamento para estruturar o ponto de venda e o atendimento no caixa.", detail: "Consulte configurações para a sua operação.", icon: "monitor" },
  { id: "relogio-de-ponto", name: "Relógio de Ponto", category: "Ponto", description: "Equipamento para o registro de jornada e a organização do ponto da equipe.", detail: "Consulte modelos e formas de identificação.", icon: "clock" },
  { id: "cartao-nfc", name: "Cartão NFC", category: "NFC", description: "Cartões de aproximação para projetos de identificação e interação digital.", detail: "Consulte compatibilidade e personalização.", icon: "card" },
] as const;
