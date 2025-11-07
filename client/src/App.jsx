import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import HomePage from "./pages/Home/HomePage";
import BookingList from "./pages/Bookings/BookingList";
import BookingForm from "./pages/Bookings/BookingForm";
import BookingDetails from "./pages/Bookings/BookingDetails";
import BookingHistory from "./pages/Bookings/BookingHistory";
import RoomList from "./pages/Rooms/RoomList";
import RoomDetails from "./pages/Rooms/RoomDetails";
import RoomForm from "./pages/Rooms/RoomForm";
import RoomCalendar from "./pages/Rooms/RoomCalendar";
import UserList from "./pages/Users/UserList";
import UserDetails from "./pages/Users/UserDetails";
import ProfilePage from "./pages/Profile/ProfilePage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/" || location.pathname === "/forgot-password";

  if (isAuthPage) {
    return (
      <>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
            <Route path="/dashboard" element={<UserDashboard />} />

            <Route path="/rooms" element={<RoomList />} />
            <Route path="/rooms/new" element={<RoomForm />} />
            <Route path="/rooms/:id" element={<RoomDetails />} />
            <Route path="/rooms/:id/calendar" element={<RoomCalendar />} />

            <Route path="/bookings" element={<BookingList />} />
            <Route path="/bookings/new" element={<BookingForm />} />
            <Route path="/bookings/:id" element={<BookingDetails />} />
            <Route path="/bookings/history" element={<BookingHistory />} />

            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetails />} />

            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
