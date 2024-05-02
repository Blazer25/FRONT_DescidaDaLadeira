<template>
  <div class="container">
    <MenuLateralLogo :ocultarVoltar="true" />

    <div class="centralizador">
      <div class="w-100">
        <div class="informacoes">
          <MiniCardPadrao
            :caminhoLogo="'/src/assets/images/icones/regulamento.svg'"
            :texto="'Regulamento'"
            @click="redirecionar('regulamento')"
          />
          <MiniCardPadrao
            :caminhoLogo="'/src/assets/images/icones/ranking.svg'"
            :texto="'Ranking'"
            @click="redirecionar('ranking')"
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
        </div>
        <div class="informacoes" style="margin-top: 1.5rem">
          <MiniCardPadrao
            v-if="usuarioLogado"
            :caminhoLogo="'/src/assets/images/icones/logout.svg'"
            :texto="'Sair'"
            @click="deslogarUsuario"
          />
        </div>
      </div>
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
        areaadministrativa: "/areaadministrativa",
        regulamento: "/regulamento",
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
