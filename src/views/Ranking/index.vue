<template>
  <div class="ranking-container">
    <h1 class="titulo">RANKING</h1>
    <div v-if="corridasCarregadas.length">
      <div v-if="corridas.grupo.length">
        <p>Fase de grupo</p>
        <div class="linha-corridas">
          <div
            v-for="corridaGrupo in corridas.grupo"
            :key="corridaGrupo.codigo"
          >
            <CardCorrida :corrida="corridaGrupo"></CardCorrida>
          </div>
        </div>
      </div>
      <div v-if="corridas.oitavas.length">
        <p>Fase Oitavas</p>
        <div class="linha-corridas">
          <div
            v-for="(corridaGrupo, indice) in corridas.oitavas"
            :key="corridaGrupo.codigo"
          >
            <CardCorrida :corrida="corridaGrupo" :indice="indice"></CardCorrida>
          </div>
        </div>
      </div>
      <div v-if="corridas.quartas.length">
        <p>Fase Quartas</p>
        <div class="linha-corridas">
          <div
            v-for="(corridaGrupo, indice) in corridas.quartas"
            :key="corridaGrupo.codigo"
          >
            <CardCorrida :corrida="corridaGrupo" :indice="indice"></CardCorrida>
          </div>
        </div>
      </div>
      <div v-if="corridas.semi.length">
        <p>Fase Semi</p>
        <div class="linha-corridas">
          <div
            v-for="(corridaGrupo, indice) in corridas.semi"
            :key="corridaGrupo.codigo"
          >
            <CardCorrida :corrida="corridaGrupo" :indice="indice"></CardCorrida>
          </div>
        </div>
      </div>
      <div v-if="corridas.final.length">
        <p>Fase Final</p>
        <div class="linha-corridas">
          <div
            v-for="(corridaGrupo, indice) in corridas.final"
            :key="corridaGrupo.codigo"
          >
            <CardCorrida :corrida="corridaGrupo" :indice="indice"></CardCorrida>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useCorrida } from "../../stores/corrida";
import { mapActions } from "pinia";

export default {
  name: "Ranking",

  data() {
    return {
      corridas: {
        grupo: [],
        oitavas: [],
        quartas: [],
        semi: [],
        final: [],
      },

      corridasCarregadas: [],
    };
  },

  async mounted() {
    await this.carregarCorridas();
    this.separarCorridasPorEstagios();
  },

  computed: {},
  methods: {
    ...mapActions(useCorrida, ["listarCorridas"]),

    async carregarCorridas() {
      const resultado = await this.listarCorridas();
      if (resultado.status === 200) {
        this.corridasCarregadas = resultado.data.corridas;
      }
    },

    separarCorridasPorEstagios() {
      this.corridasCarregadas.forEach((corrida) => {
        if (corrida.estagio === "GRUPOS") this.corridas.grupo.push(corrida);
        if (corrida.estagio === "OITAVAS") this.corridas.oitavas.push(corrida);
        if (corrida.estagio === "QUARTAS") this.corridas.quartas.push(corrida);
        if (corrida.estagio === "SEMI") this.corridas.semi.push(corrida);
        if (corrida.estagio === "FINAL") this.corridas.final.push(corrida);
      });
    },
  },
};
</script>

<style scoped lang="scss" src="./styles.scss" />
