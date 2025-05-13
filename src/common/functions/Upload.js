import axios from "axios";

/**
 * Envia um arquivo para uma URL pré-assinada do S3.
 * @param {File|Blob} file - O arquivo a ser enviado.
 * @param {string} urlPreAssinada - A URL pré-assinada do S3.
 * @returns {Promise} - Resolve se o upload for bem-sucedido, rejeita caso contrário.
 */
export async function uploadToS3urlPreAssinada({ file, urlPreAssinada }) {
  try {
    const response = await axios.put(urlPreAssinada, file, {
      headers: {
        "Content-Type": file.type,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}
