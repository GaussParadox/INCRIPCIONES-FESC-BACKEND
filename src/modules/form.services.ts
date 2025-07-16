
import { formularioRepository } from "./form.repository";

export const formularioService = {
    
  postGuardarFormulario: async (formulario: any): Promise<number> => {
    return await formularioRepository.guardarFormulario(formulario);
  },

  getFormularioById: async (id: number): Promise<any> => {
    return await formularioRepository.getFormularioById(id);
  },

  getFormularios: async (): Promise<any[]> => {
    return await formularioRepository.getFormularios();
  },

  getProgramas: async () => {
    return await formularioRepository.getProgramas();
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

  getTotalProgramas: async (): Promise<{ total: number }> => {
  return await formularioRepository.getTotalProgramas();
  },

  getProgramaConMasInscritos: async (): Promise<{ programa: string; total_inscritos: number }> => {
  return await formularioRepository.getProgramaConMasInscritos();
  },


  
};


