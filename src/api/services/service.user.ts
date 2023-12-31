import { User } from "../models/model.user.js";
import { Request, Response } from "express";
import { ApiResponse, apiResponse } from "../helpers/helper.apiResponse.js";
import { StatusCodes as status } from "http-status-codes";
import { hashPassword, comparePassword } from "../libs/lib.bcrypt.js";

export class ServiceUser {
  async findAllUserService(req: Request, res: Response): Promise<ApiResponse> {
    try {
      const users = await User.find();

      return Promise.resolve(apiResponse(status.OK, "Successfully get all users", users));
    } catch (error: any) {
      console.log(error);
      return Promise.reject(apiResponse(status.NOT_FOUND, "Cant get all users", error.message));
    }
  }

  async findUserService(req: Request, res: Response) {
    try {
      const user = await User.findById(req.params.id);

      return Promise.resolve(apiResponse(status.OK, `Successfully get user`, user));
    } catch (error: any) {
      console.log(error);
      return Promise.reject(apiResponse(status.NOT_FOUND, "Cant get user", error.message));
    }
  }

  async registerUserService(req: Request, res: Response): Promise<ApiResponse> {
    try {
      const hashedPassword = await hashPassword(req.body.password);

      const newUser = new User({ ...req.body, password: hashedPassword });

      await newUser.save();

      return Promise.resolve(apiResponse(status.CREATED, "User created", newUser));
    } catch (error: any) {
      let errMsg: string = "";

      if (error.code === 11000) {
        errMsg = `Duplicate username ${req.body.username} already exist`;
      }

      console.log(error);
      return Promise.reject(apiResponse(status.INTERNAL_SERVER_ERROR, errMsg));
    }
  }

  async userAuthService(req: Request, res: Response): Promise<ApiResponse> {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        throw apiResponse(status.NOT_FOUND, "Username not found");
      }

      const auth = await comparePassword(password, user.password);

      if (!auth) {
        throw apiResponse(status.FORBIDDEN, "Password incorrect");
      }

      return Promise.resolve(apiResponse(status.OK, "Login success", user));
    } catch (error: any) {
      console.log(error);

      return Promise.reject(apiResponse(error.statusCode || status.INTERNAL_SERVER_ERROR, error.statusMessage));
    }
  }
}
