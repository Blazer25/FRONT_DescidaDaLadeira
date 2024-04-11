<template>
  <div class="card" :class="retornarFundo">
    <span class="numero-corrida">{{ indice + 1 }}° Corrida</span>
    <span>{{ this.$functions.removerHoraDaData(corrida.dataHoraInicio) }}</span>
    <!-- <span>De: {{ this.$functions.removerData(corrida.dataHoraInicio) }}</span>
    <span>Até: {{ this.$functions.removerData(corrida.dataHoraInicio) }}</span> -->
    <span>{{ corrida.tempoTotal }}</span>

    <div class="top-tres">
      <div v-for="(equipe, index) in topTresEquipes" :key="index">
        <span>{{ equipe }}</span>
      </div>
    </div>

    <div class="detalhes">
      <span class="detalhes-texto">Detalhes</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardCorrida",

  data() {
    return {};
  },
  props: {
    corrida: {
      type: Object,
      required: true,
    },
    indice: {
      type: Number,
      required: true,
    },
    estagio: {
      type: String,
      required: true,
    },
  },
  computed: {
    retornarFundo() {
      if (this.estagio === "grupos") return "fundo-grupo";
      if (this.estagio === "oitavas") return "fundo-oitavas";
      if (this.estagio === "quartas") return "fundo-quartas";
      if (this.estagio === "semi") return "fundo-semi";
      if (this.estagio === "final") return "fundo-final";

      return "fundo-padrao";
    },

    topTresEquipes() {
      const topTres = this.corrida.temposChegadas
        .filter((dadosEquipe) => ["1", "2", "3"].includes(dadosEquipe.posicao))
        .map(
          (equipe) =>
            `${equipe.posicao}° ${this.limitarTexto(equipe.equipe.nome)}`
        );

      return topTres;
    },
  },
  methods: {
    limitarTexto(frase) {
      if (frase.length <= 10) return frase;
      return frase.substring(0, 10) + "...";
    },
  },
};
</script>

<style lang="scss" scoped src="./styles.scss" />
