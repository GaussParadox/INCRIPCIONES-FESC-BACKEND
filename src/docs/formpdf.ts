import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { pool } from '../db/db'; 

export const pdfFormularios = {
  generarPDF: async (formn_id: number) => {
    const client = await pool.connect();
    try {
      const query = `
        SELECT *, TO_CHAR(FORMD_FECHA, 'DD/MM/YYYY') AS fecha_formateada
        FROM FORM_TMASTER
        WHERE FORMN_ID = $1
      `;
      const result = await client.query(query, [formn_id]);
      const form = result.rows[0];

      if (!form) {
        throw new Error('Formulario no encontrado');
      }

      const htmlPath = path.resolve(__dirname, '../templates/template.html');
      let html = fs.readFileSync(htmlPath, 'utf8');
      let check_TI = '';
      let check_CC = '';
      let check_CE = '';
      let check_OTRO = '';
      switch (form.formv_tipo_identificacion?.toUpperCase()) {
        case 'TI':
          check_TI = 'checked';
          break;
        case 'CC':
          check_CC = 'checked';
          break;
        case 'CE':
          check_CE = 'checked';
          break;
        default:
          check_OTRO = 'checked';
          break;
      }

      let check_BACHILLER = '';
      let check_TECNOLOGO = '';
      let check_PROFESIONAL = '';
      let check_POSGRADO = '';

      switch (form.formv_nivel_academico?.toLowerCase()) {
        case 'bachiller':
          check_BACHILLER = 'checked';
          break;
        case 'Tecnologo':
          check_TECNOLOGO = 'checked';
          break;
        case 'profesional':
          check_PROFESIONAL = 'checked';
          break;
        case 'posgrado':
        case 'postgrado':
          check_POSGRADO = 'checked';
          break;
      }

      let check_CONSIGNACION = '';
      let check_TRANSFERENCIA = '';
      let check_PAGO_VIRTUAL = '';
      let check_CHEQUE = '';
      let check_TARJETA = '';
      let check_OTROMONEY = '';

      switch (form.formv_forma_pago?.toLowerCase()) {
        case 'consignacion':
          check_CONSIGNACION = 'checked';
          break;
        case 'transferencia':
          check_TRANSFERENCIA = 'checked';
          break;
        case 'pago_virtual':
          check_PAGO_VIRTUAL = 'checked';
          break;
        case 'cheque':
          check_CHEQUE = 'checked';
          break;
        case 'tarjeta':
          check_TARJETA = 'checked';
          break;
        case 'otro':
          check_OTROMONEY = 'checked';
          break;
      }

      let mark_EGRESADO_SI = '';
      let mark_EGRESADO_NO = '';

      switch (form.formv_egresado?.toUpperCase()) {
        case 'SI':
          mark_EGRESADO_SI = 'X';
          break;
        case 'NO':
          mark_EGRESADO_NO = 'X';
          break;
      }

      let fechaDia = '';
      let fechaMes = '';
      let fechaAnio = '';

      if (form.formd_fecha) {
        const fecha = new Date(form.formd_fecha);
        if (!isNaN(fecha.getTime())) {
          fechaDia = String(fecha.getDate()).padStart(2, '0');
          fechaMes = String(fecha.getMonth() + 1).padStart(2, '0');
          fechaAnio = String(fecha.getFullYear()).slice(-2); // Si quieres 2 dígitos
        }
      }




      html = html

      
        .replace('{{NOMBRE_PROGRAMA}}', form.formv_nombre_prog_formacion || '')
        .replace('{{NOMBRES}}', form.formv_nombres || '')
        .replace('{{APELLIDOS}}', form.formv_apellidos || '')
        .replace('{{IDENTIFICACION}}', form.formv_identificacion || '')
        .replace('{{TIPO_IDENTIFICACION}}', form.formv_tipo_identificacion || '')
        .replace('{{FECHA_DIA}}', fechaDia)
        .replace('{{FECHA_MES}}', fechaMes)
        .replace('{{FECHA_ANIO}}', fechaAnio)
        .replace('{{CHECK_TI}}', check_TI)
        .replace('{{CHECK_CC}}', check_CC)
        .replace('{{CHECK_CE}}', check_CE)
        .replace('{{CHECK_OTRO}}', check_OTRO)
        .replace('{{EXPEDICION}}', form.formv_expedicion || '')
        .replace('{{DIRECCION}}', form.formv_direccion || ''  )
        .replace('{{TELEFONO_FIJO}}', form.formv_telefono_fijo)
        .replace('{{CORREO}}', form.formv_correo_postulante)
        .replace('{{CELULAR}}', form.formv_celular)
        .replace('{{EMPRESA}}', form.formv_empresa_laboral)
        .replace('{{CARGO}}', form.formv_cargo)
        .replace('{{DIRECCION_OFICINA}}', form.formv_direccion_oficina)
        .replace('{{TELEFONO_OFICINA}}', form.formv_telefono_oficina)
        .replace('{{CORREO_OFICINA}}', form.formv_correo_oficina)
        .replace('{{UNIVERSIDAD}}', form.formv_universidad)
        .replace('{{CHECK_BACHILLER}}', check_BACHILLER)
        .replace('{{CHECK_TECNOLOGO}}', check_TECNOLOGO)
        .replace('{{CHECK_PROFESIONAL}}', check_PROFESIONAL)
        .replace('{{CHECK_POSGRADO}}', check_POSGRADO)
        .replace('{{PROGRAMA_ACADEMICO}}', form.formv_nombre_prog_academico)
        .replace('{{YEAR}}', form.formv_year)
        .replace('{{FORMA_PAGO}}', form.formv_forma_pago)
        .replace('{{CHECK_CONSIGNACION}}', check_CONSIGNACION)
        .replace('{{CHECK_TRANSFERENCIA}}', check_TRANSFERENCIA)
        .replace('{{CHECK_PAGO_VIRTUAL}}', check_PAGO_VIRTUAL)
        .replace('{{CHECK_CHEQUE}}', check_CHEQUE)
        .replace('{{CHECK_TARJETA}}', check_TARJETA)
        .replace('{{CHECK_OTRO}}', check_OTROMONEY)
        .replace('{{MARK_EGRESADO_SI}}', mark_EGRESADO_SI)
        .replace('{{MARK_EGRESADO_NO}}', mark_EGRESADO_NO)
        .replace('{{FECHA}}', form.fecha_formateada)
        

      const filePath = path.resolve(__dirname, `../../formulario_${formn_id}.pdf`);
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });

      await page.pdf({
        path: filePath,
        format: 'A4',
        printBackground: true,
        margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' },
      });

      await browser.close();
      console.log('PDF generado correctamente');
      return filePath;
    } catch (error) {
      console.error('Error generando PDF:', error);
      throw error;
    } finally {
      client.release();
    }
  }
};

