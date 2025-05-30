<template>
  <div class="card-corrida" :class="retornarFundo">
    <div class="card-corrida__header">
      <span class="card-corrida__numero">{{ indice + 1 }}ª Corrida</span>
      <span class="card-corrida__data">{{ this.$functions.removerHoraDaData(corrida.dataHoraInicio) }}</span>
    </div>
    <div class="card-corrida__tempo">
      <span class="card-corrida__tempo-label">Tempo total:</span>
      <span class="card-corrida__tempo-valor">{{ corrida.tempoTotal }}</span>
    </div>
    <div class="card-corrida__top-tres">
      <span class="card-corrida__top-titulo">Top 3 equipes:</span>
      <div class="card-corrida__top-list">
        <div v-for="(equipe, index) in topTresEquipes" :key="index" class="card-corrida__top-item">
          <span>{{ equipe }}</span>
        </div>
      </div>
    </div>
    <button class="card-corrida__detalhes-btn" @click="exibirModalDetalhesCorrida = true">
      <span>Detalhes</span>
    </button>
  </div>

  <ModalPadrao v-if="exibirModalDetalhesCorrida" @fechar-modal="exibirModalDetalhesCorrida = false">
    <div class="card-corrida__modal">
      <p class="titulo-fase">{{ retornarNomeFase }}</p>
      <p class="titulo-numerico-corrida">{{ indice + 1 }}ª Corrida</p>
      <p class="texto-comum-corrida">
        <span class="texto-negrito">Data:</span>
        {{ this.$functions.removerHoraDaData(corrida.dataHoraInicio) }}
      </p>
      <p class="texto-comum-corrida">
        <span class="texto-negrito">Tempo total:</span> {{ corrida.tempoTotal }}
      </p>
      <p class="titulo-equipes">Equipes:</p>
      <div v-for="(tempos, index) in corrida.temposChegadas" :key="index" class="texto-comum-corrida">
        <hr v-if="index" />
        <p>
          <span class="texto-negrito">Equipe:</span> {{ tempos.equipe.nome }}
        </p>
        <p>
          <span class="texto-negrito">Posição:</span> {{ tempos.posicao }}° lugar
        </p>
        <div class="editar-tempo-wrapper">
          <span class="texto-negrito">Tempo:</span>
          <input v-model="tempos.tempoEditavel" class="input-editar-tempo" :placeholder="tempos.tempo" />
          <button class="btn-editar-tempo" @click="editarTempoEquipe(index)">Editar</button>
        </div>
      </div>
    </div>
  </ModalPadrao>
</template>

<script>
import { mapActions } from "pinia";
import { useCorrida } from "../../../stores/corrida";

export default {
  name: "CardCorrida",
  data() {
    return {
      exibirModalDetalhesCorrida: false,
    };
  },
  props: {
    corrida: {
      type: Object,
      required: true,
    },
    indice: {
      type: Number,
      required: true,
    },
    estagio: {
      type: String,
      required: true,
    },
  },
  computed: {
    retornarFundo() {
      if (this.estagio === "fase1") return "fundo-fase1";
      if (this.estagio === "fase2") return "fundo-fase2";
      if (this.estagio === "fase3") return "fundo-fase3";
      if (this.estagio === "fase4") return "fundo-fase4";
      if (this.estagio === "fase5") return "fundo-final";
      return "fundo-padrao";
    },
    retornarNomeFase() {
      if (this.estagio === "fase1") return "1ª Fase";
      if (this.estagio === "fase2") return "2ª Fase";
      if (this.estagio === "fase3") return "3ª Fase";
      if (this.estagio === "fase4") return "4ª Fase";
      if (this.estagio === "fase5") return "Final";
    },
    topTresEquipes() {
      const topTres = this.corrida.temposChegadas
        .filter((dadosEquipe) => ["1", "2", "3"].includes(dadosEquipe.posicao))
        .map(
          (equipe) =>
            `${equipe.posicao}° ${this.limitarTexto(equipe.equipe.nome)}`
        );
      return topTres;
    },
  },
  methods: {
    ...mapActions(useCorrida, ["editarTempoCorrida"]),

    limitarTexto(frase) {
      if (frase.length <= 10) return frase;
      return frase.substring(0, 10) + "...";
    },
    async editarTempoEquipe(index) {
      const tempoObj = this.corrida.temposChegadas[index];
      const novoTempo = tempoObj.tempoEditavel || tempoObj.tempo;
      // Chama a store diretamente
      try {
        const res = await this.editarTempoCorrida({
          codigoCorrida: this.corrida.codigo,
          codigoEquipe: tempoObj.equipe.codigo,
          tempo: novoTempo,
        });

        if (res.status !== 200) {
          this.$swal && this.$swal.fire({
            title: 'Erro',
            text: 'Não foi possível editar o tempo.' + JSON.stringify(res),
            icon: 'error',
          });
        }

        this.$swal && this.$swal.fire({
          title: 'Sucesso',
          text: 'Tempo editado com sucesso.',
          icon: 'success',
        });

        this.corrida.temposChegadas[index].tempo = novoTempo;
      } catch (e) {
        this.$swal && this.$swal.fire({
          title: 'Erro',
          text: 'Não foi possível editar o tempo.' + JSON.stringify(e),
          icon: 'error',
        });
      }
    },
  },
  mounted() {
    this.corrida.temposChegadas.forEach(t => {
      t.tempoEditavel = t.tempo;
    });
  },
};
</script>

<style lang="scss" scoped src="./styles.scss" />
