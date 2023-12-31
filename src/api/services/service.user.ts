import { User } from "../models/model.user.js";
import { Request, Response } from "express";
import { ApiResponse, apiResponse } from "../helpers/helper.apiResponse.js";
import { StatusCodes as status } from "http-status-codes";

export class UserService {
  async findAllUserService(req: Request, res: Response): Promise<ApiResponse> {
    try {
      const users = await User.find();

      return Promise.resolve(apiResponse(status.OK, "Successfully get all users", users));
    } catch (error) {
      console.log(error);
      return Promise.reject(apiResponse(status.NOT_FOUND, "Cant get all users"));
    }
  }

  async registerUserService(req: Request, res: Response): Promise<ApiResponse> {
    try {
      const newUser = new User(req.body);

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
}
