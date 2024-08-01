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
const mongoose_1 = __importDefault(require("mongoose"));
var uri = "mongodb://test:test@ac-agmggzi-shard-00-00.6cniiol.mongodb.net:27017,ac-agmggzi-shard-00-01.6cniiol.mongodb.net:27017,ac-agmggzi-shard-00-02.6cniiol.mongodb.net:27017/?ssl=true&replicaSet=atlas-llj3gt-shard-0&authSource=admin&retryWrites=true&w=majority&appName=imark-cluster";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(uri);
    });
}
main()
    .then((res) => {
    console.log("mongo connected success");
})
    .catch(() => {
    console.log("mongo connected fail");
});
