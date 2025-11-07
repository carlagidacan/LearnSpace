/**
 * Small response formatting helpers.
 * Controllers can call these to produce consistent JSON shapes.
 */

export const success = (res, data = {}, status = 200) => {
	return res.status(status).json({ success: true, data });
};

export const created = (res, data = {}) => success(res, data, 201);

export const error = (res, message = "Internal Server Error", status = 500, details = undefined) => {
	const payload = { success: false, message };
	if (details !== undefined) payload.details = details;
	return res.status(status).json(payload);
};

export default { success, created, error };
