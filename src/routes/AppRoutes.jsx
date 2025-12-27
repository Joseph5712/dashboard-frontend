// src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import { isAuthenticated } from "../utils/auth";
import Profile from "../pages/Profile";
import AdminUsers from "../pages/AdminUsers";


function PrivateRoute({ children }) {
    // Si no hay token, manda a /login
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />

                <Route path="/login" element={<Login />} />

                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                        <Profile />
                        </PrivateRoute>
                    }
                />

                    <Route
                    path="/admin/users"
                    element={
                        <PrivateRoute>
                        <AdminUsers />
                        </PrivateRoute>
                    }
                />

                {/* Si no existe la ruta */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
