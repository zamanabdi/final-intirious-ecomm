import express from 'express';
const router = express.Router();
import { createProduct, getProductById, getProducts, updateProduct,deleteProduct,createProductReview} from '../controllers/productController.js';
import {admin,protect} from '../middlewares/authMiddleware.js'

router.route("/").get(getProducts).post(protect,admin,createProduct);
router.route("/:id").get(getProductById).put(protect,admin,updateProduct).delete(protect,admin,deleteProduct);

router.route('/:id/reviews').post(protect,createProductReview);



 export default router;