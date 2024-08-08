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
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const eventsModel = new model_1.Events(req.body);
    console.log("🚀 ~ router.post ~ req.body:", req.body);
    const events = yield eventsModel.save();
    return res.status(200).json({ message: 'Add the event successfully.' });
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { current = 1, pageSize = 10, name, category } = req.query;
    const total = yield model_1.Events.countDocuments(Object.assign(Object.assign({}, (name && { name })), (category && { category })));
    console.log("🚀 ~ router.get ~ total:", total);
}));
exports.default = router;
