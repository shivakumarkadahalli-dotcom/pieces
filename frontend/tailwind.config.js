/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Manrope"', "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ['"Manrope"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        brand: {
          DEFAULT: "var(--brand-primary)",
          fg: "var(--brand-primary-foreground)",
          bg: "var(--brand-background)",
          ink: "var(--brand-foreground)",
          accent: "var(--brand-accent)",
          muted: "var(--brand-muted)",
          border: "var(--brand-border)",
        },
      },
      borderRadius: {
        xl: "14px",
        "2xl": "18px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
