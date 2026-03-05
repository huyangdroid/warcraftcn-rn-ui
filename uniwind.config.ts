import { defineConfig } from "uniwind";

export default defineConfig({
  content: ["./app/**/*.{tsx,ts}", "./src/**/*.{tsx,ts}"],
  theme: {
    extend: {
      colors: {
        wcBackground: "#050609",
        wcPanel: "#11151d",
        wcBorder: "#d4a651",
        wcBorderDark: "#7e5b24",
        wcAccent: "#f9e3a0",
        wcText: "#f8f5e9",
        wcTextMuted: "#a9a6a0"
      },
      fontFamily: {
        wc: ["System"]
      }
    }
  }
});
