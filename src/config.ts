// Configuración leída de variables de entorno (ver .env.example).
export const PORT = Number(process.env.PORT) || 3000

export const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173'
