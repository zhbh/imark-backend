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
exports.Favorite = exports.Category = exports.User = exports.Events = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const eventsModel_1 = __importDefault(require("./eventsModel"));
const userModel_1 = __importDefault(require("./userModel"));
const categoryModel_1 = __importDefault(require("./categoryModel"));
const favoriteModel_1 = __importDefault(require("./favoriteModel"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(process.env.MONGODB_URI || "");
    });
}
main()
    .then((res) => {
    console.log("mongo connected success");
})
    .catch(() => {
    console.log("mongo connected fail");
});
const Events = mongoose_1.default.model("Events", eventsModel_1.default);
exports.Events = Events;
const User = mongoose_1.default.model("User", userModel_1.default);
exports.User = User;
const Category = mongoose_1.default.model("Category", categoryModel_1.default);
exports.Category = Category;
const Favorite = mongoose_1.default.model("Favorite", favoriteModel_1.default);
exports.Favorite = Favorite;
