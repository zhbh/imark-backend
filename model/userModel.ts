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
  },
  role: {
    type: String,
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
