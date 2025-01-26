import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "host",
      exposes: {
        "./GlobalContext": "./src/context/GlobalContext.jsx",
      },
      remotes: {
        bookList: "http://localhost:5002/assets/remoteEntry.js",
        singleBook: "http://localhost:5003/assets/remoteEntry.js",
      },
      filename: "remoteEntry.js",
      shared: ["react", "react-dom", "tailwindcss"],
    }),
  ],
  build: {
    target: "esnext",
  },
  server: {
    port: 5001,
    cors: true,
  },
});
