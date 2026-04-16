# ---- Build Stage ----
FROM node:18-alpine AS base

WORKDIR /app

# Copy dependency files first for better layer caching
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# ---- Final Stage ----
FROM node:18-alpine

WORKDIR /app

# Copy node_modules from base stage
COPY --from=base /app/node_modules ./node_modules

# Copy application source
COPY . .

# Expose the API port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
