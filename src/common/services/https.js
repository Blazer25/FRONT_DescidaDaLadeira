import axios from "axios";

const instanciaAxios = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem('token') || null
  }
});

export default instanciaAxios;