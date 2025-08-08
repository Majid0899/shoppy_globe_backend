import express from 'express'
import { handleAddUser,handleLoginUser } from '../Controller/userController.js';

const router=express.Router();


router.post("/signin",handleAddUser);
router.post("/login",handleLoginUser);

export default router