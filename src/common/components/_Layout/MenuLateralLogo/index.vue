<template>
  <div class="voltar" @click="voltar" v-if="!ocultarVoltar">
    <img
      src="../../../../assets/images/icones/left-arrow-svgrepo-com.svg"
      alt="Voltar"
      class="icone-voltar"
    />
    <!-- <span> VOLTAR</span> -->
  </div>
  <div class="logo">
    <img
      src="../../../../assets/images/logo/descida-da-ladeira.svg"
      alt="logo descida da ladeira"
      class="tamanho-logo"
    />
  </div>
</template>

<script>
export default {
  name: "MenuLateralLogo",
  props: {
    ocultarVoltar: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  methods: {
    voltar() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped src="./styles.scss" />
