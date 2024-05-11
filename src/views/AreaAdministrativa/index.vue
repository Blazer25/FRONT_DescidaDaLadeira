<template>
  <div class="container">
    <MenuLateralLogo :ocultarVoltar="true" />

    <div class="centralizador">
      <div class="w-100">
        <div class="informacoes">
          <MiniCardPadrao
            :caminhoLogo="'/src/assets/images/icones/corridas.svg'"
            :texto="'Corridas'"
            @click="redirecionar('corridas')"
          />
          <MiniCardPadrao
            :caminhoLogo="'/src/assets/images/icones/clock.svg'"
            :texto="'Cronômetro'"
            @click="redirecionar('cronometro')"
          />
          <MiniCardPadrao
            :caminhoLogo="'/src/assets/images/icones/register.svg'"
            :texto="'Registrar equipes'"
            @click="redirecionar('registrarEquipes')"
          />
        </div>
        <br />
        <div class="informacoes">
          <MiniCardPadrao
            :caminhoLogo="'/src/assets/images/icones/team.svg'"
            :texto="'Listar Equipes'"
            @click="redirecionar('listarEquipes')"
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
            :caminhoLogo="'/src/assets/images/icones/logout.svg'"
            :texto="'Sair'"
            @click="deslogarUsuario"
          />
        </div>
        <br />
        <div class="informacoes">
          <MiniCardPadrao
            :caminhoLogo="'/src/assets/images/icones/corridas.svg'"
            :texto="'Corridas por fase'"
            @click="redirecionar('cadastrarCorridasPorFase')"
          />
        </div>
      </div>
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
        corridas: "/corridas",
        listarEquipes: "/listarequipes",
        ranking: "/ranking",
        cadastrarCorridasPorFase: "/cadastrarCorridasPorFase",
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
