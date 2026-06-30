import { useEffect, useState } from "react";
import type { Post } from "../types/posts";
import { createPost, getPosts } from "../services/PostService";
import PostCard from "../components/PostCard";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";

function HomePage(){
    const [posts, setPosts] = useState<Post[]>([]);
    const { user, isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const [description, setDescription] = useState("")

    const manejarEnvioHome = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(description.trim() === "") return
        try {
            const nuevoPost = await createPost({
            description,
            userId: user!.id,
            tagIds: []
            })
            setPosts(prev => [nuevoPost, ...prev])
            setDescription("")
        } catch(error) {
            console.error(error)
        }
    }


    useEffect(() => {
        async function cargarPosts() {
            try {
                const data = await getPosts();
                setPosts(data);
            } catch (error) {
                console.error(error)
            }
    }
    cargarPosts()
    }, [])

    return(
          <Container style={{maxWidth: "600px"}} className="py-4">

    {/* Hero */}
    <div className="hero">
      {isAuthenticated ? (
        <>
          <p className="hero-title">¡Hola, @{user?.nickName}!</p>
          <p className="hero-subtitle">¿De vuelta por acá?</p>
        </>
      ) : (
        <>
          <p className="hero-title">Bienvenido a Anti-Social Net <i className="bi bi-twitter-x" /></p>
          <p className="hero-subtitle">La red social con lo último en noticias.</p>
          <div className="d-flex gap-2 mt-3">
            <Button variant="light" size="sm" onClick={() => navigate("/register")}>
              Registrarse
            </Button>
            <Button variant="outline-light" size="sm" onClick={() => navigate("/login")}>
              Iniciar sesión
            </Button>
          </div>
        </>
      )}
    </div>

    {/* Formulario publicar - solo desktop y logueado */}
    {isAuthenticated && (
      <div className="post-card mb-4 d-none d-lg-block">
        <div className="d-flex align-items-center gap-2 mb-3">
          <span className="avatar-custom">
            {user?.nickName.charAt(0).toUpperCase()}
          </span>
          <span className="post-date">¿Qué estás pensando, @{user?.nickName}?</span>
        </div>
        <Form onSubmit={manejarEnvioHome}>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Escribí algo..."
            className="input-auth mb-3"
          />
          <div className="d-flex justify-content-end">
            <Button type="submit" className="btn-auth px-4">
              Publicar
            </Button>
          </div>
        </Form>
      </div>
    )}

    {/* Feed */}
    <h6 className="section-title">Publicaciones</h6>
    {posts.map(p => <PostCard key={p.id} post={p} />)}

    {/* Botón flotante - solo celular y logueado */}
    {isAuthenticated && (
      <button
        className="btn-flotante d-flex d-lg-none"
        onClick={() => navigate("/nuevo-post")}
      >
        <i className="bi bi-pencil-fill" />
      </button>
    )}

  </Container>
    )
}

export default HomePage;