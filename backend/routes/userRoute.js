import express from 'express';
const router = express.Router();
import {getUserById,logoutUser,registerUser,getUserProfile,getUsers,updateUser,updateUserProfile,authUser ,deleteUser} from '../controllers/userController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

router.route("/").post(registerUser).get(protect,admin,getUsers);
router.post("/logout",logoutUser);
router.post("/auth",authUser);
router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile);
router.route("/:id").delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser);

export default router;





