import type {CreateImagesData, Images} from "../types/images";

const API_URL = "http://localhost:3001/postimages";

export async function getImages(id: Number): Promise<Images[]> {
    const respuesta = await fetch(`${API_URL}/post/${id}`);

    if(!respuesta.ok){
        throw new Error("No se pudieron obtener las imágenes");
    }
    const images : Images[] = await respuesta.json()
    return images;
}

export async function createImage(data: CreateImagesData) {
    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    if (!respuesta.ok) {
        const errorData = await respuesta.json()
        throw new Error(errorData.error || "Error desconocido")
    }
    const post : Images = await respuesta.json();
    return post;
}