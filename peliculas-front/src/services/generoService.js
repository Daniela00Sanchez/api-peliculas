import axios from "axios";

const API = "http://localhost:3000/api/generos";

// ✅ Obtener todos
export const getGeneros = async () => {
  const res = await axios.get(API);
  return res.data; // 🔥 CLAVE
};

// Crear
export const crearGenero = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};

// Eliminar
export const eliminarGenero = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};

// Actualizar
export const actualizarGenero = async (id, data) => {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data;
};