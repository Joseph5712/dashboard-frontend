import { useEffect, useState } from "react";
import { getMe } from "../services/users.service";
import { listUsers } from "../services/adminUsers.service";
import AppLayout from "../components/layout/AppLayout";
import { Navigate } from "react-router-dom";

export default function AdminUsers() {
    const [me, setMe] = useState(null);

    const [users, setUsers] = useState([]);
    const [meta, setMeta] = useState({ page: 1, totalPages: 1, limit: 10 });

    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // 1) Cargar "me" para saber si soy admin
    useEffect(() => {
        async function loadMe() {
            try {
                const user = await getMe();
                setMe(user);
            } catch (err) {
                setError("Could not load session.");
            }
        }
        loadMe();
    }, []);

    // 2) Cargar lista (cuando cambia page o search)
    useEffect(() => {
        async function loadUsers() {
            try {
                setLoading(true);
                const res = await listUsers({
                    page: meta.page,
                    limit: meta.limit,
                    search,
                });

                setUsers(res.data);
                setMeta(res.meta);
            } catch (err) {
                setError("You are not allowed to view this page.");
            } finally {
                setLoading(false);
            }
        }

        // Solo cargamos si ya tenemos "me"
        if (me) loadUsers();
    }, [me, meta.page, meta.limit, search]);

    // Si ya sabemos que NO es admin, bloqueamos
    if (me && me.role !== "ADMIN") {
        return <Navigate to="/dashboard" replace />;
    }

    if (!me) return <p style={{ padding: 20 }}>Loading...</p>;

    return (
        <AppLayout user={me}>
            <h2>Users (Admin)</h2>

            {/* Buscador */}
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search by name or email..."
                    style={{ padding: 8, width: 280 }}
                />
                <button
                    onClick={() => {
                        setMeta((m) => ({ ...m, page: 1 }));
                        setSearch(searchInput.trim());
                    }}
                >
                    Search
                </button>

                <button
                    onClick={() => {
                        setSearchInput("");
                        setSearch("");
                        setMeta((m) => ({ ...m, page: 1 }));
                    }}
                >
                    Clear
                </button>
            </div>

            {loading && <p>Loading users...</p>}
            {error && <p style={{ color: "crimson" }}>{error}</p>}

            {!loading && !error && (
                <>
                    <table
                        border="1"
                        cellPadding="8"
                        style={{ borderCollapse: "collapse", width: "100%" }}
                    >
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Created</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.role}</td>
                                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Paginación */}
                    <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
                        <button
                            disabled={meta.page <= 1}
                            onClick={() => setMeta((m) => ({ ...m, page: m.page - 1 }))}
                        >
                            Prev
                        </button>

                        <span>
                            Page <b>{meta.page}</b> of <b>{meta.totalPages}</b>
                        </span>

                        <button
                            disabled={meta.page >= meta.totalPages}
                            onClick={() => setMeta((m) => ({ ...m, page: m.page + 1 }))}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </AppLayout>
    );
}
