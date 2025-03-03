
import React, { useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import NavBarHome from "../component/NavBarHome";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorResponse, setErrorResponse] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, userType, setUserType } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorResponse(null);  
    try {
      const response = await fetch("https://et8plfd6h5.execute-api.us-east-2.amazonaws.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          "email": email,
          "password": password
        }),
      });

      if (response.ok) {
        const json = await response.json();
        console.log("Respuesta del backend:", json); 
        if (json.accessToken ) {
          sessionStorage.setItem('accessToken',json.accessToken );
          setUserType(json.userType);
          setIsAuthenticated(true);
        }
      } else {
        const json = await response.json();
        setErrorResponse(json.body.error || "Error de autenticación");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setErrorResponse("Error de conexión. Inténtalo más tarde.");
    }
  }

  useEffect(() => {
      if (isAuthenticated) {
        if (userType === 'ADM') {
          navigate('/adm');
        } else if (userType === 'READER') {
          navigate('/reader');
        }
      }
  }, [isAuthenticated, userType, navigate]);

  return (
    <>
      <NavBarHome/>
        <div className="register-container">
          <form onSubmit={handleSubmit} className="register-box">
            <h2 className="register-title">Login</h2>
  
            {errorResponse && (
              <div className="register-error">
                {errorResponse}
              </div>
            )}
  
            <div>
              <label htmlFor="email" className="register-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="register-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
  
            <div>
              <label htmlFor="password" className="register-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="register-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
  
            <button
              type="submit"
              className="register-button"
            >
              Login
            </button>
          </form>
        </div>
      </>
    );
  
};

export default Login;
