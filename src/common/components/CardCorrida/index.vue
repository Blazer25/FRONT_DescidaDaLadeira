<template>
  <div class="card-area">

    <div class="texto">
      <span>{{ texto }}</span>
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
    texto: {
      type: String,
      required: true,
      default: "...",
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped src="./styles.scss" />
