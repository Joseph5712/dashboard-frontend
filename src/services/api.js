import axios from "axios";
import { getToken, removeToken } from "../utils/auth";

// Cambia esto si tu backend usa otro puerto o dominio
const API_BASE_URL = "http://localhost:3000";

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

// Interceptor: se ejecuta ANTES de cada request
api.interceptors.request.use((config) => {
    const token = getToken();

    // Si hay token, lo mandamos en el header Authorization
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Interceptor: se ejecuta cuando hay error en la respuesta
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Si el backend responde 401, significa "no autorizado"
        if (error.response && error.response.status === 401) {
            // Token inválido o expirado → limpiamos sesión
            removeToken();
        }

        return Promise.reject(error);
    }
);
