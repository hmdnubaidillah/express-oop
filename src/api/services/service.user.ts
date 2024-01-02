import { User } from "../models/model.user.js";
import { Request, Response } from "express";
import { ApiResponse, apiResponse } from "../helpers/helper.apiResponse.js";
import { StatusCodes as status } from "http-status-codes";
import { hashPassword, comparePassword } from "../libs/lib.bcrypt.js";
import { signToken } from "../libs/lib.jwt.js";

export class ServiceUser {
  async findUserService(req: Request) {
    try {
      const user = await User.findById(req.params.id);

      return Promise.resolve(apiResponse(status.OK, `Successfully get user`, user));
    } catch (error: any) {
      console.log(error);
      return Promise.reject(apiResponse(status.NOT_FOUND, "Cant get user", error.message));
    }
  }

  async registerUserService(req: Request): Promise<ApiResponse> {
    try {
      const existingUsers = await User.find();

      if (existingUsers.some((user) => user.username === req.body.username)) {
        return apiResponse(status.INTERNAL_SERVER_ERROR, `Duplicate username ${req.body.username} already exist`);
      }

      const hashedPassword = await hashPassword(req.body.password);
      const newUser = new User({ ...req.body, password: hashedPassword });
      await newUser.save();
      return Promise.resolve(apiResponse(status.CREATED, "User created", newUser));
    } catch (error: any) {
      console.log(error);
      return Promise.reject(apiResponse(status.INTERNAL_SERVER_ERROR || error.statusCode, error.message));
    }
  }

  async userAuthService(req: Request): Promise<ApiResponse> {
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

      const token = await signToken(user._id);

      return Promise.resolve(apiResponse(status.OK, "Login success", { user, token }));
    } catch (error: any) {
      console.log(error);

      return Promise.reject(apiResponse(error.statusCode || status.INTERNAL_SERVER_ERROR, error.statusMessage));
    }
  }
}
