import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import DetallePost from './pages/DetallePost'
import { ProtectedRoute } from './routes/ProtectedRoute'
import MiPerfilPage from './pages/MiPerfilPage'
import NuevoPost from './pages/NuevoPost'
import { Layout } from './components/Layout'

function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/post/:id" element={<DetallePost />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/mi-perfil" element={<MiPerfilPage />} />
          <Route path="/nuevo-post" element={<NuevoPost />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
      )
}

export default App
