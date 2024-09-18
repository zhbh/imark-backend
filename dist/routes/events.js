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
    const { current = 1, pageSize = 10, title, content, user, category, all } = req.query;
    console.log("🚀 ~ router.get ~ user:", user);
    const session = req.session;
    let currentUser = all ? null : user;
    if (!all && session.user && session.user.role === "user") {
        currentUser = session.user._id;
    }
    const total = yield model_1.Events.countDocuments(Object.assign(Object.assign(Object.assign(Object.assign({}, (currentUser && { currentUser })), (title && { title })), (content && { content })), (category && { category })));
    console.log("🚀 ~ router.get ~ total:", total);
    const data = yield model_1.Events.find(Object.assign(Object.assign(Object.assign(Object.assign({}, (currentUser && { user: currentUser })), (title && { title: new RegExp(`${title}`, "i") })), (content && { content: new RegExp(`${content}`, "i") })), (category && { category })))
        .sort({ expirationTime: -1 })
        .skip((Number(current) - 1) * Number(pageSize))
        .limit(Number(pageSize));
    console.log("🚀 ~ router.get ~ data:", data);
    return res.status(200).json({ data, total });
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const record = yield model_1.Events.findOne({ _id: req.params.id });
    console.log("🚀 ~ router.get ~ record:", record);
    if (record) {
        res.status(200).json({ data: record, success: true });
    }
    else {
        res.status(500).json({ message: 'The event does not exist.' });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield model_1.Events.findOneAndUpdate({ _id: req.params.id }, req.body);
        console.log("🚀 ~ router.put ~ req.body:", req.body);
        return res.status(200).json();
    }
    catch (error) {
        return res.status(500).json({ error });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const record = yield model_1.Events.findById(req.params.id);
    console.log("🚀 ~ router.delete ~ record:", record);
    if (record) {
        yield record.deleteOne({ _id: req.params.id });
        res.status(200).json({ success: true });
    }
    else {
        res.status(500).json({ message: 'The event does not exist.' });
    }
}));
exports.default = router;
