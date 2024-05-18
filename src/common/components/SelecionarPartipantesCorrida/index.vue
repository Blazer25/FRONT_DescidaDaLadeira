<template>
  <div
    class="selecao-equipe"
    :class="[{ selecionada, bloquear }]"
    @click="selecionarEquipe"
  >
    <div v-for="equipe in equipes">
      <span>{{ equipe.nome }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelecionarPartipantesCorrida",

  data() {
    return {
      selecionada: false,
    };
  },

  props: {
    equipes: {
      type: Array,
      default: [
        {
          nome: "teste1",
        },
        {
          nome: "teste2",
        },
        {
          nome: "teste3",
        },
      ],
    },
    bloquear: {
      type: Boolean,
      default: false
    },
  },

  methods: {
    selecionarEquipe() {
      this.selecionada = !this.selecionada ? true : false;

      this.emitirEquipeSelecionada();
    },

    emitirEquipeSelecionada() {
      this.$emit("selecionarPartipantesCorrida", this.equipe);
    },
  },
};
</script>

<style lang="scss" scoped src="./styles.scss" />
