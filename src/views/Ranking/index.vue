<template>
  <div class="container">
    <MenuLateralLogo />

    <div class="ranking" v-if="rankingCorridas">
      <div class="ranking-fases">
        <div v-for="(fase, objeto) in ranking" :key="objeto" class="ranking-fase-card">
          <div class="ranking-fase-header">
            <span class="ranking-fase-titulo">{{ getTituloFase(objeto) }}</span>
            <span class="ranking-fase-titulo" v-if="!fase.length">Sem corridas registradas</span>
          </div>
          <div class="ranking-fase-lista">
            <div
              class="ranking-fase-item"
              v-for="(rank, rankIndex) in fase"
              :key="`rank-${rankIndex}`"
              :class="{ 'ranking-fase-top3': rankIndex < 3 }"
            >
              <span class="ranking-fase-img">
                <img
                  :src="getTrofeuIcone(rankIndex)"
                  :style="{ width: rankIndex >= 3 ? '1.2rem' : '1.7rem' }"
                />
              </span>
              <span class="ranking-fase-nome">{{ limitarTexto(rank.equipe.nome) }}</span>
              <span class="ranking-fase-tempo">{{ rank.tempoFormatado }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="ranking" v-else>
      <p class="nenhum-item-encontrado">Não há ranking disponível no momento.</p>
    </div>
  </div>
</template>

<script>
import { useRanking } from "../../stores/ranking";
import { mapActions } from "pinia";

export default {
  name: "Ranking",

  data() {
    return {
      rankingCorridas: null,

      ranking: {
        fase1: [],
        fase2: [],
        fase3: [],
        fase4: [],
        fase5: [],
      },
    };
  },

  async mounted() {
    await this.carregarRanking();
    this.extrairRanking();
  },

  methods: {
    ...mapActions(useRanking, ["listarRanking"]),

    async carregarRanking() {
      const resultado = await this.listarRanking();
      if (resultado.status === 200) {
        this.rankingCorridas = resultado.data.ranking;
        return;
      }
      this.rankingCorridas = null;
    },

    extrairRanking() {
      if (!this.rankingCorridas) return;

      this.ranking.fase1 = Object.values(this.rankingCorridas.fase1);
      this.ranking.fase2 = Object.values(this.rankingCorridas.fase2);
      this.ranking.fase3 = Object.values(this.rankingCorridas.fase3);
      this.ranking.fase4 = Object.values(this.rankingCorridas.fase4);
      this.ranking.fase5 = Object.values(this.rankingCorridas.fase5);

      console.log(this.ranking);
    },

    limitarTexto(texto) {
      if (texto.length <= 20) return texto;
      return texto.substring(0, 20) + "...";
    },

    getTituloFase(objeto) {
      let idx = 0;
      if (objeto === "fase1") idx = 0;
      if (objeto === "fase2") idx = 1;
      if (objeto === "fase3") idx = 2;
      if (objeto === "fase4") idx = 3;
      if (objeto === "fase5") idx = 4;

      const fases = ["1ª Fase", "2ª Fase", "3ª Fase", "4ª Fase", "Final"];
      return fases[idx];
    },
    getTrofeuIcone(rankIndex) {
      const icones = [
        "/assets/images/icones/trophy-1.svg",
        "/assets/images/icones/trophy-2.svg",
        "/assets/images/icones/trophy-3.svg",
        "/assets/images/icones/medal.svg",
      ];
      return icones[rankIndex >= 3 ? 3 : rankIndex];
    },
  },
};
</script>

<style scoped lang="scss" src="./styles.scss" />
