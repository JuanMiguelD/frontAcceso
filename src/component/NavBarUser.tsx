
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import React from "react";

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
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Opciones de navegación */}
          <div className="flex space-x-6">
            <button onClick={() => handleNavigate("/adm")} className="text-gray-700 hover:text-blue-600 text-sm font-medium">
              Área Admin
            </button>
            <button onClick={() => handleNavigate("/reader")} className="text-gray-700 hover:text-blue-600 text-sm font-medium">
              Área Reader
            </button>
            <button onClick={() => navigate("/sala-comun")} className="text-gray-700 hover:text-blue-600 text-sm font-medium">
              Sala Común
            </button>
          </div>

          {/* Sección de usuario y logout */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 text-sm font-medium">
              {userType === "ADM" ? "Administrador" : "Lector"}
            </span>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBarUser;
