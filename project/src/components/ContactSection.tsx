"use client";

import { useRouter } from "next/navigation";
import { useForm } from "@hooks/index";
import { useGsapReveal } from "@hooks/useGsapReveal";
import { formatWhatsAppMessage, isValidEmail } from "@utils/helpers";
import { CONTACT_PHONE } from "@constants/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { getLocalizedPath } from "@/utils/locale";

const ContactSection = () => {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const { values, errors, setErrors, handleChange, reset } = useForm({
    name: "",
    email: "",
    message: "",
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!isValidEmail(values.email)) {
      newErrors.email = t.contact.error_email;
    }
    if (!values.message.trim() || values.message.trim().length < 10) {
      newErrors.message = t.contact.error_message;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const text = formatWhatsAppMessage(values);
    window.open(`https://wa.me/${CONTACT_PHONE}?text=${text}`, "_blank");
    reset();
  };

  const titleRef = useGsapReveal<HTMLDivElement>();
  const contentRef = useGsapReveal<HTMLDivElement>({ delay: 0.15 });

  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-[#383E42] py-20 sm:py-28"
    >
      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px",
        }}
      />
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(255,255,255,0.05),transparent)]" />
      <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left column */}
          <div ref={titleRef}>
            <h2 className="mb-8 font-inter text-3xl font-medium leading-tight text-white sm:text-4xl lg:text-5xl">
              {t.contact.headline1}{" "}
              <span className="italic text-[#e22d2e]">{t.contact.accent}</span>
            </h2>
            <p className="mb-10 font-inter text-base font-light leading-relaxed text-white/60 sm:text-lg">
              {t.contact.body}
            </p>

            <button
              type="button"
              onClick={() => router.push(getLocalizedPath(lang, "/orcamento"))}
              className="inline-flex items-center gap-3 border border-white/20 rounded-full px-8 py-4 font-inter text-sm font-semibold uppercase tracking-widest text-white transition-colors duration-200 hover:border-[#e22d2e] hover:text-[#e22d2e]"
              aria-label="Simular orçamento online"
            >
              {t.contact.budget_cta}
            </button>
          </div>

          {/* Right column — form */}
          <div ref={contentRef}>
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block font-inter text-xs font-semibold uppercase tracking-widest text-white/60">
                    {t.contact.name_label}
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder={t.contact.name_placeholder}
                    value={values.name}
                    onChange={handleChange}
                    aria-invalid={!!errors.name}
                    className="w-full border border-white/20 bg-white/5 px-4 py-3 font-inter text-sm text-white placeholder-white/30 focus:border-[#e22d2e] focus:outline-none"
                    required
                  />
                  {errors.name && (
                    <p className="mt-1 font-inter text-xs text-[#e22d2e]">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-2 block font-inter text-xs font-semibold uppercase tracking-widest text-white/60">
                    {t.contact.email_label}
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder={t.contact.email_placeholder}
                    value={values.email}
                    onChange={handleChange}
                    aria-invalid={!!errors.email}
                    className="w-full border border-white/20 bg-white/5 px-4 py-3 font-inter text-sm text-white placeholder-white/30 focus:border-[#e22d2e] focus:outline-none"
                    required
                  />
                  {errors.email && (
                    <p className="mt-1 font-inter text-xs text-[#e22d2e]">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="mb-2 block font-inter text-xs font-semibold uppercase tracking-widest text-white/60">
                  {t.contact.message_label}
                </label>
                <textarea
                  name="message"
                  placeholder={t.contact.message_placeholder}
                  value={values.message}
                  onChange={handleChange}
                  rows={5}
                  aria-invalid={!!errors.message}
                  className="w-full border border-white/20 bg-white/5 px-4 py-3 font-inter text-sm text-white placeholder-white/30 focus:border-[#e22d2e] focus:outline-none resize-none"
                  required
                />
                {errors.message && (
                  <p className="mt-1 font-inter text-xs text-[#e22d2e]">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#e22d2e] py-4 rounded-full font-inter text-sm font-semibold uppercase tracking-widest text-white transition-colors duration-200 hover:bg-[#601311]"
                aria-label="Enviar mensagem de contato"
              >
                {t.contact.submit}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
