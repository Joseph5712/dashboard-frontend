const TOKEN_KEY = "auth_token";

// Guardar token (cuando haces login)
export function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

// Obtener token (para saber si estás logueado o para enviar requests)
export function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

// Borrar token (logout)
export function removeToken() {
    localStorage.removeItem(TOKEN_KEY);
}

// Saber si hay sesión
export function isAuthenticated() {
    return !!getToken();
}
