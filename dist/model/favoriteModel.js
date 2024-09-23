"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const favoriteSchema = new mongoose_1.default.Schema({
    event: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Events",
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    createDAt: {
        type: Number,
        default: Date.now(),
    },
});
exports.default = favoriteSchema;
