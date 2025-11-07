import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

export default function UserDashboard() {
	const [bookings, setBookings] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		apiClient
			.get("/bookings")
			.then((data) => setBookings(data))
			.finally(() => setLoading(false));
	}, []);

	return (
		<div className="p-4">
			<h1 className="text-2xl mb-4">Dashboard</h1>
			{loading ? (
				<div>Loading...</div>
			) : (
				<div>
					<div className="text-lg">Your bookings: {bookings.length}</div>
					<ul className="mt-3 space-y-2">
						{bookings.slice(0, 5).map((b) => (
							<li key={b._id} className="border p-2 rounded">{b.resource?.title || b.resource} — {new Date(b.start).toLocaleString()}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}
