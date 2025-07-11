
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
};


