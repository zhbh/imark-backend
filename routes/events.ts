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
  const { current = 1, pageSize = 10, title, content, user, category, all } = req.query;
  console.log("🚀 ~ router.get ~ user:", user)

  const session = req.session as any;
  let currentUser = all ? null : user;
  if (!all && session.user && session.user.role === "user") {
    currentUser = session.user._id;
  }

  const total = await Events.countDocuments({
    ...(currentUser && { currentUser }),
    ...(title && { title }),
    ...(content && { content }),
    ...(category && { category }),
  });
  console.log("🚀 ~ router.get ~ total:", total)

  const data = await Events.find({
    ...(currentUser && { user: currentUser }),
    ...(title && { title: new RegExp(`${title}`, "i") }),
    ...(content && { content: new RegExp(`${content}`, "i") }),
    ...(category && { category }),
  })
    .sort({ expirationTime: -1 })
    .skip((Number(current) - 1) * Number(pageSize))
    .limit(Number(pageSize));

  console.log("🚀 ~ router.get ~ data:", data)

  return res.status(200).json({ data, total });
});

router.get('/:id', async (req: Request, res: Response) => {
  const record = await Events.findOne({ _id: req.params.id });
  console.log("🚀 ~ router.get ~ record:", record)

  if (record) {
    res.status(200).json({ data: record, success: true });
  } else {
    res.status(500).json({ message: 'The event does not exist.' });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    await Events.findOneAndUpdate({ _id: req.params.id }, req.body);
    console.log("🚀 ~ router.put ~ req.body:", req.body)

    return res.status(200).json();
  } catch (error) {
    return res.status(500).json({ error });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  const record = await Events.findById(req.params.id);
  console.log("🚀 ~ router.delete ~ record:", record)

  if (record) {
    await record.deleteOne({ _id: req.params.id });
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ message: 'The event does not exist.' });
  }
});

export default router;