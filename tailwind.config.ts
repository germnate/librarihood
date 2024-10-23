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
        background: "var(--background)",
        foreground: "var(--foreground)",
        libraryGray: "#4A4A4A",
        libraryOrange: "#FFA023",
        libraryBlue: "#23A0FF",
      },
      boxShadow: {
        dark: '0px 2px 5px 0px black',
        right: '0px 4px 5px 5px rgb(0 0 0 / 0.25)',
      }
    },
  },
  plugins: [],
};
export default config;
