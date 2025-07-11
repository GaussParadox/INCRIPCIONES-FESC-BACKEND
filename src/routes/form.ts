import { Router } from 'express';
import { getFormularios,getFormularioById,postGuardarFormulario,generarYDescargarExcel} from '../controllers/formController';

const router = Router();


router.get('/formularios', getFormularios);
router.get('/formulario/:id', getFormularioById);
router.post('/formulario', postGuardarFormulario);
router.get('/formularios/excel', generarYDescargarExcel);

export default router;
