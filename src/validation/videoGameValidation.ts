import { MAX_RATING, MIN_RATING, type NewVideoGame } from '../types/videoGame.js'

type ValidationResult = { ok: true; value: NewVideoGame } | { ok: false; message: string }

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

// Devuelve el texto sin espacios extra, o null si no es un texto con contenido.
function readText(value: unknown): string | null {
  return typeof value === 'string' && value.trim() !== '' ? value.trim() : null
}

function requiredFieldError(field: string): ValidationResult {
  return { ok: false, message: `El campo "${field}" es obligatorio y no puede estar vacío` }
}

// Valida el cuerpo del POST y devuelve los datos limpios.
export function validateNewVideoGame(body: unknown): ValidationResult {
  if (!isRecord(body)) {
    return { ok: false, message: 'El cuerpo debe ser un objeto JSON' }
  }

  const name = readText(body.name)
  if (name === null) return requiredFieldError('name')

  const platform = readText(body.platform)
  if (platform === null) return requiredFieldError('platform')

  const genre = readText(body.genre)
  if (genre === null) return requiredFieldError('genre')

  const { rating } = body
  if (typeof rating !== 'number' || !Number.isInteger(rating) || rating < MIN_RATING || rating > MAX_RATING) {
    return {
      ok: false,
      message: `El campo "rating" debe ser un número entero entre ${MIN_RATING} y ${MAX_RATING}`,
    }
  }

  return { ok: true, value: { name, platform, genre, rating } }
}
