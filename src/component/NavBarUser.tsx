
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import React from "react";
import "../styles/navBarUser.css"

const NavBarUser = () => {
  const { setIsAuthenticated, setUserType, userType } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userType");
    setIsAuthenticated(false);
    setUserType(null);
    navigate("/login");
  };

  const handleNavigate = (path: string) => {
    if (!userType) return;
    if ((path === "/adm" && userType !== "ADM") || (path === "/reader" && userType !== "READER")) {
      alert("No tienes permiso para acceder a esta sección.");
      return;
    }
    navigate(path);
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        <div className="navbar-options">
          {userType === "ADM" && (
            <button onClick={() => handleNavigate("/adm")} className="navbar-button">
              Área Admin
            </button>
          )}
          {userType === "READER" && (
            <button onClick={() => handleNavigate("/reader")} className="navbar-button">
              Área Reader
            </button>
          )}
          <button onClick={() => navigate("/sala-comun")} className="navbar-button">
            Sala Común
          </button>
        </div>
        <div className="user-section">
          <span className="user-type">
            {userType === "ADM" ? "Administrador" : "Lector"}
          </span>
          <button onClick={handleLogout} className="logout-button">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBarUser;
