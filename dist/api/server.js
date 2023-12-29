import express from "express";
import Connection from "../config/db.connection.js";
import "dotenv/config";
// routes
import { UserRoutes } from "./User/user.routes.js";
class App {
    constructor() {
        this.app = express();
        this.userRouter = new UserRoutes();
        this.connection = new Connection();
        // initiate config method when App class is called
        this.config();
        // connect to db
        this.connection;
        // routing
        this.userRouter.routes(this.app);
    }
    config() {
        this.app.use(express.json());
        // set port
        this.app.set("PORT", 5000);
    }
}
// immediate run App class when imported
export default new App().app;
