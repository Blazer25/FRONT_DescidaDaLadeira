<template>
  <div>
    <AvisoPadrao
      v-if="mensagemErro"
      :mensagem="mensagemErro"
      :exibir="mensagemErro"
      @fechar-aviso="limparMensagemErro()"
    >
    </AvisoPadrao>
    <TabelaPadrao
      v-if="dados.length"
      :colunas="colunas"
      :dados="dados"
      :opcoesDropdown="opcoesDropdown"
      @eventoTabela="eventoTabela"
    />

    <p v-else>Nenhuma existem equipes para serem exibidas!</p>

    <ModalPadrao
      v-if="modais.visaoGeral"
      @fechar-modal="modais.visaoGeral = false"
    >
      <p v-if="equipeSelecionada">{{ equipeSelecionada }}</p>
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
      opcoesDropdown: [
        {
          texto: "Visão geral",
          valor: "visaoGeralEquipe",
        },
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
        visaoGeral: false,
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
      if (eventoSelecionado === "visaoGeralEquipe") {
        this.modais.visaoGeral = true;
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
  },
};
</script>

<style lang="scss" scoped src="./styles.scss" />
