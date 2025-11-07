import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import apiClient from "../../api/apiClient";

export default function BookingForm() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const resourceIdFromQuery = searchParams.get("resource");

	const [resourceId, setResourceId] = useState(resourceIdFromQuery || "");
	const [start, setStart] = useState("");
	const [end, setEnd] = useState("");
	const [purpose, setPurpose] = useState("");
	const [attendees, setAttendees] = useState(1);
	const [error, setError] = useState(null);
	const [available, setAvailable] = useState(null);

	useEffect(() => {
		if (resourceIdFromQuery) setResourceId(resourceIdFromQuery);
	}, [resourceIdFromQuery]);

	const checkAvailability = async () => {
		setError(null);
		try {
			const res = await apiClient.post("/bookings/check-availability", { resource: resourceId, start, end });
			setAvailable(res.available);
		} catch (err) {
			setError(err.message || "Availability check failed");
		}
	};

	const submit = async (e) => {
		e.preventDefault();
		setError(null);
		try {
			const booking = await apiClient.post("/bookings", { resource: resourceId, start, end, purpose, attendees });
			navigate(`/bookings/${booking._id}`);
		} catch (err) {
			setError(err.message || "Failed to create booking");
		}
	};

	return (
		<div className="p-4 max-w-lg mx-auto">
			<h2 className="text-xl mb-4">Create booking</h2>
			{error && <div className="text-red-600 mb-2">{error}</div>}
			<form onSubmit={submit} className="space-y-3">
				<div>
					<label className="block text-sm">Resource ID</label>
					<input value={resourceId} onChange={(e) => setResourceId(e.target.value)} className="w-full border px-2 py-1" />
				</div>
				<div>
					<label className="block text-sm">Start (ISO)</label>
					<input value={start} onChange={(e) => setStart(e.target.value)} placeholder="YYYY-MM-DDTHH:mm" className="w-full border px-2 py-1" />
				</div>
				<div>
					<label className="block text-sm">End (ISO)</label>
					<input value={end} onChange={(e) => setEnd(e.target.value)} placeholder="YYYY-MM-DDTHH:mm" className="w-full border px-2 py-1" />
				</div>
				<div>
					<label className="block text-sm">Attendees</label>
					<input type="number" value={attendees} onChange={(e) => setAttendees(Number(e.target.value))} className="w-full border px-2 py-1" />
				</div>
				<div>
					<label className="block text-sm">Purpose</label>
					<input value={purpose} onChange={(e) => setPurpose(e.target.value)} className="w-full border px-2 py-1" />
				</div>
				<div className="flex gap-2">
					<button type="button" onClick={checkAvailability} className="bg-gray-600 text-white px-3 py-1 rounded">Check availability</button>
					<button className="bg-blue-600 text-white px-3 py-1 rounded">Create booking</button>
				</div>
				{available !== null && (
					<div className={`mt-2 ${available ? "text-green-700" : "text-red-700"}`}>{available ? "Available" : "Not available"}</div>
				)}
			</form>
		</div>
	);
}

