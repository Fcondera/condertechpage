"use client";

import { useState, type FormEvent } from "react";

interface LeadFormProps {
  antonClass: string;
}

export default function LeadForm({ antonClass }: LeadFormProps) {
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "" });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Erro ao enviar");

      setStatus("success");
      setForm({ name: "", email: "", whatsapp: "" });
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl bg-green-50 p-6 text-center">
        <p className="text-lg font-semibold text-green-800">
          Acesso liberado! 🎉
        </p>
        <p className="mt-2 text-sm text-green-700">
          Verifique seu e-mail ou clique no botão abaixo para baixar o guia.
        </p>
        <a
          href="/docs/guia-mvp.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={`${antonClass} mt-4 inline-block rounded-lg bg-[#FF0000] px-8 py-3 text-sm uppercase tracking-wide text-white transition-transform hover:scale-105`}
        >
          Baixar o Guia Agora
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Seu nome"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 focus:ring-1 focus:ring-neutral-300 sm:text-base"
      />
      <input
        type="email"
        placeholder="Seu melhor e-mail"
        required
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 focus:ring-1 focus:ring-neutral-300 sm:text-base"
      />
      <input
        type="tel"
        placeholder="WhatsApp (com DDD)"
        required
        value={form.whatsapp}
        onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
        className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-900 outline-none transition focus:border-neutral-400 focus:ring-1 focus:ring-neutral-300 sm:text-base"
      />

      {status === "error" && (
        <p className="text-center text-sm text-red-600">
          Ocorreu um erro. Tente novamente.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className={`${antonClass} w-full rounded-lg bg-[#FF0000] px-6 py-3.5 text-sm uppercase tracking-wide text-white transition-transform hover:scale-[1.03] active:scale-[0.98] disabled:opacity-60 sm:text-base`}
      >
        {status === "loading" ? "Enviando..." : "Quero acessar o guia agora"}
      </button>
    </form>
  );
}
