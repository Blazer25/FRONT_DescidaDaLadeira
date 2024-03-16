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
        :key="atualizadorTabela"
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
        :value="equipeSelecionada.codigo"
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
        @input:padrao="atualizarNomeEquipe"
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
            @input:padrao="atualizarNomeIntegrante(index, $event)"
            :descricao="`Nome do ${index + 1}° integrante`"
            :disabled="!integrante.nome ? true : false"
          />
          <InputPadrao
            class="mb-1"
            :value="integrante.RA"
            @input:padrao="atualizarRaIntegrante(index, $event)"
            :descricao="`RA do ${index + 1}° integrante`"
          />
        </div>
      </span>
      <BotaoPadrao
        class="botao"
        :texto="'Editar'"
        @click:botaoPadrao="editarEquipe"
      />
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
      cloneEquipeSelecionada: null,
      opcoesSelect: [
        {
          texto: "Editar equipe",
          valor: "editarEquipe",
        },
        {
          texto: "Inativar/ativar equipe",
          valor: "inativarAtivarEquipe",
        },
      ],
      colunas: [
        { name: "nome", label: "Nome" },
        { name: "quantidadeIntegrantes", label: "Quantidade de Integrantes" },
        { name: "ativa", label: "Ativa" },
      ],
      dados: [],
      mensagemErro: "",
      modais: {
        editar: false,
      },
      atualizadorTabela: 0,
    };
  },

  mounted() {
    this.carregarEquipes();
  },
  methods: {
    ...mapActions(useEquipe, ["listarEquipes", "alterarEquipe"]),

    eventoTabela(evento) {
      this.atualizadorTabela++;
      this.equipeSelecionada = evento.itens;
      this.cloneEquipeSelecionada = { ...evento.itens };
      const eventoSelecionado = evento?.evento?.target?.value;
      if (eventoSelecionado === "editarEquipe") {
        this.modais.editar = true;
      }
    },

    async carregarEquipes() {
      const resultado = await this.listarEquipes({});
      if (resultado.status === 200) {
        const equipes = resultado.data.equipes;
        this.formatarEquipes(equipes);
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
      this.cloneEquipeSelecionada = null;
    },

    fecharModalEditar() {
      this.modais.editar = false;
      this.limparEquipeSelecionada();
    },

    formatarEquipes(equipes) {
      this.dados = equipes.map((equipe) => {
        return { ...equipe, ativa: equipe.ativa ? "Sim" : "Não" };
      });
    },

    atualizarNomeEquipe(nome) {
      this.equipeSelecionada.nome = nome;
    },

    atualizarNomeIntegrante(index, nome) {
      this.equipeSelecionada.integrantes[index].nome = nome;
    },

    atualizarRaIntegrante(index, RA) {
      this.equipeSelecionada.integrantes[index].RA = RA;
    },

    prepararDadosAlterarEquipe() {
      const membrosEquipe = this.equipeSelecionada.integrantes;
      const membrosEquipeClone = [...this.cloneEquipeSelecionada.integrantes];

      const codigoEquipe = this.equipeSelecionada.codigo;
      const nomeEquipe = this.equipeSelecionada.nome;

      const dadosIntegrantes = membrosEquipe.map((membro, index) => {
        return {
          RA_Atual: membrosEquipeClone[index].RA,
          RA: membro.RA,
          nome: membro.nome,
        };
      });

      console.log({ codigoEquipe });
      console.log({ nomeEquipe });
      console.log({ dadosIntegrantes });

      return {
        codigoEquipe,
        nomeEquipe,
        dadosIntegrantes,
      };
    },

    async editarEquipe() {
      const { codigoEquipe, nomeEquipe, dadosIntegrantes } =
        this.prepararDadosAlterarEquipe();

      const resultado = await this.alterarEquipe({
        codigoEquipe,
        nomeEquipe,
        dadosIntegrantes,
      });
      console.log(resultado)
    },
  },
};
</script>

<style lang="scss" scoped src="./styles.scss" />
