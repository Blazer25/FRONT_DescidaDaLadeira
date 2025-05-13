import { defineStore } from "pinia";
import http from "../common/services/https";

export const useEquipe = defineStore("equipe", () => {
  const state = {
    equipeSelecionada: null,
    equipesPorFaseSelecionada: null,
  };

  async function registrarEquipe({
    nome,
    quantidadeIntegrantes,
    integrantes,
    numeroCarrinho,
    logoUrl,
  }) {
    try {
      const dados = {
        nome,
        quantidadeIntegrantes,
        integrantes,
        numeroCarrinho,
        logoUrl,
      };

      return await http.post("/equipe", dados);
    } catch (error) {
      return error;
    }
  }

  async function registrarEquipePorFase({ equipes, fase }) {
    try {
      const dados = {
        equipes,
        fase,
      };

      return await http.post("/equipes/porFase", dados);
    } catch (error) {
      return error;
    }
  }

  async function listarEquipes({ filtros }) {
    try {
      return await http.get(
        `/equipes?ativas=${filtros?.ativas || ""}&nome=${filtros?.nome || ""}`,
        null
      );
    } catch (error) {
      return error;
    }
  }

  async function listarEquipesPorFase({ filtros }) {
    try {
      return await http.get(
        `/equipes/porFase?fase=${filtros?.fase || ""}`,
        null
      );
    } catch (error) {
      return error;
    }
  }

  async function alterarEquipe({
    codigoEquipe,
    nomeEquipe,
    dadosIntegrantes,
    numeroCarrinho,
    logoUrl,
  }) {
    try {
      const dados = {
        nomeEquipe,
        dadosIntegrantes,
        numeroCarrinho,
        logoUrl
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

  function setEquipePorFaseSelecionada(equipesPorFase) {
    state.equipesPorFaseSelecionada = equipesPorFase;
    localStorage.setItem(
      "equipesPorFaseSelecionada",
      JSON.stringify(equipesPorFase)
    );
  }

  function retornarState() {
    return state;
  }

  function resetarState() {
    state.equipeSelecionada = null;
    state.equipesPorFaseSelecionada = null;
    localStorage.removeItem("equipeSelecionada");
    localStorage.removeItem("equipesPorFaseSelecionada");
  }

  return {
    registrarEquipe,
    registrarEquipePorFase,
    listarEquipes,
    listarEquipesPorFase,
    alterarEquipe,
    inativarAtivarEquipe,

    setEquipeSelecionada,
    setEquipePorFaseSelecionada,
    resetarState,
    retornarState,
  };
});
