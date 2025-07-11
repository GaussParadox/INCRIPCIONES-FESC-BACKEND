import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';

export const excelFormularios = {
  formulariosGenerados: async (formularios: any[]) => {
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Formularios');

      worksheet.columns = [
        { header: 'ID', key: 'id', width: 8 },
        { header: 'Programa Formación', key: 'prog_formacion', width: 25 },
        { header: 'Nombres', key: 'nombres', width: 20 },
        { header: 'Apellidos', key: 'apellidos', width: 20 },
        { header: 'Fecha', key: 'fecha', width: 15, style: { numFmt: 'dd/mm/yyyy' } },
        { header: 'Tipo ID', key: 'tipo_id', width: 10 },
        { header: 'Identificación', key: 'identificacion', width: 20 },
        { header: 'Correo Personal', key: 'correo_postulante', width: 30 },
        { header: 'Celular', key: 'celular', width: 15 },
        { header: 'Empresa Laboral', key: 'empresa', width: 25 },
        { header: 'Cargo', key: 'cargo', width: 20 },
        { header: 'Nivel Académico', key: 'nivel_academico', width: 20 },
        { header: 'Universidad', key: 'universidad', width: 25 },
        { header: 'Egresado', key: 'egresado', width: 10 },
        { header: 'Año', key: 'year', width: 10 },
        { header: 'Forma de Pago', key: 'forma_pago', width: 20 }
      ];

      worksheet.getRow(1).eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF4CAF50' },
        };
        cell.font = {
          bold: true,
          color: { argb: 'FFFFFF' },
        };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      });

      formularios.forEach((item) => {
        worksheet.addRow({
          id: item.formn_id,
          prog_formacion: item.formv_nombre_prog_formacion,
          nombres: item.formv_nombres,
          apellidos: item.formv_apellidos,
          fecha: item.formd_fecha ? new Date(item.formd_fecha) : null,
          tipo_id: item.formv_tipo_identificacion,
          identificacion: item.formv_identificacion,
          correo_postulante: item.formv_correo_postulante,
          celular: item.formv_celular,
          empresa: item.formv_empresa_laboral,
          cargo: item.formv_cargo,
          nivel_academico: item.formv_nivel_academico,
          universidad: item.formv_universidad,
          egresado: item.formv_egresado,
          year: item.formv_year,
          forma_pago: item.formv_forma_pago
        });
      });

      const folderPath = path.join(__dirname, '../../../public/storage/formularios/');
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      const fileName = `formulario_${Date.now()}.xlsx`;
      const filePath = path.join(folderPath, fileName);
      await workbook.xlsx.writeFile(filePath);

      return filePath;
    } catch (err) {
      throw new Error('No se pudo generar el archivo Excel.');
    }
  },
};
