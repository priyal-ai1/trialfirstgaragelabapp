import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: { colors: { cream: "#fbf8f1", sage: "#dce8d9", forest: "#355c4a", peach: "#f5d8c8" } } },
  plugins: []
};
export default config;