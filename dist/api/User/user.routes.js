import { UserController } from "./user.controller.js";
export class UserRoutes {
    constructor() {
        this.userController = new UserController();
    }
    routes(app) {
        app.route("/user/signup").post(this.userController.create);
        // app.route("/user");
    }
}
