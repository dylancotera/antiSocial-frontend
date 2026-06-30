import { useEffect, useState } from "react";
import type { Post } from "../types/posts";
import { getImages } from "../services/ImagesService";
import type { Images } from "../types/images";
import { getComments } from "../services/CommentService";
import type { Comment } from "../types/comment";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"


type Props = {
    post: Post;
    modo?: String;
};

function PostCard({ post, modo}: Props) {
    const [images, setImages] = useState<Images[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const navigate = useNavigate()


    async function cargarImages() {
        try {
            const data = await getImages(post.id);
            setImages(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function cargarComentarios() {
        try {
            const data = await getComments(post.id)
            setComments(data)
        } catch (error) {
                console.log(error)
            }
        }


    useEffect(() => {
    cargarComentarios()
    if(modo !== "perfil") {
        cargarImages()
    }
    }, [post.id])


    
    return(
    <div className="post-card">
        <div className="d-flex align-items-center gap-2 mb-3">
        <span className="avatar-custom">
            {post.User?.nickName.charAt(0).toUpperCase()}
        </span>
        <div>
            <span className="post-author">@{post.User?.nickName}</span>
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

        {modo !== "perfil" && (
        <>
            {images.length > 0 && (
            <div className="mb-3">
                {images.map(i => (
                <img key={i.id} src={i.url} alt="imagen" className="post-image" />
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
        </>
        )}

        <div className="d-flex justify-content-between align-items-center mt-3" style={{borderTop: "1px solid var(--border)", paddingTop: "10px"}}>
        <span className="post-date"><i className="bi bi-chat"></i> {comments.length} comentarios</span>
        <Button size="sm" className="btn-auth px-3" onClick={() => navigate(`/post/${post.id}`)}>
            Ver más
        </Button>
        </div>
    </div>
    )
}

export default PostCard;