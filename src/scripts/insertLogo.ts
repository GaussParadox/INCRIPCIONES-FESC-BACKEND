import fs from 'fs';
import path from 'path';
import { pool } from '../db/db'; // Asegúrate de que la ruta sea correcta
import dotenv from 'dotenv';

dotenv.config(); 

async function insertLogo() {
  try {
    const imagePath = path.join(__dirname, '../templates/logoFESC.png');

    if (!fs.existsSync(imagePath)) {
      console.error('⚠️ Archivo no encontrado:', imagePath);
      return;
    }

    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');

    const result = await pool.query(
      'INSERT INTO logos (nombre, imagen_base64) VALUES ($1, $2) RETURNING id',
      ['logoFESC', base64Image]
    );

    console.log('✅ Imagen insertada con ID:', result.rows[0].id);
  } catch (error) {
    console.error('❌ Error al insertar la imagen:', error);
  } finally {
    await pool.end();
  }
}

insertLogo();
