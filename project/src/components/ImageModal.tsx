import React from "react";

interface ImageModalProps {
  src: string;
  alt?: string;
  open: boolean;
  onClose: () => void;
}

export function ImageModal({ src, alt, open, onClose }: ImageModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-2">
      <div className="relative max-w-3xl w-full flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-900 rounded-full p-2 shadow-lg z-10"
          aria-label="Fechar"
        >
          <span className="text-2xl">×</span>
        </button>
        <img
          src={src}
          alt={alt}
          className="rounded-2xl shadow-lg max-h-[60vh] sm:max-h-[80vh] w-full object-contain bg-white"
        />
      </div>
    </div>
  );
}
