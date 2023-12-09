import { defineStore } from "pinia";
import { ref } from "vue";
import http from "../common/services/https";

export const useAuth = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token"));
  const usuario = ref(localStorage.getItem("usuario"));

  function setarToken(valorToken) {
    localStorage.setItem("token", valorToken);
    token.value = valorToken;
  }

  function setarUsuario(valorUsuario) {
    localStorage.setItem("usuario", valorUsuario);
    usuario.value = valorUsuario;
  }

  async function verificarToken() {
    try {
      const resultado = await http.get("/auth/verificar-token", {
        headers: {
          Authorization: token.value || null,
        },
      });
      if (resultado.status !== 200) {
        return false;
      }
      return true;
    } catch (error) {}
  }

  function deslogarUsuario() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    token.value = "";
    usuario.value = "";
  }

  return {
    token,
    usuario,
    setarToken,
    setarUsuario,
    verificarToken,
    deslogarUsuario,
  };
});
