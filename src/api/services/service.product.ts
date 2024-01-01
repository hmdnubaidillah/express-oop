import { Request, Response } from "express";
import { Product } from "../models/model.product.js";
import { apiResponse } from "../helpers/helper.apiResponse.js";
import { StatusCodes as status } from "http-status-codes";

export class ServiceProduct {
  async getAllProductsService(req: Request, res: Response) {
    try {
      const products = await Product.find();

      return Promise.resolve(apiResponse(status.OK, "Successfully get all products", products));
    } catch (error: any) {
      console.log(error);
      return Promise.reject(
        apiResponse(error.statusCode || status.NOT_FOUND, error.message || "Failed to get all products")
      );
    }
  }

  async getProductService(req: Request, res: Response) {
    try {
      const product = await Product.findById(req.params.id);

      return Promise.resolve(apiResponse(status.OK, "Successfully get product", product));
    } catch (error: any) {
      return Promise.reject(
        apiResponse(error.statusCode || status.NOT_FOUND, error.message || "Failed to get product")
      );
    }
  }

  async searchProductService(req: Request, res: Response) {
    try {
      const query = req.query.q;
      const products = await Product.find({ query });

      return apiResponse(status.OK, "Successfully find product", products);
    } catch (error: any) {
      return apiResponse(error.statusCode || status.NOT_FOUND, error.message || "Failed to find product");
    }
  }

  async createProductService(req: Request, res: Response) {
    try {
      const existingProduct = await Product.find();

      if (existingProduct.some((product) => product.name === req.body.name)) {
        return apiResponse(status.INTERNAL_SERVER_ERROR, "Duplicate product");
      }

      const newProduct = new Product(req.body);
      await newProduct.save();
      return Promise.resolve(apiResponse(status.CREATED, "Product created", newProduct));
    } catch (error: any) {
      return Promise.reject(
        apiResponse(error.statusCode || status.INTERNAL_SERVER_ERROR, error.message || "Failed to create product")
      );
    }
  }

  async editProductService(req: Request, res: Response) {}

  async deleteProductService(req: Request, res: Response) {}
}
