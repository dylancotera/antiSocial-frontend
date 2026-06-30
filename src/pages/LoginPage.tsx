import { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errores, setErrores] = useState<Record<string, string>>({})

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nuevosErrores: Record<string, string> = {}
    if(nickName.trim() === "") nuevosErrores.nickName = "El usuario es obligatorio"
    if(password.trim() === "") nuevosErrores.password = "La contraseña es obligatoria"

    if(Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      return
    }

    try {
      const loginOk = await login({ nickName, password });
      if (loginOk) {
        setError("");
        navigate("/mi-perfil");
      } else {
        setError("NickName o contraseña incorrectos");
      }
    } catch {
      setError("Ocurrió un error al intentar iniciar sesión.");
    }
  }

  if (isAuthenticated) return <Navigate to="/mi-perfil" replace />;

  return (
      <Container className="d-flex justify-content-center align-items-center auth-container">
      <div className="auth-card">
        <h2 className="text-center mb-4 auth-title">Anti-Social Net</h2>
        <h5 className="mb-4 auth-subtitle">Iniciar sesión</h5>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="auth-label">Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre de usuario"
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
            <Form.Label className="auth-label">Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!errores.password}
              className="input-auth"
            />
            <Form.Control.Feedback type="invalid">
              {errores.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" className="w-100 mb-3 btn-auth">
            Ingresar
          </Button>

          <div className="text-center">
            <span className="auth-text-secondary">¿No tenés cuenta? </span>
            <Link to="/register" className="auth-link">Registrate</Link>
          </div>
        </Form>
      </div>
  </Container>
  )
}
