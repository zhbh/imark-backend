import express, { Express, Request, Response, NextFunction } from 'express';
import { User } from '../model';
var router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { name } = req.body;
  const userModel = new User(req.body);

  const oldUser = await User.findOne({ name });

  if (!oldUser) {
    await userModel.save();
    return res.status(200).json({ success: true });
  } else {
    return res.status(500).json({ message: "The user exists" });
  }
});

export default router;
