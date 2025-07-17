import { Router } from 'express';
import { getFormularios,getFormularioById,postGuardarFormulario,generarYDescargarExcel,getProgramas, getFormulariosResumen, getTotalInscritos, getTotalesPorPrograma, getTotalProgramas, getProgramaConMasInscritos, postCrearPrograma, deletePrograma} from '../controllers/formController';

const router = Router();

router.get('/formularios', getFormularios);
router.get('/formulario/:id', getFormularioById);
router.post('/formulario', postGuardarFormulario);
router.get('/formularios/excel', generarYDescargarExcel);
router.get('/programas', getProgramas);
router.post('/programas', postCrearPrograma);
router.delete('/programas/:id', deletePrograma);
router.get('/formularios/resumen', getFormulariosResumen);
router.get('/totalinscritos', getTotalInscritos);
router.get('/totalesporprograma', getTotalesPorPrograma);
router.get('/totalprogramas', getTotalProgramas);
router.get("/programa-mas-inscritos", getProgramaConMasInscritos);



export default router;
