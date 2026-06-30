import type {CreatePostData, Post} from "../types/posts"
const API_URL = "http://localhost:3001/posts";

export async function getPosts() : Promise<Post[]> {
    const respuesta = await fetch(API_URL);

    if (!respuesta.ok){
        throw new Error("No se pudieron obtener los posts");
    }

    const posts : Post[] = await respuesta.json();

    return posts;
}

export async function getPost(id: Number): Promise<Post> {
    const respuesta = await fetch(`${API_URL}/${id}`)

    if (!respuesta.ok){
        const errorData = await respuesta.json()
        throw new Error(errorData.error || "Error desconocido")
    }
    const post : Post = await respuesta.json();
    return post;
}

export async function getPostDeUser(id: Number): Promise<Post[]> {
    const respuesta = await fetch(`${API_URL}?userId=${id}`)
    
    if (!respuesta.ok){
        const errorData = await respuesta.json()
        throw new Error(errorData.error || "Error desconocido")
    }
    const posts : Post[] = await respuesta.json();
    return posts;
}

export async function createPost(data: CreatePostData) {
    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    if (!respuesta.ok) {
        const errorData = await respuesta.json()
        throw new Error(errorData.error || "Error desconocido")
    }
    const post : Post = await respuesta.json();
    return post;
}