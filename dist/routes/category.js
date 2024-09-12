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
    const { name, level, pageSize, current } = req.query;
    const total = yield model_1.Category.countDocuments(req.body);
    const data = yield model_1.Category.find(Object.assign({}, (name && { name })))
        .skip((Number(current) - 1) * Number(pageSize))
        .sort({ updatedAt: -1 });
    return res.status(200).json({ data, success: true, total });
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const category = new model_1.Category(req.body);
    const oldCategory = yield model_1.Category.findOne({ name });
    if (!oldCategory) {
        yield category.save();
        return res.status(200).json({ success: true });
    }
    else {
        return res.status(500).json({ message: "The category exists." });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield model_1.Category.findById(req.params.id);
    if (category) {
        yield model_1.Category.deleteOne({
            _id: req.params.id,
        });
        return res.status(200).json({ success: true });
    }
    else {
        return res.status(500).json({ message: "The category does not exist." });
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield model_1.Category.findByIdAndUpdate(req.params.id, req.body);
    if (category) {
        res.status(200).json({ success: true });
    }
    else {
        res.status(500).json({ message: "This category does not exist." });
    }
}));
exports.default = router;
