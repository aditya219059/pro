import express from "express";
import formidable from "express-formidable";
import {
  createProductController,
  deleteProductController,
  productController,
  productPhotoController,
  singleProductController,
  updateProductController,
} from "../controllers/productController.js";
import { isAdmin, requireSign } from "../middlewares/authMiddleware.js";

const router = express.Router();

//Router
//Create Product
router.post("/create-product", requireSign, isAdmin, formidable(), createProductController);

//Update Product
router.put(
  "/update-product/:pid",
  requireSign,
  isAdmin,
  formidable(),
  updateProductController
);

//Get all product
router.get("/get-product", productController);

//Get single product
router.get("/single-product/:slug", singleProductController);

//Get Product Photo
router.get("/single-product/:pid", productPhotoController);

//Product photo
router.get("/product-photo/:pid", productPhotoController);

//Delete Product
router.delete(
  "/delete-product/:pid",
  requireSign,
  isAdmin,
  formidable(),
  deleteProductController
);

export default router;
