import { Send, Mail, MessageCircle, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "@hooks/index";
import { useGsapReveal } from "@hooks/useGsapReveal";
import { formatWhatsAppMessage, isValidEmail } from "@utils/helpers";
import { CONTACT_PHONE } from "@constants/navigation";

const ContactSection = () => {
  const router = useRouter();
  const { values, errors, setErrors, handleChange, reset } = useForm({
    name: "",
    email: "",
    message: "",
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!isValidEmail(values.email)) {
      newErrors.email = "E-mail inválido";
    }
    if (!values.message.trim() || values.message.trim().length < 10) {
      newErrors.message = "Mensagem deve ter no mínimo 10 caracteres";
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
    <section id="contato" className="py-12 sm:py-20 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6">
        <div ref={titleRef} className="text-center mb-8 sm:mb-16">
          <h2 className="font-cabinet text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Vamos começar seu{" "}
            <span className="text-spotify-green">projeto?</span>
          </h2>
        </div>

        <div ref={contentRef} className="w-full max-w-2xl mx-auto px-2 sm:px-4">
          <form
            onSubmit={handleSubmit}
            className="space-y-3 sm:space-y-6"
            noValidate
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  name="name"
                  placeholder="Seu nome"
                  value={values.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={`w-full pl-12 pr-4 py-2 sm:py-4 bg-white border rounded-lg sm:rounded-xl text-xs sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors shadow-sm ${
                    errors.name
                      ? "border-black focus:ring-black/20"
                      : "border-gray-200 focus:border-black focus:ring-black/20"
                  }`}
                  required
                />
                {errors.name && (
                  <p id="name-error" className="text-black text-xs mt-1">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="Seu e-mail"
                  value={values.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={`w-full pl-12 pr-4 py-2 sm:py-4 bg-white border rounded-lg sm:rounded-xl text-xs sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors shadow-sm ${
                    errors.email
                      ? "border-black focus:ring-black/20"
                      : "border-gray-200 focus:border-black focus:ring-black/20"
                  }`}
                  required
                />
                {errors.email && (
                  <p id="email-error" className="text-black text-xs mt-1">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="relative">
              <MessageCircle className="absolute left-4 top-3 sm:top-6 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <textarea
                name="message"
                placeholder="Descreva seu projeto..."
                value={values.message}
                onChange={handleChange}
                rows={5}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={`w-full pl-12 pr-4 py-2 sm:py-4 bg-white border rounded-lg sm:rounded-xl text-xs sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors resize-none shadow-sm ${
                  errors.message
                    ? "border-black focus:ring-black/20"
                    : "border-gray-200 focus:border-black focus:ring-black/20"
                }`}
                required
              />
              {errors.message && (
                <p id="message-error" className="text-black text-xs mt-1">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 sm:py-4 bg-spotify-green text-white font-semibold text-xs sm:text-base rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl hover:bg-spotify-light-green transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group"
              aria-label="Enviar mensagem de contato"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              Enviar Mensagem
            </button>

            {/* Divisor */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">ou</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Botão simulador */}
            <button
              type="button"
              onClick={() => router.push("/orcamento")}
              className="w-full py-2 sm:py-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 border-2 border-gray-400 text-gray-900 font-bold text-xs sm:text-base rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group animate-fadeIn animate-pulse relative overflow-hidden"
              aria-label="Simular orçamento online"
              style={{ animationDuration: "1.1s" }}
            >
              {/* Overlay dourado animado no hover */}
              <span className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 group-hover:animate-gold-fade transition-all duration-500" />
              <svg
                className="w-5 h-5 mr-1 text-gray-700 group-hover:text-yellow-700 group-hover:translate-x-1 transition-transform z-10"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="relative z-10">Simular Orçamento</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
