import { defineStore } from "pinia";
import { ref } from "vue";
import http from "../common/services/https";

export const useCorrida = defineStore("corrida", () => {
  const token = ref(localStorage.getItem("token"));

  async function registrarCorrida({
    dataHoraInicio,
    dataHoraFim,
    tempoTotal,
    temposChegadas,
  }) {
    try {
      const dados = {
        dataHoraInicio,
        dataHoraFim,
        tempoTotal,
        temposChegadas,
      };

      return await http.post("/corrida", dados);
    } catch (error) {
      return error;
    }
  }

  return {
    registrarCorrida,
  };
});
