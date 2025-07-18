import { Router } from 'express';
import { getFormularios, getTotalesPorFuente, postGuardarPreinscripcion ,getFuentes, getFormularioById,postGuardarFormulario,generarYDescargarExcel, descargarPDFFormulario, getProgramas, getFormulariosResumen, getTotalInscritos, getTotalesPorPrograma, getTotalProgramas, getProgramaConMasInscritos, postCrearPrograma, deletePrograma} from '../controllers/formController';

const router = Router();

router.get('/formularios', getFormularios);
router.get('/formulario/:id', getFormularioById);
router.post('/formulario', postGuardarFormulario);
router.post('/formulario/preinscripcion', postGuardarPreinscripcion);
router.get('/formularios/excel', generarYDescargarExcel);
router.get('/formulario/pdf/:id', descargarPDFFormulario);
router.get('/programas', getProgramas);
router.post('/programas', postCrearPrograma);
router.get('/fuentes', getFuentes);
router.delete('/programas/:id', deletePrograma);
router.get('/formularios/resumen', getFormulariosResumen);
router.get('/totalinscritos', getTotalInscritos);
router.get('/totalesporprograma', getTotalesPorPrograma);
router.get('/totalesporfuente', getTotalesPorFuente);
router.get('/totalprogramas', getTotalProgramas);
router.get("/programa-mas-inscritos", getProgramaConMasInscritos);



export default router;
