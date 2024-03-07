<template>
  <div class="card-area">
    <div class="icone">
      <img :src="caminhoLogo" :alt="descricaoLogo" />
    </div>
    <div class="texto">
      <span>{{ texto }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "MiniCardPadrao",

  data() {
    return {};
  },
  props: {
    texto: {
      type: String,
      required: true,
      default: "...",
    },
    caminhoLogo: {
      type: String,
      required: true,
    },
    descricaoLogo: {
      type: String,
      required: false,
      default: "Logo padrão do card",
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped src="./styles.scss" />
