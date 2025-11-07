import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";

export default function ProfilePage() {
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [name, setName] = useState("");

	useEffect(() => {
		apiClient
			.get("/users/profile")
			.then((data) => {
				setProfile(data);
				setName(data.name || "");
			})
			.catch((err) => setError(err.message || "Failed to load profile"))
			.finally(() => setLoading(false));
	}, []);

	const submit = async (e) => {
		e.preventDefault();
		try {
			const updated = await apiClient.put("/users/profile", { name });
			setProfile(updated);
		} catch (err) {
			setError(err.message || "Update failed");
		}
	};

	if (loading) return <div className="p-4">Loading profile...</div>;
	if (error) return <div className="p-4 text-red-600">{error}</div>;

	return (
		<div className="p-4 max-w-md mx-auto">
			<h1 className="text-2xl mb-4">Profile</h1>
			<form onSubmit={submit} className="space-y-3">
				<div>
					<label className="block text-sm">Name</label>
					<input value={name} onChange={(e) => setName(e.target.value)} className="w-full border px-2 py-1" />
				</div>
				<div>
					<label className="block text-sm">Email</label>
					<div className="w-full border px-2 py-1 bg-gray-50">{profile.email}</div>
				</div>
				<div>
					<button className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
				</div>
			</form>
		</div>
	);
}
