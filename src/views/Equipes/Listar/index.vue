<template>
  <div class="container">
    <MenuLateralLogo />
    <AvisoPadrao
      v-if="mensagemErro"
      :mensagem="mensagemErro"
      :exibir="mensagemErro"
      @fechar-aviso="limparMensagemErro()"
    >
    </AvisoPadrao>

    <div class="tabela">
      <TabelaPadrao
        v-if="dados.length"
        :colunas="colunas"
        :dados="dados"
        :opcoesSelect="opcoesSelect"
        @eventoTabela="eventoTabela"
      />

      <p v-else>Não existem equipes para serem listadas!</p>
    </div>

    <ModalPadrao v-if="modais.editar" @fechar-modal="fecharModalEditar">
      <p class="fonte1p3 mb-1 texto-negrito">Editar informações da equipe:</p>

      <InputPadrao
        class="mb-1"
        :value="equipeSelecionada.codigo || '-'"
        :descricao="'Código da equipe:'"
        :disabled="true"
      />

      <InputPadrao
        class="mb-1"
        :value="equipeSelecionada.quantidadeIntegrantes"
        :descricao="'Quantidade de integrantes:'"
        :disabled="true"
      />

      <InputPadrao
        class="mb-1"
        :value="equipeSelecionada.nome"
        :descricao="'Nome da equipe:'"
      />

      <p class="fonte1p3 mb-1 texto-negrito">Integrantes:</p>

      <span
        v-for="(integrante, index) in equipeSelecionada.integrantes"
        :key="index"
        class="fonte1p3 mb-1"
      >
        <div :class="index !== 0 && 'mt-3'">
          <InputPadrao
            class="mb-1"
            :value="integrante.nome"
            :descricao="`Nome do ${index + 1} integrante`"
          />
          <InputPadrao
            class="mb-1"
            :value="integrante.RA"
            :descricao="`RA do ${index + 1} integrante`"
          />
        </div>
      </span>
    </ModalPadrao>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useEquipe } from "../../../stores/equipe";

export default {
  name: "ListarEquipes",

  data() {
    return {
      equipeSelecionada: null,
      opcoesSelect: [
        {
          texto: "Editar equipe",
          valor: "editarEquipe",
        },
        {
          texto: "Excluir equipe",
          valor: "excluirEquipe",
        },
      ],
      colunas: [
        { name: "nome", label: "Nome" },
        { name: "quantidadeIntegrantes", label: "Quantidade de Integrantes" },
      ],
      dados: [],
      mensagemErro: "",
      modais: {
        editar: false,
      },
    };
  },

  mounted() {
    this.carregarEquipes();
  },
  methods: {
    ...mapActions(useEquipe, ["listarEquipes"]),

    eventoTabela(evento) {
      this.equipeSelecionada = evento.itens || null;
      const eventoSelecionado = evento?.evento?.target?.value;
      if (eventoSelecionado === "editarEquipe") {
        this.modais.editar = true;
      }
    },

    async carregarEquipes() {
      const resultado = await this.listarEquipes({});
      if (resultado.status === 200) {
        this.dados = resultado.data.equipes;
      } else {
        this.mensagemErro =
          resultado?.response?.data?.mensagem ||
          "Erro inesperado, tente listar as equipes em outro momento, ou verifique sua conexão com a rede!";
      }
    },

    limparMensagemErro() {
      this.mensagemErro = "";
    },

    limparEquipeSelecionada() {
      this.equipeSelecionada = null;
    },

    fecharModalEditar() {
      this.modais.editar = false;
      this.limparEquipeSelecionada();
    },
  },
};
</script>

<style lang="scss" scoped src="./styles.scss" />
