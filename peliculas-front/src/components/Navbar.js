import React from "react";
import "./Navbar.css";

function Navbar({ setVista }) {
  return (
    <nav className="navbar">
      <h2 className="logo">IU Digital - Películas</h2>

      <div className="nav-links">
        <button onClick={() => setVista("generos")}>Géneros</button>
        <button onClick={() => setVista("directores")}>Directores</button>
        <button onClick={() => setVista("productoras")}>Productoras</button>
        <button onClick={() => setVista("tipos")}>Tipos</button>
        <button onClick={() => setVista("media")}>Media</button>
      </div>
    </nav>
  );
}

export default Navbar;