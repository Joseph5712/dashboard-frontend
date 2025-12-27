import { api } from "./api";
import { setToken } from "../utils/auth";

// Login: llama al backend y guarda el token
export async function login(email, password) {
    // POST /api/auth/login
    const response = await api.post("/api/auth/login", { email, password });

    // Tu backend responde algo como:
    // { success: true, data: { token, user } }
    const token = response.data?.data?.token;

    if (!token) {
        // Si no viene token, algo está mal con el backend o con el response
        throw new Error("Token not found in response");
    }

    setToken(token);

    return response.data.data; // { token, user }
}