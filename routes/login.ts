import express, { Express, Request, Response, NextFunction } from "express";
import { User } from "../model";
var router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({ name });
    if (!user) return res.status(500).json({ message: "The user does not exist" });

    const userAndpassword = await User.findOne({ name, password });
    if (!userAndpassword) return res.status(500).json({ message: "The username or password is not correct" });

    if (user.status == "off") return res.status(500).json({ message: "The user is forbidden to log in" });

    const data = user?.toJSON();
    delete data?.password;

    (req.session as any).user = user;

    return res.status(200).json({ data, success: true });
  } catch (error) {
    return res.status(500).json({ message: "The user does not exist" });
  }
});

export default router;
