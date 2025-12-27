import { Link } from "react-router-dom";
import LogoutButton from "../ui/LogoutButton";

export default function AppLayout({ user, children }) {
    // user viene del /me para saber nombre y rol
    return (
        <div style={{ fontFamily: "Arial", minHeight: "100vh" }}>
            {/* Header */}
            <header
                style={{
                    padding: 16,
                    borderBottom: "1px solid #ddd",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <div>
                    <b>Dashboard</b>
                    {user && (
                        <span style={{ marginLeft: 10, color: "#555" }}>
                            {user.name} ({user.role})
                        </span>
                    )}
                </div>

                <LogoutButton />
            </header>

            {/* Nav */}
            <nav
                style={{
                    padding: 12,
                    borderBottom: "1px solid #eee",
                    display: "flex",
                    gap: 12,
                }}
            >
                <Link to="/dashboard">Home</Link>
                <Link to="/profile">Profile</Link>

                {/* Link solo para ADMIN */}
                {user?.role === "ADMIN" && <Link to="/admin/users">Users</Link>}
            </nav>

            {/* Content */}
            <main style={{ padding: 20 }}>{children}</main>
        </div>
    );
}
