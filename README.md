# Anti-Social Net 

Red social desarrollada en React + TypeScript como Trabajo Práctico para la materia **Construcción de Interfaces de Usuario** de la Universidad Nacional de Hurlingham (UNAHUR).

## Descripción

UnaHur Anti-Social Net es una red social donde los usuarios pueden registrarse, iniciar sesión, navegar publicaciones, comentar y crear sus propios posteos con imágenes y etiquetas. El proyecto consume una API REST externa para todas las operaciones de datos.

## Tecnologías utilizadas

- React 19
- TypeScript
- React Router DOM
- React Bootstrap
- Bootstrap 5
- Bootstrap Icons
- Context API
- Fetch API
- localStorage
- Vite

## Funcionalidades

- Login simulado (nickName + contraseña fija) con persistencia en localStorage
- Registro de usuarios
- Feed de publicaciones en la Home, con formulario de publicación rápida (desktop) y botón flotante (mobile)
- Detalle de publicación con comentarios y formulario para comentar
- Perfil de usuario con sus publicaciones y opción de logout
- Crear nueva publicación con descripción, imágenes (URLs) y etiquetas
- Rutas protegidas para Perfil y Nueva Publicación
- Modo claro / oscuro con persistencia en localStorage
- Publicaciones mostradas en orden aleatorio
- Diseño responsive (mobile, tablet y desktop)

## API utilizada

Este proyecto consume la API REST:

https://github.com/dylancotera/antiSocial-backend

## Instalación y uso

### 1. Backend (API)

```bash
# Clonar el repo de la API
git clone https://github.com/dylancotera/antiSocial-backend.git

# Entrar al directorio
cd antiSocial-backend

# Instalar dependencias
npm install

# Correr el servidor (puerto 3001)
npm run dev
```

### 2. Frontend

```bash
# Clonar este repositorio
git clone https://github.com/dylancotera/antiSocial-frontend.git

# Entrar al directorio
cd antiSocial-frontend

# Instalar dependencias
npm install

# Correr el proyecto
npm run dev
```

La aplicación se conecta a la API en `http://localhost:5173`. Asegurate de tener el backend corriendo antes de usar el frontend.