import dotenv from "dotenv";

// Load .env into process.env (safe to call multiple times)
dotenv.config();

const getNumber = (v, fallback) => {
	if (v === undefined) return fallback;
	const n = parseInt(v, 10);
	return isNaN(n) ? fallback : n;
};

const config = {
	NODE_ENV: process.env.NODE_ENV || "development",
	PORT: getNumber(process.env.PORT, 5000),
	MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/learnspace",
	JWT_SECRET: process.env.JWT_SECRET || "changeme",
	SMTP_HOST: process.env.SMTP_HOST || undefined,
	SMTP_PORT: getNumber(process.env.SMTP_PORT, undefined),
	SMTP_USER: process.env.SMTP_USER || undefined,
	SMTP_PASS: process.env.SMTP_PASS || undefined,
	EMAIL_FROM: process.env.EMAIL_FROM || "no-reply@learnspace.local",
};

// Basic validation warnings
if (!process.env.MONGO_URI) {
	console.warn("Warning: MONGO_URI not set — using default local MongoDB URI");
}

if (config.NODE_ENV === "production" && (!process.env.JWT_SECRET || process.env.JWT_SECRET === "changeme")) {
	console.warn("Warning: JWT_SECRET is not set for production — using insecure default");
}

export default config;
export const {
	NODE_ENV,
	PORT,
	MONGO_URI,
	JWT_SECRET,
	SMTP_HOST,
	SMTP_PORT,
	SMTP_USER,
	SMTP_PASS,
	EMAIL_FROM,
} = config;
