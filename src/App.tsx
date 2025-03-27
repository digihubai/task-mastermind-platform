
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/Index'
import NotFound from './pages/NotFound'
import router from './pages/routes'

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<IndexPage />} />
      {/* Handle all other routes through our router */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
