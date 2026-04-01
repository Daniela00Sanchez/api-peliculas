import React, { useEffect, useState } from "react";
import {
  getProductoras,
  crearProductora,
  eliminarProductora,
  actualizarProductora,
} from "../services/productoraService";

function ProductoraPage() {
  const [productoras, setProductoras] = useState([]);
  const [nombre, setNombre] = useState("");

  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);

  const cargarProductoras = async () => {
    try {
      const data = await getProductoras();
      setProductoras(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    cargarProductoras();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre) {
      alert("El nombre es obligatorio");
      return;
    }

    try {
      if (editando) {
        await actualizarProductora(idEditar, { nombre });
        setEditando(false);
        setIdEditar(null);
      } else {
        await crearProductora({ nombre });
      }

      setNombre("");
      cargarProductoras();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar productora?")) return;
    await eliminarProductora(id);
    cargarProductoras();
  };

  const handleEditar = (p) => {
    setNombre(p.nombre);
    setEditando(true);
    setIdEditar(p.id);
  };

  return (
    <div>
      <h2>{editando ? "Editar Productora" : "Nueva Productora"}</h2>

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
        {productoras.map((p) => (
          <li key={p.id}>
            {p.nombre}

            <button onClick={() => handleEditar(p)}>Editar</button>
            <button onClick={() => handleEliminar(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductoraPage;