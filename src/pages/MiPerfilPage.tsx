import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getPostDeUser } from "../services/PostService";
import type { Post } from "../types/posts";
import PostCard from "../components/PostCard";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function MiPerfilPage(){
    const { user, logout } = useAuth()
    const [posts, setPosts] = useState<Post[]>([])
    const navigate = useNavigate()

    useEffect(() =>{
        async function cargarPostDeUser() {
            try {
                const data = await getPostDeUser(user!.id);
                setPosts(data.reverse());
            } catch (error) {
                console.error(error)
            }
    }
    cargarPostDeUser()}, [])

    return(
  <Container style={{maxWidth: "600px"}} className="py-4">
    
    <div className="post-card mb-4">
      <div className="d-flex align-items-center gap-3">
        <span className="avatar-custom" style={{width: "60px", height: "60px", fontSize: "24px"}}>
          {user?.nickName.charAt(0).toUpperCase()}
        </span>
        <div>
          <h5 className="post-author mb-0">@{user?.nickName}</h5>
          <span className="post-date">{posts.length} publicaciones</span>
        </div>
        <Button 
          variant="outline-danger" 
          size="sm" 
          className="ms-auto"
          onClick={() => { logout(); navigate("/login") }}
        >
          Cerrar sesión
        </Button>
      </div>
    </div>

    <h6 className="section-title">Mis publicaciones</h6>

    {posts.length === 0 ? (
      <div className="text-center py-5">
        <p className="post-date">Todavía no publicaste nada</p>
        <Button className="btn-auth mt-2" onClick={() => navigate("/nuevo-post")}>
          Crear primera publicación
        </Button>
      </div>
    ) : (
      posts.map(p => <PostCard key={p.id} post={p} modo="perfil" />)
    )}

  </Container>
    )
}

export default MiPerfilPage;