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

export const getProgramas = async (_req: Request, res: Response) => {
  try {
    const programas = await formularioService.getProgramas();
    res.status(200).json(programas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los programas' });
  }
};

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
export const getFormulariosResumen = async (_req: Request, res: Response) => {
  try {
    const resumen = await formularioService.getFormulariosResumen();
    res.status(200).json(resumen);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el resumen de formularios' });
  }
};

export const getTotalInscritos = async (_req: Request, res: Response) => {
  try {
    const programas = await formularioService.getTotalInscritos();
    res.status(200).json(programas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los programas' });
  }
};

export const getTotalesPorPrograma = async (_req: Request, res: Response) => {
  try {
    const totales = await formularioService.getTotalesPorPrograma();
    res.status(200).json(totales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los totales por programa' });
  }
};


