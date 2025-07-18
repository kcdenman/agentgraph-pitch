import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    middlewareMode: false,
    proxy: {},
    // Custom middleware to handle API endpoints
    configureServer(server) {
      server.middlewares.use('/api/chat', (req, res, next) => {
        if (req.method === 'POST') {
          res.setHeader('Content-Type', 'application/json')
          res.statusCode = 200
          res.end(JSON.stringify({ 
            answer: 'Placeholder response from AgentGraph AI. Real RAG endpoint coming soon! Ask me about our agent networking protocol, decentralized intelligence, or autonomous collaboration features.' 
          }))
        } else {
          next()
        }
      })
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'reveal': ['reveal.js'],
          'react': ['react', 'react-dom']
        }
      }
    }
  }
}) 