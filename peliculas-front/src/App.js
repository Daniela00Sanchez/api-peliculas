import React, { useState } from "react";
import Navbar from "./components/Navbar";

import GeneroPage from "./pages/GeneroPage";
import ProductoraPage from "./pages/ProductoraPage";
import TipoPage from "./pages/TipoPage";
import DirectorPage from "./pages/DirectorPage";
import MediaPage from "./pages/MediaPage";

import "./App.css";

function App() {
  const [vista, setVista] = useState("generos");

  return (
    <div>
      <Navbar setVista={setVista} />

      <div className="container">
        {vista === "generos" && <GeneroPage />}
        {vista === "productoras" && <ProductoraPage />}
        {vista === "tipos" && <TipoPage />}
        {vista === "directores" && <DirectorPage />}
        {vista === "media" && <MediaPage />}
      </div>
    </div>
  );
}

export default App;