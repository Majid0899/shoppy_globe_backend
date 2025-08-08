import express from "express";
import { handleAddProduct,handleGetAllProducts,handleGetProduct,handleUpdateProduct,handleDeleteProduct } from "../Controller/productController.js";

const router=express.Router();

router.post("/",handleAddProduct);
router.get("/",handleGetAllProducts);
router.get("/:id",handleGetProduct);
router.put("/:id",handleUpdateProduct);
router.delete("/:id",handleDeleteProduct);

export default router;