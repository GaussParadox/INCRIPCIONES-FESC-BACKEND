#!/bin/sh
set -e

echo "🟢 Sobrescribiendo variables de entorno en .env"
env | grep -E '^(DB_)' > /app/.env
echo "✅ Variables escritas en .env:"
cat /app/.env

echo "🔁 Validando configuración Nginx..."
nginx -t

echo "➡️ Iniciando backend Node.js..."
node dist/index.js &

echo "➡️ Iniciando Nginx en primer plano..."
nginx -g 'daemon off;'
