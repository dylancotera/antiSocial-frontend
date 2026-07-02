import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTema } from "../context/TemaContext";

export function AppHeader() {
  const { isAuthenticated, user, logout } = useAuth();
  const { tema, toggleTema } = useTema();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <Navbar className="navbar-custom" sticky="top" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-custom">
          Anti-Social Net <i className="bi bi-rocket-takeoff-fill"></i>

        </Navbar.Brand>

        <Navbar.Toggle aria-controls="menu-principal" />
        <Navbar.Collapse id="menu-principal">
          <Nav className="ms-auto align-items-center gap-2">
            <Nav.Link as={NavLink} to="/" className="navlink-custom">
              Inicio
            </Nav.Link>

            {isAuthenticated ? (
              <>
                <Nav.Link as={NavLink} to="/nuevo-post" style={{color: "var(--text)"}}>
                  Publicar
                </Nav.Link>
                <Nav.Link as={NavLink} to="/mi-perfil">
                <span className="avatar-custom">
                  {user?.nickName.charAt(0).toUpperCase()}
                </span>
              </Nav.Link>
                <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => navigate("/login")} variant="outline-primary" size="sm">
                  Iniciar sesión
                </Button>
                <Button onClick={() => navigate("/register")} variant="primary" size="sm">
                  Registrarse
                </Button>
              </>
            )}

            <Button
              variant="outline-secondary"
              size="sm"
              onClick={toggleTema}
            >
              {tema === "light" ? <i className="bi bi-moon-fill"></i> : <i className="bi bi-sun-fill"></i>
}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}