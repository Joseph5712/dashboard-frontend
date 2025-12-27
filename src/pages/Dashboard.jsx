// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { getMe } from "../services/users.service";
import LogoutButton from "../components/ui/LogoutButton";

export default function Dashboard() {
    const [me, setMe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadMe() {
            try {
                setLoading(true);
                const user = await getMe();
                setMe(user);
            } catch (err) {
                setError("Could not load profile. Please login again.");
            } finally {
                setLoading(false);
            }
        }

        loadMe();
    }, []);

    if (loading) {
        return <p style={{ padding: 20, fontFamily: "Arial" }}>Loading...</p>;
    }

    if (error) {
        return (
            <div style={{ padding: 20, fontFamily: "Arial" }}>
                <p style={{ color: "crimson" }}>{error}</p>
            </div>
        );
    }

    return (
        <div style={{ padding: 20, fontFamily: "Arial" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Dashboard</h2>
                <LogoutButton />
            </div>

            <p>Welcome, <b>{me.name}</b>!</p>

            <div style={{ marginTop: 12 }}>
                <p><b>Email:</b> {me.email}</p>
                <p><b>Role:</b> {me.role}</p>
            </div>
        </div>
    );
}
