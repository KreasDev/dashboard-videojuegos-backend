import type { NextFunction, Request, Response } from 'express'

const BEARER_SCHEME = 'Bearer'

// Por requisito de la práctica solo se comprueba que exista un Bearer Token.
// No se decodifica el JWT ni se verifica su firma o expiración.
export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization

  if (!header) {
    res.status(401).json({ message: 'Bearer Token requerido' })
    return
  }

  // Node recorta los espacios finales del header, así que "Bearer " llega como "Bearer".
  const [scheme, ...rest] = header.trim().split(/\s+/)
  if (scheme !== BEARER_SCHEME) {
    res.status(401).json({ message: 'Formato inválido. Use: Authorization: Bearer <token>' })
    return
  }

  const token = rest.join(' ')
  if (!token) {
    res.status(401).json({ message: 'Bearer Token vacío' })
    return
  }

  // Log para la demostración: evidencia que el JWT llegó al backend.
  console.log(`[${req.method} ${req.originalUrl}] Bearer Token recibido: ${token}`)
  next()
}
