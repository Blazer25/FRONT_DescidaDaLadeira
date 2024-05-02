import { defineStore } from "pinia";
import http from "../common/services/https";

export const useRanking = defineStore("ranking", () => {
  async function listarRanking() {
    try {
      return await http.get("/ranking", null);
    } catch (error) {
      return error;
    }
  }

  return {
    listarRanking
  };
});
