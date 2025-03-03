import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Navigate } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login.tsx';
import AdmView from './pages/AdmView.jsx';
import ReaderView from './pages/ReaderView.jsx';
import CommonRoom from './pages/CommonRoom.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';
import AuthProvider from './auth/AuthProvider.tsx';

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/home" replace /> }, // Redirige a /home automáticamente
  { path: '/home', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: 'adm', element: <AdmView /> },
  { path: 'reader', element: <ReaderView /> },
  { path: 'sala-comun', element: <CommonRoom /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
