import express from "express";
import { handleAddToCart } from "../Controller/cartControlller.js";
const router=express.Router();

router.post("/add",handleAddToCart)


export default router;