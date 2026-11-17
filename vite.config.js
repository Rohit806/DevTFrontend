import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: Object.fromEntries(
      ["/signup", "/login", "/logout", "/profile", "/user", "/request"].map((path) => [path, {
        target: "http://localhost:3000",
        changeOrigin: true,
        cookieDomainRewrite: "",
        cookiePathRewrite: "/",
      }]),
    ),
  },
});
