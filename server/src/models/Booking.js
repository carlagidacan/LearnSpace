
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
	{
		resource: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Resource",
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		start: {
			type: Date,
			required: true,
		},
		end: {
			type: Date,
			required: true,
		},
		status: {
			type: String,
			enum: ["pending", "confirmed", "cancelled", "completed"],
			default: "pending",
		},
		purpose: {
			type: String,
		},
		attendees: {
			type: Number,
			default: 1,
		},
	},
	{ timestamps: true }
);

// Helpful index for availability checks
bookingSchema.index({ resource: 1, start: 1, end: 1 });

// Static helper to check whether a resource is available for a given interval
bookingSchema.statics.isAvailable = async function (resourceId, start, end) {
	// overlap: existing.start < end && existing.end > start
	const overlapping = await this.findOne({
		resource: resourceId,
		$or: [
			{ start: { $lt: end }, end: { $gt: start } },
		],
		status: { $in: ["pending", "confirmed"] },
	});

	return !overlapping;
};

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
