import { UserRoutes } from "./User/user.routes.js";
export class Routes {
    constructor() {
        this.userRouter = new UserRoutes();
    }
    userRoutes(app) {
        app.route("/user", this.userRouter);
    }
}
