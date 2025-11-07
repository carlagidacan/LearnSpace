import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
	const { user, logout } = useContext(AuthContext);
	const location = useLocation();
	const isAuthPage = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/";

	return (
		<nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<Link to={user ? "/dashboard" : "/"} className="flex items-center space-x-2 group">
						<div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
							<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
							</svg>
						</div>
						<span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
							LearnSpace
						</span>
					</Link>

					{/* User Menu */}
					<div className="flex items-center space-x-1">
						{user ? (
							<div className="flex items-center space-x-4 ml-4">
								{/* Notification Icon */}
								<button
									className="relative p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200"
									aria-label="Notifications"
								>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
									</svg>
									{/* Notification Badge */}
									<span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
								</button>
								<Link
									to="/profile"
									className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
								>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
									</svg>
									<span className="hidden sm:inline">{user.name}</span>
								</Link>
							</div>
						) : (
							!isAuthPage && (
								<div className="flex items-center space-x-2 ml-4">
									<Link
										to="/login"
										className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
									>
										Login
									</Link>
									<Link
										to="/register"
										className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
									>
										Register
									</Link>
								</div>
							)
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}

