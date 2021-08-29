import express, { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import User from '../models/entities/User';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const userRepository = await getConnection().getRepository(User);
  const users = await userRepository.find();
  const userNo = await userRepository.count();

  return res.send({ users, userNo });
});

router.post('/create', async (req: Request, res: Response) => {
  try {
    const userRepository = await getConnection().getRepository(User);
    const { firstName, lastName, age } = req.body;

    if (!firstName || !lastName || !age) {
      return res.status(400).send({ error: '', message: 'User creation info incomplete' });
    }

    const userToInsert = { firstName, lastName, age };
    await userRepository.save(userToInsert);

    return res.status(201).send(`User ${firstName} ${lastName} inserted`);
  } catch (err) {
    return res.status(400).send({ error: err, message: 'User creation failed' });
  }
});

export default router;
