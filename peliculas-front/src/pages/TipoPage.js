import React, { useEffect, useState } from "react";
import {
  getTipos,
  crearTipo,
  eliminarTipo,
  actualizarTipo,
} from "../services/tipoService";

function TipoPage() {
  const [tipos, setTipos] = useState([]);
  const [nombre, setNombre] = useState("");

  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const cargarTipos = async () => {
    try {
      const data = await getTipos();
      setTipos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarTipos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre) {
      alert("El nombre es obligatorio");
      return;
    }

    try {
      if (editando) {
        await actualizarTipo(idEditar, { nombre });
        setEditando(false);
        setIdEditar(null);
      } else {
        await crearTipo({ nombre });
      }

      setNombre("");
      cargarTipos();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar tipo?")) return;
    await eliminarTipo(id);
    cargarTipos();
  };

  const handleEditar = (t) => {
    setNombre(t.nombre);
    setEditando(true);
    setIdEditar(t.id);
  };

  return (
    <div>
      <h2>{editando ? "Editar Tipo" : "Nuevo Tipo"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <button type="submit">
          {editando ? "Actualizar" : "Guardar"}
        </button>
      </form>

      <h3>Listado</h3>

      <ul>
        {tipos.map((t) => (
          <li key={t.id}>
            {t.nombre}

            <button onClick={() => handleEditar(t)}>Editar</button>
            <button onClick={() => handleEliminar(t.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TipoPage;