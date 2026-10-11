import Image from "next/image";

const descriptions: Record<string, string> = {
  "nori-sistemas": "Notebook com painel ilustrativo de gestão comercial em uma loja",
  "sistema-de-ponto": "Sistema de acompanhamento de jornadas em um notebook",
  "sistema-de-agendamento": "Tablet com calendário ilustrativo de agendamentos",
  pdv: "Terminal de ponto de venda com impressora de recibos",
  "relogio-de-ponto": "Relógio de ponto com teclado e leitor biométrico",
  "cartao-nfc": "Cartões de aproximação NFC em branco, grafite e vermelho",
};

export default function ProductCardImage({ id }: { id: string }) {
  return (
    <div className="relative aspect-[3/2] overflow-hidden bg-[#f3f3f1]">
      <Image src={`/image/products/${id}.png`} alt={descriptions[id] || "Imagem ilustrativa do produto"}
        fill sizes="(max-width: 767px) 100vw, (max-width: 1152px) 33vw, 360px"
        className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.04]" />
    </div>
  );
}
