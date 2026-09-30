# Dashboard de Videojuegos — Backend

API REST de la práctica escolar. Ofrece el listado de videojuegos y permite
agregar nuevos. Es un proyecto independiente del frontend
(`dashboard-videojuegos-frontend`).

## Tecnologías

- Node.js (22.9 o superior)
- Express 5
- TypeScript
- cors

Los datos se guardan **en memoria**: se pierden al reiniciar el servidor. No hay
base de datos.

## Instalación y ejecución

```bash
npm install
npm run dev      # desarrollo con recarga automática (tsx)
npm run build    # compila TypeScript a dist/
npm start        # ejecuta la versión compilada
```

Por defecto la API escucha en `http://localhost:3000`.

## Variables de entorno

Copia `.env.example` como `.env` si necesitas cambiar los valores. Es opcional.

| Variable          | Valor por defecto       | Descripción                    |
| ----------------- | ----------------------- | ------------------------------ |
| `PORT`            | `3000`                  | Puerto de la API               |
| `FRONTEND_ORIGIN` | `http://localhost:5173` | Origen permitido por CORS      |

## Endpoints

| Método | Ruta          | Autenticación                   | Descripción                  |
| ------ | ------------- | ------------------------------- | ---------------------------- |
| GET    | `/api/health` | No                              | Comprueba que la API responde |
| GET    | `/api/games`  | `Authorization: Bearer <token>` | Lista los videojuegos        |
| POST   | `/api/games`  | `Authorization: Bearer <token>` | Agrega un videojuego         |

### POST /api/games

Cuerpo JSON:

```json
{ "name": "Hades", "platform": "PC", "genre": "Roguelike", "rating": 9 }
```

- `name`, `platform` y `genre`: texto obligatorio, no vacío.
- `rating`: número entero entre 1 y 10.

Respuestas: `201` con el videojuego creado (incluye `id`), `400` si los datos
no son válidos, `401` si falta el Bearer Token.

### Errores

Todos los errores responden JSON con un `message`, por ejemplo:

```json
{ "message": "Bearer Token requerido" }
```

## Autenticación

Por requisito de la práctica, el backend **solo comprueba que exista** el header
`Authorization: Bearer <token>`. **No** decodifica el JWT, **no** valida su firma
ni su expiración, y no consulta LDAP.

Para la demostración, cada request protegido imprime en consola:

```
[GET /api/games] Bearer Token recibido: <token>
```
