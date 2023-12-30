import { Request, Response } from "express";
import { User } from "./user.model.js";
import { PromiseResolver } from "../../lib/promiseResolver.js";
import { UserError } from "./Errors/user.error.js";

export class UserController {
  constructor(public message: string | null) {}

  private promiseResolver: PromiseResolver = new PromiseResolver();
  private userError: UserError = new UserError();

  public async create(req: Request, res: Response) {
    try {
      const newUser = await new User(req.body).save();
      return res.status(201).json({ user: newUser, success: true });
    } catch (err: unknown) {
      this.message = err instanceof Error ? err.message : "Unknown error";

      // console.log(this.userError.error(this.message));
      console.log(this.message, typeof this.message);
      return res.status(500).json({ message: "Cant create user", success: false });
    }
  }

  public async getAll(req: Request, res: Response) {
    const users = await User.find();

    const [data, error] = await this.promiseResolver.resolve(users);

    if (data) {
      return res.status(200).json({ user: users, success: true });
    }
    if (error) {
      console.log(error);
      return res.status(404).json({ message: "Cant fetch all user", success: false });
    }
  }

  public async getIndividual(req: Request, res: Response) {
    const user = await User.findById(req.params.id);

    const [data, error] = await this.promiseResolver.resolve(user);

    if (data) {
      return res.status(200).json({ user, success: true });
    }
    if (error) {
      console.log(error);

      return res.status(404).json({ message: "Cant fetch user", success: false });
    }
  }

  public async delete(req: Request, res: Response) {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    const [data, error] = await this.promiseResolver.resolve(deletedUser);

    if (data) {
      return res.status(204).json({ message: "user deleted", success: true });
    }

    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Cant delete user", success: false });
    }
  }
}
