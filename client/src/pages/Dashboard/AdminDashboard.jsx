import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

export default function AdminDashboard() {
	const [summary, setSummary] = useState(null);

	useEffect(() => {
		apiClient.get("/analytics/summary").then((data) => setSummary(data)).catch(() => setSummary(null));
	}, []);

	return (
		<div className="p-4">
			<h1 className="text-2xl mb-4">Admin Dashboard</h1>
			{summary ? (
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="border p-3">Users: {summary.usersCount}</div>
					<div className="border p-3">Resources: {summary.resourcesCount}</div>
					<div className="border p-3">Bookings: {summary.bookingsCount}</div>
				</div>
			) : (
				<div>Loading summary...</div>
			)}
		</div>
	);
}
