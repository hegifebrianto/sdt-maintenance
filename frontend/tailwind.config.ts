import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "sdt-background": "#F8F8FF",
        "sdt-primary": "#36A388",
        "sdt-text-black": "#404040",
        "sdt-text-gray": "#A1AFC3",
        "sdt-text-strong-black":"#0a0a0a"
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        mini: ["9px", { lineHeight: "10.89px", letterSpacing: "0.14px" }],
      },
    },
  },
  plugins: [],
} satisfies Config;
