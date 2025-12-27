import { useState } from "react";
import { login } from "../services/auth.service";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault(); // evita que el form recargue la página
        setError("");

        // Validación simple (frontend)
        if (!email || !password) {
            setError("Please fill in email and password.");
            return;
        }

        try {
            setLoading(true);
            await login(email, password);

            // Si login fue OK y guardó token, redirigimos
            window.location.href = "/dashboard";
        } catch (err) {
            // Mensaje amigable
            setError("Invalid credentials or server error.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ maxWidth: 420, margin: "40px auto", fontFamily: "Arial" }}>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    style={{ width: "100%", padding: 10, marginTop: 6, marginBottom: 12 }}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="joseph@test.com"
                />

                <label>Password</label>
                <input
                    style={{ width: "100%", padding: 10, marginTop: 6, marginBottom: 12 }}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                />

                {error && <p style={{ color: "crimson", marginTop: 0 }}>{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    style={{ width: "100%", padding: 10 }}
                >
                    {loading ? "Signing in..." : "Sign in"}
                </button>
            </form>
        </div>
    );
}
