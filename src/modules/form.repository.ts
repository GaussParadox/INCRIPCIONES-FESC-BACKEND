import { pool } from "../db/db";
import { Formulario, PreForm, Logo } from '../interfaces/form.interface';
export const formularioRepository = {



  getAdministradorByEmail: async (email: string): Promise<{ id: number; email: string; password: string } | null> => {
  const client = await pool.connect();
  try {
    const query = `SELECT id, email, password FROM admininsc_tmaestro WHERE email = $1`;
    const result = await client.query(query, [email]);

    if (result.rows.length === 0) return null;

    return result.rows[0];
  } catch (error) {
    console.error('Error al buscar administrador:', error);
    throw error;
  } finally {
    client.release();
  }
},

  guardarPreinscripcion: async (data: PreForm): Promise<number> => {
  const client = await pool.connect();

  try {
    const query = `
      INSERT INTO preform_tmaster (
        preformv_nombres,
        preformv_apellidos,
        preformv_correo,
        preformv_fuentes
      )
      VALUES ($1, $2, $3, $4)
      RETURNING id;
    `;

    const values = [
      data.preformv_nombres,
      data.preformv_apellidos,
      data.preformv_correo,
      data.preformv_fuentes,
    ];

    console.log("Insertando preinscripción:", values);

    const result = await client.query(query, values);
    return result.rows[0].id;
  } catch (error) {
    console.error("Error al guardar preinscripción:", error);
    throw error;
  } finally {
    client.release();
  }
},


    guardarFormulario: async (formulario: Formulario): Promise<number> => {
  const client = await pool.connect();
  try {
    // 1. Verificar si ya existe el documento
    const checkQuery = `SELECT FORMN_ID FROM FORM_TMASTER WHERE FORMV_IDENTIFICACION = $1`;
    const checkResult = await client.query(checkQuery, [formulario.formv_identificacion]);

    if (checkResult.rows.length > 0) {
      // Lanzar un error controlado
      const error: any = new Error("Documento ya registrado");
      error.code = "DOCUMENTO_DUPLICADO";
      throw error;
    }

    // 2. Validar fecha
    if (formulario.formd_fecha) {
      const fecha = new Date(formulario.formd_fecha);
      if (!isNaN(fecha.getTime())) {
        formulario.formd_fecha = fecha.toISOString().split("T")[0];
      } else {
        throw new Error("Fecha inválida: " + formulario.formd_fecha);
      }
    }

    // 3. Insertar registro si no hay duplicado
    const query = `
      INSERT INTO FORM_TMASTER (
        FORMV_NOMBRE_PROG_FORMACION, FORMV_NOMBRES, FORMV_APELLIDOS, FORMD_FECHA,
        FORMV_TIPO_IDENTIFICACION, FORMV_IDENTIFICACION, FORMV_EXPEDICION, FORMV_DIRECCION, FORMV_TELEFONO_FIJO,
        FORMV_CORREO_POSTULANTE, FORMV_CELULAR, FORMV_EMPRESA_LABORAL, FORMV_CARGO, FORMV_DIRECCION_OFICINA,
        FORMV_TELEFONO_OFICINA, FORMV_CORREO_OFICINA, FORMV_NIVEL_ACADEMICO, FORMV_UNIVERSIDAD, FORMV_NOMBRE_PROG_ACADEMICO,
        FORMV_YEAR, FORMV_EGRESADO, FORMV_FORMA_PAGO,
        FORMV_FIRMA_BASE64, FORMV_DOCUMENTO_BASE64, FORMV_COMPROBANTE_PAGO_BASE64
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
        $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
        $21, $22, $23, $24, $25
      )
      RETURNING FORMN_ID;
    `;

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
      formulario.formv_firma_base64,
      formulario.formv_documento_base64,
      formulario.formv_comprobante_pago_base64
    ];

    const result = await client.query(query, values);
    return result.rows[0].formn_id;
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
    const query = 'INSERT INTO programas (programa) VALUES ($1) RETURNING id';
    const result = await client.query(query, [programa]);
    return result.rows[0].id;
  } catch (error) {
    console.error('Error al crear el programa:', error);
    throw error;
  } finally {
    client.release();
  }
},

getFuentes: async (): Promise<{ id: number; fuente: string }[]> => {
  const client = await pool.connect();
  try {
    const query = `SELECT id, fuente FROM fuentes ORDER BY fuente ASC`;
    const result = await client.query(query);
    return result.rows;
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
    const query = 'DELETE FROM programas WHERE id = $1;';
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

getTotalesPorFuente: async (): Promise<{ fuente: string; total: number }[]> => {
  const client = await pool.connect();
  try {
    const query = `
      SELECT 
        f.fuente,
        COUNT(p.id) AS total
      FROM fuentes f
      LEFT JOIN preform_tmaster p
        ON p.preformv_fuentes = f.fuente
      GROUP BY f.fuente
      ORDER BY f.fuente ASC;
    `;

    const result = await client.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error al obtener totales por fuente:', error);
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

getFuenteConMasInscritos: async (): Promise<{ fuente: string; total_inscritos: number }> => {
  const client = await pool.connect();
  try {
    const query = `
      SELECT preformv_fuentes AS fuente, COUNT(*) AS total_inscritos
      FROM preform_tmaster
      GROUP BY preformv_fuentes
      ORDER BY total_inscritos DESC
      LIMIT 1;
    `;
    const result = await client.query(query);
    if (result.rows.length === 0) {
      throw new Error("No hay registros de preinscripción.");
    }
    return {
      fuente: result.rows[0].fuente,
      total_inscritos: parseInt(result.rows[0].total_inscritos, 10),
    };
  } finally {
    client.release();
  }
},

insertarLogo: async (logo: Logo): Promise<number> => {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO logos (nombre, imagen_base64)
      VALUES ($1, $2)
      RETURNING id;
    `;
    const values = [logo.nombre, logo.imagen_base64];
    const result = await client.query(query, values);
    return result.rows[0].id;
  } catch (error) {
    console.error('Error al insertar el logo:', error);
    throw error;
  } finally {
    client.release();
  }
},


};
