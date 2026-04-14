/**
 * Formata texto para WhatsApp
 */
export const formatWhatsAppMessage = (data: {
  name: string;
  email: string;
  message: string;
}): string => {
  return encodeURIComponent(
    `Olá!\nNome: ${data.name}\nE-mail: ${data.email}\nMensagem: ${data.message}`
  );
};

/**
 * Valida email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
