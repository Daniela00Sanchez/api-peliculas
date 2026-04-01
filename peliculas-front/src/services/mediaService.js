import axios from "axios";

const API = "http://localhost:3000/api/media";

export const getMedia = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const crearMedia = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};