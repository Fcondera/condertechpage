"use client";

import React, { useState } from "react";
import { ImageModal } from "../components/ImageModal";

export default function PlataformaEnsinoPage() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0e7ef] via-[#f3f6fa] to-[#cfd8e6] py-8 sm:py-12 px-2 sm:px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white/80 rounded-3xl shadow-2xl p-4 sm:p-8 md:p-12 flex flex-col md:flex-row gap-6 md:gap-8">
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="font-cabinet text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Plataforma de Ensino Empresarial
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6">
            Solução completa para treinamentos corporativos, acompanhamento de
            progresso e gestão de conteúdos educacionais para empresas.
          </p>
          <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
            <li className="flex items-center gap-3">
              <span className="w-5 h-5 sm:w-6 sm:h-6 bg-spotify-green rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-base">
                ✓
              </span>
              Trilhas de aprendizagem personalizadas
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 bg-spotify-green rounded-full flex items-center justify-center text-white font-bold">
                ✓
              </span>
              Relatórios de desempenho dos colaboradores
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 bg-spotify-green rounded-full flex items-center justify-center text-white font-bold">
                ✓
              </span>
              Certificados automáticos
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 bg-spotify-green rounded-full flex items-center justify-center text-white font-bold">
                ✓
              </span>
              Integração com vídeos, quizzes e materiais
            </li>
          </ul>
          <a
            href="#contato"
            className="inline-block w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 rounded-full bg-spotify-green text-white font-semibold shadow-lg hover:bg-spotify-green/90 transition-all duration-200 text-center"
          >
            Solicitar Demonstração
          </a>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <img
            src="/image/04.png"
            alt="Plataforma de Ensino Empresarial"
            className="rounded-2xl shadow-lg w-full max-w-xs sm:max-w-full object-cover max-h-60 sm:max-h-96 cursor-zoom-in"
            onClick={() => setModalOpen(true)}
            title="Clique para ampliar"
          />
          <ImageModal
            src="/image/04.png"
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            alt="Plataforma de Ensino Empresarial"
          />
        </div>
      </div>
      <div className="w-full max-w-4xl mt-8 sm:mt-12 bg-white/70 rounded-2xl shadow p-4 sm:p-8">
        <h2 className="font-cabinet text-xl sm:text-2xl font-semibold text-gray-900 mb-4">
          Depoimento de Cliente
        </h2>
        <blockquote className="italic text-gray-700 border-l-4 border-spotify-green pl-3 sm:pl-4">
          “A plataforma de ensino empresarial da ConderTech facilitou o
          treinamento e o desenvolvimento dos nossos colaboradores!”
          <br />
          <span className="not-italic font-semibold text-gray-900">
            — Cliente Satisfeito
          </span>
        </blockquote>
      </div>
    </div>
  );
}
