import { pool } from "../db/db";
import { Formulario } from '../interfaces/form.interface';
export const formularioRepository = {
    guardarFormulario: async (formulario: Formulario): Promise<number> => {
        const client = await pool.connect();
        try {
            const query = `
        INSERT INTO FORM_TMASTER (FORMV_NOMBRE_PROG_FORMACION, FORMV_NOMBRES, FORMV_APELLIDOS, FORMD_FECHA,
        FORMV_TIPO_IDENTIFICACION,FORMV_IDENTIFICACION,FORMV_EXPEDICION,FORMV_DIRECCION,FORMV_TELEFONO_FIJO,
        FORMV_CORREO_POSTULANTE,FORMV_CELULAR,FORMV_EMPRESA_LABORAL,FORMV_CARGO,FORMV_DIRECCION_OFICINA,
        FORMV_TELEFONO_OFICINA, FORMV_CORREO_OFICINA,FORMV_NIVEL_ACADEMICO,FORMV_UNIVERSIDAD,FORMV_NOMBRE_PROG_ACADEMICO,
        FORMV_YEAR,FORMV_EGRESADO,FORMV_FORMA_PAGO
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
          $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22
        )
        RETURNING FORMN_ID;
      `;  

      if (formulario.formd_fecha) {
  const fecha = new Date(formulario.formd_fecha);
  if (!isNaN(fecha.getTime())) {
    formulario.formd_fecha = fecha.toISOString().split('T')[0]; 
  } else {
    throw new Error('Fecha inválida: ' + formulario.formd_fecha);
  }
}
        const values = [
        formulario.formv_nombre_prog_formacion,
        formulario.formv_nombres,
        formulario.formv_apellidos,
        formulario.formd_fecha,
        formulario.formv_tipo_identificacion,
        formulario.formv_identificacion,
        formulario.formv_expedicion,
        formulario.formv_direccion,
        formulario.formv_telefono_fijo,
        formulario.formv_correo_postulante,
        formulario.formv_celular,
        formulario.formv_empresa_laboral,
        formulario.formv_cargo,
        formulario.formv_direccion_oficina,
        formulario.formv_telefono_oficina,
        formulario.formv_correo_oficina,
        formulario.formv_nivel_academico,
        formulario.formv_universidad,
        formulario.formv_nombre_prog_academico,
        formulario.formv_year,
        formulario.formv_egresado,
        formulario.formv_forma_pago,
      ];

            console.log('Valores recibidos para INSERT:', values);

            const result = await client.query(query, values);
            return result.rows[0].formn_id;
          } catch (error) {
            console.error('Error en INSERT:', error);
            throw error; 
          } finally {
            client.release();
          }
    },
    
  getFormularioById: async (formn_id: number): Promise<any> => {
    const client = await pool.connect();
    try {
      const query = `
        SELECT *, TO_CHAR(FORMD_FECHA, 'DD/MM/YYYY') AS fecha_formateada
        FROM FORM_TMASTER
        WHERE FORMN_ID = $1
      `;
      const result = await client.query(query, [formn_id]);
      return result.rows[0];
    } finally {
      client.release();
    }
  },

  

  getFormularios: async (): Promise<any[]> => {
    const client = await pool.connect();
    try {
      const query = `
        SELECT *, TO_CHAR(FORMD_FECHA, 'DD/MM/YYYY') AS fecha_formateada
        FROM FORM_TMASTER
        ORDER BY FORMN_ID DESC
      `;
      const result = await client.query(query);
      return result.rows;
    } finally {
      client.release();
    }
  },


  crearPrograma: async (programa: string): Promise<number> => {
  const client = await pool.connect();
  try {
    const form_tmaster_id = 1; // ID fijo para todos los programas
    const query = `INSERT INTO programas (programa, form_tmaster_id) VALUES ($1, $2) RETURNING id;`;
    const values = [programa, form_tmaster_id];
    const result = await client.query(query, values);
    return result.rows[0].id;
  } catch (error) {
    console.error('Error al crear el programa:', error);
    throw error;
  } finally {
    client.release();
  }
},


  getProgramas: async (): Promise<{ id: number; programa: string }[]> => {
  const client = await pool.connect();
  try {
    const query = `SELECT id, programa FROM programas ORDER BY programa ASC`;
    const result = await client.query(query);
    return result.rows;
  } finally {
    client.release();
  }
},

deletePrograma: async (id: number): Promise<void> => {
  const client = await pool.connect();
  try {
    const query = `DELETE FROM programas WHERE id = $1`;
    await client.query(query, [id]);
  } catch (error) {
    console.error('Error al eliminar el programa:', error);
    throw error;
  } finally {
    client.release();
  }
},

getFormulariosResumen: async (): Promise<any[]> => {
  const client = await pool.connect();
  try {
    const query = `
      SELECT FORMN_ID,FORMV_NOMBRE_PROG_FORMACION,FORMV_NOMBRES,FORMV_APELLIDOS,FORMD_FECHA,FORMV_IDENTIFICACION,
      FORMV_CORREO_POSTULANTE,FORMV_CELULAR,FORMV_FORMA_PAGO,TO_CHAR(FORMD_FECHA, 'DD/MM/YYYY') AS fecha_formateada
      FROM FORM_TMASTER
      ORDER BY FORMN_ID DESC;
    `;

    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error al obtener formularios resumen:', error);
    throw error;
  } finally {
    client.release();
  }
},

getTotalInscritos: async (): Promise<{ total: number }> => {
  const client = await pool.connect();
  try {
    const query = `SELECT COUNT(*) AS total FROM FORM_TMASTER;`;
    const result = await client.query(query);
    return { total: parseInt(result.rows[0].total, 10) }; 
  } catch (error) {
    console.error("Error al obtener el total de inscritos:", error);
    throw error;
  } finally {
    client.release();
  }
},


getTotalesPorPrograma: async (): Promise<{ programa: string; total: number }[]> => {
  const client = await pool.connect();
  try {
    const query = `
      SELECT 
        p.programa,
        COUNT(f.formn_id) AS total
      FROM programas p
      LEFT JOIN form_tmaster f
        ON f.formv_nombre_prog_formacion = p.programa
      GROUP BY p.programa
      ORDER BY p.programa ASC;
    `;

    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error al obtener totales por programa:', error);
    throw error;
  } finally {
    client.release();
  }
},

getTotalProgramas: async (): Promise<{ total: number }> => {
  const client = await pool.connect();
  try {
    const query = `SELECT COUNT(*) AS total FROM programas`;
    const result = await client.query(query);
    return { total: parseInt(result.rows[0].total, 10) };
  } finally {
    client.release();
  }
},

getProgramaConMasInscritos: async (): Promise<{ programa: string; total_inscritos: number }> => {
  const client = await pool.connect();
  try {
    const query = `
      SELECT FORMV_NOMBRE_PROG_FORMACION AS programa, COUNT(*) AS total_inscritos
      FROM FORM_TMASTER
      GROUP BY FORMV_NOMBRE_PROG_FORMACION
      ORDER BY total_inscritos DESC
      LIMIT 1;
    `;
    const result = await client.query(query);
    if (result.rows.length === 0) {
      throw new Error("No hay registros de formularios.");
    }
    return {
      programa: result.rows[0].programa,
      total_inscritos: parseInt(result.rows[0].total_inscritos, 10),
    };
  } finally {
    client.release();
  }
},



};
