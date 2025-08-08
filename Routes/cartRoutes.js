import express from "express";
import { handleAddToCart, handleRemoveProduct, handleUpdateQuantity,handleCartItems } from "../Controller/cartControlller.js";
const router=express.Router();

router.post("/add",handleAddToCart)
router.put("/:id",handleUpdateQuantity)
router.delete("/:id",handleRemoveProduct)
router.get("/",handleCartItems)



export default router;