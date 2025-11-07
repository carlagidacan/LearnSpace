
import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
		},
		location: {
			type: String,
		},
		capacity: {
			type: Number,
			default: 1,
		},
		amenities: [String],
		isReservable: {
			type: Boolean,
			default: true,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

// Index to help common queries
resourceSchema.index({ title: 1, location: 1 });

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;
