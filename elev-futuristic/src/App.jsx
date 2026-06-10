import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing          from "./pages/Landing";
import Login            from "./pages/Login";
import Signup           from "./pages/Signup";
import UserHome         from "./pages/UserHome";
import StudentDashboard  from "./pages/student/StudentDashboard";
import TrainerDashboard  from "./pages/trainer/TrainerDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import AdminDashboard    from "./AdminDashboard";

// Protects dashboard routes — only allows specific roles
function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");
  const user  = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) return <Navigate to="/login" replace />;
  if (user.role !== allowedRole) return <Navigate to="/home" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/"       element={<Landing />} />
        <Route path="/login"  element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Logged-in users with no dashboard role */}
        <Route path="/home" element={<UserHome />} />

        {/* Protected dashboards — role must match exactly */}
        <Route path="/admin"    element={<ProtectedRoute allowedRole="admin">   <AdminDashboard />   </ProtectedRoute>} />
        <Route path="/employee" element={<ProtectedRoute allowedRole="employee"><EmployeeDashboard /></ProtectedRoute>} />
        <Route path="/trainer"  element={<ProtectedRoute allowedRole="trainer"> <TrainerDashboard /> </ProtectedRoute>} />
        <Route path="/student"  element={<ProtectedRoute allowedRole="student"> <StudentDashboard /> </ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}