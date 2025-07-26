// controllers/formulario.controller.ts
import e, { Request, Response } from 'express';
import { formularioService } from './form.services';
import { formularioRepository } from './form.repository';
import { excelFormularios } from '../docs/formularios-generados-excel';

export const postGuardarPreinscripcion = async (req: Request, res: Response) => {
  try {
    const preinscripcion = req.body;
    console.log("Datos recibidos en el backend:", preinscripcion); 

    const id = await formularioService.postGuardarPreinscripcion(preinscripcion);
    res.status(201).json({ message: 'Preinscripción guardada correctamente', id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al guardar la preinscripción' });
  }
};


export const postGuardarFormulario = async (req: Request, res: Response) => {
  try {
    const formulario = req.body;
    const id = await formularioService.postGuardarFormulario(formulario);
    res.status(200).json({ message: "Formulario guardado correctamente", id });
  } catch (error: any) {
    console.error(error);

    if (error.code === "DOCUMENTO_DUPLICADO") {
      return res.status(409).json({ message: "Este formulario ya se ha respondido con tu número de identificación" });
    }

    res.status(500).json({ message: "Error al guardar el formulario" });
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

export const getFuentes = async (_req: Request, res: Response) => {
  try {
    const fuentes = await formularioService.getFuentes();
    res.status(200).json(fuentes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las fuentes' });
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

export const postCrearPrograma = async (req: Request, res: Response) => {
  try {
    const { programa } = req.body;

    if (!programa || typeof programa !== 'string') {
      return res.status(400).json({ message: 'El campo "programa" es obligatorio y debe ser un texto.' });
    }

    const id = await formularioService.crearPrograma(programa);
    res.status(201).json({ message: 'Programa creado correctamente', id });
  } catch (error) {
    console.error('Error al crear el programa:', error);
    res.status(500).json({ message: 'Error al crear el programa' });
  }
};


export const deletePrograma = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    await formularioRepository.deletePrograma(id);
    res.status(200).json({ message: "Programa eliminado correctamente." });
  } catch (error) {
    console.error("Error al eliminar programa:", error);
    res.status(500).json({ error: "Error al eliminar el programa." });
  }
};

export const getFormulariosResumen = async (_req: Request, res: Response) => {
  try {
    const programas = await formularioService.getFormulariosResumen();
    res.status(200).json(programas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los programas' });
  }
};

export const getTotalInscritos = async (_req: Request, res: Response) => {
  try {
    const programas = await formularioService.getTotalInscritos();
    res.status(200).json({ total: programas });
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

export const getTotalesPorFuente = async (_req: Request, res: Response) => {
  try {
    const totales = await formularioService.getTotalesPorFuente();
    res.status(200).json(totales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los totales por fuente' });
  }
};

export const getTotalProgramas = async (_req: Request, res: Response) => {
  try {
    const total = await formularioService.getTotalProgramas();
    res.status(200).json(total);
  } catch (error) {
    console.error("Error al obtener el total de programas:", error);
    res.status(500).json({ message: "Error al obtener el total de programas" });
  }
};

export const getProgramaConMasInscritos = async (_req: Request, res: Response) => {
  try {
    const data = await formularioService.getProgramaConMasInscritos();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error al obtener el programa con más inscritos:", error);
    res.status(500).json({ message: "Error al obtener el programa con más inscritos" });
  }
};

export const getFuenteConMasInscritos = async (_req: Request, res: Response) => {
  try {
    const data = await formularioService.getFuenteConMasInscritos();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error al obtener la fuente con más inscritos:", error);
    res.status(500).json({ message: "Error al obtener la fuente con más inscritos" });
  }
};

export const getAdministradorByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const administrador = await formularioService.getAdministradorByEmail(email);
    if (!administrador) {
      return res.status(404).json({ message: 'Administrador no encontrado' });
    }
    res.status(200).json(administrador);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el administrador' });
  }
}












