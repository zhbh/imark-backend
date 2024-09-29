import mongoose from "mongoose";
import eventsSchema from "./eventsModel";
import userSchema from "./userModel";
import categorySchema from "./categoryModel";
import favoriteSchema from "./favoriteModel";

import dotenvx from "@dotenvx/dotenvx"; 
dotenvx.config();

async function main() {
    await mongoose.connect( process.env.MONGODB_URI || "");
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