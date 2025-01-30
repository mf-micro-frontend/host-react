import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      tailwindcss(),
      federation({
        name: "host",
        exposes: {
          "./GlobalContext": "./src/context/GlobalContext.jsx",
        },
        remotes: {
          bookList: `${env.VITE_BOOK_LIST_APP_URL}/assets/remoteEntry.js`,
          singleBook: `${env.VITE_SINGLE_BOOK_APP_URL}/assets/remoteEntry.js`,
          shared: `${env.VITE_SHARED_APP_URL}/assets/remoteEntry.js`,
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
    define: {
      // Inject environment variables into the app at build time
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  };
});
