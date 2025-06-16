import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [react(), tailwindcss(),
  VitePWA({
    registerType: 'autoUpdate',
    devOptions: {
      enabled: true, 
    },
    includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
    manifest: {
      name: 'मार्गदर्शक',
      short_name: 'मार्गदर्शक',
      description: 'Free and Open Source Learning Platform',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      start_url: '/',
      icons: [
        {
          src: 'मार्गदर्शक.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'मार्गदर्शक.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  })
  ],
});
