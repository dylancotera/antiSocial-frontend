import { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { crearUsuario } from "../services/UsuarioService";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export function RegisterPage() {
    const [nickName, setNickName] = useState("");
    const [email, setEmail] = useState("");
    const [errores, setErrores] = useState<Record<string, string>>({})
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth();

     const validarFormulario = () => {
      const nuevosErrores: Record<string, string> = {}

      if(nickName.trim() === "") {
        nuevosErrores.nickName = "El usuario es obligatorio"
      } else if(nickName.length < 3) {
          nuevosErrores.nickName = "El usuario debe tener al menos 3 caracteres"
      } else if(nickName.includes(" ")) {
          nuevosErrores.nickName = "El usuario no puede tener espacios"
      }else if(nickName.length > 10) {
          nuevosErrores.nickName = "El usuario no puede tener mas de 10 caracteres"
      }
      if(email.trim() === ""){
        nuevosErrores.email = "El email es obligatorio"
      } else if (!email.includes("@")){
        nuevosErrores.email = "El email debe contener el @"
      }

      return nuevosErrores
    }

    const manejarEnvio = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const erroresValidacion = validarFormulario()

        if(Object.keys(erroresValidacion).length > 0){
            setErrores(erroresValidacion)
            return;
        }

        try {
            await crearUsuario({ nickName, email })
            navigate("/login", { state: { mensaje: "¡Registro exitoso! Iniciá sesión." } })
        } catch (error) {
            if (error instanceof Error) {
                 setErrores({ general: error.message });
            }
        }
    }

    if (isAuthenticated) {
        return <Navigate to="/mi-perfil" replace />;
    }
    return (
        <Container className="d-flex justify-content-center align-items-center auth-container">
    <div className="auth-card">
      <h2 className="text-center mb-4 auth-title">Anti-Social Net</h2>
      <h5 className="mb-4 auth-subtitle">Creá tu cuenta</h5>

      {errores.general && <Alert variant="danger">{errores.general}</Alert>}

      <Form onSubmit={manejarEnvio}>
        <Form.Group className="mb-3">
          <Form.Label className="auth-label">Usuario</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            isInvalid={!!errores.nickName}
            className="input-auth"
          />
          <Form.Control.Feedback type="invalid">
            {errores.nickName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="auth-label">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!errores.email}
            className="input-auth"
          />
          <Form.Control.Feedback type="invalid">
            {errores.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" className="w-100 mb-3 btn-auth">
          Registrarse
        </Button>

        <div className="text-center">
          <span className="auth-text-secondary">¿Ya tenés cuenta? </span>
          <Link to="/login" className="auth-link">Iniciá sesión</Link>
        </div>
      </Form>
    </div>
  </Container>
  )
}

export default RegisterPage;