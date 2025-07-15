import { Router } from 'express';
import { getFormularios,getFormularioById,postGuardarFormulario,generarYDescargarExcel,getProgramas} from '../controllers/formController';

const router = Router();


router.get('/formularios', getFormularios);
router.get('/formulario/:id', getFormularioById);
router.post('/formulario', postGuardarFormulario);
router.get('/formularios/excel', generarYDescargarExcel);
router.get('/programas', getProgramas);

export default router;
