import axios from "axios";

const API = "http://localhost:3000/api/directores";

export const getDirectores = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const crearDirector = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};