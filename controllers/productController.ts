import { Request, Response } from "express";
import { Product } from "../models/Product";
import { StatusCodes } from "http-status-codes";

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.find({ user: req.user.userId });
  if (products.length === 0)
    return res
      .status(StatusCodes.OK)
      .json({ msg: "No products found for this user" });
  res.json({ products, count: products.length });
};

export const createProduct = async (req: Request, res: Response) => {
  // we wanna attach the current (admin) userId to the body through user prop which matches the schema
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

export const getSingleProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const product = await Product.findOne({ _id: productId });
  if (!product)
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No product with ID ${productId} was found` });
  res.json({ product });
};

export const updateProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const product = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
  });
  if (!product)
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No product with ID ${productId} was found to be updated` });
  res.json({ product });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const product = await Product.findByIdAndDelete(productId);
  if (!product)
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No product with ID ${productId} was found to be updated` });
  res.json({ msg: `Product ID ${productId} has been deleted` });
};

export const uploadImage = async (req: Request, res: Response) => {
  res.json({ msg: "upload image" });
};
