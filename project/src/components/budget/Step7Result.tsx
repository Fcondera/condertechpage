/**
 * Tela final: Resultado do orçamento
 */

import { useState } from "react";
import { BudgetResult, BudgetFormData } from "../../types/budget";
import {
  formatCurrency,
  formatBudgetWhatsApp,
} from "../../utils/budgetCalculator";
import { CONTACT_PHONE } from "../../constants/navigation";

interface Step7ResultProps {
  result: BudgetResult;
  onReset: () => void;
  onUpdateFormData: (updates: Partial<BudgetFormData>) => void;
}

export function Step7Result({
  result,
  onReset,
  onUpdateFormData,
}: Step7ResultProps) {
  const [clientName, setClientName] = useState(result.formData.clientName);
  const [clientType, setClientType] = useState<"pf" | "pj">(
    result.formData.clientType,
  );
  const [error, setError] = useState("");

  const handleSendWhatsApp = () => {
    if (!clientName.trim()) {
      setError("Por favor, informe seu nome ou o nome da empresa.");
      return;
    }
    setError("");

    // Atualiza o formData com os dados do cliente antes de montar a mensagem
    const updatedResult: BudgetResult = {
      ...result,
      formData: {
        ...result.formData,
        clientName: clientName.trim(),
        clientType,
      },
    };

    const message = formatBudgetWhatsApp(updatedResult);
    window.open(`https://wa.me/${CONTACT_PHONE}?text=${message}`, "_blank");
  };

  const paymentLink = "#pagamento";

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6 animate-fade-in">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Seu orçamento está pronto!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
          Confira os detalhes e escolha como prosseguir
        </p>
      </div>

      {/* Estratégia de desconto para primeira vez */}
      {(() => {
        // Para lógica real, troque para sua verificação de primeira compra
        const isFirstTime = true;
        const originalPrice = result.minPrice;
        const discountPrice = Math.round(originalPrice * 0.5);
        if (isFirstTime) {
          return (
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl p-5 sm:p-8 mb-6 text-white shadow-2xl border-4 border-yellow-500 animate-fadeIn">
              <div className="text-center">
                <div className="mb-2">
                  <span className="inline-block bg-white text-yellow-700 font-bold px-4 py-1 rounded-full text-sm shadow-lg border border-yellow-400">
                    Oferta exclusiva para primeira contratação: 50% de desconto
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-4 opacity-90">
                  Feche agora por apenas
                </h3>
                <div className="flex flex-col items-center justify-center gap-2 mb-2">
                  <div className="text-base sm:text-lg opacity-80 line-through">
                    De {formatCurrency(originalPrice)}
                  </div>
                  <div className="text-3xl sm:text-5xl font-extrabold text-white drop-shadow-lg">
                    {formatCurrency(discountPrice)}
                  </div>
                </div>
                <div className="text-xs sm:text-sm opacity-90 mt-2">
                  Valor fixo para fechar agora. Aproveite!
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-5 sm:p-8 mb-6 text-white shadow-2xl">
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-medium mb-4 opacity-90">
                  Investimento estimado
                </h3>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-2">
                  <div>
                    <div className="text-sm sm:text-lg opacity-75">
                      A partir de
                    </div>
                    <div className="text-2xl sm:text-4xl font-bold">
                      {formatCurrency(result.minPrice)}
                    </div>
                  </div>
                  <div className="text-xl sm:text-3xl opacity-50 rotate-90 sm:rotate-0">
                    →
                  </div>
                  <div>
                    <div className="text-sm sm:text-lg opacity-75">Até</div>
                    <div className="text-2xl sm:text-4xl font-bold">
                      {formatCurrency(result.maxPrice)}
                    </div>
                  </div>
                </div>
                <div className="text-xs sm:text-sm opacity-75 mt-4">
                  Prazo estimado:{" "}
                  <strong>{result.estimatedDays} dias úteis</strong>
                </div>
              </div>
            </div>
          );
        }
      })()}
      {/* )} */}

      {/* Incluso no projeto */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 mb-6 border-2 border-gray-200 dark:border-gray-700">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
          O que está incluso
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {result.includedItems.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg"
            >
              <span className="text-green-500 flex-shrink-0 mt-1">—</span>
              <span className="text-gray-700 dark:text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Formulário de identificação */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 mb-6 border-2 border-gray-200 dark:border-gray-700">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">
          Para enviar o orçamento, informe:
        </h3>

        {/* Tipo de cliente */}
        <div className="flex gap-3 mb-4">
          <button
            type="button"
            onClick={() => setClientType("pf")}
            className={`flex-1 py-2.5 rounded-xl border-2 font-semibold text-sm transition-all ${
              clientType === "pf"
                ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                : "border-gray-200 text-gray-500 hover:border-gray-300 dark:border-gray-600"
            }`}
          >
            Pessoa Física
          </button>
          <button
            type="button"
            onClick={() => setClientType("pj")}
            className={`flex-1 py-2.5 rounded-xl border-2 font-semibold text-sm transition-all ${
              clientType === "pj"
                ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                : "border-gray-200 text-gray-500 hover:border-gray-300 dark:border-gray-600"
            }`}
          >
            Pessoa Jurídica
          </button>
        </div>

        {/* Campo de nome */}
        <input
          type="text"
          value={clientName}
          onChange={(e) => {
            setClientName(e.target.value);
            if (e.target.value.trim()) setError("");
            onUpdateFormData({ clientName: e.target.value, clientType });
          }}
          placeholder={
            clientType === "pj" ? "Nome da empresa" : "Seu nome completo"
          }
          className={`w-full px-4 py-3 rounded-xl border-2 text-gray-900 dark:text-white bg-white dark:bg-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${
            error ? "border-red-400" : "border-gray-200 dark:border-gray-600"
          }`}
        />
        {error && <p className="text-red-500 text-sm mt-1.5">{error}</p>}
      </div>

      {/* Botões de ação */}
      <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
        <a
          href={paymentLink}
          className="flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl text-center text-sm sm:text-base"
        >
          Fechar Agora
        </a>

        <button
          onClick={handleSendWhatsApp}
          className="flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl text-sm sm:text-base"
        >
          Solicitar pelo WhatsApp
        </button>
      </div>

      {/* Botão voltar ao início */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 underline transition-colors"
        >
          ← Fazer novo orçamento
        </button>
      </div>
    </div>
  );
}
