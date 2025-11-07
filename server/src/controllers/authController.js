
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
	try {
		const { name, email, password, department } = req.body;

		const existing = await User.findOne({ email });
		if (existing) {
			return res.status(400).json({ message: "User already exists" });
		}

		const user = await User.create({ name, email, password, department });

		return res.status(201).json({
			user,
			token: generateToken(user._id),
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server error" });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (user && (await user.matchPassword(password))) {
			return res.json({ user, token: generateToken(user._id) });
		}

		return res.status(401).json({ message: "Invalid email or password" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server error" });
	}
};

export default { register, login };
