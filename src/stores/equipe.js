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

      return await http.post("/equipe", dados);
    } catch (error) {
      return error;
    }
  }

  async function listarEquipes() {
    try {
      return await http.get("/equipes", null);
    } catch (error) {
      return error;
    }
  }

  async function alterarEquipe({ codigoEquipe, nomeEquipe, dadosIntegrantes }) {
    try {
      const dados = {
        nomeEquipe,
        dadosIntegrantes,
      };

      return await http.patch(`/equipe/alterar/${codigoEquipe}`, dados);
    } catch (error) {
      return error;
    }
  }

  return {
    registrarEquipe,
    listarEquipes,
    alterarEquipe,
  };
});
