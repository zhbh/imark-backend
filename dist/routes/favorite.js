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
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { current = 1, pageSize = 10, title, content, category, all } = req.query;
    console.log("🚀 ~ router.get ~ req.query:", req.query);
    const session = req.session;
    let currentUser;
    if (session.user) {
        currentUser = session.user._id;
    }
    const total = yield model_1.Favorite.countDocuments(Object.assign({}, (currentUser && { user: currentUser })));
    if (all != null && all) {
        const data = yield model_1.Favorite.find(Object.assign({}, (currentUser && { user: currentUser })))
            .populate({
            path: 'event',
            populate: {
                path: 'category',
            }
        })
            .sort({ createTime: -1 });
        res.status(200).json({ message: true, data, total });
    }
    else {
        const data = yield model_1.Favorite.find(Object.assign({}, (currentUser && { user: currentUser })))
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
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { event, user } = req.body;
    const favorite = new model_1.Favorite(req.body);
    const eventData = yield model_1.Events.findOne({ _id: event._id });
    if (eventData) {
        yield favorite.save();
        res.status(200).json({ success: true });
    }
    else {
        res.status(500).json({ message: "The event does not exist." });
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = req.session;
    let currentUser;
    if (session.user) {
        currentUser = session.user._id;
    }
    const data = yield model_1.Favorite.findOne(Object.assign(Object.assign({}, (currentUser && { user: session.user._id })), ({ event: req.params.id })));
    if (data) {
        res.status(200).json({ data: data, success: true });
    }
    else {
        res.status(500).json({ message: 'This favorite does not exist.' });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const favoriteData = yield model_1.Favorite.findById(req.params.id);
    if (favoriteData) {
        yield model_1.Favorite.deleteOne({ _id: req.params.id });
        res.status(200).json({ success: true });
    }
    else {
        res.status(500).json({ message: "The favorite does not exist." });
    }
}));
exports.default = router;
