import express from "express";
import Product from "../model/Product.js";
import { verifyAdmin } from "../utils/verifyToken.js";

import { createProduct, 
         deleteProduct, 
         getProduct, 
         getProducts, updateProduct } from "../controller/product.js";

import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router()


// CREATE
router.post("/create", createProduct)

// UPDATE
router.put("/find/:id",  updateProduct)

// DELETE
router.delete("/find/:id",verifyToken,  deleteProduct)

// GET
router.get("/find/:id", getProduct)

// GET ALL

router.get("/", getProducts)

export default router