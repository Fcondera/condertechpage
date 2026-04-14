/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Habilita o modo escuro com a classe 'dark'
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        clash: ["Clash Display", "sans-serif"],
        switzer: ["Switzer", "sans-serif"],
        general: ["General Sans", "sans-serif"],
        satoshi: ["Satoshi", "sans-serif"],
        cabinet: ["Cabinet Grotesk", "sans-serif"],
      },
      colors: {
        "spotify-black": "#000000",
        "spotify-dark": "#FFFFFF",
        "spotify-green": "#000000",
        "spotify-light-green": "#1a1a1a",
        "spotify-gray": "#6b7280",
        "spotify-light-gray": "#4b5563",
        "spotify-white": "#FFFFFF",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient":
          "linear-gradient(135deg, #FFFFFF 0%, #f8f9fa 50%, #f1f3f4 100%)",
        "card-gradient":
          "linear-gradient(145deg, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0.04) 100%)",
        "glow-gradient": "linear-gradient(45deg, #000000, #1a1a1a)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(0, 0, 0, 0.3)",
        "glow-green": "0 0 20px rgba(0, 0, 0, 0.3)",
        "glow-intense": "0 0 30px rgba(220, 38, 38, 0.5)",
        "card-glow":
          "0 8px 32px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(220, 38, 38, 0.1)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite alternate",
        "gradient-shift": "gradient-shift 8s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%": { boxShadow: "0 0 20px rgba(220, 38, 38, 0.3)" },
          "100%": { boxShadow: "0 0 30px rgba(239, 68, 68, 0.5)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};
