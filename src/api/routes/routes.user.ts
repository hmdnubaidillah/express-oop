import { Router } from "express";
import { ControllerUser } from "../controllers/controller.user.js";

class UserRoute extends ControllerUser {
  private router: Router;
  constructor() {
    super();
    this.router = Router() as Router;
  }

  public routes(): Router {
    this.router.get("/:id", this.findUserController);
    this.router.post("/register", this.registerUserController);
    this.router.post("/login", this.authUserController);

    return this.router;
  }
}

export default new UserRoute().routes();
