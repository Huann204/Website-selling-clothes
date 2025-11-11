import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),

      // Shared
      // eslint-disable-next-line no-undef
      "@shared": path.resolve(__dirname, "./src/shared"),

      // Features
      // eslint-disable-next-line no-undef
      "@features": path.resolve(__dirname, "./src/features"),
      // eslint-disable-next-line no-undef
      "@auth": path.resolve(__dirname, "./src/features/auth"),
      // eslint-disable-next-line no-undef
      "@cart": path.resolve(__dirname, "./src/features/cart"),
      // eslint-disable-next-line no-undef
      "@products": path.resolve(__dirname, "./src/features/products"),
      // eslint-disable-next-line no-undef
      "@checkout": path.resolve(__dirname, "./src/features/checkout"),
      // eslint-disable-next-line no-undef
      "@home": path.resolve(__dirname, "./src/features/home"),
      // eslint-disable-next-line no-undef
      "@chatbot": path.resolve(__dirname, "./src/features/chatbot"),
      // eslint-disable-next-line no-undef
      "@tracking": path.resolve(__dirname, "./src/features/tracking"),
      // eslint-disable-next-line no-undef
      "@admin": path.resolve(__dirname, "./src/admin"),

      // Layouts
      // eslint-disable-next-line no-undef
      "@layouts": path.resolve(__dirname, "./src/layouts"),

      // Other
      // eslint-disable-next-line no-undef
      "@routes": path.resolve(__dirname, "./src/routes"),
      // eslint-disable-next-line no-undef
      "@assets": path.resolve(__dirname, "./src/assets"),
      // eslint-disable-next-line no-undef
      "@config": path.resolve(__dirname, "./src/config"),
    },
  },
});
