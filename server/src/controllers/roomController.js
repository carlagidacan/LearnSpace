
import Resource from "../models/Resource.js";

export const listResources = async (req, res) => {
	try {
		const resources = await Resource.find();
		return res.json(resources);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server error" });
	}
};

export const getResourceById = async (req, res) => {
	try {
		const resource = await Resource.findById(req.params.id).populate("owner", "name email");
		if (!resource) return res.status(404).json({ message: "Resource not found" });
		return res.json(resource);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server error" });
	}
};

export const createResource = async (req, res) => {
	try {
		const data = req.body;
		if (!data.title) return res.status(400).json({ message: "Title is required" });

		const resource = await Resource.create({ ...data, owner: req.user._id });
		return res.status(201).json(resource);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server error" });
	}
};

export const updateResource = async (req, res) => {
	try {
		const resource = await Resource.findById(req.params.id);
		if (!resource) return res.status(404).json({ message: "Resource not found" });

		Object.assign(resource, req.body);
		await resource.save();
		return res.json(resource);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server error" });
	}
};

export const deleteResource = async (req, res) => {
	try {
		const resource = await Resource.findById(req.params.id);
		if (!resource) return res.status(404).json({ message: "Resource not found" });
		await resource.remove();
		return res.json({ message: "Resource removed" });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Server error" });
	}
};

export default { listResources, getResourceById, createResource, updateResource, deleteResource };
