export interface Formulario {
  formn_id?: number; 
  formv_nombre_prog_formacion: string;
  formv_nombres: string;
  formv_apellidos: string;
  formd_fecha: string;
  formv_tipo_identificacion: string;
  formv_identificacion: string;
  formv_expedicion?: string;
  formv_direccion?: string;
  formv_telefono_fijo?: string;
  formv_correo_postulante?: string;
  formv_celular?: string;
  formv_empresa_laboral?: string;
  formv_cargo?: string;
  formv_direccion_oficina?: string;
  formv_telefono_oficina?: string;
  formv_correo_oficina?: string;
  formv_nivel_academico?: string;
  formv_universidad?: string;
  formv_nombre_prog_academico?: string;
  formv_year?: number;
  formv_egresado?: 'SI' | 'NO';
  formv_forma_pago?: string;
}
