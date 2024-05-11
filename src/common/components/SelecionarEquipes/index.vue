<template>
  <div
    class="selecao-equipe"
    :class="[{ selecionada }, { bloquear }]"
    @click="selecionarEquipe"
  >
    <div>
      <span>{{ equipe.nome }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelecionarEquipes",

  data() {
    return {
      selecionada: false,
    };
  },

  props: {
    equipe: {
      type: Object,
      required: true,
      default: {
        nome: "Teste - Corrida",
      },
    },
    bloquear: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  methods: {
    selecionarEquipe() {
      this.selecionada = !this.selecionada ? true : false;

      this.emitirEquipeSelecionada();
    },

    emitirEquipeSelecionada() {
      this.$emit("equipeSelecionada", this.equipe);
    },
  },
};
</script>

<style lang="scss" scoped src="./styles.scss" />
