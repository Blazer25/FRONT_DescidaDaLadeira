import moment from "moment";

export function obterDataHoraFormatada() {
  return moment().format("YYYY-MM-DD hh:mm:ss");
}

export function converterParaDataHoraFormatada(dataHoraString) {
  return moment(dataHoraString, "YYYY-MM-DD hh:mm:ss").format(
    "DD/MM/YYYY hh:mm:ss"
  );
}

export function removerHoraDaData(dataHoraString) {
  return moment(dataHoraString, "YYYY-MM-DD hh:mm:ss").format("DD/MM/YYYY");
}

export function removerData(dataHoraString) {
  return moment(dataHoraString, "YYYY-MM-DD hh:mm:ss").format("hh:mm:ss");
}
