import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import { loadEnv } from 'vite';

// Aseguramos que Vite cargue el .env correctamente para el scope de config
const env = loadEnv(process.env.NODE_ENV || "production", process.cwd(), "");

export default defineConfig({
  site: env.PUBLIC_SITE_URL || 'http://localhost:4321',
  integrations: [tailwind(), react(), sitemap()],
  // Static HTML — this portfolio has no APIs/SSR needs. Server mode made every
  // request a Vercel function and produced FUNCTION_INVOCATION_FAILED on deploy.
  output: 'static',
  adapter: vercel(),
});