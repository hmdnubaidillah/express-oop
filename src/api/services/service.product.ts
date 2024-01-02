import { Request } from "express";
import { Product } from "../models/model.product.js";
import { ApiResponse, apiResponse } from "../helpers/helper.apiResponse.js";
import { StatusCodes as status } from "http-status-codes";

export class ServiceProduct {
  private static async checkForDuplicateProductName(name: string): Promise<boolean> {
    const existingProduct = await Product.findOne({ name });
    return !!existingProduct;
  }

  async getAllProductsService(req: Request): Promise<ApiResponse> {
    try {
      const products = await Product.find();

      if (products.length < 1) {
        return apiResponse(status.NOT_FOUND, "No products available", products);
      }

      return Promise.resolve(apiResponse(status.OK, "Successfully get all products", products));
    } catch (error: any) {
      console.log(error);
      return Promise.reject(
        apiResponse(error.statusCode || status.NOT_FOUND, error.message || "Failed to get products")
      );
    }
  }

  async getProductService(req: Request): Promise<ApiResponse> {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return apiResponse(status.NOT_FOUND, "No product available");
      }

      return Promise.resolve(apiResponse(status.OK, "Successfully get product", product));
    } catch (error: any) {
      return Promise.reject(
        apiResponse(error.statusCode || status.NOT_FOUND, error.message || "Failed to get product")
      );
    }
  }

  async searchProductService(req: Request): Promise<ApiResponse> {
    try {
      const query: string = req.query.q as string;
      const regEx: RegExp = new RegExp(query, "i");

      const products = await Product.find({ name: regEx });

      if (products.length < 1) {
        return apiResponse(status.NOT_FOUND, "Product not found", products);
      }

      return Promise.resolve(apiResponse(status.OK, "Successfully find product", products));
    } catch (error: any) {
      return Promise.reject(
        apiResponse(error.statusCode || status.NOT_FOUND, error.message || "Failed to find product")
      );
    }
  }

  async createProductService(req: Request): Promise<ApiResponse> {
    try {
      const existingProduct = await ServiceProduct.checkForDuplicateProductName(req.body.name);

      if (existingProduct) {
        return apiResponse(status.CONFLICT, "Duplicate product");
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

  async editProductService(req: Request): Promise<ApiResponse> {
    try {
      const existingProduct = await ServiceProduct.checkForDuplicateProductName(req.body.name);

      if (existingProduct) {
        return apiResponse(status.CONFLICT, "Duplicate product");
      }

      const productToEdit = await Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        quantity: req.body.quantity,
        category: req.body.category,
        desc: req.body.desc,
      });

      if (!productToEdit) {
        return apiResponse(status.NOT_FOUND, "Product not found");
      }

      await productToEdit.save();
      return Promise.resolve(apiResponse(status.OK, "Product edited", productToEdit));
    } catch (error: any) {
      return Promise.reject(
        apiResponse(error.statusCode || status.INTERNAL_SERVER_ERROR, error.message || "Failed to edit product")
      );
    }
  }

  async deleteProductService(req: Request): Promise<ApiResponse> {
    try {
      const productToDelete = await Product.findByIdAndDelete(req.params.id);

      if (!productToDelete) {
        return apiResponse(status.NOT_FOUND, "Product not found");
      }

      return Promise.resolve(apiResponse(status.OK, "Product deleted", productToDelete));
    } catch (error: any) {
      return Promise.reject(
        apiResponse(error.statusCode || status.INTERNAL_SERVER_ERROR, error.message || "Failed to delete product")
      );
    }
  }
}
