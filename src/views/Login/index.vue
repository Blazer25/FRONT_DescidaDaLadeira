<template>
  <div class="container">
    <MenuLateralLogo/>

    <div class="informacoes">
      <AvisoPadrao
        :mensagem="erros.mensagem"
        :exibir="erros.ativo"
        @fechar-aviso="limparErros"
      >
      </AvisoPadrao>
      <div class="w-65">
        <div class="input-login">
          <label>Login Administrativo</label>
          <input type="text" v-model="form.login" />
        </div>
        <div class="input-login">
          <label>Senha</label>
          <input type="password" v-model="form.senha" />
        </div>

        <BotaoPadrao
          class="botao"
          :texto="'Login'"
          @click="enviarLogin"
          :disabled="!form.login || !form.senha"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useAuth } from "../../stores/auth";

export default {
  name: "Login",

  data() {
    return {
      form: {
        login: "",
        senha: "",
      },

      erros: {
        ativo: false,
        mensagem: null,
      },
    };
  },

  computed: {},

  async mounted() {
    if (this.$functions.tokenLocalStorage()) {
      const auth = useAuth();
      this.usuarioLogado = await auth.verificarToken();

      if (this.usuarioLogado) {
        this.$router.push("/home");
      }
    }
  },

  methods: {
    async enviarLogin() {
      const dados = {
        login: this.form.login,
        senha: this.form.senha,
      };

      try {
        const { data } = await this.$instanciaAxios.post("/auth/login", dados);
        if (data && data.token && data.usuario) {
          const auth = useAuth();
          const token = data.token;
          const usuario = data.usuario;

          auth.setarToken(token);
          auth.setarUsuario(usuario);

          this.limparErros();
          this.redirecionarPaginaAdm();
        } else {
          this.erros = {
            mensagem: data.mensagem || "Erro inesperado ao realizar login",
            ativo: true,
          };
        }
      } catch (error) {
        this.erros = {
          mensagem:
            error.response.data.mensagem || "Erro inesperado ao realizar login",
          ativo: true,
        };
      }
    },

    limparErros() {
      this.erros = {
        mensagem: null,
        ativo: false,
      };
    },

    redirecionarPaginaAdm() {
      this.$router.push({ name: "AreaAdministrativa" });
    },
  },

  watch: {},
};
</script>

<style lang="scss" scoped src="./styles.scss" />
