<template>
  <div class="container">
    <MenuLateralLogo />

    <div class="ranking" v-if="rankingCarregado">
      <div v-for="(fase, objeto) in ranking">
        <div class="ranking-card" v-if="fase && fase.length">
          <p class="titulo-fase">{{ getTituloFase(objeto) }}</p>
          <div
            class="info-tempo"
            v-for="(rank, rankIndex) in fase"
            :key="`rank-${rankIndex}`"
          >
            <span class="span-img">
              <img
                :src="getTrofeuIcone(rankIndex)"
                :style="{ width: rankIndex >= 3 ? '1rem' : '' }"
              />
            </span>
            <span class="span-nome">{{ limitarTexto(rank.equipe.nome) }}</span>
            <span class="span-tempo">{{ rank.tempo }}</span>
          </div>
        </div>
      </div>
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
      rankingCarregado: null,

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
        this.rankingCarregado = resultado.data.ranking;
        return;
      }
      this.rankingCarregado = null;
    },

    extrairRanking() {
      this.ranking.fase1 = Object.values(this.rankingCarregado.fase1);
      this.ranking.fase2 = Object.values(this.rankingCarregado.fase2);
      this.ranking.fase3 = Object.values(this.rankingCarregado.fase3);
      this.ranking.fase4 = Object.values(this.rankingCarregado.fase4);
      this.ranking.fase5 = Object.values(this.rankingCarregado.fase5);
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
        "src/assets/images/icones/trophy-1.svg",
        "src/assets/images/icones/trophy-2.svg",
        "src/assets/images/icones/trophy-3.svg",
        "src/assets/images/icones/medal.svg",
      ];
      return icones[rankIndex >= 3 ? 3 : rankIndex];
    },
  },
};
</script>

<style scoped lang="scss" src="./styles.scss" />
