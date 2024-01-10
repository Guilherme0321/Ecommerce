import express from 'express';
import { Routes } from './routes';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors({
    origin: 'http://localhost:3000',  // Substitua pelo seu domínio frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
app.use(express.json());
app.use('/', Routes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:5000`);
});