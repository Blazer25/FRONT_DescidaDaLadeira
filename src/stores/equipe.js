import { defineStore } from "pinia";
import http from "../common/services/https";

export const useEquipe = defineStore("equipe", () => {
  async function registrarEquipe({ nome, quantidadeIntegrantes, integrantes }) {
    try {
      const dados = {
        nome,
        quantidadeIntegrantes,
        integrantes,
      };

      return await http.post("/equipe/registrar", dados);
    } catch (error) {
      return error;
    }
  }

  return {
    registrarEquipe,
  };
});
