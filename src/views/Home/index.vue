<template>
  <div class="container">
<MenuLateralLogo :ocultarVoltar="true"/>

    <div class="informacoes">
      <BotaoPadrao
        class="mb-05 altura-botao"
        :texto="'Registrar equipes'"
        @click="redirecionar('registrar')"
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
  name: "Home",

  data() {
    return {
      usuarioLogado: false,
    };
  },

  async mounted() {
    if (this.$functions.tokenLocalStorage()) {
      const auth = useAuth();
      this.usuarioLogado = await auth.verificarToken();
    }
  },

  methods: {
    redirecionar(pagina) {
      const rotas = {
        registrar: "/registrarEquipes",
        login: "/login",
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
