<template>
  <div class="container">
    <MenuLateralLogo :ocultarVoltar="true" />

    <div class="informacoes">
      <MiniCardPadrao
        v-if="!usuarioLogado"
        :caminhoLogo="'/src/assets/images/icones/register.svg'"
        :texto="'Registrar equipes'"
        @click="redirecionar('registrarEquipes')"
      />
      <MiniCardPadrao
        v-if="!usuarioLogado"
        :caminhoLogo="'/src/assets/images/icones/login.svg'"
        :texto="'Login'"
        @click="redirecionar('login')"
      />
      <MiniCardPadrao
        v-if="usuarioLogado"
        :caminhoLogo="'/src/assets/images/icones/adm.svg'"
        :texto="'Área Admin'"
        @click="redirecionar('areaadministrativa')"
      />
      <MiniCardPadrao
        v-if="usuarioLogado"
        :caminhoLogo="'/src/assets/images/icones/logout.svg'"
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
        registrarEquipes: "/registrarEquipes",
        login: "/login",
        areaadministrativa: "/areaadministrativa"
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
