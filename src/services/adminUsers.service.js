import { api } from "./api";

// /api/users?page=1&limit=10&search=jose
export async function listUsers({ page = 1, limit = 10, search = "" }) {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(limit));
    if (search) params.set("search", search);

    const response = await api.get(`/api/users?${params.toString()}`);
    return response.data; // { success, meta, data }
}
