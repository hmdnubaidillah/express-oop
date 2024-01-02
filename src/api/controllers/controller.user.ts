import { Request, Response } from "express";
import { OutgoingMessage } from "http";

import { ServiceUser } from "../services/service.user.js";
import { ApiResponse } from "../helpers/helper.apiResponse.js";

export class ControllerUser extends ServiceUser {
  async findUserController(req: Request, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponds: ApiResponse = await super.findUserService(req);
      return res.status(serviceResponds.statusCode).json(serviceResponds);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  }

  async registerUserController(req: Request, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponds: ApiResponse = await super.registerUserService(req);

      return res.status(serviceResponds.statusCode).json(serviceResponds);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  }

  async authUserController(req: Request, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponds: ApiResponse = await super.userAuthService(req);

      return res.status(serviceResponds.statusCode).json(serviceResponds);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  }
}
