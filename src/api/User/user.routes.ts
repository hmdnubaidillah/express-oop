import { UserController } from "./user.controller.js";
import { Application } from "express-serve-static-core";

export class UserRoutes {
  public userController: UserController = new UserController();

  routes(app: Application): void {
    app.route("/user/signup").post(this.userController.create);

    // app.route("/user");
  }
}
