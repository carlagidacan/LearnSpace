import Booking from "../models/Booking.js";
import Resource from "../models/Resource.js";
import emailService from "./emailService.js";

/**
 * Create a booking if the resource is available for the requested interval.
 * Returns the created booking document.
 */
export const createBooking = async ({ resourceId, userId, start, end, purpose, attendees }) => {
	const resource = await Resource.findById(resourceId);
	if (!resource) throw new Error("Resource not found");

	const startDate = new Date(start);
	const endDate = new Date(end);
	if (isNaN(startDate) || isNaN(endDate) || startDate >= endDate) throw new Error("Invalid time range");

	const available = await Booking.isAvailable(resourceId, startDate, endDate);
	if (!available) {
		const err = new Error("Resource not available for the requested time");
		err.status = 409;
		throw err;
	}

	const booking = await Booking.create({
		resource: resourceId,
		user: userId,
		start: startDate,
		end: endDate,
		purpose,
		attendees,
		status: "confirmed",
	});

	// best-effort email notification (non-blocking)
	try {
		emailService.sendBookingConfirmation(userId, booking).catch((e) => console.error("Email send failed:", e));
	} catch (e) {
		console.error("Email service error:", e);
	}

	return booking;
};

export const cancelBooking = async (bookingId, byUserId, isAdmin = false) => {
	const booking = await Booking.findById(bookingId);
	if (!booking) throw new Error("Booking not found");

	if (!isAdmin && booking.user.toString() !== byUserId.toString()) {
		const err = new Error("Not authorized to cancel this booking");
		err.status = 403;
		throw err;
	}

	booking.status = "cancelled";
	await booking.save();

	// optionally notify
	try {
		emailService.sendBookingCancelled(booking.user, booking).catch((e) => console.error("Email send failed:", e));
	} catch (e) {
		console.error("Email service error:", e);
	}

	return booking;
};

export const listBookings = async (filter = {}) => {
	// filter can include { user } or other query fields
	const bookings = await Booking.find(filter).populate("resource").populate("user", "name email");
	return bookings;
};

export const getBookingById = async (id) => {
	const booking = await Booking.findById(id).populate("resource").populate("user", "name email");
	return booking;
};

export const checkAvailability = async (resourceId, start, end) => {
	const startDate = new Date(start);
	const endDate = new Date(end);
	if (isNaN(startDate) || isNaN(endDate) || startDate >= endDate) throw new Error("Invalid time range");
	return Booking.isAvailable(resourceId, startDate, endDate);
};

export default { createBooking, cancelBooking, listBookings, getBookingById, checkAvailability };

