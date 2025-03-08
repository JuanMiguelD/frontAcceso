import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import NavBarUser from '../component/NavBarUser';
import '../styles/CommonRoom.css'; 

function CommonRoom() {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      const token = sessionStorage.getItem("accessToken");

      try {
        const response = await fetch("https://et8plfd6h5.execute-api.us-east-2.amazonaws.com/api/home", {
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
        <div className="commonRoom-container">
        <h1 className="commonRoom-title">Bienvenidos a la Sala Comun</h1>
        <p className="commonRoom-subtitle">
          A continuacion podran encontrar un espacio de recomendaciones de las opciones y preferencias que podran realizar dentro de esta App, espero que difruten de su estadia.
        </p>
      </div>
    </div>
    
  );
}

export default CommonRoom;

