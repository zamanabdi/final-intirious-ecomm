import express from 'express';
const router = express.Router();
import { createProduct, getProductById, getProducts, updateProduct,deleteProduct,createProductReview} from '../controllers/productController.js';
import {admin,protect} from '../middlewares/authMiddleware.js';

import checkObjectId from '../middlewares/checkObjectId.js';

router.route("/").get(getProducts).post(protect,admin,createProduct);
router.route("/:id").get(checkObjectId, getProductById).put(protect,admin,checkObjectId,updateProduct).delete(protect,admin,checkObjectId,deleteProduct);

router.route('/:id/reviews').post(protect,checkObjectId,createProductReview);



 export default router;