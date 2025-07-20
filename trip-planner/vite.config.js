import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    define: {
      // Explicitly define only the environment variables that should be exposed to the client
      'process.env': {
        VITE_APP_TITLE: JSON.stringify(env.VITE_APP_TITLE || ''),
        VITE_API_BASE_URL: JSON.stringify(env.VITE_API_BASE_URL || ''),
        // Add other environment variables that need to be exposed to the client
        // Always prefix them with VITE_ to ensure they're properly exposed
      }
    },
    server: {
      port: 3000,
      host: true,
      strictPort: true,
      open: true
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  }
})
