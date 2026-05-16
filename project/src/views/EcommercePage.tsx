"use client";

import React from "react";
import {
  Check,
  Store,
  ShoppingBag,
  MapPin,
  TrendingUp,
  Package,
  ArrowRight,
  Zap,
  Shield,
  BarChart3,
} from "lucide-react";

export default function EcommercePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div>
              <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 mb-6">
                <Zap className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-slate-700">
                  Plataforma completa de e-commerce regional
                </span>
              </div>
              <h1 className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Venda online com sua loja e marketplace regional
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
                Crie sua loja virtual profissional, receba pedidos online e
                apareça no marketplace regional da sua cidade. Tudo em uma única
                plataforma.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href="https://wa.me/5592982054683"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
                >
                  Falar com Especialista
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="#planos"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 font-semibold rounded-lg border-2 border-slate-200 hover:border-slate-300 transition-colors"
                >
                  Ver Planos
                </a>
              </div>
              <div className="flex items-center gap-8 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Setup em 48h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Sem taxas de setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>Suporte dedicado</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-sm">
                <div className="bg-white rounded-xl p-6 shadow-md mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center">
                      <Store className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        Sua Loja Virtual
                      </div>
                      <div className="text-xs text-slate-500">
                        Profissional e completa
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">
                        Catálogo de produtos
                      </span>
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Checkout integrado</span>
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">
                        Painel administrativo
                      </span>
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 shadow-md text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">
                        Marketplace Regional
                      </div>
                      <div className="text-xs text-white/70">
                        Visibilidade para toda cidade
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold mb-2">+500%</div>
                  <div className="text-sm text-white/80">
                    Mais alcance na sua região
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O que é */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-red-50 text-red-600 text-sm font-semibold px-4 py-2 rounded-full mb-6">
                  Solução completa
                </div>
                <h2 className="font-cabinet text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  O que é a CONDERTECH Ecommerce
                </h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  Uma plataforma completa criada para empresas que querem vender
                  online de forma profissional sem precisar investir milhares em
                  desenvolvimento.
                </p>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Enquanto outras plataformas entregam apenas uma loja virtual,
                  a CONDERTECH conecta sua empresa dentro de um ecossistema
                  regional inteligente.
                </p>
                <div className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-lg">
                  <Shield className="w-6 h-6 text-slate-900 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-slate-900 mb-1">
                      Estrutura empresarial
                    </div>
                    <div className="text-sm text-slate-600">
                      Tecnologia profissional com suporte dedicado e
                      atualizações constantes.
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">
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
                        <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 mb-1">
                            {item.text}
                          </p>
                          <p className="text-sm text-slate-600">{item.desc}</p>
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
      <section className="py-20 bg-white">
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
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center">
                      <BarChart3 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900">
                        5x mais
                      </div>
                      <div className="text-sm text-slate-600">
                        alcance na região
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Mais visibilidade orgânica</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Tráfego compartilhado</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Descoberta facilitada</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <h3 className="text-base font-bold text-slate-900 mb-4">
                    Os clientes conseguem encontrar:
                  </h3>
                  <ul className="space-y-2">
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
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <h3 className="text-base font-bold text-slate-900 mb-4">
                    Isso gera:
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Mais visibilidade",
                      "Tráfego compartilhado",
                      "Descoberta de empresas",
                      "Crescimento regional",
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <TrendingUp className="w-4 h-4 text-slate-900 flex-shrink-0" />
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-cabinet text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Como Funciona
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
                  className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-slate-900 text-white rounded-lg flex items-center justify-center text-xl font-bold mb-4">
                    {item.step}
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
            <div className="text-center mb-16">
              <h2 className="font-cabinet text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Planos e Preços
              </h2>
              <p className="text-lg text-slate-600">
                Escolha o plano ideal para o tamanho da sua operação
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* START */}
              <div className="bg-white rounded-2xl p-8 border-2 border-slate-200 hover:border-slate-300 transition-colors">
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
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://wa.me/5592982054683"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 px-6 bg-slate-900 text-white font-semibold rounded-lg text-center hover:bg-slate-800 transition-colors text-sm"
                >
                  Começar Agora
                </a>
              </div>

              {/* BUSINESS - Destaque */}
              <div className="bg-slate-900 rounded-2xl p-8 border-2 border-slate-900 relative transform md:scale-105 shadow-lg">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-xs font-bold">
                  RECOMENDADO
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Business
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">R$197</span>
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
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                      <span className="text-white">{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://wa.me/5592982054683"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 px-6 bg-white text-slate-900 font-semibold rounded-lg text-center hover:bg-slate-50 transition-colors text-sm"
                >
                  Começar Agora
                </a>
              </div>

              {/* ENTERPRISE */}
              <div className="bg-white rounded-2xl p-8 border-2 border-slate-200 hover:border-slate-300 transition-colors">
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
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://wa.me/5592982054683"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 px-6 bg-slate-900 text-white font-semibold rounded-lg text-center hover:bg-slate-800 transition-colors text-sm"
                >
                  Começar Agora
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por Que a CONDERTECH */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-cabinet text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Por Que Escolher a CONDERTECH
              </h2>
              <p className="text-lg text-slate-600">
                Tecnologia profissional com estrutura empresarial
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Estrutura profissional",
                  desc: "Sua empresa pronta para operar online com tecnologia de ponta.",
                },
                {
                  icon: MapPin,
                  title: "Marketplace regional",
                  desc: "Mais visibilidade e alcance para sua marca na região.",
                },
                {
                  icon: ShoppingBag,
                  title: "Checkout completo",
                  desc: "PIX e cartão integrados com segurança certificada.",
                },
                {
                  icon: TrendingUp,
                  title: "Crescimento escalável",
                  desc: "Comece simples e evolua conforme sua operação cresce.",
                },
                {
                  icon: Zap,
                  title: "Performance otimizada",
                  desc: "Plataforma rápida e confiável para seus clientes.",
                },
                {
                  icon: BarChart3,
                  title: "Analytics integrado",
                  desc: "Acompanhe métricas e tome decisões baseadas em dados.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-white" />
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

      {/* Para Quem É */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-cabinet text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Para Quem É Esta Solução
              </h2>
              <p className="text-lg text-slate-600">
                A CONDERTECH Ecommerce é ideal para diversos tipos de negócios:
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
                "Autopecas",
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
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
              <Store className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">
                Começar é rápido e simples
              </span>
            </div>
            <h2 className="font-cabinet text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Pronto para começar sua operação digital?
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-2xl mx-auto">
              Sua empresa pronta para vender online dentro do maior ecossistema
              regional da cidade. Configure em 48h.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5592982054683"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-50 transition-colors shadow-lg"
              >
                Falar com Especialista
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#planos"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-lg border-2 border-white/20 hover:bg-white/20 transition-colors"
              >
                Ver Planos e Preços
              </a>
            </div>
            <div className="mt-10 pt-10 border-t border-white/10">
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">48h</div>
                  <div className="text-sm text-white/60">Setup completo</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">R$0</div>
                  <div className="text-sm text-white/60">Taxa de setup</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">24/7</div>
                  <div className="text-sm text-white/60">
                    Suporte disponível
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
