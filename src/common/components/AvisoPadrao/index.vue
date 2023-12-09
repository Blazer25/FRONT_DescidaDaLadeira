<template>
  <div v-if="exibir" class="aviso-erro">
    {{ mensagem }}
    <button type="button" class="fechar" @click="fecharAviso">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  props: {
    mensagem: {
      type: String,
      required: false,
      default: "",
    },
    exibir: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    fecharAviso() {
      this.$emit("fechar-aviso")
    },
  },
};
</script>

<style lang="scss" scoped src="./styles.scss" />
