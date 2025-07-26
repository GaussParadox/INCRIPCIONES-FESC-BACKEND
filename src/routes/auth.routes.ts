import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from '../db/db'; 
import { UsuariosAdministradores } from "../interfaces/form.interface";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "mi_clave_super_secreta";

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM adminInsc_tmaestro WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const usuario: UsuariosAdministradores = result.rows[0];

    // Prueba temporal para ver el hash generado
   const hash = await bcrypt.hash("contrasenamaestra", 10);
    console.log(hash);

    console.log("password recibido:", password);
    console.log("password en BD (hash):", usuario.password);

    const passwordMatch = await bcrypt.compare(password, usuario.password);
    console.log("¿Coinciden?", passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

export default router;