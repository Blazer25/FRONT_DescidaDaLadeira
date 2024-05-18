<template>
  <div class="selecao-equipes" v-if="!cronometroVisivel">
    <div class="text-center">
      <span>SELECIONE O ESTÁGIO DA CORRIDA:</span>
      <SelectPadrao
        :opcoes="estagiosCorrida"
        :placeholder="'Selecione o estágio'"
        @selectOpcoes="setarEstagio"
      />
    </div>
    <div class="d-flex justify-content-center botoes" v-if="equipes.length">
      <BotaoPadrao
        :texto="'Voltar'"
        @click="navegarPara('areaadministrativa')"
      />
      <BotaoPadrao
        :texto="'Ir para o cronômetro'"
        @click="exibirCronometro"
        :disabled="
          !equipesParticipantesSelecionadas.length || !corridaGravar.estagio
        "
      />
    </div>
    <div class="titulo" v-if="equipes.length">
      <span>SELECIONE AS EQUIPES PARA PARTICIPAREM DA CORRIDA</span>
    </div>
    <div class="container-equipes">
      <div class="selecionar-equipes" v-if="equipes.length">
        <div v-for="(equipe, index) in equipes" :key="index">
          <SelecionarPartipantesCorrida
            :equipes="equipe.equipes"
            @click="selecionarEquipe(index)"
            :key="contadorAtualizarParticipantes + index"
            :bloquear="
              indexSelecaoEquipe !== null && indexSelecaoEquipe !== index
            "
          >
          </SelecionarPartipantesCorrida>
        </div>
      </div>
      <div v-if="!equipes.length && corridaGravar.estagio">
        <span>EQUIPES NÃO FORAM ENCONTRADAS PARA SEREM SELECIONADAS!</span>
      </div>
    </div>
  </div>

  <div class="container-cronometro" v-if="cronometroVisivel">
    <div class="coluna-esquerda">
      <div class="cronometro">{{ formatarTempo(tempoAtual) }}</div>
      <div class="botoes">
        <BotaoPadrao :texto="'Voltar'" @click="resetarCorrida" />
        <BotaoPadrao
          :texto="'Resetar'"
          @click="resetarCorrida"
          :disabled="!cronometroIniciou"
        />
        <BotaoPadrao
          :texto="'Iniciar'"
          @click="iniciarCorrida"
          v-if="!cronometroIniciou"
        />
        <BotaoPadrao
          :texto="'Pausar'"
          @click="pausarCronometro"
          v-if="cronometroIniciou && !cronometroPausado"
        />
        <BotaoPadrao
          :texto="'Continuar'"
          @click="continuarCorrida"
          v-if="cronometroIniciou && cronometroPausado"
        />
        <BotaoPadrao
          :texto="'Marcar Tempo'"
          @click="marcarTempo"
          :disabled="
            !cronometroIniciou ||
            temposMarcados.length >= equipesParticipantesSelecionadas.length
          "
        />
      </div>

      <BotaoPadrao
        class="botao-registrar"
        :texto="'Selecionar Equipes'"
        @click="abrirModalSetarTemposEquipes"
        :disabled="!cronometroIniciou || !temposMarcados.length"
      />
    </div>
    <div class="coluna-direita">
      <div
        class="linha-tempo"
        v-for="(tempoMarcado, index) in temposMarcados"
        :key="index"
      >
        <span>{{ `${index + 1}° ${formatarTempo(tempoMarcado.tempo)}` }}</span>
      </div>
    </div>
  </div>
  <ModalPadrao
    v-if="exibirModalSetarTemposEquipes"
    @fechar-modal="definirModalSetarTemposEquipes"
  >
    <div class="titulo-modal">
      <span> PARA CADA TEMPO, SELECIONE SUA RESPECTIVA EQUIPE</span>
    </div>
    <div
      class="linha-tempo"
      v-for="(tempoMarcado, index) in temposMarcados"
      :key="index"
    >
      {{ `${index + 1}° ${formatarTempo(tempoMarcado.tempo)}` }}
      <SelectPadrao
        :opcoes="formatarEquipesSelect"
        :placeholder="'Selecione a equipe'"
        :linha="index"
        @selectOpcoes="setarEquipesTempos"
      />
    </div>

    <BotaoPadrao
      :texto="'Salvar corrida'"
      @click="salvarCorrida"
      :disabled="todosTemposPossuemEquipes"
    />
  </ModalPadrao>
</template>

<script>
import { mapActions } from "pinia";
import { useEquipe } from "../../stores/equipe";
import { useCorrida } from "../../stores/corrida";

export default {
  name: "Cronometro",

  data() {
    return {
      equipes: [],
      mensagemErro: "",
      equipesParticipantesSelecionadas: [],
      contadorAtualizarParticipantes: 0,
      cronometroVisivel: false,
      indexSelecaoEquipe: null,

      tempoAtual: 0,
      tempoInicial: 0,
      cronometroPausado: false,
      cronometroIniciou: false,
      cronometroInterval: null,
      temposMarcados: [],
      exibirModalSetarTemposEquipes: false,

      corridaGravar: {
        dataHoraInicio: null,
        dataHoraFim: null,
        tempoTotal: null,
        temposChegadas: [],
        estagio: null,
      },
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
    };
  },

  mounted() {
    // this.carregarEquipes();
  },

  created() {},

  computed: {
    formatarEquipesSelect() {
      return this.equipesParticipantesSelecionadas.map((equipe) => {
        return {
          texto: equipe.nome,
          valor: equipe.codigo,
        };
      });
    },

    todosTemposPossuemEquipes() {
      return this.temposMarcados.some((tempo) => !tempo.equipe);
    },
  },

  methods: {
    ...mapActions(useEquipe, ["listarEquipes", "listarEquipesPorFase"]),
    ...mapActions(useCorrida, ["registrarCorrida"]),

    resetarCorrida() {
      this.fecharCronometro();
      this.exibirModalSetarTemposEquipes = false;
      this.temposMarcados = [];
      this.equipesParticipantesSelecionadas = [];
      this.indexSelecaoEquipe = null;

      this.corridaGravar = {
        dataHoraInicio: null,
        dataHoraFim: null,
        tempoTotal: null,
        temposChegadas: [],
        estagio: null,
      };
    },

    async carregarEquipes() {
      const resultado = await this.listarEquipesPorFase({
        filtros: { fase: this.corridaGravar.estagio },
      });

      this.equipesParticipantesSelecionadas = [];
      this.indexSelecaoEquipe = null;

      if (resultado.status === 200) {
        this.equipes = resultado.data.equipesPorFase;
      } else {
        this.equipes = [];
      }
    },

    selecionarEquipe(index) {
      // this.contadorAtualizarParticipantes++;

      if (this.indexSelecaoEquipe === index) {
        this.indexSelecaoEquipe = null;
        this.equipesParticipantesSelecionadas = [];
      } else {
        this.indexSelecaoEquipe = index;
        if (this.equipes[index]) {
          this.equipesParticipantesSelecionadas = this.equipes[index].equipes;
        } else {
          this.equipesParticipantesSelecionadas = [];
        }
      }
    },

    exibirCronometro() {
      this.cronometroVisivel = true;
    },

    fecharCronometro() {
      this.resetarCronometro();
      this.cronometroVisivel = false;
    },

    iniciarCorrida() {
      this.corridaGravar.dataHoraInicio =
        this.$functions.obterDataHoraFormatada();
      clearInterval(this.cronometroInterval);
      this.cronometroIniciou = true;
      this.cronometroInterval = setInterval(() => {
        if (!this.cronometroPausado) {
          this.tempoAtual += 10;
        }
      }, 10);
    },

    continuarCorrida() {
      this.tempoInicial = Date.now() - this.tempoAtual;
      this.cronometroPausado = false;
    },

    marcarTempo() {
      this.temposMarcados.push({
        tempo: this.tempoAtual,
        equipe: null,
      });
    },

    resetarCronometro() {
      this.tempoAtual = 0;
      this.cronometroIniciou = false;
      this.cronometroPausado = false;
      this.temposMarcados = [];
      clearInterval(this.cronometroInterval);
    },

    formatarTempo(tempo) {
      const minutos = Math.floor(tempo / 60000);
      const segundos = Math.floor((tempo % 60000) / 1000);
      const milissegundos = tempo % 1000;

      return `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(
        2,
        "0"
      )}:${String(milissegundos).padStart(3, "0")}`;
    },

    pausarCronometro() {
      this.cronometroPausado = true;
    },

    abrirModalSetarTemposEquipes() {
      this.pausarCronometro();

      this.exibirModalSetarTemposEquipes = true;
    },

    async salvarCorrida() {
      this.prepararDadosParaGravarCorrida();

      const resultado = await this.registrarCorrida({
        dataHoraInicio: this.corridaGravar.dataHoraInicio,
        dataHoraFim: this.corridaGravar.dataHoraFim,
        tempoTotal: this.corridaGravar.tempoTotal,
        temposChegadas: this.corridaGravar.temposChegadas,
        estagio: this.corridaGravar.estagio,
      });

      if (resultado.status === 201) {
        this.resetarCorrida();
        await this.$swal.fire({
          title: "Sucesso",
          text: "Corrida registrada!",
          icon: "success",
          timer: 2500,
          timerProgressBar: true,
          showCloseButton: true,
        });
      } else {
        console.log(resultado);
        console.log(this.corridaGravar.temposChegadas);
        await this.$swal.fire({
          title: "Erro",
          text:
            resultado.response?.data?.mensagem ||
            "Erro desconhecido ao registrar corrida, tente novamente!",
          icon: "error",
          showCloseButton: true,
          showConfirmationButton: true,
        });
      }
    },

    prepararDadosParaGravarCorrida() {
      this.corridaGravar.dataHoraFim = this.$functions.obterDataHoraFormatada();
      this.corridaGravar.tempoTotal = this.formatarTempo(this.tempoAtual);

      this.temposMarcados.forEach((tempo, index) => {
        this.corridaGravar.temposChegadas.push({
          tempo: this.formatarTempo(tempo.tempo),
          posicao: index + 1,
          equipe: {
            codigo: tempo.equipe.codigo,
            nome: tempo.equipe.nome,
            integrantes: tempo.equipe.integrantes,
          },
        });
      });
    },

    setarEquipesTempos(evento) {
      const indexSelecionado = evento.itens;
      const codigoEquipe = evento?.evento?.target?.value;

      if (codigoEquipe) {
        this.equipesParticipantesSelecionadas.forEach((equipe) => {
          if (equipe.codigo === codigoEquipe) {
            this.temposMarcados[indexSelecionado].equipe = equipe;
          }
        });
      } else {
        this.temposMarcados[indexSelecionado].equipe = null;
      }
    },

    definirModalSetarTemposEquipes() {
      this.exibirModalSetarTemposEquipes = this.exibirModalSetarTemposEquipes
        ? false
        : true;
    },

    setarEstagio(evento) {
      this.corridaGravar.estagio = evento?.evento?.target?.value || null;

      this.carregarEquipes();
    },

    navegarPara(url) {
      this.$router.push(`/${url}`);
    },
  },

  beforeDestroy() {
    clearInterval(this.cronometroInterval);
    this.resetarCronometro();
  },
};
</script>

<style lang="scss" scoped src="./styles.scss" />
