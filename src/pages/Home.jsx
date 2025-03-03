import React from 'react';
import NavBarHome from '../component/NavBarHome.tsx';
import '../styles/Home.css'; 

function Home() {
  return (
    <div>
      <NavBarHome />
      <div className="home-container">
        <h1 className="home-title">Bienvenidos al sistema de registro</h1>
        <p className="home-subtitle">Creado por...

          Juan Dimate y Andrey Conejo
        </p>
      </div>
    </div>
    
  );
} 
  

export default Home;
