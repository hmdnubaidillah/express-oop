import { Router } from "express";
import { ControllerProduct } from "../controllers/controller.product.js";

class ProductRoutes extends ControllerProduct {
  private router: Router;

  constructor() {
    super();
    this.router = Router() as Router;
  }

  public routes(): Router {
    this.router.get("/", this.getAllProductsController);
    this.router.post("/new", this.createProductController);
    this.router.patch("/edit/:id", this.editProductController);
    this.router.delete("/delete/:id", this.deleteProductController);

    this.router.get("/search", this.searchProductController);
    this.router.get("/:id", this.getProductController);
    return this.router;
  }
}

export default new ProductRoutes().routes();
