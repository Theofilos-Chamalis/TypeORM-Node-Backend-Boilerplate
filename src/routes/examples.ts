import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send(`<h1>Hello from ${process.env.npm_package_name} route!</h1>`);
});

export default router;
