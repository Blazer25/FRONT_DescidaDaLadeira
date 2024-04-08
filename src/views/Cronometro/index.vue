<template>
  <div class="selecao-equipes" v-if="!cronometroVisivel">
    <div class="titulo" v-if="equipes.length">
      <span>SELECIONE AS EQUIPES PARA PARTICIPAREM DA CORRIDA</span>
    </div>
    <div class="container-equipes">
      <div class="selecionar-equipes" v-if="equipes.length">
        <span v-for="(equipe, index) in equipes" :key="index">
          <SelecionarEquipes
            @click="selecionarEquipe(index)"
            :equipe="{
              nome: equipe.nome,
              img: 'https://img.freepik.com/psd-gratuitas/carro-em-miniatura-sedan_53876-84522.jpg',
            }"
          >
          </SelecionarEquipes>
        </span>
      </div>
      <div v-else>
        <span>EQUIPES NÃO FORAM ENCONTRADAS PARA SEREM SELECIONADAS!</span>
      </div>
    </div>
    <div class="d-flex justify-content-center botoes">
      <BotaoPadrao
        :texto="'Voltar'"
        @click="navegarPara('areaadministrativa')"
      />
      <BotaoPadrao
        :texto="'Ir para o cronômetro'"
        @click="exibirCronometro"
        :disabled="!equipes.length || !equipesSelecionadas.length"
      />
    </div>
  </div>

  <div class="container-cronometro" v-if="cronometroVisivel">
    <div class="coluna-esquerda">
      <div class="cronometro">{{ formatarTempo(tempoAtual) }}</div>
      <div class="botoes">
        <BotaoPadrao :texto="'Voltar'" @click="fecharCronometro" />
        <BotaoPadrao
          :texto="'Resetar'"
          @click="resetarCronometro"
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
          :disabled="!cronometroIniciou"
        />
      </div>

      <BotaoPadrao
        class="botao-registrar"
        :texto="'Registrar Corrida'"
        @click="salvarCorrida"
        :disabled="!cronometroIniciou"
      />
    </div>
    <div class="coluna-direita">
      <div
        class="linha-tempo"
        v-for="(tempo, index) in temposMarcados"
        :key="tempo"
      >
        <span>{{ `${index + 1}° ${formatarTempo(tempo)}` }}</span>
      </div>
    </div>
  </div>
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
      equipesSelecionadas: [],
      cronometroVisivel: false,

      tempoAtual: 0,
      tempoInicial: 0,
      cronometroPausado: false,
      cronometroIniciou: false,
      cronometroInterval: null,
      temposMarcados: [],

      corridaGravar: {
        dataHoraInicio: null,
        dataHoraFim: null,
        tempoTotal: null,
        temposChegadas: [],
      },
    };
  },

  mounted() {
    this.carregarEquipes();
  },

  created() {},

  methods: {
    ...mapActions(useEquipe, ["listarEquipes"]),
    ...mapActions(useCorrida, ["registrarCorrida"]),

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

    selecionarEquipe(index) {
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
      this.temposMarcados.push(this.tempoAtual);
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

    async salvarCorrida() {
      this.prepararDadosParaGravarCorrida();

      const resultado = await this.registrarCorrida({
        dataHoraInicio: "",
        dataHoraFim: "",
        tempoTotal: "",
        temposChegadas: [],
      });

      console.log(resultado);
    },

    prepararDadosParaGravarCorrida() {
      this.corridaGravar.dataHoraFim = this.$functions.obterDataHoraFormatada();
      this.corridaGravar.tempoTotal = this.tempoAtual;

      this.temposMarcados.forEach((tempo, index) => {
        this.corridaGravar.temposChegadas.push({
          tempo: tempo,
          posicao: index + 1,
          equipe: {},
        });
      });
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
