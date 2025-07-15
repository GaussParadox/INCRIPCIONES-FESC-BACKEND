// controllers/formulario.controller.ts
import { Request, Response } from 'express';
import { formularioService } from './form.services';

export const postGuardarFormulario = async (req: Request, res: Response) => {
  try {
    const formulario = req.body;
    const id = await formularioService.postGuardarFormulario(formulario);
    res.status(200).json({ message: 'Formulario guardado correctamente', id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al guardar el formulario' });
  }
};

export const getFormularioById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const data = await formularioService.getFormularioById(id);
    if (!data) {
      return res.status(404).json({ message: 'Formulario no encontrado' });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el formulario' });
  }
};

export const getFormularios = async (_req: Request, res: Response) => {
  try {
    const data = await formularioService.getFormularios();
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los formularios' });
  }
};

  export const getProgramas = async (_req: Request, res: Response) => {
  try {
    const programas = await formularioService.getProgramas();
    res.status(200).json(programas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los programas' });
  }
};

