import React, { useEffect, useState, useContext } from "react";
import apiClient from "../../api/apiClient";
import { AuthContext } from "../../context/AuthContext";

export default function BookingList() {
	const { user } = useContext(AuthContext);
	const [bookings, setBookings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		apiClient
			.get("/bookings")
			.then((data) => setBookings(data))
			.catch((err) => setError(err.message || "Failed to load bookings"))
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <div className="p-4">Loading bookings...</div>;
	if (error) return <div className="p-4 text-red-600">{error}</div>;

	return (
		<div className="p-4">
			<h1 className="text-2xl mb-4">Bookings {user && <span className="text-sm text-gray-600">for {user.name}</span>}</h1>
			<div className="space-y-3">
				{bookings.map((b) => (
					<div key={b._id} className="border p-3 rounded">
						<div className="font-semibold">{b.resource?.title || b.resource}</div>
						<div className="text-sm text-gray-600">{new Date(b.start).toLocaleString()} → {new Date(b.end).toLocaleString()}</div>
						<div className="mt-2">Status: {b.status}</div>
					</div>
				))}
			</div>
		</div>
	);
}
