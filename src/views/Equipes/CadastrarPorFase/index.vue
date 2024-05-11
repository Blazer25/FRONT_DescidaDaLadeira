<template>
  <div class="container">
    <!-- <MenuLateralLogo /> -->

    <div class="selecao">
      <p>
        Selecione a fase que gostaria de registrar as equipes participantes:
      </p>

      <SelectPadrao
        :opcoes="estagiosCorrida"
        :placeholder="'Selecione a fase'"
        @selectOpcoes="setarEstagio"
      />

      <div v-if="faseSelecionada">
        <p>Pesquisar equipe pelo nome:</p>
        <InputPadrao
          class="mb-1"
          :value="filtroNome"
          :descricao="'Digite aqui o nome da equipe:'"
          @input:padrao="atualizarFiltroNome"
        />
      </div>

      </div>

    <!-- <div v-for="(equipe, index) in equipes" :key="index">
          <SelecionarEquipes
            @click="selecionarEquipe(index)"
            :equipe="{
              nome: equipe.nome,
            }"
          >
          </SelecionarEquipes>
        </div> -->
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useEquipe } from "../../../stores/equipe";

export default {
  name: "CadastrarEquipesPorFase",

  data() {
    return {
      estagiosCorrida: [
        {
          texto: "1ª Fase",
          valor: "fase1",
        },
        {
          texto: "2ª Fase",
          valor: "fase2",
        },
        {
          texto: "3ª Fase",
          valor: "fase3",
        },
        {
          texto: "4ª Fase",
          valor: "fase4",
        },
        {
          texto: "Final",
          valor: "fase5",
        },
      ],
      filtroNome: "",
      faseSelecionada: "",
      mensagemErro: "",
      equipes: []
    };
  },

  mounted() {
    this.carregarEquipes();
  },

  methods: {
    ...mapActions(useEquipe, [
      "listarEquipesPorFase",
      "listarEquipes",
      "registrarEquipePorFase",
    ]),

    async carregarEquipes() {
      const resultado = await this.listarEquipes({ filtros: { ativas: true } });
      if (resultado.status === 200) {
        this.equipes = resultado.data.equipes;
      } else {
        this.mensagemErro =
          resultado?.response?.data?.mensagem ||
          "Erro inesperado, tente listar as equipes em outro momento, ou verifique sua conexão com a rede!";
      }
    },

    atualizarFiltroNome(nome) {
      this.filtroNome = nome;
    },

    setarEstagio(evento) {
      this.faseSelecionada = evento?.evento?.target?.value || "";
    },
  },

  watch: {
    filtroNome() {
      console.log(this.filtroNome);
    },
  },
};
</script>

<style lang="scss" scoped src="./styles.scss" />
