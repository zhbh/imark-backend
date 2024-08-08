import express, { Request, Response, NextFunction } from 'express';
import { Events } from '../model';

var router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const eventsModel = new Events(req.body);
  console.log("🚀 ~ router.post ~ req.body:", req.body)
  const events = await eventsModel.save();

  return res.status(200).json({ message: 'Add the event successfully.' });
});

router.get('/', async (req: Request, res: Response) => {
  const { current = 1, pageSize = 10, name, category } = req.query;
  const total = await Events.countDocuments({
    ...(name && { name }),
    ...(category && { category }),
  });
  console.log("🚀 ~ router.get ~ total:", total) 
});

export default router;