"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_1 = require("../model");
var router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    try {
        const user = yield model_1.User.findOne({ name });
        if (!user)
            return res.status(500).json({ message: "The user does not exist" });
        const userAndpassword = yield model_1.User.findOne({ name, password });
        if (!userAndpassword)
            return res.status(500).json({ message: "The username or password is not correct" });
        if (user.status == "off")
            return res.status(500).json({ message: "The user is forbidden to log in" });
        const data = user === null || user === void 0 ? void 0 : user.toJSON();
        data === null || data === void 0 ? true : delete data.password;
        req.session.user = user;
        return res.status(200).json({ data, success: true });
    }
    catch (error) {
        return res.status(500).json({ message: "The user does not exist" });
    }
}));
exports.default = router;
