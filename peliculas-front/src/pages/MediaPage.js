import React, { useEffect, useState } from "react";
import { getMedia, crearMedia } from "../services/mediaService";
import { getGeneros } from "../services/generoService";
import { getTipos } from "../services/tipoService";
import { getDirectores } from "../services/directorService";
import { getProductoras } from "../services/productoraService";

function MediaPage() {
  // 🔹 ESTADOS
  const [media, setMedia] = useState([]);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [video, setVideo] = useState("");

  const [generos, setGeneros] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);

  const [generoId, setGeneroId] = useState("");
  const [tipoId, setTipoId] = useState("");
  const [directorId, setDirectorId] = useState("");
  const [productoraId, setProductoraId] = useState("");

  // 🔹 CARGAR TODO
  const cargarTodo = async () => {
    try {
      const [mediaData, generosData, tiposData, directoresData, productorasData] =
        await Promise.all([
          getMedia(),
          getGeneros(),
          getTipos(),
          getDirectores(),
          getProductoras(),
        ]);

      setMedia(Array.isArray(mediaData) ? mediaData : []);
      setGeneros(Array.isArray(generosData) ? generosData : []);
      setTipos(Array.isArray(tiposData) ? tiposData : []);
      setDirectores(Array.isArray(directoresData) ? directoresData : []);
      setProductoras(Array.isArray(productorasData) ? productorasData : []);

    } catch (error) {
      console.error("❌ Error cargando datos:", error);
    }
  };

  useEffect(() => {
    cargarTodo();
  }, []);

  // 🔹 GUARDAR MEDIA
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !nombre ||
      !descripcion ||
      !video ||
      !generoId ||
      !tipoId ||
      !directorId ||
      !productoraId
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      await crearMedia({
        nombre,
        descripcion,
        video,
        generoId: Number(generoId),
        tipoId: Number(tipoId),
        directorId: Number(directorId),
        productoraId: Number(productoraId),
      });

      // 🔄 LIMPIAR
      setNombre("");
      setDescripcion("");
      setVideo("");
      setGeneroId("");
      setTipoId("");
      setDirectorId("");
      setProductoraId("");

      cargarTodo();

    } catch (error) {
      console.error("❌ Error al guardar media:", error);
      alert("Error al guardar");
    }
  };

  return (
    <div>
      <h2>Gestión de Media</h2>

      {/* 🔹 FORMULARIO */}
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

        <input
          type="text"
          placeholder="URL del video (YouTube)"
          value={video}
          onChange={(e) => setVideo(e.target.value)}
        />

        {/* 🔹 SELECTS */}
        <select value={generoId} onChange={(e) => setGeneroId(e.target.value)}>
          <option value="">Seleccione Género</option>
          {generos.map((g) => (
            <option key={g.id} value={g.id}>
              {g.nombre}
            </option>
          ))}
        </select>

        <select value={tipoId} onChange={(e) => setTipoId(e.target.value)}>
          <option value="">Seleccione Tipo</option>
          {tipos.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nombre}
            </option>
          ))}
        </select>

        <select value={directorId} onChange={(e) => setDirectorId(e.target.value)}>
          <option value="">Seleccione Director</option>
          {directores.map((d) => (
            <option key={d.id} value={d.id}>
              {d.nombre}
            </option>
          ))}
        </select>

        <select value={productoraId} onChange={(e) => setProductoraId(e.target.value)}>
          <option value="">Seleccione Productora</option>
          {productoras.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>

        <button type="submit">Guardar</button>
      </form>

      {/* 🔹 LISTA */}
      <h3>Lista de Media</h3>

      {media.length === 0 ? (
        <p>No hay registros</p>
      ) : (
        <ul>
          {media.map((m) => (
            <li key={m.id} style={{ marginBottom: "20px" }}>
              <p>
                <strong>{m.nombre}</strong> - {m.descripcion}
              </p>

              {m.video && (
                <iframe
                  width="300"
                  height="200"
                  src={m.video.replace("watch?v=", "embed/")}
                  title="video"
                  allowFullScreen
                ></iframe>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MediaPage;