FROM node:20-alpine

# Instala Nginx
RUN apk add --no-cache nginx

WORKDIR /app

# Copia metadatos e instala dependencias
COPY package*.json tsconfig.json ./
RUN npm install

# Copia y compila fuente
COPY src/ ./src
RUN npm run build

# Reemplaza la configuración principal de Nginx
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copia script de entrada
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]
