import productModel from "../models/productModel.js";
import slugify from "slugify";
import fs from "fs";

//Create product
export const createProductController = async (req, res) => {
  try {
    const {name, slug, description, price, category, quantity, shipping} = req.fields
    const {photo} = req.files
    //validation
    switch (true) {
        case !name:
            return res.status(500).send({error: "Name is required"});
        case !description:
            return res.status(500).send({error: "Description is required"});
        case !price:
            return res.status(500).send({error: "Price is required"});
        case !category:
            return res.status(500).send({error: "Category is required"});
        case !quantity:
            return res.status(500).send({error: "Quantity is required"});
        case photo && photo.size > 1000000:
            return res.status(500).send({error: "Photo is required and size must be less than 1MB"}); 
    }
    const products = new productModel({...req.fields, slug: slugify(name)})
    if(photo) {
        products.photo.data = fs.readFileSync(photo.path);
        products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
        success: true,
        message: "Product Created Successfully ",
        products
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};

//Update Product
export const updateProductController = async (req, res) => {};

//Get all product
export const productController = async (req, res) => {};

//Get single product
export const singleProductController = async (req, res) => {};

//Get Product Photo
export const productPhotoController = async (req, res) => {};

//Delete product
export const deleteProductController = async (req, res) => {};
