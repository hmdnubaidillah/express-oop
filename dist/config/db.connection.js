import mongoose from "mongoose";
class Connection {
    constructor() {
        const url = process.env.MONGO_URL;
        mongoose.Promise = global.Promise;
        mongoose.connect(url, {
            dbName: "ts-oop",
        });
        mongoose.connection.on("connected", () => {
            console.log("db connected");
        });
        mongoose.connection.on("error", (error) => {
            console.log("Mongoose connection. Error code: 500", error);
        });
    }
}
export default Connection;
