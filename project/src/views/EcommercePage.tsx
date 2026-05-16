"use client";

import React from "react";
import { Check, Store, ShoppingBag, MapPin, TrendingUp, Users, Package } from "lucide-react";

// Ícones SVG de produtos regionais
const ProductIcons = () => (
  <div className="absolute inset-0 overflow-hidden opacity-10">
    <div className="absolute top-10 left-10 animate-float">
      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" className="text-spotify-green">
        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 10 12 6.16-1.26 10-6.45 10-12V7l-10-5z" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.3"/>
      </svg>
    </div>
    <div className="absolute top-32 right-20 animate-float-delayed">
      <svg width="50" height="50" viewBox="0 0 24 24" fill="none" className="text-spotify-green">
        <circle cx="9" cy="21" r="1" fill="currentColor"/>
        <circle cx="20" cy="21" r="1" fill="currentColor"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke="currentColor" strokeWidth="2"/>
      </svg>
    </div>
    <div className="absolute bottom-20 left-32 animate-float">
      <svg width="55" height="55" viewBox="0 0 24 24" fill="none" className="text-spotify-green">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.3"/>
      </svg>
    </div>
  </div>
);

export default function EcommercePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <ProductIcons />
        <div className="relative z-10 container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-cabinet text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              A infraestrutura digital que conecta empresas ao mercado da sua cidade
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Crie sua loja virtual profissional, receba pedidos online e apareça dentro do marketplace regional da CONDERTECH.
            </p>
            <a
              href="https://wa.me/5592982054683"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-spotify-green text-white font-semibold rounded-full text-lg hover:bg-spotify-green/90 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Falar com Especialista
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* O que é */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-cabinet text-3xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
              O QUE É A CONDERTECH ECOMMERCE
            </h2>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              A CONDERTECH ECOMMERCE foi criada para empresas que querem vender online de forma profissional sem precisar investir milhares em desenvolvimento.
            </p>
            <p className="text-xl text-gray-700 mb-10 leading-relaxed">
              Enquanto outras plataformas entregam apenas uma loja virtual, a CONDERTECH conecta sua empresa dentro de um ecossistema regional inteligente.
            </p>
            
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Sua empresa ganha:</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: Store, text: "Loja própria" },
                  { icon: Package, text: "Painel administrativo" },
                  { icon: ShoppingBag, text: "Checkout online" },
                  { icon: TrendingUp, text: "Estrutura profissional" },
                  { icon: MapPin, text: "Presença no marketplace regional" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-spotify-green/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-spotify-green" />
                    </div>
                    <p className="text-lg text-gray-700 pt-2 font-medium">{item.text}</p>
                  </div>
                ))}
              </div>
              <p className="text-xl font-semibold text-gray-900 mt-8">
                Tudo em uma única plataforma.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Regional */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-cabinet text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                MARKETPLACE REGIONAL
              </h2>
              <p className="text-2xl text-gray-700 font-medium">
                Sua empresa aparecendo para toda sua cidade.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl mb-10">
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Além da loja virtual própria, sua empresa também aparece dentro do marketplace regional da CONDERTECH.
              </p>
              
              <div className="bg-gradient-to-r from-spotify-green/10 to-spotify-green/5 rounded-2xl p-6 mb-8">
                <p className="text-sm font-semibold text-gray-600 mb-2">Exemplo:</p>
                <p className="text-2xl font-bold text-spotify-green">condertech.com.br/manacapuru</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Os clientes conseguem encontrar:</h3>
                  <ul className="space-y-2">
                    {["restaurantes", "marmitarias", "roupas", "cosméticos", "conveniências", "farmácias", "eletrônicos", "serviços locais"].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-spotify-green flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Isso gera:</h3>
                  <ul className="space-y-2">
                    {["Mais visibilidade", "Tráfego compartilhado", "Descoberta de empresas", "Crescimento regional"].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-spotify-green flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-cabinet text-3xl md:text-5xl font-bold text-gray-900 mb-16 text-center">
              COMO FUNCIONA
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Criamos sua estrutura", desc: "Configuramos sua loja profissional." },
                { step: "2", title: "Sua empresa entra no marketplace", desc: "Sua marca começa aparecer regionalmente." },
                { step: "3", title: "Você recebe pedidos online", desc: "Tudo centralizado em um painel simples." },
                { step: "4", title: "Sua operação cresce", desc: "Mais clientes, mais presença digital e mais vendas." }
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 bg-spotify-green text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Planos */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-cabinet text-3xl md:text-5xl font-bold text-gray-900 mb-16 text-center">
              PLANOS
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* START */}
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">START</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">R$79</span>
                  <span className="text-gray-600">/mês</span>
                </div>
                <p className="text-gray-600 mb-6">Ideal para pequenos negócios começarem vender online.</p>
                
                <ul className="space-y-3 mb-8">
                  {[
                    "Loja virtual",
                    "Checkout PIX e cartão",
                    "Até 150 produtos",
                    "WhatsApp integrado",
                    "Marketplace regional",
                    "Painel administrativo"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-spotify-green flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <a
                  href="https://wa.me/5592982054683"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 px-6 bg-gray-900 text-white font-semibold rounded-full text-center hover:bg-gray-800 transition-all duration-300"
                >
                  Começar Agora
                </a>
              </div>

              {/* BUSINESS - Destaque */}
              <div className="bg-gradient-to-br from-spotify-green to-green-600 rounded-3xl p-8 shadow-2xl transform md:scale-105 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                  RECOMENDADO
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">BUSINESS</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">R$197</span>
                  <span className="text-white/80">/mês</span>
                </div>
                <p className="text-white/90 mb-6">Nosso plano mais recomendado para empresas em crescimento.</p>
                
                <ul className="space-y-3 mb-8">
                  {[
                    "Tudo do START",
                    "Dashboard avançado",
                    "Recuperação de carrinho",
                    "Meta Pixel",
                    "Google Shopping",
                    "Instagram Shop",
                    "CRM básico",
                    "Destaque regional"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                      <span className="text-white">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <a
                  href="https://wa.me/5592982054683"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 px-6 bg-white text-spotify-green font-semibold rounded-full text-center hover:bg-gray-50 transition-all duration-300"
                >
                  Começar Agora
                </a>
              </div>

              {/* ENTERPRISE */}
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">ENTERPRISE</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">R$497</span>
                  <span className="text-gray-600">/mês</span>
                </div>
                <p className="text-gray-600 mb-6">Para operações maiores e empresas que querem escalar.</p>
                
                <ul className="space-y-3 mb-8">
                  {[
                    "Tudo do BUSINESS",
                    "Multiestoque",
                    "Dashboard executivo",
                    "Aplicativo próprio",
                    "Analytics avançado",
                    "Marketplace premium",
                    "Prioridade máxima"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-spotify-green flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <a
                  href="https://wa.me/5592982054683"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 px-6 bg-gray-900 text-white font-semibold rounded-full text-center hover:bg-gray-800 transition-all duration-300"
                >
                  Começar Agora
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por Que a CONDERTECH */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-cabinet text-3xl md:text-5xl font-bold text-gray-900 mb-16 text-center">
              POR QUE A CONDERTECH
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Estrutura profissional", desc: "Sua empresa pronta para operar online." },
                { title: "Marketplace regional", desc: "Mais visibilidade para sua marca." },
                { title: "Checkout completo", desc: "PIX e cartão integrados." },
                { title: "Crescimento escalável", desc: "Comece simples e evolua conforme sua operação cresce." },
                { title: "Plataforma moderna", desc: "Tecnologia pensada para empresas reais." }
              ].map((item, idx) => (
                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Para Quem É */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-cabinet text-3xl md:text-5xl font-bold text-gray-900 mb-8">
              PARA QUEM É
            </h2>
            <p className="text-xl text-gray-700 mb-10">A CONDERTECH ECOMMERCE é ideal para:</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Marmitarias",
                "Lojas de roupas",
                "Cosméticos",
                "Conveniências",
                "Farmácias",
                "Restaurantes",
                "Autopeças",
                "Assistência técnica",
                "Empresas locais"
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                  <p className="text-gray-800 font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 bg-spotify-green rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-spotify-green rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-cabinet text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Sua empresa pronta para vender online dentro do maior ecossistema regional da cidade
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10">
              Comece agora sua operação digital com a CONDERTECH.
            </p>
            <a
              href="https://wa.me/5592982054683"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-5 bg-spotify-green text-white font-bold rounded-full text-lg hover:bg-spotify-green/90 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Falar com Especialista
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
        </div>
        <div className="flex-1 flex items-center justify-center">
          <img
            src="/image/02.png"
            alt="Dashboard do E-commerce Moderno"
            className="rounded-2xl shadow-lg w-full max-w-xs sm:max-w-full object-cover max-h-60 sm:max-h-96 cursor-zoom-in"
            onClick={() => setModalOpen(true)}
            title="Clique para ampliar"
          />
          <ImageModal
            src="/image/02.png"
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            alt="Dashboard do E-commerce Moderno"
          />
        </div>
      </div>
      <div className="w-full max-w-4xl mt-8 sm:mt-12 bg-white/70 rounded-2xl shadow p-4 sm:p-8">
        <h2 className="font-cabinet text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
          Depoimento de Cliente
        </h2>
        <blockquote className="italic text-gray-700 border-l-4 border-spotify-green pl-3 sm:pl-4">
          “A plataforma de E-commerce da ConderTech facilitou muito nossa gestão
          de vendas e produtos. O checkout é rápido e seguro!”
          <br />
          <span className="not-italic font-semibold text-gray-900">
            — Cliente Satisfeito
          </span>
        </blockquote>
      </div>
    </div>
  );
}
