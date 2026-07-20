import type { CreateUserData, User } from "../types/users";

const API_URL = "http://localhost:3001/users";

export async function getUsers() : Promise<User[]>{
  const respuesta = await fetch(API_URL);

  if (!respuesta.ok) {
    throw new Error("No se pudieron obtener los usuarios");
  }

  const users: User[] = await respuesta.json();

  return users;
}

export async function crearUsuario(data: CreateUserData) : Promise<User> {
  const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({nickName: data.nickName})
    })

  if (!respuesta.ok) {
    const errorData = await respuesta.json()
    throw new Error(errorData.error || "Error desconocido")
  }

  const user : User = await respuesta.json();

  return user;
  
}