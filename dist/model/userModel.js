"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
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
        default: "male"
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
exports.default = userSchema;
