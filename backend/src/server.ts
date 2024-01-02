import express from 'express';
import { Routes } from './routes';

const app = express();
const PORT = 5000;

app.use(express.json());
app.use('/', Routes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:5000`);
});