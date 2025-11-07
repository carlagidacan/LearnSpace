
import express from "express";
import * as bookingController from "../controllers/bookingController.js";
import * as authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a booking (protected)
router.post("/", authMiddleware.protect, bookingController.createBooking);

// List bookings for current user (protected)
router.get("/", authMiddleware.protect, bookingController.listBookings);

// Booking details
router.get("/:id", authMiddleware.protect, bookingController.getBookingById);

// Cancel booking
router.post("/:id/cancel", authMiddleware.protect, bookingController.cancelBooking);

// Availability check (public or protected depending on business rules)
router.post("/check-availability", bookingController.checkAvailability);

export default router;
