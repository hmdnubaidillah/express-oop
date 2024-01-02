import "dotenv/config";
import express, { Application } from "express";
import Database from "./database/db.js";
import routesUser from "./routes/routes.user.js";
import routesProduct from "./routes/routes.product.js";
import cors from "cors";

class App {
  public app: Application = express();
  private database = new Database();

  constructor() {
    // server init
    this.server();

    // route init
    this.routes();

    // database connect
    this.database.connect();
  }

  private server(): void {
    this.app.use(express.json());

    this.app.use(
      cors({
        methods: ["GET", "POST", "PATCH", "DELETE"],
        origin: process.env.CLIENT_URL,
      })
    );

    this.app.use(express.static("public"));
  }

  private routes(): void {
    this.app.use("/user", routesUser);
    this.app.use("/product", routesProduct);
  }
}

export default new App().app;
