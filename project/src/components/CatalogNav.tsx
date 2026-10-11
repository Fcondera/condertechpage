import Link from "next/link";

export default function CatalogNav({ active }: { active: "systems" | "equipment" }) {
  return (
    <nav aria-label="Catálogo" className="mb-10 flex gap-6 border-b border-gray-200 text-sm">
      {[
        { id: "systems", href: "/produtos", label: "Sistemas" },
        { id: "equipment", href: "/marketplace", label: "Equipamentos" },
      ].map(item => (
        <Link key={item.id} href={item.href} aria-current={active === item.id ? "page" : undefined}
          className={`border-b-2 px-1 pb-4 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-600 ${active === item.id ? "border-[#e22d2e] font-medium text-gray-950" : "border-transparent text-gray-500 hover:text-gray-950"}`}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
