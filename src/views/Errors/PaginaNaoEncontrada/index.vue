<template>
  <div class="container">
    <MenuLateralLogo />

    <div class="informacoes">
      <p class="titulo">Página não encontrada</p>
      <img
        src="/assets/images/gifs/404.gif"
        alt="pagina não encontrada"
        class="gif"
      />
      <p @click="redirecionar('home')" class="cursor-pointer texto">Clique aqui para voltar a <span class="azul">página inicial</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaginaNaoEncontrada",

  data() {
    return {};
  },

  methods: {
    redirecionar(pagina) {
      const rotas = {
        home: "/home",
      };

      const rotaDestino = rotas[pagina];

      if (rotaDestino) {
        this.$router.push(rotaDestino);
      }
    },
  },
};
</script>

<style lang="scss" scoped src="./styles.scss" />
