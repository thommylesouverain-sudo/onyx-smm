import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "onyx-black": "var(--onyx-black)",
        "onyx-core": "var(--onyx-core)",
        "onyx-charcoal": "var(--onyx-charcoal)",
        "onyx-obsidian": "var(--onyx-obsidian)",

        "glass-ultra": "var(--glass-ultra)",
        "glass-light": "var(--glass-light)",
        "glass-medium": "var(--glass-medium)",
        "glass-strong": "var(--glass-strong)",

        "silver-chrome": "var(--silver-chrome)",
        "ghost-white": "var(--ghost-white)",
        "ash-platinum": "var(--ash-platinum)",
        "stone-gray": "var(--stone-gray)",

        "accent-gold": "var(--accent-gold)",
        "accent-ice": "var(--accent-ice)",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px", // No rounded corners above 16px
        "3xl": "16px",
      },
    },
  },
  plugins: [],
};
export default config;