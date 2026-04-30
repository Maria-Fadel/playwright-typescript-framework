# Offizielles Playwright Image (empfohlen!)
FROM mcr.microsoft.com/playwright:v1.59.1-jammy

WORKDIR /app

# package files kopieren
COPY package*.json ./

# Dependencies installieren
RUN npm ci

# Rest des Projekts kopieren
COPY . .

# Playwright Browser sicherstellen
RUN npx playwright install --with-deps

# Standard Command
CMD ["npx", "playwright", "test"]