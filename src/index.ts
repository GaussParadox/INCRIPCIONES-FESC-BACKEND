import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import formRoutes from './routes/form';
import authRoutes from './routes/auth.routes'; 
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
// Aumenta el límite a 50mb (ajusta según tus necesidades)
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/form', formRoutes);
app.use('/api/auth', authRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor TypeScript corriendo en puerto ${PORT}`);
});
