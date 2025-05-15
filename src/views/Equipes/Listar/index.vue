<template>
  <div class="container">
    <MenuLateralLogo />

    <div class="tabela" v-if="dados.length">
      <div class="lista-cards-equipes">
        <CardEquipe
          v-for="equipe in dados"
          :key="equipe.codigo"
          :equipe="equipe"
          @editar="(e) => { equipeSelecionada = e; modais.editar = true; }"
          @ativarInativar="(e) => { equipeSelecionada = e; ativarInativarEquipe(); }"
        />
      </div>
    </div>

    <div v-else class="d-flex">
      <p class="nenhum-item-encontrado">Não existem equipes para serem listadas!</p>
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
        :value="equipeSelecionada.numeroCarrinho"
        @input:padrao="equipeSelecionada.numeroCarrinho = $event"
        :descricao="'Número do carrinho:'"
        :mask="'##'"
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
import { mask } from "vue-the-mask";

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
          texto: "Inativar/ativar equipe",
          valor: "inativarAtivarEquipe",
        },
      ],
      colunas: [
        { name: "nome", label: "Nome" },
        { name: "quantidadeIntegrantes", label: "Quantidade de Integrantes" },
        { name: "numeroCarrinho", label: "N° Carrinho" },
        { name: "ativa", label: "Ativa" },
      ],
      dados: [],
      modais: {
        editar: false,
      },
      atualizadorTabela: 0,
    };
  },

  mounted() {
    this.carregarEquipes();
    this.resetarState();
  },
  methods: {
    ...mapActions(useEquipe, [
      "listarEquipes",
      "alterarEquipe",
      "inativarAtivarEquipe",
      "setEquipeSelecionada",
      "retornarState",
      "resetarState",
    ]),

    async carregarEquipes() {
      const resultado = await this.listarEquipes({});
      if (resultado.status === 200) {
        const equipes = resultado.data.equipes;
        this.dados = equipes
      } else {
        this.dados = [];
      }
    },

    limparEquipeSelecionada() {
      this.equipeSelecionada = null;
    },

    fecharModalEditar() {
      this.modais.editar = false;
      this.limparEquipeSelecionada();
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
      const numeroCarrinho = this.equipeSelecionada.numeroCarrinho;

      const codigoEquipe = this.equipeSelecionada.codigo;
      const nomeEquipe = this.equipeSelecionada.nome;

      const dadosIntegrantes = membrosEquipe.map((membro, index) => {
        const equipeLocalStorage = JSON.parse(
          localStorage.getItem("equipeSelecionada")
        );
        return {
          RA_Atual: equipeLocalStorage?.integrantes[index]?.RA || membro.RA,
          RA: membro.RA,
          nome: membro.nome,
        };
      });

      return {
        codigoEquipe,
        nomeEquipe,
        dadosIntegrantes,
        numeroCarrinho,
      };
    },

    async editarEquipe() {
      const { codigoEquipe, nomeEquipe, dadosIntegrantes, numeroCarrinho } =
        this.prepararDadosAlterarEquipe();

      const resultado = await this.alterarEquipe({
        codigoEquipe,
        nomeEquipe,
        dadosIntegrantes,
        numeroCarrinho,
      });

      if (resultado.status === 201) {
        this.fecharModalEditar();
        await this.carregarEquipes();
      }
    },

    async ativarInativarEquipe() {
      const codigoEquipe = this.equipeSelecionada.codigo;
      const resultado = await this.inativarAtivarEquipe({ codigoEquipe });

      if (resultado.status === 200) {
        await this.carregarEquipes();
      }
    },
  },
};
</script>

<style lang="scss" scoped src="./styles.scss" />
