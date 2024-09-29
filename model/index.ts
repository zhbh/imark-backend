import mongoose from "mongoose";
import eventsSchema from "./eventsModel";
import userSchema from "./userModel";
import categorySchema from "./categoryModel";
import favoriteSchema from "./favoriteModel";

import dotenv from "dotenv"; 
dotenv.config();

async function main() {
    await mongoose.connect( "mongodb://test:test@ac-agmggzi-shard-00-00.6cniiol.mongodb.net:27017,ac-agmggzi-shard-00-01.6cniiol.mongodb.net:27017,ac-agmggzi-shard-00-02.6cniiol.mongodb.net:27017/?ssl=true&replicaSet=atlas-llj3gt-shard-0&authSource=admin&retryWrites=true&w=majority&appName=imark-cluster" || "");
}

main()
    .then((res) => {
        console.log("mongo connected success");
    })
    .catch(() => {
        console.log("mongo connected fail");
    });


const Events = mongoose.model("Events", eventsSchema);
const User = mongoose.model("User", userSchema);
const Category = mongoose.model("Category", categorySchema);
const Favorite = mongoose.model("Favorite", favoriteSchema);

export { Events, User, Category, Favorite, };