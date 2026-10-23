import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const repositoryName = fileURLToPath(new URL('.', import.meta.url))
  .split('/')
  .filter(Boolean)
  .pop()
const base = process.env.GITHUB_ACTIONS ? `/${repositoryName}/` : '/'

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
})
