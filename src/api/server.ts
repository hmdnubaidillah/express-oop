import "dotenv/config";
import express, { Application } from "express";
import Database from "./database/db.js";
import routesUser from "./routes/routes.user.js";

class App {
  public app: Application = express();
  private database = new Database();

  constructor() {
    // server init
    this.server();

    // route init
    this.routes();

    this.database.connect();
  }

  private server(): void {
    this.app.use(express.json());

    this.app.use(express.static("public"));
  }

  private routes(): void {
    this.app.use(`/user`, routesUser);
  }
}

export default new App().app;
