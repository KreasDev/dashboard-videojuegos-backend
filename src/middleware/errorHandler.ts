import type { NextFunction, Request, Response } from 'express'

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({ message: 'Ruta no encontrada' })
}

// Express reconoce un manejador de errores por sus 4 parámetros.
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  // express.json() lanza SyntaxError con status 400 cuando el cuerpo no es JSON válido.
  if (err instanceof SyntaxError && 'status' in err && err.status === 400) {
    res.status(400).json({ message: 'El cuerpo de la petición no es JSON válido' })
    return
  }

  console.error(err)
  res.status(500).json({ message: 'Error interno del servidor' })
}
