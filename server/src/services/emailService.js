import nodemailer from "nodemailer";

let transporterPromise;

// Create or return a transporter. Uses SMTP env vars when available, otherwise falls back to Ethereal for dev.
const getTransporter = async () => {
	if (transporterPromise) return transporterPromise;

	transporterPromise = (async () => {
		const host = process.env.SMTP_HOST;
		const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined;
		const user = process.env.SMTP_USER;
		const pass = process.env.SMTP_PASS;

		if (host && port && user && pass) {
			return nodemailer.createTransport({
				host,
				port,
				secure: port === 465, // true for 465, false for other ports
				auth: { user, pass },
			});
		}

		// No SMTP configured — create Ethereal account for development/testing
		const testAccount = await nodemailer.createTestAccount();
		return nodemailer.createTransport({
			host: testAccount.smtp.host,
			port: testAccount.smtp.port,
			secure: testAccount.smtp.secure,
			auth: { user: testAccount.user, pass: testAccount.pass },
		});
	})();

	return transporterPromise;
};

export const send = async (to, subject, text, html) => {
	const transporter = await getTransporter();

	const from = process.env.EMAIL_FROM || "no-reply@example.com";
	const info = await transporter.sendMail({
		from,
		to,
		subject,
		text,
		html,
	});

	// If using Ethereal, return preview URL to help development
	const previewUrl = nodemailer.getTestMessageUrl(info) || null;
	return { info, previewUrl };
};

export const sendBookingConfirmation = async (toOrUser, booking) => {
	const to = typeof toOrUser === "string" ? toOrUser : undefined;
	const subject = "Booking confirmed";
	const text = `Your booking for resource ${booking.resource} is confirmed from ${booking.start} to ${booking.end}.`;
	return send(to, subject, text);
};

export const sendBookingCancelled = async (toOrUser, booking) => {
	const to = typeof toOrUser === "string" ? toOrUser : undefined;
	const subject = "Booking cancelled";
	const text = `Your booking for resource ${booking.resource} on ${booking.start} has been cancelled.`;
	return send(to, subject, text);
};

export default { send, sendBookingConfirmation, sendBookingCancelled };

