# Multi-stage build: compile TypeScript, then run the compiled JavaScript.

# --- Build stage ---
FROM node:22-alpine AS build
WORKDIR /app
# Install all dependencies (incl. devDeps needed for `tsc`).
COPY package*.json ./
RUN npm ci
# Copy source and compile to /app/dist.
COPY . .
RUN npm run build

# --- Production stage ---
FROM node:22-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
# Install only runtime dependencies (cors, express).
COPY package*.json ./
RUN npm ci --omit=dev
# Copy the compiled output only (no TypeScript sources, no dev tooling).
COPY --from=build /app/dist ./dist
EXPOSE 3000
# Run the compiled server directly (no ts-node / no `npm run dev`).
CMD ["node", "dist/server.js"]
