
import Booking from "../models/Booking.js";
import Resource from "../models/Resource.js";
import User from "../models/User.js";

export const getSummary = async (req, res) => {
	try {
		const usersCount = await User.countDocuments();
		const resourcesCount = await Resource.countDocuments();
		const bookingsCount = await Booking.countDocuments();

		const bookingsByStatus = await Booking.aggregate([
			{ $group: { _id: "$status", count: { $sum: 1 } } },
		]);

		return res.json({ usersCount, resourcesCount, bookingsCount, bookingsByStatus });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server error" });
	}
};

export const getUsageStats = async (req, res) => {
	try {
		// top resources by number of bookings
		const topResources = await Booking.aggregate([
			{ $group: { _id: "$resource", bookings: { $sum: 1 } } },
			{ $sort: { bookings: -1 } },
			{ $limit: 10 },
			{
				$lookup: {
					from: "resources",
					localField: "_id",
					foreignField: "_id",
					as: "resource",
				},
			},
			{ $unwind: { path: "$resource", preserveNullAndEmptyArrays: true } },
			{ $project: { bookings: 1, resource: { title: 1, location: 1 } } },
		]);

		return res.json({ topResources });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server error" });
	}
};

export default { getSummary, getUsageStats };
