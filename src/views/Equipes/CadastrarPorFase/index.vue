<template>
  <div class="container">
    <!-- <MenuLateralLogo /> -->

    <div class="selecao mt-1">
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
        <div class="d-flex">
          <InputPadrao
            class="mb-1"
            :value="filtroNome"
            :placeholder="'Digite aqui o nome da equipe:'"
            @input:padrao="atualizarFiltroNome"
          />
          <img
            src="/assets/images/icones/lupa.svg"
            alt="ícone pesquisar"
            class="icone-pesquisar"
            @click="carregarEquipes()"
          />
        </div>
      </div>
      <div class="equipes" v-if="faseSelecionada && equipes.length">
        <div v-for="(equipe, index) in equipes" :key="index">
          <SelecionarEquipes
            :key="index + contadorAttEquipe"
            @click="selecionarEquipe(index)"
            :equipe="{
              nome: equipe.nome,
            }"
          >
          </SelecionarEquipes>
        </div>
      </div>
      <div v-if="faseSelecionada && !equipes.length">
        <p>Não foram encontradas equipes para serem selecionadas!</p>
      </div>
      <div class="botao-cadastrar" v-if="faseSelecionada && equipes.length">
        <p v-if="equipesSelecionadas.length > 3">
          Permitido cadastrar até 3 equipes por corrida!
        </p>
        <BotaoPadrao
          @click="cadastrarEquipes"
          :texto="'Cadastrar'"
          :disabled="equipesSelecionadas.length > 3"
        />
      </div>
    </div>
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
      equipes: [],
      equipesSelecionadas: [],
      bloquearBotaoCadastrar: false,
      contadorAttEquipe: 0,
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
      const resultado = await this.listarEquipes({
        filtros: { ativas: true, nome: this.filtroNome },
      });
      if (resultado.status === 200) {
        this.equipes = resultado.data.equipes;
      } else {
        this.equipes = [];
        await this.$swal.fire({
          title: "Erro",
          text:
            res.response?.data?.mensagem ||
            "Erro inesperado, tente listar as equipes em outro momento, ou verifique sua conexão com a rede!",
          icon: "error",
          showCloseButton: true,
          showConfirmationButton: true,
        });
      }
    },

    atualizarFiltroNome(nome) {
      this.filtroNome = nome;
    },

    setarEstagio(evento) {
      this.faseSelecionada = evento?.evento?.target?.value || "";
      this.filtroNome = "";
    },

    selecionarEquipe(index) {
      this.verificarBloquearSelecao();

      const equipeEncontrada = this.equipes[index];

      const equipeJaSelecionada = this.equipesSelecionadas.find(
        (equipe) => equipe.codigo === equipeEncontrada.codigo
      );

      if (equipeJaSelecionada) {
        this.equipesSelecionadas = this.equipesSelecionadas.filter(
          (equipe) => equipe.codigo !== equipeEncontrada.codigo
        );
        return;
      }
      this.equipesSelecionadas.push(equipeEncontrada);
      this.verificarBloquearSelecao();
    },

    verificarBloquearSelecao() {
      if (this.equipesSelecionadas.length >= 2) {
        this.bloquearBotaoCadastrar = true;
        return;
      }

      this.bloquearBotaoCadastrar = false;
    },

    async cadastrarEquipes() {
      const res = await this.registrarEquipePorFase({
        equipes: this.equipesSelecionadas,
        fase: this.faseSelecionada,
      });

      if (res.status === 201) {
        this.equipesSelecionadas = [];
        this.contadorAttEquipe++;

        await this.$swal.fire({
          title: "Sucesso",
          text: "Cadastro realizado com sucesso!",
          icon: "success",
          timer: 2500,
          timerProgressBar: true,
          showCloseButton: true,
        });
      } else {
        await this.$swal.fire({
          title: "Erro",
          text:
            res.response?.data?.mensagem ||
            "Erro desconhecido ao cadastrar corrida das equipes, tente novamente!",
          icon: "error",
          showCloseButton: true,
          showConfirmationButton: true,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped src="./styles.scss" />
