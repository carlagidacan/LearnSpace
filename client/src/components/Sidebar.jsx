import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
	const location = useLocation();
	const navigate = useNavigate();
	const { user, logout } = useContext(AuthContext);
	const [isMinimized, setIsMinimized] = useState(true); // Minimized by default

	// Don't show sidebar on auth pages
	const isAuthPage = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/";
	
	if (isAuthPage || !user) {
		return null;
	}

	const handleLogout = () => {
		logout();
		navigate("/login", { replace: true });
	};

	const navItems = [
		{
			path: "/dashboard",
			label: "Dashboard",
			icon: (
				<svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
				</svg>
			),
		},
		{
			path: "/resources",
			label: "Resources",
			icon: (
				<svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
				</svg>
			),
		},
		{
			path: "/bookings",
			label: "Bookings",
			icon: (
				<svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
				</svg>
			),
		},
	];

	return (
		<aside className={`bg-white border-r border-gray-200 min-h-screen sticky top-16 transition-all duration-300 flex flex-col ${isMinimized ? 'w-16' : 'w-64'}`}>
			<nav className="p-4 space-y-1 flex-1">
				{/* Toggle Button */}
				<button
					onClick={() => setIsMinimized(!isMinimized)}
					className="w-full flex items-center justify-center p-2 mb-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
					aria-label={isMinimized ? "Expand sidebar" : "Collapse sidebar"}
				>
					<svg 
						className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${isMinimized ? '' : 'rotate-180'}`}
						fill="none" 
						stroke="currentColor" 
						viewBox="0 0 24 24"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
					</svg>
				</button>

				{navItems.map((item) => {
					const isActive = location.pathname === item.path || 
						(item.path !== "/dashboard" && location.pathname.startsWith(item.path));
					
					return (
						<Link
							key={item.path}
							to={item.path}
							className={`flex items-center rounded-lg text-sm font-medium transition-all duration-200 group ${
								isMinimized ? 'justify-center px-2 py-3' : 'space-x-3 px-4 py-3'
							} ${
								isActive
									? "bg-blue-50 text-blue-600 shadow-sm"
									: "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
							}`}
							title={isMinimized ? item.label : undefined}
						>
							{item.icon}
							{!isMinimized && (
								<span className="whitespace-nowrap">{item.label}</span>
							)}
						</Link>
					);
				})}
			</nav>

			{/* Logout Button at Bottom */}
			<div className="p-4 border-t border-gray-200">
				<button
					onClick={handleLogout}
					className={`w-full flex items-center rounded-lg text-sm font-medium transition-all duration-200 ${
						isMinimized ? 'justify-center px-2 py-3' : 'space-x-3 px-4 py-3'
					} bg-red-50 text-red-600 hover:bg-red-100`}
					title={isMinimized ? "Logout" : undefined}
				>
					<svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
					</svg>
					{!isMinimized && (
						<span className="whitespace-nowrap">Logout</span>
					)}
				</button>
			</div>
		</aside>
	);
}
