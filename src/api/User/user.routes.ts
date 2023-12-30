import { UserController } from "./user.controller.js";
import { Application } from "express-serve-static-core";

export class UserRoutes {
  public userController: UserController = new UserController(null);

  routes(app: Application): void {
    app.route("/user").get(this.userController.getAll.bind(this.userController));
    app.route("/user/:id").get(this.userController.getIndividual.bind(this.userController));
    app.route("/user/signup").post(this.userController.create.bind(this.userController));
    app.route("/user/delete/:id").delete(this.userController.delete.bind(this.userController));
  }
}
