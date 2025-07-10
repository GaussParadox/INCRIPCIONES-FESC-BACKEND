import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import formRoutes from './routes/form';
import dotenv from 'dotenv';


const app = express();
app.use(cors());
dotenv.config();
app.use(bodyParser.json());

app.use('/api/form', formRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor TypeScript corriendo en puerto ${PORT}`);
});
