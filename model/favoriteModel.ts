import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Events",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createDAt: {
    type: Number,
    default: Date.now(),
  },
});

export default favoriteSchema;
