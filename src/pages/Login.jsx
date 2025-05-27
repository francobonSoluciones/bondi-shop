import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  if (isAuthenticated) return <Navigate to="/protected" />

  const handleSubmit = (e) => {
    e.preventDefault()
    const success = login(username, password)
    if (success) {
      navigate('/protected')
    } else {
      setError('Credenciales inválidas')
    }
  }

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto bg-white shadow-md rounded p-6 mt-10">
  <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
  <div>
    <label className="block mb-1 font-semibold">Usuario</label>
    <input
      type="text"
      className="w-full border px-3 py-2 rounded shadow-sm"
      value={username}
      onChange={e => setUsername(e.target.value)}
    />
  </div>
  <div>
    <label className="block mb-1 font-semibold">Contraseña</label>
    <input
      type="password"
      className="w-full border px-3 py-2 rounded shadow-sm"
      value={password}
      onChange={e => setPassword(e.target.value)}
    />
  </div>
  {error && <div className="text-red-600 font-semibold">{error}</div>}
  <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
    Ingresar
  </button>
</form>
    </div>
  )
}