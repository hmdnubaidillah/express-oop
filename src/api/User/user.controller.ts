import { Request, Response } from "express";
import { User } from "./user.model.js";
import promiseResolver from "../../lib/promiseResolver.js";

export class UserController {
  public async create(req: Request, res: Response) {
    const newUser = await new User(req.body).save();

    const [data, error] = await promiseResolver(newUser);

    if (data) {
      res.status(201).json({ user: newUser, success: true });
    }

    if (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
}
