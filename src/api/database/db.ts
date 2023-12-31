import mongoose from "mongoose";

class Database {
  public connect(): void {
    const url = process.env.MONGO_URL;

    mongoose.connect(url!, {
      dbName: "ts-oop",
    });

    mongoose.connection.on("connected", () => {
      console.log("Databse is connected");
    });

    mongoose.connection.on("error", (err) => {
      console.log("Database failed to connect", err);
    });
  }
}

export default Database;
