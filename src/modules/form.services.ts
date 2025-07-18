
import { get } from "axios";
import { formularioRepository } from "./form.repository";

export const formularioService = {

  postGuardarPreinscripcion: async (preinscripcion: any): Promise<number> => {
    return await formularioRepository.guardarPreinscripcion(preinscripcion);
  },
  
  postGuardarFormulario: async (formulario: any): Promise<number> => {
    return await formularioRepository.guardarFormulario(formulario);
  },

  getFormularioById: async (id: number): Promise<any> => {
    return await formularioRepository.getFormularioById(id);
  },

  getFormularios: async (): Promise<any[]> => {
    return await formularioRepository.getFormularios();
  },

  getFuentes: async (): Promise<any[]> => {
    return await formularioRepository.getFuentes();
  },

  getProgramas: async () => {
    return await formularioRepository.getProgramas();
  },

  crearPrograma: async (programa: string): Promise<number> => {
  return await formularioRepository.crearPrograma(programa);
},


  deletePrograma: async (id: number): Promise<void> => {
  await formularioRepository.deletePrograma(id);
},


  getFormulariosResumen: async (): Promise<any[]> => {
    return await formularioRepository.getFormulariosResumen();
  },
  getTotalInscritos: async (): Promise<number> => {
    const result = await formularioRepository.getTotalInscritos();
    return result.total;
  },
  
   getTotalesPorPrograma: async (): Promise<{ programa: string; total: number }[]> => {
    return await formularioRepository.getTotalesPorPrograma();
  },

  getTotalesPorFuente: async (): Promise<{ fuente: string; total: number }[]> => {
    return await formularioRepository.getTotalesPorFuente();
  },

  getTotalProgramas: async (): Promise<{ total: number }> => {
  return await formularioRepository.getTotalProgramas();
  },

  getProgramaConMasInscritos: async (): Promise<{ programa: string; total_inscritos: number }> => {
  return await formularioRepository.getProgramaConMasInscritos();
  },
  
  


  
};


