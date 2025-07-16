import { Router } from 'express';
import { getFormularios,getFormularioById,postGuardarFormulario,generarYDescargarExcel,getProgramas, getFormulariosResumen, getTotalInscritos, getTotalesPorPrograma} from '../controllers/formController';

const router = Router();

router.get('/formularios', getFormularios);
router.get('/formulario/:id', getFormularioById);
router.post('/formulario', postGuardarFormulario);
router.get('/formularios/excel', generarYDescargarExcel);
router.get('/programas', getProgramas);
router.get('/formularios/resumen', getFormulariosResumen);
router.get('/totalinscritos', getTotalInscritos);
router.get('/totalesporprograma', getTotalesPorPrograma);

export default router;
