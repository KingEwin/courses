# syntax=docker/dockerfile:1

# --- Stage 1: build Slidev slides into static assets ---
FROM node:20-alpine AS build

ARG COURSE_DIR="ING1 - 2026-2027 - Devops"
ARG PART="1"

WORKDIR /workspace

# Root lockfile drives the toolchain (@slidev/cli, vue) shared by every course.
COPY package.json package-lock.json ./
RUN npm ci

# Only the targeted course sources are needed to produce its static build.
COPY "${COURSE_DIR}" "./${COURSE_DIR}"

RUN cd "${COURSE_DIR}" && npx --no-install slidev build slides-students-p${PART}.md --without-notes --base "/" --out /workspace/dist

# --- Stage 2: serve the static build with a hardened, non-root Nginx ---
FROM nginxinc/nginx-unprivileged:1.27-alpine AS runtime

COPY deployment/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /workspace/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://127.0.0.1:8080/ || exit 1

USER nginx
