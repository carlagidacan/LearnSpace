
import express from "express";
import * as analyticsController from "../controllers/analyticsController.js";
import * as authMiddleware from "../middleware/authMiddleware.js";
import * as roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// Admin-only analytics endpoints
router.get("/summary", authMiddleware.protect, roleMiddleware.admin, analyticsController.getSummary);
router.get("/usage", authMiddleware.protect, roleMiddleware.admin, analyticsController.getUsageStats);

export default router;
