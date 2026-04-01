import axios from "axios";

const API = "http://localhost:3000/api/tipos";

// GET
export const getTipos = async () => {
  const res = await axios.get(API);
  return res.data;
};

// POST
export const crearTipo = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};

// DELETE ✅
export const eliminarTipo = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};

// PUT ✅
export const actualizarTipo = async (id, data) => {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data;
};