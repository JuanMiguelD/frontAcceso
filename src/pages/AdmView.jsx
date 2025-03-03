import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import NavBarUser from "../component/NavBarUser.tsx";
import "../styles/Home.css"; 

function AdmView() {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      const token = sessionStorage.getItem("accessToken");

      try {
        const response = await fetch("https://et8plfd6h5.execute-api.us-east-2.amazonaws.com/api/adm", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setIsAuthorized(true);
        } else {
          throw new Error("Unauthorized");
        }
      } catch (error) {
        console.error("Acceso no autorizado:", error);
        setIsAuthorized(false);
      }
    };

    checkAccess();
  }, [navigate]);

  if (isAuthorized === null) return <p>Cargando...</p>;
  if (isAuthorized === false) return <p>Acceso No permitido</p>;  // Evita que la página cargue


  return (
    <div>
      <NavBarUser/>
      <div className="container">
        <h1 className="title">Bienvenidos Pagina de Administrador</h1>
      </div>
    </div>
  );
}

export default AdmView;
