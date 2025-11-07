
import express from "express";
import * as userController from "../controllers/userController.js";
import * as authMiddleware from "../middleware/authMiddleware.js";
import * as roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// Profile routes
router.get("/profile", authMiddleware.protect, userController.getProfile);
router.put("/profile", authMiddleware.protect, userController.updateProfile);

// Admin: manage users
router.get("/", authMiddleware.protect, roleMiddleware.admin, userController.listUsers);
router.get("/:id", authMiddleware.protect, roleMiddleware.admin, userController.getUserById);
router.delete("/:id", authMiddleware.protect, roleMiddleware.admin, userController.deleteUser);

export default router;
