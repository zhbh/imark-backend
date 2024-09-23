import express, { Request, Response, NextFunction } from "express";
import { Events, User, Favorite } from "../model";
import { match } from "assert";

var router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const { current = 1, pageSize = 10, title, content, category, all } = req.query;
  console.log("🚀 ~ router.get ~ req.query:", req.query)

  const session = req.session as any;
  let currentUser;
  if (session.user) {
    currentUser = session.user._id;
  }

  const total = await Favorite.countDocuments({
    ...(currentUser && { user: currentUser }),
    // ...(title && { title }),
    // ...(content && { content: content }),
    // ...(category && { category }),
  });

  if (all != null && all) {
    const data = await Favorite.find({
      ...(currentUser && { user: currentUser }),
      // ...(title && { title: new RegExp(`${title}`, "i") }),
      // ...(content && { content: new RegExp(`${content}`, "i") }),
      // ...(category && { category }),
    })
      .populate({
        path: 'event',
        populate: {
          path: 'category',
        }
      })
      .sort({ createTime: -1 });

    res.status(200).json({ message: true, data, total });
  } else {
    const data = await Favorite.find({
      ...(currentUser && { user: currentUser }),
      // ...(title && { title: new RegExp(`${title}`, "i") }),
      // ...(content && { content: new RegExp(`${content}`, "i") }),
      // ...(category && { category }),
    })
      .populate({
        path: 'event',
        populate: {
          path: 'category',
        }
      })
      .sort({ createTime: -1 })
      .skip((Number(current) - 1) * Number(pageSize))
      .limit(Number(pageSize));

    res.status(200).json({ message: true, data, total });
  }

});

router.post("/", async (req: Request, res: Response) => {
  const { event, user } = req.body;
  const favorite = new Favorite(req.body);

  const eventData = await Events.findOne({ _id: event._id });

  if (eventData) {
    await favorite.save();
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ message: "The event does not exist." });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  const session = req.session as any;
  let currentUser;
  if (session.user) {
    currentUser = session.user._id;
  }

  const data = await Favorite.findOne({
    ...(currentUser && { user: session.user._id }),
    ...({ event: req.params.id }),
  });

  if (data) {
    res.status(200).json({ data: data, success: true });
  } else {
    res.status(500).json({ message: 'This favorite does not exist.' });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const favoriteData = await Favorite.findById(req.params.id);
  if (favoriteData) {
    await Favorite.deleteOne({ _id: req.params.id });
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ message: "The favorite does not exist." });
  }
});

export default router;
