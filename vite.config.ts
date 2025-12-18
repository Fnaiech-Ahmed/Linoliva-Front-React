// vite.config.js
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode } ) => {
    // Charge les variables d'environnement basées sur le mode (development, production)
    // Le préfixe 'VITE_' est important pour que Vite les expose au frontend
    const env = loadEnv(mode, process.cwd(), 'VITE_');

    // Configuration du proxy
    const proxyConfig = {};
    if (mode === 'development' && env.VITE_BACKEND_URL) {
        proxyConfig['/api'] = {
            target: env.VITE_BACKEND_URL,
            changeOrigin: true,
            secure: false,
           // rewrite: (path) => path.replace(/^\/api/, ""),
        };
    }

    return {
        server: {
            host: "::",
            port: 8080,
            // Utilise la configuration du proxy conditionnelle
            proxy: proxyConfig,
        },
        plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
    }
});
