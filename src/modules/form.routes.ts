import { Router } from 'express';
import { postGuardarPreinscripcion, getFuenteConMasInscritos ,getTotalesPorFuente, getFuentes, getFormularios,getFormularioById,postGuardarFormulario, getProgramas, deletePrograma , getFormulariosResumen, getTotalInscritos, getTotalesPorPrograma, getTotalProgramas, getProgramaConMasInscritos, postCrearPrograma} from '../controllers/formController';
import { generarYDescargarExcel, descargarPDFFormulario } from '../controllers/formController';
import { getAdministradorByEmail } from '../controllers/formController';

const router = Router();

router.get('/formularios', getFormularios);
router.get('/formulario/:id', getFormularioById);
router.post('/formulario/preinscripcion', postGuardarPreinscripcion);
router.post('/formulario', postGuardarFormulario);
router.get('/formularios/excel', generarYDescargarExcel);
router.get('/formulario/pdf/:id', descargarPDFFormulario);
router.get('/programas', getProgramas);
router.get('/fuentes', getFuentes);
router.post('/programas', postCrearPrograma);
router.delete('/programas/:id', deletePrograma);
router.get('/formularios/resumen', getFormulariosResumen);
router.get('/totalinscritos', getTotalInscritos);
router.get('/totalesporprograma', getTotalesPorPrograma);
router.get('/totalesporfuente', getTotalesPorFuente);
router.get('/totalprogramas', getTotalProgramas);
router.get("/programa-mas-inscritos", getProgramaConMasInscritos);
router.get("/fuente-mas-inscritos", getFuenteConMasInscritos);
router.get('/administrador/:email', getAdministradorByEmail);

export default router;
