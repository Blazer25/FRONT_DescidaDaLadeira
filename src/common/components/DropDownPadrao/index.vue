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
  name: "DropDownPadrao",

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
      default: "Selecione uma opção",
    },
    linha: {
      type: null,
      required: false,
      default: null
    },
  },
  methods: {
    selecionarOpcao(evento) {
      this.$emit("dropDownSelecionar", {evento, itens: this.linha});
    },
  },
};
</script>

<style scoped></style>
