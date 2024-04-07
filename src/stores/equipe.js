import { defineStore } from "pinia";
import http from "../common/services/https";

export const useEquipe = defineStore("equipe", () => {
  const state = {
    equipeSelecionada: null,
  };

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

  async function listarEquipes({filtros}) {
    try {
      return await http.get(`/equipes?ativas=${filtros?.ativas || ''}`, null);
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

      return await http.patch(`/equipe/${codigoEquipe}`, dados);
    } catch (error) {
      return error;
    }
  }

  async function inativarAtivarEquipe({ codigoEquipe }) {
    try {
      return await http.post(`/equipe/inativarAtivar/${codigoEquipe}`);
    } catch (error) {
      return error;
    }
  }

  function setEquipeSelecionada(equipe) {
    state.equipeSelecionada = equipe;
    localStorage.setItem("equipeSelecionada", JSON.stringify(equipe));
  }

  function retornarState() {
    return state;
  }

  function resetarState() {
    state.equipeSelecionada = null;
    localStorage.removeItem("equipeSelecionada");
  }

  return {
    registrarEquipe,
    listarEquipes,
    alterarEquipe,
    inativarAtivarEquipe,
    
    setEquipeSelecionada,
    resetarState,
    retornarState,
  };
});
