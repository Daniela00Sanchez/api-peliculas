import React, { useEffect, useState } from "react";
import { getDirectores, crearDirector } from "../services/directorService";

function DirectorPage() {
  const [directores, setDirectores] = useState([]);
  const [nombre, setNombre] = useState("");

 const cargarDirectores = async () => {
  try {
    const res = await getDirectores();
    setDirectores(res.data || []);
  } catch (error) {
    console.error("Error cargando directores", error);
  }
};

  useEffect(() => {
    cargarDirectores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await crearDirector({
      nombre
    });

    setNombre("");
    cargarDirectores();
  };

  return (
    <div>
      <h2>Gestión de Directores</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <button type="submit">Guardar</button>
      </form>

      <ul>
        {directores.map((d) => (
          <li key={d.id}>{d.nombre}</li>
        ))}
      </ul>
    </div>
  );
}

export default DirectorPage;