import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import { INSTAGRAM_URL, COMPANY_NAME } from "@constants/navigation";

const CONTACT_INFO = {
  email: "condertech@gmail.com",
  phone: "+55 (47) 9273-9983",
  location: "Blumenau, SC",
};

const FOOTER_LINKS = [
  { title: "Serviços", href: "/#servicos" },
  { title: "Portfólio", href: "/#portfolio" },
  { title: "Sobre", href: "/sobre" },
];

const Footer = () => (
  <footer className="bg-white border-t border-gray-200">
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-8 py-8 sm:py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
        <div className="col-span-1 sm:col-span-2 md:col-span-2">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <img
              src="/image/logo02.png"
              alt={COMPANY_NAME}
              className="h-10 sm:h-12 md:h-16"
            />
          </div>
          <p className="text-xs sm:text-base text-gray-600 leading-relaxed max-w-md">
            Transformamos ideias em experiências digitais excepcionais.
            Especializados em desenvolvimento web moderno e soluções inovadoras.
          </p>
          {/* Removido ícone duplicado do Instagram, mantendo apenas na área de contato */}
        </div>

        <div>
          <h4 className="text-sm sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-6">
            Contato
          </h4>
          <div className="space-y-2 sm:space-y-4">
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="flex items-center gap-2 sm:gap-3 text-xs sm:text-base text-gray-700 hover:text-spotify-green transition-colors"
              aria-label={`Enviar e-mail para ${CONTACT_INFO.email}`}
            >
              <Mail
                className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                style={{ filter: "brightness(1.5) grayscale(1)" }}
              />
              <span>{CONTACT_INFO.email}</span>
            </a>
            <a
              href={`tel:${CONTACT_INFO.phone.replace(/\D/g, "")}`}
              className="flex items-center gap-3 text-sm sm:text-base text-gray-700 hover:text-spotify-green transition-colors"
              aria-label={`Ligar para ${CONTACT_INFO.phone}`}
            >
              <Phone
                className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                style={{ filter: "brightness(1.5) grayscale(1)" }}
              />
              <span>{CONTACT_INFO.phone}</span>
            </a>
            <div className="flex items-center gap-3 text-sm sm:text-base text-gray-700">
              <MapPin
                className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                style={{ filter: "brightness(1.5) grayscale(1)" }}
              />
              <span>{CONTACT_INFO.location}</span>
            </div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm sm:text-base text-gray-700 hover:text-spotify-green transition-colors"
              aria-label="Seguir ConderTech no Instagram"
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Instagram</span>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-6">
            Links
          </h4>
          <div className="space-y-1 sm:space-y-3">
            {FOOTER_LINKS.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="block text-xs sm:text-base text-gray-600 hover:text-spotify-green transition-colors"
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center">
        <p className="text-xs sm:text-sm text-gray-600">
          © 2020 {COMPANY_NAME}. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
