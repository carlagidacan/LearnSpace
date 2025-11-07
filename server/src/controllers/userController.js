
import User from "../models/User.js";

export const getProfile = async (req, res) => {
	try {
		const user = req.user; // set by authMiddleware
		if (!user) return res.status(404).json({ message: "User not found" });
		return res.json(user);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server error" });
	}
};

export const updateProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user._id);
		if (!user) return res.status(404).json({ message: "User not found" });

		const { name, email, password, department } = req.body;
		if (name) user.name = name;
		if (email) user.email = email;
		if (department) user.department = department;
		if (password) user.password = password; // will be hashed in pre-save

		await user.save();

		return res.json(user);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server error" });
	}
};

export const listUsers = async (req, res) => {
	try {
		const users = await User.find().select("-password");
		return res.json(users);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server error" });
	}
};

export const getUserById = async (req, res) => {
	try {
		const user = await User.findById(req.params.id).select("-password");
		if (!user) return res.status(404).json({ message: "User not found" });
		return res.json(user);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server error" });
	}
};

export const deleteUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) return res.status(404).json({ message: "User not found" });
		await user.remove();
		return res.json({ message: "User removed" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server error" });
	}
};

export default { getProfile, updateProfile, listUsers, getUserById, deleteUser };
