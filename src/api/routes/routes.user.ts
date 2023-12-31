import { Router } from "express";
import { ControllerUser } from "../controllers/controller.user.js";

class UserRoute extends ControllerUser {
  private router: Router;
  constructor() {
    super();
    this.router = Router() as Router;
  }

  public routes(): Router {
    this.router.get("/", this.findAllUserController);
    this.router.post("/register", this.registerUserController);

    return this.router;
  }
}

export default new UserRoute().routes();
