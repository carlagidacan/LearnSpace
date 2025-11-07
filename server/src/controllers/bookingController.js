
import Booking from "../models/Booking.js";
import Resource from "../models/Resource.js";

export const createBooking = async (req, res) => {
	try {
		const { resource: resourceId, start, end, purpose, attendees } = req.body;

		if (!resourceId || !start || !end) {
			return res.status(400).json({ message: "resource, start and end are required" });
		}

		const resource = await Resource.findById(resourceId);
		if (!resource) return res.status(404).json({ message: "Resource not found" });

		const startDate = new Date(start);
		const endDate = new Date(end);

		if (startDate >= endDate) return res.status(400).json({ message: "Invalid time range" });

		const available = await Booking.isAvailable(resourceId, startDate, endDate);
		if (!available) return res.status(409).json({ message: "Resource not available for the requested time" });

		const booking = await Booking.create({
			resource: resourceId,
			user: req.user._id,
			start: startDate,
			end: endDate,
			purpose,
			attendees,
			status: "confirmed",
		});

		return res.status(201).json(booking);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server error" });
	}
};

export const listBookings = async (req, res) => {
	try {
		let query = {};
		if (!req.user || req.user.role !== "admin") {
			query.user = req.user._id;
		}

		const bookings = await Booking.find(query).populate("resource").populate("user", "name email");
		return res.json(bookings);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server error" });
	}
};

export const getBookingById = async (req, res) => {
	try {
		const booking = await Booking.findById(req.params.id).populate("resource").populate("user", "name email");
		if (!booking) return res.status(404).json({ message: "Booking not found" });

		if (req.user.role !== "admin" && booking.user._id.toString() !== req.user._id.toString()) {
			return res.status(403).json({ message: "Not authorized to view this booking" });
		}

		return res.json(booking);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server error" });
	}
};

export const cancelBooking = async (req, res) => {
	try {
		const booking = await Booking.findById(req.params.id);
		if (!booking) return res.status(404).json({ message: "Booking not found" });

		if (req.user.role !== "admin" && booking.user.toString() !== req.user._id.toString()) {
			return res.status(403).json({ message: "Not authorized to cancel this booking" });
		}

		booking.status = "cancelled";
		await booking.save();
		return res.json({ message: "Booking cancelled" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server error" });
	}
};

export const checkAvailability = async (req, res) => {
	try {
		const { resource: resourceId, start, end } = req.body;
		if (!resourceId || !start || !end) {
			return res.status(400).json({ message: "resource, start and end are required" });
		}

		const startDate = new Date(start);
		const endDate = new Date(end);
		const available = await Booking.isAvailable(resourceId, startDate, endDate);
		return res.json({ available });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server error" });
	}
};

export default { createBooking, listBookings, getBookingById, cancelBooking, checkAvailability };
