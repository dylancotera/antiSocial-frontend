import { useEffect, useState } from "react";
import type { Post } from "../types/posts";
import { createComment, getComments } from "../services/CommentService";
import { getPost } from "../services/PostService";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Images } from "../types/images";
import { getImages } from "../services/ImagesService";
import type { Comment } from "../types/comment";
import { Button, Container, Form } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

function DetallePost(){
    const { id } = useParams()
    const [post, setPost] = useState<Post | null>(null);
    const [images, setImages] = useState<Images[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("")
    const [errores, setErrores] = useState<Record<string, string>>({})
    const [errorPost, setErrorPost] = useState("")
    const { user, isAuthenticated  } = useAuth()
    const navigate = useNavigate()


    async function cargarPost() {
                try {
                    const data = await getPost(Number(id))
                    setPost(data)
                } catch (error) {
                    if (error instanceof Error) {
                        setErrorPost(error.message)
                }
                }
    }
                
    async function cargarImages() {
            try {
                const data = await getImages(Number(id));
                setImages(data);
            } catch (error) {
                console.log(error);
            }
    }

    async function cargarComentarios() {
        try {
            const data = await getComments(Number(id))
            setComments(data)
        } catch (error) {
                console.log(error)
            }
    }

    useEffect(() => {
        cargarPost()
        cargarImages()
        cargarComentarios()
    }, [id])

    const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(newComment.trim() === "") {
            setErrores({ comment: "El comentario es obligatorio" })
            return;
        }
        try {
            await createComment({ content: newComment, userId: user!.id, postId: Number(id) })
            setNewComment("")
            cargarComentarios()
        } catch(error) {
            if (error instanceof Error) {
                setErrores({ general: error.message });
            }
        }
    }

    if(errorPost) return (
    <Container className="text-center py-5">
        <h4>{errorPost}</h4>
        <Button onClick={() => navigate("/")}>Volver al inicio</Button>
    </Container>
    )

    if(!post) return <p>Cargando...</p>

    return(
        <Container className="py-4" style={{maxWidth: "600px"}}>
    
    <div className="post-card mb-4">
      <div className="d-flex align-items-center gap-2 mb-3">
        <span className="avatar-custom">
          {post.User.nickName.charAt(0).toUpperCase()}
        </span>
        <div>
          <span className="post-author">@{post.User.nickName}</span>
          <br />
          <span className="post-date">
            {new Date(post.createdAt).toLocaleString("es-AR", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            })}
        </span>
        </div>
      </div>

      <p className="post-description">{post.description}</p>

      {images.length > 0 && (
        <div className="mb-3">
          {images.map(i => (
            <img key={i.id} src={i.url} alt="imagen del post" className="post-image" />
          ))}
        </div>
      )}

      {post.Tags.length > 0 && (
        <div className="mb-2">
          {post.Tags.map(t => (
            <span key={t.id} className="post-tag">{t.name}</span>
          ))}
        </div>
      )}
    </div>

    <h6 className="section-title">
      Comentarios: {comments.length}
    </h6>

    {comments.map(c => (
      <div key={c.id} className="comment-item">
        <div className="d-flex align-items-center gap-2">
          <span className="avatar-custom" style={{width: "28px", height: "28px", fontSize: "12px"}}>
            {c.User.nickName.charAt(0).toUpperCase()}
          </span>
          <span className="comment-author">@{c.User.nickName}</span>
          <span className="comment-date">
            {new Date(c.createdAt).toLocaleString("es-AR", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            })}
          </span>
        </div>
        <p className="comment-content">{c.content}</p>
      </div>
    ))}

    {isAuthenticated ? (
      <div className="post-card mt-4">
        <Form onSubmit={manejarEnvio}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Escribí un comentario..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              isInvalid={!!errores.comment}
              className="input-auth"
            />
            <Form.Control.Feedback type="invalid">
              {errores.comment}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" className="btn-auth mt-2 px-4">
            Comentar
          </Button>
        </Form>
      </div>
    ) : (
      <p className="post-date text-center mt-3">
        <Link to="/login" className="auth-link">Iniciá sesión</Link> para comentar
      </p>
    )}
  </Container>
    )
}


export default DetallePost;