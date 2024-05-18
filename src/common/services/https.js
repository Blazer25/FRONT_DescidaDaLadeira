import axios from "axios";

const atualizarTokenAutorizacaoHeader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    instanciaAxios.defaults.headers.common["Authorization"] = token;
  } else {
    delete instanciaAxios.defaults.headers.common["Authorization"];
  }
};
const instanciaAxios = axios.create({
  baseURL: window.location.origin.includes("localhost")
    ? "http://localhost:3000"
    : "https://api-descidadaladeira.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

instanciaAxios.interceptors.request.use(
  (config) => {
    atualizarTokenAutorizacaoHeader();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

atualizarTokenAutorizacaoHeader();

export default instanciaAxios;
