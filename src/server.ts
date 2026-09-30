import { app } from './app.js'
import { FRONTEND_ORIGIN, PORT } from './config.js'

app.listen(PORT, () => {
  console.log(`API de videojuegos escuchando en http://localhost:${PORT}`)
  console.log(`CORS permitido para: ${FRONTEND_ORIGIN}`)
})
