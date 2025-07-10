import { Request, Response } from 'express';
import { pool } from '../db/db';
import { FormMaestro } from '../models/formInterfaces';

export const getForms = async (req: Request, res: Response) => {
  const result = await pool.query('SELECT * FROM FORM_TMASTER');
  res.json(result.rows);
};

export const getFormById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM FORM_TMASTER WHERE FORMN_ID = $1', [id]);

  if (result.rows.length === 0) return res.status(404).json({ message: 'No encontrado' });
  res.json(result.rows[0]);
};

export const createForm = async (req: Request, res: Response) => {
  const data: FormMaestro = req.body;
  const campos = Object.keys(data).join(', ');
  const placeholders = Object.keys(data).map((_, i) => `$${i + 1}`).join(', ');
  const valores = Object.values(data);

  const result = await pool.query(
    `INSERT INTO FORM_TMASTER (${campos}) VALUES (${placeholders}) RETURNING *`,
    valores
  );

  res.status(201).json(result.rows[0]);
};

export const updateForm = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: FormMaestro = req.body;
  const campos = Object.keys(data).map((key, i) => `${key} = $${i + 1}`).join(', ');
  const valores = Object.values(data);

  const result = await pool.query(
    `UPDATE FORM_TMASTER SET ${campos} WHERE FORMN_ID = $${valores.length + 1} RETURNING *`,
    [...valores, id]
  );

  if (result.rows.length === 0) return res.status(404).json({ message: 'No encontrado' });
  res.json(result.rows[0]);
};

export const deleteForm = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await pool.query('DELETE FROM FORM_TMASTER WHERE FORMN_ID = $1 RETURNING *', [id]);

  if (result.rows.length === 0) return res.status(404).json({ message: 'No encontrado' });
  res.json({ message: 'Eliminado con éxito' });
};
