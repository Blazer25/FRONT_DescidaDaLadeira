import { defineStore } from "pinia";
import { ref } from "vue";
import http from "../common/services/https";

export const useUpload = defineStore("upload", () => {
  async function uploadLogo({ fileName, contentType }) {
    try {
      return await http.post(
        `/gerar-url-upload-imagem?fileName=${fileName}&contentType=${contentType}`
      );
    } catch (error) {
      return error;
    }
  }

  return {
    uploadLogo,
  };
});
