import express from 'express';
const router = express.Router();
import { addOrderItems,
    getMyOrders,
    getOrderById,
    getOrders,
    updateOrderToDelivered,
    updateOrderToPaid
} from '../controllers/orderController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

router.route("/").post(protect,addOrderItems).get(protect,admin,getOrders);
router.route('/mine').get(protect,getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/pay").post(updateOrderToPaid);
router.route("/:id/deliver").put(protect,admin,updateOrderToDelivered);


export default router;