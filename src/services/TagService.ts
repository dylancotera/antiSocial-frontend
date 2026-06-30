import type { Tag } from "../types/tags";

const API_URL = "http://localhost:3001/tags";

export async function getTags(): Promise<Tag[]> {
    const respuesta = await fetch(API_URL);

    if(!respuesta.ok){
        throw new Error("No se pudieron obtener las etiquetas");
    }
    const tag : Tag[] = await respuesta.json()
    return tag;
}