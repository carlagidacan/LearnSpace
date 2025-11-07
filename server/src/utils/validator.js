/**
 * Lightweight request validators to avoid pulling extra dependencies.
 * requireBodyFields(fields) returns express middleware that ensures the
 * listed fields exist (non-null/undefined) on req.body.
 */

export const requireBodyFields = (fields = []) => (req, res, next) => {
	const missing = [];
	for (const f of fields) {
		if (req.body[f] === undefined || req.body[f] === null || req.body[f] === "") {
			missing.push(f);
		}
	}

	if (missing.length) {
		return res.status(400).json({ success: false, message: `Missing required fields: ${missing.join(", ")}` });
	}

	return next();
};

export const parseIntParam = (paramName) => (req, res, next) => {
	if (req.params && req.params[paramName] !== undefined) {
		const v = parseInt(req.params[paramName], 10);
		if (isNaN(v)) return res.status(400).json({ success: false, message: `Invalid integer param: ${paramName}` });
		req.params[paramName] = v;
	}
	return next();
};

export default { requireBodyFields, parseIntParam };

