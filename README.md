# Dashboard Frontend (React)

Frontend Dashboard desarrollado con **React** que consume una API REST de gestión de usuarios.
Este proyecto forma parte de un flujo Full Stack, donde el frontend se comunica con un backend
que maneja autenticación JWT, roles y permisos.

El objetivo principal es practicar React en un escenario real, con login, rutas protegidas
y vistas diferenciadas por rol.

---

## 🚀 Tecnologías utilizadas

- React
- Vite
- React Router DOM
- Axios
- JavaScript
- Git / GitHub

---

## 📌 Funcionalidades

- Login de usuarios con JWT
- Almacenamiento del token en el navegador
- Rutas protegidas
- Dashboard principal
- Vista de perfil del usuario autenticado
- Vista de administración (solo ADMIN)
- Listado de usuarios con paginación y búsqueda
- Logout de sesión

---

## 📂 Estructura del proyecto

```
src/
 ├── components/
 │   ├── layout/
 │   └── ui/
 ├── pages/
 │   ├── Login.jsx
 │   ├── Dashboard.jsx
 │   ├── Profile.jsx
 │   └── AdminUsers.jsx
 ├── routes/
 ├── services/
 ├── hooks/
 ├── utils/
 ├── App.jsx
 └── main.jsx
```

La estructura está organizada por responsabilidades para facilitar el mantenimiento
y el crecimiento del proyecto.

---

## ⚙️ Configuración del entorno

Antes de iniciar, asegúrate de tener el backend corriendo.

El backend debe estar disponible en:

```
http://localhost:3000
```

(Si el backend usa otro puerto o dominio, se debe actualizar en `src/services/api.js`)

---

## ▶️ Ejecutar el proyecto

Instalar dependencias:

```
npm install
```

Ejecutar en modo desarrollo:

```
npm run dev
```

La aplicación se abrirá normalmente en:

```
http://localhost:5173
```

---

## 🔐 Flujo de autenticación

1. El usuario inicia sesión desde `/login`
2. El backend devuelve un token JWT
3. El token se guarda en el navegador
4. Las rutas protegidas verifican la sesión
5. Según el rol, se habilitan o no vistas de administración

---

## 🧠 Notas finales

Este proyecto fue desarrollado con fines educativos y de portafolio,
siguiendo buenas prácticas de React y separación de responsabilidades.

Sirve como base para futuras mejoras como:
- Context API para autenticación global
- Manejo avanzado de sesiones
- Mejoras de UI/UX

---

## 👤 Autor

Joseph Méndez Manzanares  
Desarrollador Web / Full Stack Junior
