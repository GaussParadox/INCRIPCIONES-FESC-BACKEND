import { Request, Response } from 'express';
import { formularioRepository } from '../modules/form.repository';
import type { Formulario } from '../interfaces/form.interface';
import { excelFormularios } from '../docs/formularios-generados-excel';
import { formularioService } from '../modules/form.services';

export const postGuardarFormulario = async (req: Request, res: Response) => {
  try {
    const data: Formulario = req.body;
    const nuevoId = await formularioRepository.guardarFormulario(data);
    res.status(201).json({ id: nuevoId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al guardar el formulario' });
  }
};

export const getFormularioById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const form = await formularioRepository.getFormularioById(id);
    if (!form) {
      return res.status(404).json({ message: 'Formulario no encontrado' });
    }
    res.json(form);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el formulario' });
  }
};

export const getFormularios = async (_req: Request, res: Response) => {
  try {
    const formularios = await formularioRepository.getFormularios();
    res.json(formularios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los formularios' });
  }
}
  export const generarYDescargarExcel = async (_req: Request, res: Response) => {
  try {
    const formularios = await formularioService.getFormularios();
    const filePath = await excelFormularios.formulariosGenerados(formularios);

    return res.download(filePath); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al generar o descargar el Excel' });
  }
};

