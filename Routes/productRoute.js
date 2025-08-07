import express from "express";
import { handleAddProduct,handleGetAllProducts,handleGetProduct } from "../Controller/productController.js";

const router=express.Router();

router.post("/",handleAddProduct);
router.get("/",handleGetAllProducts);
router.get("/:id",handleGetProduct);

export default router;