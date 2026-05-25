/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
        // mantidas para compatibilidade com outros arquivos do projeto
        clash: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
        switzer: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
        cabinet: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
        general: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
        satoshi: ["Inter", "Helvetica Neue", "Arial", "sans-serif"],
      },
      colors: {
        "brand-black": "#090909",
        "brand-gray": "#252525",
        "brand-red": "#e22d2e",
        "brand-dark-red": "#601311",
        "brand-white": "#ffffff",
        "brand-off": "#fafafa",
        "brand-border": "#e5e5e5",
        // aliases mantidos para não quebrar outras páginas
        "spotify-black": "#090909",
        "spotify-dark": "#252525",
        "spotify-green": "#e22d2e",
        "spotify-light-green": "#601311",
        "spotify-gray": "#252525",
        "spotify-light-gray": "#4b4b4b",
        "spotify-white": "#FFFFFF",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #FFFFFF 0%, #fafafa 100%)",
      },
    },
  },
  plugins: [],
};
