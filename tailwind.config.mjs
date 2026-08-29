export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{astro,js,jsx,ts,tsx}",
    "./src/components/**/*.{astro,js,jsx,ts,tsx}",
    "./src/layouts/**/*.{astro,js,jsx,ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
    "./src/world/**/*.{ts,tsx}",
    "./src/stores/**/*.{ts,tsx}",
    "./src/hooks/**/*.{ts,tsx}",
    "./src/styles/**/*.{css,scss}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['"Geist Sans"', "system-ui", "sans-serif"],
        heading: ['"Geist Sans"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        "surface-far": "hsl(var(--surface-far))",
        "surface-mid": "hsl(var(--surface-mid))",
        "surface-near": "hsl(var(--surface-near))",
        "dark-surface": "hsl(var(--dark-surface))",
        "darker-surface": "hsl(var(--darker-surface))",
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-surface": "var(--gradient-surface)",
        "gradient-glow": "var(--gradient-glow)",
      },
      boxShadow: {
        elevated: "var(--shadow-elevated)",
        "depth-near": "var(--shadow-depth-near)",
        "depth-mid": "var(--shadow-depth-mid)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "node-pulse": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 7s ease-in-out infinite",
        "slide-up": "slide-up 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
        "fade-in": "fade-in 0.8s ease-out",
        "node-pulse": "node-pulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
