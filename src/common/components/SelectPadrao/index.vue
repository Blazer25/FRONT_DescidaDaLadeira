<template>
  <select @change="selecionarOpcao($event)">
    <option value="" selected>{{ placeholder }}</option>
    <option v-for="opcao in opcoes" :key="opcao.valor" :value="opcao.valor">
      {{ opcao.texto }}
    </option>
  </select>
</template>

<script>
export default {
  name: "SelectPadrao",

  data() {
    return {};
  },
  props: {
    opcoes: {
      type: Array,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: "...",
    },
    linha: {
      type: null,
      required: false,
      default: null
    },
  },
  methods: {
    selecionarOpcao(evento) {
      this.$emit("selectOpcoes", {evento, itens: this.linha});
    },
  },
};
</script>

<style lang="scss" scoped src="./styles.scss" />

