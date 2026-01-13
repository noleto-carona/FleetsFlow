/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#0a192f", // Deep Navy Background
        foreground: "#ccd6f6", // Light Gray Text
        primary: {
          DEFAULT: "#64ffda", // Neon Cyan
          foreground: "#0a192f",
        },
        secondary: {
          DEFAULT: "#112240", // Lighter Navy (Cards/Sidebar)
          foreground: "#ccd6f6",
        },
        muted: {
          DEFAULT: "#233554", // Borders/Separators
          foreground: "#8892b0",
        },
        accent: {
          DEFAULT: "#64ffda",
          foreground: "#0a192f",
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        rockwell: ['"Rockwell Extra Bold"', 'Rockwell', 'serif'],
      },
    },
  },
  plugins: [],
}
