import { Request, Response } from "express";
import { OutgoingMessage } from "http";

import { UserService } from "../services/service.user.js";
import { ApiResponse } from "../helpers/helper.apiResponse.js";

export class ControllerUser extends UserService {
  constructor() {
    super();
  }

  async findAllUserController(req: Request, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponds: ApiResponse = await super.findAllUserService(req, res);

      return res.status(serviceResponds.statusCode).json(serviceResponds);
    } catch (error: any) {
      console.log(error);
      return res.status(error.statusCode).json(error);
    }
  }

  async registerUserController(req: Request, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponds: ApiResponse = await super.registerUserService(req, res);

      return res.status(serviceResponds.statusCode).json(serviceResponds);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  }
}
