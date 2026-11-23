# =========================
# Build stage
# =========================
FROM oven/bun:latest AS build

WORKDIR /app

# Installation des dépendances
COPY package*.json ./
RUN bun i

# Copie des sources
COPY . .

# Build React
RUN bun run build


# =========================
# Runtime stage
# =========================
FROM nginx:alpine

# Suppression de la configuration par défaut
RUN rm /etc/nginx/conf.d/default.conf

# Copie du build Vite
COPY --from=build /app/dist /usr/share/nginx/html

# Configuration Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
