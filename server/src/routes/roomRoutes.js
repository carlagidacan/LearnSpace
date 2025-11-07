
import express from "express";
import * as resourceController from "../controllers/roomController.js";
import * as authMiddleware from "../middleware/authMiddleware.js";
import * as roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

// Public: list and view
router.get("/", resourceController.listResources);
router.get("/:id", resourceController.getResourceById);

// Protected: create/update/delete
router.post("/", authMiddleware.protect, roleMiddleware.admin, resourceController.createResource);
router.put("/:id", authMiddleware.protect, roleMiddleware.admin, resourceController.updateResource);
router.delete("/:id", authMiddleware.protect, roleMiddleware.admin, resourceController.deleteResource);

export default router;
