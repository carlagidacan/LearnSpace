import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../api/apiClient";

export default function BookingDetails() {
	const { id } = useParams();
	const [booking, setBooking] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		apiClient
			.get(`/bookings/${id}`)
			.then((data) => setBooking(data))
			.catch((err) => setError(err.message || "Failed to load booking"))
			.finally(() => setLoading(false));
	}, [id]);

	if (loading) return <div className="p-4">Loading...</div>;
	if (error) return <div className="p-4 text-red-600">{error}</div>;
	if (!booking) return <div className="p-4">Not found</div>;

	return (
		<div className="p-4">
			<h1 className="text-2xl">Booking details</h1>
			<div className="mt-2">Resource: {booking.resource?.title || booking.resource}</div>
			<div>Start: {new Date(booking.start).toLocaleString()}</div>
			<div>End: {new Date(booking.end).toLocaleString()}</div>
			<div>Status: {booking.status}</div>
			<div>Purpose: {booking.purpose}</div>
		</div>
	);
}
