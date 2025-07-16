import { Router } from 'express';
import { getFormularios,getFormularioById,postGuardarFormulario, getProgramas, getFormulariosResumen, getTotalInscritos, getTotalesPorPrograma, getTotalProgramas, getProgramaConMasInscritos} from '../controllers/formController';
import { generarYDescargarExcel } from '../controllers/formController';


const router = Router();

router.get('/formularios', getFormularios);
router.get('/formulario/:id', getFormularioById);
router.post('/formulario', postGuardarFormulario);
router.get('/formularios/excel', generarYDescargarExcel);
router.get('/programas', getProgramas);
router.get('/formularios/resumen', getFormulariosResumen);
router.get('/totalinscritos', getTotalInscritos);
router.get('/totalesporprograma', getTotalesPorPrograma);
router.get('/totalprogramas', getTotalProgramas);
router.get("/programa-mas-inscritos", getProgramaConMasInscritos);



export default router;
