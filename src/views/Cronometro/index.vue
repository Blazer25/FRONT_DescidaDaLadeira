<template>
  <div class="container">
    <!-- <div class="item"> -->
    <!-- <button
        style="width: 6rem; margin-top: 1.5rem"
        class="botao"
        @click="navegarPara('home')"
      >
        Voltar
      </button> -->
    <!-- </div> -->
    <!-- <button
      class="botao"
      @click="registrarCarrinhos"
      :disabled="!temposMarcados.length"
      :class="[{ desabilitado: !temposMarcados.length }]"
    >
      Registrar
    </button> -->

    <!-- <h1 class="title">Cronômetro da Corrida</h1> -->
    <div class="cronometro">{{ formatarTempo(tempoAtual) }}</div>
    <div class="botoes">
      <button
        v-if="!cronometroRodando"
        class="botao mr-0p5"
        @click="iniciarCorrida"
        :disabled="cronometroRodando"
      >
        Iniciar Corrida
      </button>
      <button
        v-if="cronometroRodando"
        class="botao mr-0p5"
        @click="pararCorrida"
        :disabled="!cronometroRodando"
      >
        Parar Corrida
      </button>
      <button
        class="botao"
        @click="marcarTempo"
        :disabled="!cronometroRodando"
        :class="[{ desabilitado: !cronometroRodando }]"
      >
        Marcar Tempo
      </button>
    </div>

    <!-- <div class="scroll-container">
      <ul class="containerCarros">
        <li
          v-for="(tempo, index) in temposMarcados"
          :key="index"
          class="marcado carrosTabela"
          :class="[
            { primeiro: index + 1 == 1 },
            { segundo: index + 1 == 2 },
            { terceiro: index + 1 == 3 },
          ]"
        >
          {{ `${index + 1}° Carro: ${formatarTempo(tempo)}` }}
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Cronometro",

  data() {
    return {
      tempoAtual: 0,
      cronometroRodando: false,
      cronometroInterval: null,
      temposMarcados: [],
      intervaloIdBanco: null,

      itemsCarregados: [],
      ultimoItemArraySorteado: [],
      incrementarId: 0,

      item: {
        id: 1,
        carrinho: {
          iniciou: false,
        },
      },
    };
  },

  mounted() {
    // await this.sortCarros();
  },

  created() {},

  methods: {
    iniciarCorrida() {
      this.temposMarcados = [];

      clearInterval(this.cronometroInterval);
      this.tempoAtual = 0;
      this.cronometroRodando = true;
      this.cronometroInterval = setInterval(() => {
        this.tempoAtual += 10;
      }, 10);
    },

    pararCorrida() {
      this.tempoAtual = 0;
      this.cronometroRodando = false;
      clearInterval(this.cronometroInterval);
    },

    marcarTempo() {
      this.temposMarcados.push(this.tempoAtual);
    },

    resetarCronometro() {
      this.tempoAtual = 0;
      this.cronometroRodando = false;
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

    navegarPara(url) {
      this.$router.push(`/${url}`);
    },

    sortCarros() {
      const sorteio = this.itemsCarregados.sort((a, b) => a.id - b.id);
      this.ultimoItemArraySorteado = sorteio[sorteio.length - 1];

      this.incrementarId = this.ultimoItemArraySorteado.id + 1;
      return;
    },
  },

  beforeDestroy() {
    clearInterval(this.cronometroInterval);
    clearInterval(this.intervaloIdBanco);
    this.resetarCronometro();
  },
};
</script>

<style lang="scss" scoped src="./styles.scss" />
