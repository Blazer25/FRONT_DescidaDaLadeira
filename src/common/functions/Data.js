const moment = require("moment");

function obterDataHoraFormatada() {
  return moment().format("YYYY-MM-DD hh:mm:ss");
}

function converterParaDataHoraFormatada(dataHoraString) {
  return moment(dataHoraString, "YYYY-MM-DD hh:mm:ss").format(
    "DD/MM/YYYY hh:mm:ss"
  );
}

function removerHoraDaData(dataHoraString) {
  return moment(dataHoraString, "YYYY-MM-DD hh:mm:ss").format("YYYY-MM-DD");
}

export default {
  obterDataHoraFormatada,
  converterParaDataHoraFormatada,
  removerHoraDaData,
};
