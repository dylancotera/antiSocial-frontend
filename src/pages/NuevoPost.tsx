import { useEffect, useState } from "react";
import type { Tag } from "../types/tags";
import { getTags } from "../services/TagService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/PostService";
import { createImage } from "../services/ImagesService";
import { Alert, Button, Container, Form } from "react-bootstrap";

function NuevoPost(){
    const { user } = useAuth()
    const navigate = useNavigate()
    const [description, setDescription] = useState("")
    const [imagenes, setImagenes] = useState<string[]>([""])
    const [selectedTags, setSelectedTags] = useState<number[]>([])
    const [error, setError] = useState("")
    const [tags, setTags] = useState<Tag[]>([])

    const agregarCampoImagen = () => setImagenes([...imagenes, ""])

    const actualizarImagen = (index: number, value: string) => {
        const nuevas = [...imagenes]
        nuevas[index] = value
        setImagenes(nuevas)
    }

    const toggleTag = (id: number) => {
        setSelectedTags(prev =>
            prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
        )
    }

    const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(description.trim() === "") {
            setError("La descripción es obligatoria")
            return
        }
        try {
            const postCreado = await createPost({ 
                description,
                userId: user!.id,
                tagIds: selectedTags
            })
            for (const url of imagenes) {
                if(url.trim() !== "") {
                    await createImage({ url, postId: postCreado.id })
                }
            }
            navigate("/mi-perfil")
        } catch(error) {
            if(error instanceof Error) {
                setError(error.message)
            }
        }
    }

    useEffect(() => {
        async function cargarTags() {
            try {
                const data = await getTags();
                setTags(data);
            } catch (error) {
                console.log(error)
            }
        }
    cargarTags()
    },[])

return (
  <Container style={{maxWidth: "600px"}} className="py-4">
    <div className="post-card">
      <h5 className="section-title">Nueva publicación</h5>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={manejarEnvio}>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="¿Qué estás pensando?"
            className="input-auth"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="auth-label">Imágenes (URLs)</Form.Label>
          {imagenes.map((url, index) => (
            <Form.Control
              key={index}
              type="text"
              className="mb-2 input-auth"
              placeholder="https://..."
              value={url}
              onChange={(e) => actualizarImagen(index, e.target.value)}
            />
          ))}
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={agregarCampoImagen}
            disabled={imagenes.length >= 4}
          >
            + Agregar imagen
          </Button>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="auth-label">Etiquetas</Form.Label>
          <div className="d-flex gap-2 flex-wrap">
            {tags.map(tag => (
              <Button
                key={tag.id}
                size="sm"
                type="button"
                onClick={() => toggleTag(tag.id)}
                className={`tag-btn ${selectedTags.includes(tag.id) ? "active" : ""}`}
                >
                {tag.name}
              </Button>
            ))}
          </div>
        </Form.Group>

        <Button type="submit" className="w-100 btn-auth">
          Publicar
        </Button>
      </Form>
    </div>
  </Container>
) 
}

export default NuevoPost;