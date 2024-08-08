import mongoose from "mongoose";
import eventsSchema from "./eventsModel";

var uri = "mongodb://test:test@ac-agmggzi-shard-00-00.6cniiol.mongodb.net:27017,ac-agmggzi-shard-00-01.6cniiol.mongodb.net:27017,ac-agmggzi-shard-00-02.6cniiol.mongodb.net:27017/?ssl=true&replicaSet=atlas-llj3gt-shard-0&authSource=admin&retryWrites=true&w=majority&appName=imark-cluster";

async function main() {
    await mongoose.connect(uri);
}

main()
    .then((res) => {
        console.log("mongo connected success");
    })
    .catch(() => {
        console.log("mongo connected fail");
    });


const Events = mongoose.model("Events", eventsSchema);

export { Events };