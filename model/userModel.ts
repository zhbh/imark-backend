import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nickName: {
    type: String,
  },
  password: {
    type: String,
  },
  sex: {
    type: String,
  },
  status: {
    type: String,
    default: "on",
  },
  role: {
    type: String,
    default: "user",
  },
  createdTime: {
    type: Number,
    default: Date.now(),
  },
  updatedTime: {
    type: Number,
    default: Date.now(),
  },
});

export default userSchema;
