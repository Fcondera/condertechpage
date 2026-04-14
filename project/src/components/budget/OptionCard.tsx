/**
 * Componente de card de opção clicável
 */

import { ReactNode } from "react";

interface OptionCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  selected?: boolean;
  onClick: () => void;
}

export function OptionCard({
  title,
  description,
  icon,
  selected = false,
  onClick,
}: OptionCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full p-4 sm:p-6 rounded-xl border-2 transition-all duration-200 text-left
        ${
          selected
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400 shadow-lg scale-105"
            : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md"
        }
      `}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {icon && (
          <div
            className={`
            text-2xl sm:text-3xl flex-shrink-0
            ${selected ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}
          `}
          >
            {icon}
          </div>
        )}

        <div className="flex-1">
          <h3
            className={`
            text-base sm:text-lg font-semibold mb-1
            ${selected ? "text-blue-700 dark:text-blue-300" : "text-gray-800 dark:text-gray-200"}
          `}
          >
            {title}
          </h3>

          {description && (
            <p
              className={`
              text-sm
              ${selected ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"}
            `}
            >
              {description}
            </p>
          )}
        </div>

        {/* Indicador de seleção */}
        <div
          className={`
          w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
          ${
            selected
              ? "border-blue-500 bg-blue-500"
              : "border-gray-300 dark:border-gray-600"
          }
        `}
        >
          {selected && (
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
}
