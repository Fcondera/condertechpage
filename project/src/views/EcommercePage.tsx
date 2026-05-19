"use client";

import React from "react";
import {
  Check,
  Store,
  ShoppingBag,
  MapPin,
  TrendingUp,
  Package,
  Zap,
  Shield,
  BarChart3,
} from "lucide-react";

export default function EcommercePage() {
  const [showPersonalizado, setShowPersonalizado] = React.useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div>
              <img
                src="/image/hero-05.png"
                alt="CONDERTECH"
                className="h-14 md:h-20 mb-6"
              />
              <h1 className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-medium text-black mb-6 leading-tight">
                Lucre até{" "}
                <span className="text-red-500 italic font-semibold tracking-wide md:tracking-wider">
                  R$10mil por mês
                </span>{" "}
                <span className="text-red-500 italic font-semibold tracking-wide md:tracking-wider">
                  com uma loja online
                </span>
                , sem precisar ter dor de cabeça.
              </h1>
              <p className="text-base md:text-lg font-light text-slate-700 mb-10 leading-relaxed max-w-3xl">
                Com a condertech venda produto na sua cidade com checkout
                integrado, catálago inteligente e painel administrativo
                completo.
              </p>
              <button
                type="button"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[rgb(124,179,66)] text-white text-lg font-semibold shadow-md hover:bg-[rgb(104,159,46)] transition-colors"
              >
                Quero falar com especialista
              </button>
            </div>
            <div className="relative">
              <img
                src="/image/hero-01.jpeg"
                alt="Preview da plataforma de ecommerce"
                className="w-full h-auto max-h-[560px] object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* O que é */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex justify-center mb-6">
                  <div className="spark-border rounded-full p-[2px]">
                    <div className="inline-flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2">
                      <span className="text-sm font-medium text-slate-900">
                        Começar é rápido e simples
                      </span>
                    </div>
                  </div>
                </div>
                <h2 className="font-cabinet text-3xl md:text-4xl font-medium text-black mb-6 leading-tight">
                  O que é a{" "}
                  <span className="text-red-500 italic">
                    condertech Ecommerce?
                  </span>
                </h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  Uma plataforma completa criada para pequenos empresas e
                  empreendedores que querem vender online de forma profissional
                  sem precisar investir milhares em desenvolvimento.
                </p>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Enquanto outras plataformas entregam apenas uma loja virtual,
                  a condertech conecta sua empresa dentro de um ecossistema
                  regional, com uma ótima base de clientes e visibilidade local
                  para sua marca.
                </p>
                <img
                  src="/image/hero-03.jpeg"
                  alt="Estrutura empresarial CONDERTECH"
                  className="w-full h-auto object-contain"
                />
              </div>
              <div>
                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-medium text-slate-900 mb-6">
                    Sua empresa ganha:
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        icon: Store,
                        text: "Loja virtual própria",
                        desc: "Design profissional e personalizável",
                      },
                      {
                        icon: Package,
                        text: "Painel administrativo",
                        desc: "Gerencie produtos e pedidos",
                      },
                      {
                        icon: ShoppingBag,
                        text: "Checkout integrado",
                        desc: "PIX e cartão de crédito",
                      },
                      {
                        icon: TrendingUp,
                        text: "Analytics completo",
                        desc: "Acompanhe suas vendas",
                      },
                      {
                        icon: MapPin,
                        text: "Marketplace regional",
                        desc: "Visibilidade na sua cidade",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-0"
                      >
                        <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-red-500" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 mb-1">
                            {item.text}
                          </p>
                          <p className="text-sm font-medium text-slate-600">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Regional */}
      <section className="py-20 bg-white [&_*]:!font-medium">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-cabinet text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Marketplace Regional
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Sua empresa aparecendo para toda sua cidade com visibilidade
                profissional.
              </p>
            </div>

            <div className="mb-10">
              <img
                src="/image/hero-02.jpeg"
                alt="Marketplace regional CONDERTECH"
                className="w-full max-w-4xl mx-auto h-auto rounded-xl object-contain"
              />
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 md:p-12 border border-slate-200 mb-10">
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div>
                  <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2 mb-4">
                    <MapPin className="w-4 h-4 text-slate-700" />
                    <span className="text-sm font-medium text-slate-700">
                      Presença regional
                    </span>
                  </div>
                  <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                    Além da loja virtual própria, sua empresa também aparece
                    dentro do marketplace regional da CONDERTECH.
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-slate-200">
                    <p className="text-xs font-semibold text-slate-500 mb-2">
                      Exemplo de URL:
                    </p>
                    <p className="text-lg font-bold text-slate-900">
                      condertech.com.br/manacapuru
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <div className="flex items-center gap-3 mb-5">
                    <BarChart3 className="w-6 h-6 text-red-500 flex-shrink-0" />
                    <div>
                      <span className="text-xl font-bold text-slate-900">
                        5x mais
                      </span>
                      <span className="text-sm text-slate-600 ml-1">
                        alcance na região
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase mb-2">
                        Clientes encontram
                      </p>
                      <ul className="space-y-1.5">
                        {[
                          "Restaurantes",
                          "Marmitarias",
                          "Lojas de roupas",
                          "Cosméticos",
                          "Conveniências",
                          "Farmácias",
                          "Eletrônicos",
                          "Serviços locais",
                        ].map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm"
                          >
                            <Check className="w-3.5 h-3.5 text-slate-900 flex-shrink-0" />
                            <span className="text-slate-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase mb-2">
                        Isso gera
                      </p>
                      <ul className="space-y-1.5">
                        {[
                          "Mais visibilidade orgânica",
                          "Tráfego compartilhado",
                          "Descoberta facilitada",
                          "Crescimento regional",
                        ].map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-sm"
                          >
                            <TrendingUp className="w-3.5 h-3.5 text-slate-900 flex-shrink-0" />
                            <span className="text-slate-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-20 bg-white [&_*]:!font-medium">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-cabinet text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                Como <span className="text-red-500 italic">funciona?</span>
              </h2>
              <p className="text-lg text-slate-600">
                Processo simples e rápido em 4 etapas
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "1",
                  title: "Criamos sua estrutura",
                  desc: "Configuramos sua loja profissional com sua identidade.",
                },
                {
                  step: "2",
                  title: "Sua empresa entra no marketplace",
                  desc: "Sua marca começa a aparecer regionalmente.",
                },
                {
                  step: "3",
                  title: "Você recebe pedidos online",
                  desc: "Tudo centralizado em um painel administrativo simples.",
                },
                {
                  step: "4",
                  title: "Sua operação cresce",
                  desc: "Mais clientes, mais presença digital e mais vendas.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
                >
                  <div className="relative w-14 h-14 mb-5 flex items-center justify-center">
                    {/* camada da faísca girando */}
                    <div className="step-spark absolute inset-0 rounded-full" />
                    {/* círculo preto com número */}
                    <div
                      className="absolute inset-[3px] rounded-full bg-red-500 flex items-center justify-center text-white text-lg font-bold z-10"
                      style={{
                        boxShadow:
                          "0 0 14px 4px rgba(255,255,255,0.55) inset, 0 0 8px 2px rgba(255,255,255,0.3)",
                      }}
                    >
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Planos */}
      <section id="planos" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <h2 className="font-cabinet text-4xl md:text-6xl font-medium text-slate-900 mb-8 leading-tight">
                Planos e preços para o{" "}
                <span className="text-red-500 italic">seu negócio.</span>
              </h2>

              <div className="max-w-2xl rounded-full p-2 bg-white shadow-[0_0_0_1px_rgba(15,23,42,0.08)]">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPersonalizado(false)}
                    className={`inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-colors ${
                      !showPersonalizado
                        ? "bg-[rgb(124,179,66)] text-white hover:bg-[rgb(104,159,46)]"
                        : "bg-[rgb(240,248,232)] text-slate-900 hover:bg-[rgb(232,243,220)]"
                    }`}
                  >
                    Planos
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPersonalizado(true)}
                    className={`inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-colors ${
                      showPersonalizado
                        ? "bg-[rgb(212,175,55)] text-white hover:bg-[rgb(190,154,38)]"
                        : "bg-[rgb(252,247,228)] text-slate-900 hover:bg-[rgb(248,239,206)]"
                    }`}
                  >
                    Personalizado
                  </button>
                </div>
              </div>
            </div>

            {!showPersonalizado && (
              <>
                <div
                  id="planos-grid"
                  className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 pr-8 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pr-0"
                >
                  {/* START */}
                  <div className="w-[82vw] max-w-[320px] shrink-0 snap-start bg-white rounded-2xl p-8 border-2 border-slate-200 hover:border-slate-300 transition-colors md:w-auto md:max-w-none md:min-w-0 md:shrink md:flex-1">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        Start
                      </h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-slate-900">
                          R$79
                        </span>
                        <span className="text-slate-500">/mês</span>
                      </div>
                    </div>
                    <p className="text-slate-600 mb-6 text-sm">
                      Ideal para pequenos negócios começarem a vender online.
                    </p>

                    <ul className="space-y-3 mb-8">
                      {[
                        "Loja virtual completa",
                        "Checkout PIX e cartão",
                        "Até 150 produtos",
                        "WhatsApp integrado",
                        "Marketplace regional",
                        "Painel administrativo",
                      ].map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm"
                        >
                          <Check className="w-4 h-4 text-slate-900 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="https://wa.me/5592982054683"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 px-6 bg-[rgb(124,179,66)] text-white font-semibold rounded-full text-center hover:bg-[rgb(104,159,46)] transition-colors text-sm shadow-[inset_0_-2px_6px_rgba(0,0,0,0.22)]"
                    >
                      Começar Agora
                    </a>
                  </div>

                  {/* BUSINESS - Destaque */}
                  <div className="w-[82vw] max-w-[320px] shrink-0 snap-start bg-[rgb(124,179,66)] rounded-2xl p-8 border-2 border-[rgb(124,179,66)] relative z-10 md:w-auto md:max-w-none md:min-w-0 md:shrink md:flex-1 md:transform md:scale-105 shadow-lg overflow-visible">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[rgb(104,159,46)] text-white px-4 py-1 rounded-full text-xs font-bold z-20">
                      RECOMENDADO
                    </div>
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-white mb-2">
                        Business
                      </h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-white">
                          R$197
                        </span>
                        <span className="text-white/70">/mês</span>
                      </div>
                    </div>
                    <p className="text-white/80 mb-6 text-sm">
                      Nosso plano mais recomendado para empresas em crescimento.
                    </p>

                    <ul className="space-y-3 mb-8">
                      {[
                        "Tudo do Start",
                        "Dashboard avançado",
                        "Recuperação de carrinho",
                        "Meta Pixel integrado",
                        "Google Shopping",
                        "Instagram Shop",
                        "CRM básico incluso",
                        "Destaque regional",
                      ].map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm"
                        >
                          <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                          <span className="text-white">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="https://wa.me/5592982054683"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 px-6 bg-[rgb(124,179,66)] text-white font-semibold rounded-full text-center hover:bg-[rgb(104,159,46)] transition-colors text-sm shadow-[inset_0_-2px_6px_rgba(0,0,0,0.22)]"
                    >
                      Começar Agora
                    </a>
                  </div>

                  {/* ENTERPRISE */}
                  <div className="w-[82vw] max-w-[320px] shrink-0 snap-start bg-white rounded-2xl p-8 border-2 border-slate-200 hover:border-slate-300 transition-colors md:w-auto md:max-w-none md:min-w-0 md:shrink md:flex-1">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        Enterprise
                      </h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-slate-900">
                          R$497
                        </span>
                        <span className="text-slate-500">/mês</span>
                      </div>
                    </div>
                    <p className="text-slate-600 mb-6 text-sm">
                      Para operações maiores e empresas que querem escalar.
                    </p>

                    <ul className="space-y-3 mb-8">
                      {[
                        "Tudo do Business",
                        "Multiestoque avançado",
                        "Dashboard executivo",
                        "Aplicativo próprio",
                        "Analytics avançado",
                        "Marketplace premium",
                        "Suporte prioritário",
                      ].map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm"
                        >
                          <Check className="w-4 h-4 text-slate-900 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="https://wa.me/5592982054683"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 px-6 bg-[rgb(124,179,66)] text-white font-semibold rounded-full text-center hover:bg-[rgb(104,159,46)] transition-colors text-sm shadow-[inset_0_-2px_6px_rgba(0,0,0,0.22)]"
                    >
                      Começar Agora
                    </a>
                  </div>
                </div>
              </>
            )}

            {showPersonalizado && (
              <div className="mt-6">
                <div className="bg-[linear-gradient(135deg,rgb(247,226,153),rgb(212,175,55))] rounded-2xl p-8 border-2 border-[rgb(190,154,38)] transition-colors shadow-md">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      Personalizado
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-slate-900">
                        Sob medida
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-800 mb-6 text-sm">
                    Plano criado para sua operação, com escopo, integrações e
                    funcionalidades definidas junto com a sua equipe.
                  </p>

                  <ul className="space-y-3 mb-8">
                    {[
                      "Diagnóstico do seu negócio",
                      "Arquitetura personalizada",
                      "Integrações específicas",
                      "Fluxos sob demanda",
                      "Roadmap de evolução",
                      "Suporte estratégico",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <Check className="w-4 h-4 text-slate-900 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-800">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="https://wa.me/5592982054683"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 px-6 bg-[rgb(161,122,36)] text-white font-semibold rounded-full text-center hover:bg-[rgb(141,106,30)] transition-colors text-sm"
                  >
                    Solicitar Plano
                  </a>
                </div>
              </div>
            )}

            <div className="mt-12 max-w-4xl mx-auto">
              <img
                src="/image/ecme-06.PNG"
                alt="Demonstração do ecommerce"
                className="w-full h-auto object-contain rounded-xl shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Por Que a CONDERTECH */}
      <section className="py-20 bg-white [&_*]:!font-medium">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-cabinet text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                Por que escolher a{" "}
                <span className="text-red-500 italic">condertech?</span>
              </h2>
              <p className="text-lg text-slate-600">
                Tecnologia profissional com estrutura empresarial
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <img
                src="/image/hero-04.jpeg"
                alt="Resumo visual dos diferenciais Condertech"
                className="w-full h-auto object-contain mb-6"
              />
              <div className="bg-white p-8 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Estrutura completa para crescer
                </h3>
                <ul className="space-y-3">
                  {[
                    {
                      icon: Shield,
                      text: "Estrutura profissional pronta para operar",
                    },
                    {
                      icon: MapPin,
                      text: "Marketplace regional para ampliar alcance",
                    },
                    {
                      icon: ShoppingBag,
                      text: "Checkout completo com PIX e cartão",
                    },
                    {
                      icon: Zap,
                      text: "Performance otimizada para seus clientes",
                    },
                    {
                      icon: TrendingUp,
                      text: "Crescimento escalável conforme sua operação",
                    },
                    {
                      icon: BarChart3,
                      text: "Analytics integrado para decisões mais rápidas",
                    },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <item.icon className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Para Quem É */}
      <section className="py-20 bg-white [&_*]:!font-medium">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-cabinet text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                Para quem é essa{" "}
                <span className="text-red-500 italic">solução?</span>
              </h2>
              <p className="text-lg text-slate-600">
                A Condertech Ecommerce é ideal para diversos tipos de negócios:
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Restaurantes",
                "Marmitarias",
                "Lojas de roupas",
                "Cosméticos",
                "Conveniências",
                "Farmácias",
                "Autopeças",
                "Assistência técnica",
                "Eletrônicos",
                "Livrarias",
                "Pet shops",
                "Empresas locais",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors text-center"
                >
                  <p className="text-slate-900 font-medium text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-white [&_*]:!font-medium">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="spark-border rounded-full p-[2px]">
                <div className="inline-flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2">
                  <span className="text-sm font-medium text-slate-900">
                    Começar é rápido e simples
                  </span>
                </div>
              </div>
            </div>
            <h2 className="font-cabinet text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Pronto para começar sua operação digital?
            </h2>
            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              Sua empresa pronta para vender online dentro do maior ecossistema
              regional da cidade. Configure em 48h.
            </p>

            <div className="mt-10 pt-10 border-t border-slate-200">
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">
                    48h
                  </div>
                  <div className="text-sm text-slate-500">Setup completo</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">
                    R$0
                  </div>
                  <div className="text-sm text-slate-500">Taxa de setup</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">
                    24/7
                  </div>
                  <div className="text-sm text-slate-500">
                    Suporte disponível
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .spark-border {
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 0 1px rgba(248, 113, 113, 0.25);
          animation: sparkPulse 1.2s ease-in-out infinite;
        }

        .spark-border::before {
          content: "";
          position: absolute;
          inset: -120%;
          background: conic-gradient(
            transparent 0deg,
            transparent 300deg,
            rgba(239, 68, 68, 0.9) 320deg,
            rgba(255, 255, 255, 1) 340deg,
            rgba(239, 68, 68, 0.9) 360deg
          );
          animation: sparkSpin 1.2s linear infinite;
        }

        .spark-border::after {
          content: "";
          position: absolute;
          inset: -120%;
          background: conic-gradient(
            transparent 0deg,
            transparent 305deg,
            rgba(252, 165, 165, 0.5) 334deg,
            rgba(248, 113, 113, 0.85) 355deg,
            transparent 360deg
          );
          filter: blur(2px);
          animation: sparkSpin 1.2s linear infinite;
        }

        .spark-border > div {
          position: relative;
          z-index: 1;
          background: #f1f5f9;
        }

        @keyframes sparkSpin {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes sparkPulse {
          0%,
          100% {
            box-shadow:
              0 0 0 1px rgba(248, 113, 113, 0.2),
              0 0 10px rgba(239, 68, 68, 0.18);
          }
          50% {
            box-shadow:
              0 0 0 1px rgba(248, 113, 113, 0.35),
              0 0 16px rgba(239, 68, 68, 0.35);
          }
        }

        /* faísca nos steps */
        .step-spark {
          overflow: hidden;
          border-radius: 9999px;
        }

        .step-spark::before {
          content: "";
          position: absolute;
          inset: -100%;
          background: conic-gradient(
            transparent 0deg,
            transparent 300deg,
            rgba(239, 68, 68, 0.95) 325deg,
            rgba(255, 255, 255, 1) 342deg,
            rgba(239, 68, 68, 0.95) 360deg
          );
          animation: sparkSpin 1.4s linear infinite;
        }

        .step-spark::after {
          content: "";
          position: absolute;
          inset: -100%;
          background: conic-gradient(
            transparent 0deg,
            transparent 308deg,
            rgba(252, 165, 165, 0.55) 336deg,
            rgba(248, 113, 113, 0.9) 356deg,
            transparent 360deg
          );
          filter: blur(2px);
          animation: sparkSpin 1.4s linear infinite;
        }
      `}</style>
    </div>
  );
}
