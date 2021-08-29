import express, { Express } from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import exampleRoutes from './routes/examples';
import userRoutes from './routes/users';

dotenv.config({ path: '.env' });

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', exampleRoutes);
app.use('/users', userRoutes);

createConnection()
  .then(() => {
    console.log('Database connected 💾!');
    app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
  })
  .catch(error => console.error(error));
