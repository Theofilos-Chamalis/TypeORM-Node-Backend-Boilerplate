import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from './database/entities/User';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const PORT = process.env.PORT || 3000;
const app: Express = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hello from the TypeScript world!</h1>');
});

createConnection()
  .then(async connection => {
    console.log('Inserting a new user into the database...');
    const user = new User();
    user.firstName = 'Timber';
    user.lastName = 'Saw';
    user.age = 25;
    await connection.manager.save(user);
    console.log('Saved a new user with id: ' + user.id);
    const usersNumber = await connection.manager.count(User);
    console.log(`We have ${usersNumber} users.`);
    console.log('Loading users from the database...');
    const users = await connection.manager.find(User);
    console.log('Loaded users here: ', users);

    console.log('Here you can setup and run express/koa/any other framework.');
  })
  .catch(error => console.log(error));

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
