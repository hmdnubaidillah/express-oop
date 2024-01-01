import { Request, Response } from "express";
import { OutgoingMessage } from "http";

import { ApiResponse } from "../helpers/helper.apiResponse.js";
import { ServiceProduct } from "../services/service.product.js";

export class ControllerProduct extends ServiceProduct {
  async getAllProductsController(req: Request, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponds: ApiResponse = await super.getAllProductsService(req, res);

      return res.status(serviceResponds.statusCode).json(serviceResponds);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  }

  async getProductController(req: Request, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponds: ApiResponse = await super.getProductService(req, res);
      return res.status(serviceResponds.statusCode).json(serviceResponds);
    } catch (error: any) {
      return res.status(error.statusCode).json(error);
    }
  }

  async searchProductController(req: Request, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponds: ApiResponse = await super.searchProductService(req, res);

      return res.status(serviceResponds.statusCode).json(serviceResponds);
    } catch (error: any) {
      console.log(error);
      return res.status(error.statusCode).json(error);
    }
  }

  async createProductController(req: Request, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponds: ApiResponse = await super.createProductService(req, res);

      return res.status(serviceResponds.statusCode).json(serviceResponds);
    } catch (error: any) {
      console.log(error);
      return res.status(error.statusCode).json(error);
    }
  }

  async editProductController(req: Request, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponds: ApiResponse = await super.searchProductService(req, res);

      return res.status(serviceResponds.statusCode).json(serviceResponds);
    } catch (error: any) {
      console.log(error);
      return res.status(error.statusCode).json(error);
    }
  }

  async deleteProductController(req: Request, res: Response): Promise<OutgoingMessage> {
    try {
      const serviceResponds: ApiResponse = await super.searchProductService(req, res);

      return res.status(serviceResponds.statusCode).json(serviceResponds);
    } catch (error: any) {
      console.log(error);
      return res.status(error.statusCode).json(error);
    }
  }
}
