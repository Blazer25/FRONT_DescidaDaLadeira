import { defineStore } from "pinia";
import { ref } from "vue";
import http from "../common/services/https";

export const useCorrida = defineStore("corrida", () => {
  async function registrarCorrida({
    dataHoraInicio,
    dataHoraFim,
    tempoTotal,
    temposChegadas,
    estagio,
  }) {
    try {
      const dados = {
        dataHoraInicio,
        dataHoraFim,
        tempoTotal,
        temposChegadas,
        estagio,
      };

      return await http.post("/corrida", dados);
    } catch (error) {
      return error;
    }
  }

  async function listarCorridas() {
    try {
      return await http.get("/corridas", null);
    } catch (error) {
      return error;
    }
  }

  return {
    registrarCorrida,
    listarCorridas
  };
});
