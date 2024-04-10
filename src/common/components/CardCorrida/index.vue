<template>
  <div class="card">
    <span>{{ indice + 1 }}° Corrida</span>
    <span>{{ this.$functions.removerHoraDaData(corrida.dataHoraInicio) }}</span>
    <span>De: {{ this.$functions.removerData(corrida.dataHoraInicio) }}</span>
    <span>Até: {{ this.$functions.removerData(corrida.dataHoraInicio) }}</span>
    <span>Total: {{ corrida.tempoTotal }}</span>

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
  },
  methods: {},
};
</script>

<style lang="scss" scoped src="./styles.scss" />
