import cors from 'cors'
import express from 'express'
import { FRONTEND_ORIGIN } from './config.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'
import { videoGamesRouter } from './routes/videoGamesRoutes.js'

export const app = express()

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
)
app.use(express.json())

// Ruta pública para comprobar que la API está activa.
app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use('/api/games', videoGamesRouter)

app.use(notFoundHandler)
app.use(errorHandler)
