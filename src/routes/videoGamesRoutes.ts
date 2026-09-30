import { Router } from 'express'
import { addGame, getAllGames } from '../data/videoGamesStore.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { validateNewVideoGame } from '../validation/videoGameValidation.js'

export const videoGamesRouter = Router()

// Todas las rutas de videojuegos requieren Authorization: Bearer <token>.
videoGamesRouter.use(authMiddleware)

videoGamesRouter.get('/', (_req, res) => {
  res.status(200).json(getAllGames())
})

videoGamesRouter.post('/', (req, res) => {
  const result = validateNewVideoGame(req.body)
  if (!result.ok) {
    res.status(400).json({ message: result.message })
    return
  }
  res.status(201).json(addGame(result.value))
})
