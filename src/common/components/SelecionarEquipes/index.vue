<template>
  <div class="selecao-equipe" :class="[{ selecionada }]" @click="selecionarEquipe">
    <img :src="equipe.img" />
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
      required: false,
      default: {
        nome: "teste",
        img: "https://img.freepik.com/psd-gratuitas/carro-em-miniatura-sedan_53876-84522.jpg",
      },
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

