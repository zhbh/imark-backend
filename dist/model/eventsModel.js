"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const eventsSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
    },
    expirationTime: {
        type: Number,
    },
    // category: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Category',
    // },
    // location: {
    //     type: Number,
    //     default: 0,
    // },
    createTime: {
        type: Number,
        default: Date.now(),
    },
});
exports.default = eventsSchema;
