import { api } from "./api";

// Trae el perfil del usuario autenticado
export async function getMe() {
    const response = await api.get("/api/users/me");
    // Backend devuelve: { success: true, data: {...user} }
    return response.data.data;
}
