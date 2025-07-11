import { Pool } from 'pg';
import dotenv from 'dotenv';


// Cargar archivo .env (ajustando el path si estás fuera del root)
dotenv.config(); // Ajusta si es necesario

// Validación opcional para asegurarte que se están leyendo bien
if (!process.env.DB_USER || !process.env.DB_HOST || !process.env.DB_NAME) {
  console.error(' Error: Variables de entorno no definidas correctamente');
  process.exit(1); // Termina la app si fallan
}

export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
});
