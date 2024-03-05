<template>
  <div class="container">
    <MenuLateralLogo />

    <div class="informacoes">
      <BotaoPadrao
        class="mb-05 altura-botao"
        :texto="'Ranking'"
        @click="redirecionar('ranking')"
      />
      <BotaoPadrao
        class="mb-05 altura-botao"
        :texto="'Cronômetro'"
        @click="redirecionar('cronometro')"
      />
      <BotaoPadrao
        class="mb-05 altura-botao"
        :texto="'Registrar equipes'"
        @click="redirecionar('registrarEquipes')"
      />
      <BotaoPadrao
        class="mb-05 altura-botao"
        :texto="'Listar Equipes'"
        @click="redirecionar('listarEquipes')"
      />
      <BotaoPadrao
        v-if="!usuarioLogado"
        class="altura-botao"
        :texto="'Login'"
        @click="redirecionar('login')"
      />

      <BotaoPadrao
        v-if="usuarioLogado"
        class="altura-botao"
        :texto="'Sair'"
        @click="deslogarUsuario"
      />
    </div>
  </div>
</template>

<script>
import { useAuth } from "../../stores/auth";

export default {
  name: "AreaAdministrativa",

  data() {
    return {
      usuarioLogado: false,
    };
  },

  async mounted() {
    const auth = useAuth();
    this.usuarioLogado = await auth.verificarToken();
  },

  methods: {
    redirecionar(pagina) {
      const rotas = {
        cronometro: "/cronometro",
        registrarEquipes: "/registrarequipes",
        login: "/login",
        ranking: "/ranking",
        listarEquipes: "/listarequipes",
      };

      const rotaDestino = rotas[pagina];

      if (rotaDestino) {
        this.$router.push(rotaDestino);
      }
    },

    deslogarUsuario() {
      const auth = useAuth();
      auth.deslogarUsuario();
      this.recarregarPagina();
    },

    recarregarPagina() {
      location.reload();
    },
  },
};
</script>

<style lang="scss" scoped src="./styles.scss" />
