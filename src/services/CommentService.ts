import type { Comment, CrearCommentData } from "../types/comment";

const API_URL = "http://localhost:3001/comments";

export async function getComments(postId: number): Promise<Comment[]> {
    const respuesta = await fetch(`${API_URL}?postId=${postId}`);

    if(!respuesta.ok){
        throw new Error("No se pudieron obtener los comentarios");
    }
    const images : Comment[] = await respuesta.json()
    return images;
}

export async function createComment(data: CrearCommentData) : Promise<Comment> {
  const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })

  if (!respuesta.ok) {
    const errorData = await respuesta.json()
    throw new Error(errorData.error || "Error desconocido")
  }
  const comment : Comment = await respuesta.json();
  return comment;
}