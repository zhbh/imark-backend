import express, { Express, Request, Response, NextFunction } from 'express';
import { User } from '../model';
var router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ name, password });
    console.log("🚀 ~ router.post ~ user:", user)

    if (!user) return res.status(500).json({ message: 'The username or he password is not correct' });
    
    const data = user?.toJSON();
    delete data?.password;

    (req.session as any).user = user;

    return res.status(200).json({ data, success: true });
  } catch (error) {
    return res.status(500).json({ message: 'The username or he password is not correct' });
  }
});

export default router;
