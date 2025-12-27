// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { getMe } from "../services/users.service";
import AppLayout from "../components/layout/AppLayout";

export default function Profile() {
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
                setError("Could not load profile.");
            } finally {
                setLoading(false);
            }
        }

        loadMe();
    }, []);

    // Mientras carga, mostramos algo simple
    if (loading) return <p style={{ padding: 20 }}>Loading...</p>;
    if (error) return <p style={{ padding: 20, color: "crimson" }}>{error}</p>;

    return (
        <AppLayout user={me}>
            <h2>Profile</h2>

            <div style={{ marginTop: 12 }}>
                <p>
                    <b>Name:</b> {me.name}
                </p>
                <p>
                    <b>Email:</b> {me.email}
                </p>
                <p>
                    <b>Role:</b> {me.role}
                </p>
                <p>
                    <b>Created:</b> {new Date(me.createdAt).toLocaleString()}
                </p>
            </div>
        </AppLayout>
    );
}
