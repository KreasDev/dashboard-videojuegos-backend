import { randomUUID } from 'node:crypto'
import type { NewVideoGame, VideoGame } from '../types/videoGame.js'

// Almacenamiento temporal en memoria: los datos se pierden al reiniciar el proceso.
const games: VideoGame[] = [
  {
    id: randomUUID(),
    name: 'The Legend of Zelda: Breath of the Wild',
    platform: 'Nintendo Switch',
    genre: 'Aventura',
    rating: 10,
  },
  { id: randomUUID(), name: 'Minecraft', platform: 'Multiplataforma', genre: 'Sandbox', rating: 9 },
  { id: randomUUID(), name: 'Grand Theft Auto V', platform: 'PlayStation 5', genre: 'Acción', rating: 9 },
]

export function getAllGames(): VideoGame[] {
  return [...games]
}

export function addGame(newGame: NewVideoGame): VideoGame {
  const game: VideoGame = { id: randomUUID(), ...newGame }
  games.push(game)
  return game
}
