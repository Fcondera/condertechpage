export const salesLink = (message: string) =>
  `https://wa.me/5592982054683?text=${encodeURIComponent(message)}`;

export const systems = [
  {
    id: "nori-sistemas", name: "Nori Sistemas", category: "Gestão + PDV", number: "01",
    summary: "Gestão comercial, caixa e estoque em um só sistema.",
    description: "Sistema de gestão para comércios e varejistas que reúne a operação de caixa, o cadastro de produtos e o controle de estoque.",
    features: ["Gestão comercial", "Operação de caixa e PDV", "Organização de produtos e estoque"],
    audience: "Para o comércio e o varejo",
  },
  {
    id: "sistema-de-ponto", name: "Sistema de Ponto", category: "SaaS · Gestão de jornada", number: "02",
    summary: "Registros de ponto e acompanhamento de jornadas online.",
    description: "Plataforma SaaS para empresas que precisam centralizar os registros de ponto e acompanhar a jornada da equipe online.",
    features: ["Acompanhamento de jornadas", "Organização de registros de ponto", "Gestão em uma plataforma online"],
    audience: "Para empresas e equipes",
  },
  {
    id: "sistema-de-agendamento", name: "Sistema de Agendamento", category: "Agenda · Atendimento", number: "03",
    summary: "Horários, clientes e serviços em uma agenda organizada.",
    description: "Sistema para negócios de serviços que precisam organizar horários, clientes e atendimentos em uma agenda única.",
    features: ["Organização de horários", "Cadastro de clientes e serviços", "Planejamento dos atendimentos"],
    audience: "Para negócios de serviços",
  },
] as const;

export const equipment = [
  { id: "pdv", name: "Terminal PDV", category: "PDV", description: "Equipamento para estruturar o ponto de venda e o atendimento no caixa.", detail: "Consulte configurações para a sua operação.", icon: "monitor" },
  { id: "relogio-de-ponto", name: "Relógio de Ponto", category: "Ponto", description: "Equipamento para o registro de jornada e a organização do ponto da equipe.", detail: "Consulte modelos e formas de identificação.", icon: "clock" },
  { id: "cartao-nfc", name: "Cartão NFC", category: "NFC", description: "Cartões de aproximação para projetos de identificação e interação digital.", detail: "Consulte compatibilidade e personalização.", icon: "card" },
] as const;
