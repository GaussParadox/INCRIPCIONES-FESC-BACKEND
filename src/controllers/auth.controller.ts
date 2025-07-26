import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db/db";

const JWT_SECRET = "tu_clave_secreta"; 

export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const query = `SELECT * FROM adminInsc_tmaestro WHERE email = $1`;
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const admin = result.rows[0];
    const passwordValida = await bcrypt.compare(password, admin.contraseña);

    if (!passwordValida) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};