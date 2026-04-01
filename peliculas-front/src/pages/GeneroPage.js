import React, { useEffect, useState } from "react";
import {
  getGeneros,
  crearGenero,
  eliminarGenero,
  actualizarGenero,
} from "../services/generoService";

function GeneroPage() {
  const [generos, setGeneros] = useState([]);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  // 🔥 CARGAR
  const cargarGeneros = async () => {
    try {
      const data = await getGeneros();
      setGeneros(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando géneros", error);
    }
  };

  useEffect(() => {
    cargarGeneros();
  }, []);

  // 🔥 GUARDAR / ACTUALIZAR
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !descripcion) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      if (editando) {
        await actualizarGenero(idEditar, { nombre, descripcion });
        setEditando(false);
        setIdEditar(null);
      } else {
        await crearGenero({ nombre, descripcion });
      }

      setNombre("");
      setDescripcion("");

      cargarGeneros();
    } catch (error) {
      console.error("Error guardando", error);
    }
  };

  // 🔥 ELIMINAR
  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este género?")) return;

    try {
      await eliminarGenero(id);
      cargarGeneros();
    } catch (error) {
      console.error("Error eliminando", error);
    }
  };

  // 🔥 EDITAR (CARGA DATOS AL FORM)
  const handleEditar = (g) => {
    setNombre(g.nombre);
    setDescripcion(g.descripcion);
    setEditando(true);
    setIdEditar(g.id);
  };

  return (
    <div>
      <h2>{editando ? "Editar Género" : "Nuevo Género"}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />

        <button type="submit">
          {editando ? "Actualizar" : "Guardar"}
        </button>
      </form>

      <h3>Listado de Géneros</h3>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {generos.length > 0 ? (
            generos.map((g) => (
              <tr key={g.id}>
                <td>{g.nombre}</td>
                <td>{g.descripcion}</td>
                <td>
                  <button onClick={() => handleEditar(g)}>
                    Editar
                  </button>

                  <button
                    onClick={() => handleEliminar(g.id)}
                    style={{ marginLeft: "10px", color: "red" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No hay datos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default GeneroPage;