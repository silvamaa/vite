// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // List your html files here, e.g:
        index: resolve(__dirname, "index.html"),
        tracking: resolve(__dirname, "tracking.html"),
        users: resolve(__dirname, "users.html"),
        about: resolve(__dirname, "about-us.html"),
      },
    },
  },
  // Public base path could be set here too:
  // base: '/~username/my-app/',
});
