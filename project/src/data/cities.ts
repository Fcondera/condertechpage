export interface City {
  name: string;
  state: string;
  stateName: string;
  region: string;
  slug: string;
}

const cityNamesByState: Record<string, string> = {
  AC: "Rio Branco|Cruzeiro do Sul",
  AL: "Maceió|Arapiraca|Rio Largo",
  AM: "Manaus|Itacoatiara|Manacapuru|Parintins",
  AP: "Macapá|Santana",
  BA: "Salvador|Feira de Santana|Vitória da Conquista|Camaçari|Juazeiro|Lauro de Freitas|Itabuna|Ilhéus|Porto Seguro|Barreiras|Jequié|Alagoinhas|Teixeira de Freitas|Eunápolis|Simões Filho|Paulo Afonso|Luís Eduardo Magalhães|Santo Antônio de Jesus|Guanambi|Valença",
  CE: "Fortaleza|Caucaia|Juazeiro do Norte|Maracanaú|Sobral|Crato|Itapipoca|Maranguape|Iguatu",
  DF: "Brasília",
  ES: "Serra|Vila Velha|Cariacica|Vitória|Cachoeiro de Itapemirim|Linhares|Guarapari|São Mateus|Colatina|Aracruz",
  GO: "Goiânia|Aparecida de Goiânia|Anápolis|Águas Lindas de Goiás|Rio Verde|Luziânia|Valparaíso de Goiás|Senador Canedo|Trindade|Catalão|Formosa|Itumbiara|Planaltina|Jataí|Novo Gama|Caldas Novas|Cidade Ocidental",
  MA: "São Luís|Imperatriz|São José de Ribamar|Timon|Caxias|Paço do Lumiar|Codó|Açailândia|Bacabal|Balsas",
  MG: "Belo Horizonte|Uberlândia|Contagem|Juiz de Fora|Montes Claros|Betim|Uberaba|Ribeirão das Neves|Governador Valadares|Divinópolis|Sete Lagoas|Ipatinga|Santa Luzia|Ibirité|Poços de Caldas|Patos de Minas|Pouso Alegre|Varginha|Teófilo Otoni|Conselheiro Lafaiete|Vespasiano|Sabará|Barbacena|Araguari|Nova Lima|Araxá|Itabira|Passos|Nova Serrana|Lavras|Coronel Fabriciano|Muriaé|Ubá|Ituiutaba|Itaúna|Pará de Minas|Paracatu|Manhuaçu|Itajubá|São João del Rei|Patrocínio|Esmeraldas|Unaí|Caratinga",
  MS: "Campo Grande|Dourados|Três Lagoas|Corumbá|Ponta Porã",
  MT: "Cuiabá|Várzea Grande|Rondonópolis|Sinop|Sorriso|Tangará da Serra|Primavera do Leste|Lucas do Rio Verde|Cáceres",
  PA: "Belém|Ananindeua|Santarém|Parauapebas|Marabá|Castanhal|Abaetetuba|Cametá|Barcarena|Altamira|Itaituba|Bragança|Marituba|Breves|Paragominas|Tucuruí|Redenção|Moju",
  PB: "João Pessoa|Campina Grande|Santa Rita|Patos",
  PE: "Recife|Jaboatão dos Guararapes|Petrolina|Caruaru|Paulista|Olinda|Cabo de Santo Agostinho|Camaragibe|Garanhuns|Vitória de Santo Antão|Igarassu|São Lourenço da Mata|Ipojuca|Santa Cruz do Capibaribe|Abreu e Lima|Serra Talhada|Gravatá|Araripina",
  PI: "Teresina|Parnaíba",
  PR: "Curitiba|Londrina|Maringá|Ponta Grossa|Cascavel|São José dos Pinhais|Foz do Iguaçu|Colombo|Guarapuava|Fazenda Rio Grande|Araucária|Toledo|Paranaguá|Campo Largo|Apucarana|Pinhais|Sarandi|Piraquara|Almirante Tamandaré|Arapongas|Umuarama|Cambé|Campo Mourão|Francisco Beltrão|Pato Branco|Paranavaí",
  RJ: "Rio de Janeiro|São Gonçalo|Duque de Caxias|Nova Iguaçu|Campos dos Goytacazes|Belford Roxo|Niterói|São João de Meriti|Petrópolis|Volta Redonda|Macaé|Magé|Itaboraí|Cabo Frio|Maricá|Nova Friburgo|Barra Mansa|Angra dos Reis|Mesquita|Teresópolis|Rio das Ostras|Nilópolis|Queimados|Araruama|Resende|Itaguaí|São Pedro da Aldeia|Itaperuna|Japeri|Barra do Piraí|Saquarema",
  RN: "Natal|Mossoró|Parnamirim|São Gonçalo do Amarante",
  RO: "Porto Velho|Ji-Paraná|Vilhena|Ariquemes|Cacoal",
  RR: "Boa Vista",
  RS: "Porto Alegre|Caxias do Sul|Canoas|Pelotas|Santa Maria|Gravataí|Novo Hamburgo|Viamão|São Leopoldo|Passo Fundo|Rio Grande|Alvorada|Cachoeirinha|Santa Cruz do Sul|Sapucaia do Sul|Bento Gonçalves|Bagé|Uruguaiana|Erechim|Lajeado|Guaíba",
  SC: "Joinville|Florianópolis|Blumenau|São José|Itajaí|Chapecó|Palhoça|Criciúma|Jaraguá do Sul|Lages|Brusque|Balneário Camboriú|Camboriú|Tubarão|Navegantes",
  SE: "Aracaju|Nossa Senhora do Socorro|Itabaiana|Lagarto|São Cristóvão",
  SP: "São Paulo|Guarulhos|Campinas|São Bernardo do Campo|Santo André|Sorocaba|Osasco|Ribeirão Preto|São José dos Campos|São José do Rio Preto|Mogi das Cruzes|Jundiaí|Piracicaba|Santos|Mauá|Diadema|Carapicuíba|Bauru|Itaquaquecetuba|Praia Grande|Franca|São Vicente|Barueri|Taubaté|Suzano|Limeira|Guarujá|Sumaré|Cotia|Taboão da Serra|Indaiatuba|São Carlos|Embu das Artes|Araraquara|Jacareí|Hortolândia|Americana|Marília|Itapevi|Presidente Prudente|Rio Claro|Araçatuba|Santa Bárbara d'Oeste|Ferraz de Vasconcelos|Bragança Paulista|Itu|São Caetano do Sul|Pindamonhangaba|Francisco Morato|Atibaia|Itapetininga|Santana de Parnaíba|Itapecerica da Serra|Mogi Guaçu|Botucatu|Franco da Rocha|Caraguatatuba|Salto|Jaú|Araras|Votorantim|Valinhos|Sertãozinho|Tatuí|Itatiba|Barretos|Birigui|Guaratinguetá|Jandira|Várzea Paulista|Catanduva|Ribeirão Pires|Itanhaém|Paulínia|Cubatão|Ourinhos|Poá|Assis|Leme|Votuporanga|Caçapava|Caieiras|Cajamar|Mairiporã|Ubatuba|Avaré|São João da Boa Vista|Mogi Mirim|Itapeva|Arujá",
  TO: "Palmas|Araguaína|Gurupi",
};

const stateDetails: Record<string, { name: string; region: string }> = {
  AC: { name: "Acre", region: "Norte" },
  AL: { name: "Alagoas", region: "Nordeste" },
  AM: { name: "Amazonas", region: "Norte" },
  AP: { name: "Amapá", region: "Norte" },
  BA: { name: "Bahia", region: "Nordeste" },
  CE: { name: "Ceará", region: "Nordeste" },
  DF: { name: "Distrito Federal", region: "Centro-Oeste" },
  ES: { name: "Espírito Santo", region: "Sudeste" },
  GO: { name: "Goiás", region: "Centro-Oeste" },
  MA: { name: "Maranhão", region: "Nordeste" },
  MG: { name: "Minas Gerais", region: "Sudeste" },
  MS: { name: "Mato Grosso do Sul", region: "Centro-Oeste" },
  MT: { name: "Mato Grosso", region: "Centro-Oeste" },
  PA: { name: "Pará", region: "Norte" },
  PB: { name: "Paraíba", region: "Nordeste" },
  PE: { name: "Pernambuco", region: "Nordeste" },
  PI: { name: "Piauí", region: "Nordeste" },
  PR: { name: "Paraná", region: "Sul" },
  RJ: { name: "Rio de Janeiro", region: "Sudeste" },
  RN: { name: "Rio Grande do Norte", region: "Nordeste" },
  RO: { name: "Rondônia", region: "Norte" },
  RR: { name: "Roraima", region: "Norte" },
  RS: { name: "Rio Grande do Sul", region: "Sul" },
  SC: { name: "Santa Catarina", region: "Sul" },
  SE: { name: "Sergipe", region: "Nordeste" },
  SP: { name: "São Paulo", region: "Sudeste" },
  TO: { name: "Tocantins", region: "Norte" },
};

export function slugifyCity(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const cities: City[] = Object.entries(cityNamesByState).flatMap(
  ([state, names]) =>
    names.split("|").map((name) => ({
      name,
      state,
      stateName: stateDetails[state].name,
      region: stateDetails[state].region,
      slug: slugifyCity(name),
    })),
);

export const citiesByState = Object.keys(cityNamesByState)
  .sort((a, b) => stateDetails[a].name.localeCompare(stateDetails[b].name))
  .map((state) => ({
    state,
    stateName: stateDetails[state].name,
    cities: cities.filter((city) => city.state === state),
  }));

export function getCityBySlug(slug: string) {
  return cities.find((city) => city.slug === slug);
}
