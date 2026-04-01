import axios from "axios";

const API = "http://localhost:3000/api/productoras";

// GET
export const getProductoras = async () => {
  const res = await axios.get(API);
  return res.data;
};

// POST
export const crearProductora = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};

// DELETE ✅
export const eliminarProductora = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};

// PUT ✅
export const actualizarProductora = async (id, data) => {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data;
};