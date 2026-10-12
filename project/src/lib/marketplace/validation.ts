export const digits = (value: string) => value.replace(/\D/g, "");
export const states = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

export function validCpf(value: string) {
  const cpf = digits(value);
  if (!/^\d{11}$/.test(cpf) || /^(\d)\1{10}$/.test(cpf)) return false;
  for (const length of [9, 10]) {
    const sum = [...cpf.slice(0, length)].reduce((total, digit, index) => total + Number(digit) * (length + 1 - index), 0);
    const digit = (sum * 10) % 11 % 10;
    if (digit !== Number(cpf[length])) return false;
  }
  return true;
}

export function validPhone(value: string) { return /^[1-9]{2}9\d{8}$/.test(digits(value)); }
export function validCep(value: string) { return /^\d{8}$/.test(digits(value)) && !/^(\d)\1{7}$/.test(digits(value)); }
export function safeNext(value: unknown) {
  return typeof value === "string" && ["/marketplace/conta", "/marketplace/carrinho", "/marketplace/vender", "/marketplace/admin"].includes(value) ? value : "/marketplace/conta";
}

export type PrivateProfile = {
  name: string; phone: string; cpf: string; cep: string; street: string; number: string;
  complement: string; neighborhood: string; city: string; state: string; company: string;
  terms_accepted_at: string; phone_verified_at: string | null;
};

export function validateProfile(body: unknown, current: PrivateProfile | null): { profile: Omit<PrivateProfile, "terms_accepted_at" | "phone_verified_at"> } | { error: string } {
  if (!body || typeof body !== "object") return { error: "Dados inválidos." };
  const input = body as Record<string, unknown>;
  const limits = { name: 100, phone: 20, cpf: 14, cep: 9, street: 160, number: 20, complement: 100, neighborhood: 100, city: 100, state: 2, company: 160 };
  const clean: Record<string, string> = {};
  for (const [key, max] of Object.entries(limits)) {
    const value = input[key] ?? "";
    if (typeof value !== "string" || value.length > max) return { error: "Revise os campos do cadastro." };
    clean[key] = value.trim();
  }
  clean.cpf = digits(clean.cpf || current?.cpf || ""); clean.phone = digits(clean.phone); clean.cep = digits(clean.cep); clean.state = clean.state.toUpperCase();
  if (!validCpf(clean.cpf)) return { error: "Informe um CPF válido." };
  if (!validPhone(clean.phone)) return { error: "Informe um celular com DDD e 11 dígitos." };
  if (!validCep(clean.cep)) return { error: "Informe um CEP com 8 dígitos." };
  if (clean.name.split(/\s+/).length < 2 || clean.name.length < 5) return { error: "Informe seu nome completo." };
  if (!states.includes(clean.state) || ["street", "neighborhood", "city"].some(key => clean[key].length < 2) || !clean.number) return { error: "Complete o endereço, incluindo número e UF." };
  if (!current?.terms_accepted_at && input.acceptTerms !== true) return { error: "Aceite os termos para concluir seu cadastro." };
  return { profile: clean as Omit<PrivateProfile, "terms_accepted_at" | "phone_verified_at"> };
}
