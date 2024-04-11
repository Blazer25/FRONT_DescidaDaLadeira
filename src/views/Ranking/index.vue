<template>
  <div class="ranking-container">
    <h1 class="titulo text-center">RANKING</h1>
    <div v-if="corridasCarregadas.length">
      <p class="sub-titulo">Fase de Grupos</p>
      <div v-if="corridas.grupo.length">
        <div class="linha-corridas">
          <div
            v-for="(corridaGrupo, indice) in corridas.grupo"
            :key="corridaGrupo.codigo"
          >
            <CardCorrida
              :corrida="corridaGrupo"
              :indice="indice"
              :estagio="'grupos'"
            ></CardCorrida>
          </div>
        </div>
      </div>
      <div v-else>Não há registro de corridas na fase de grupo!</div>
      <div v-if="corridas.oitavas.length">
        <p class="sub-titulo">Oitavas de Final</p>
        <div class="linha-corridas">
          <div
            v-for="(corridaGrupo, indice) in corridas.oitavas"
            :key="corridaGrupo.codigo"
          >
            <CardCorrida
              :corrida="corridaGrupo"
              :indice="indice"
              :estagio="'oitavas'"
            ></CardCorrida>
          </div>
        </div>
      </div>
      <div v-if="corridas.quartas.length">
        <p class="sub-titulo">Quartas de Final</p>
        <div class="linha-corridas">
          <div
            v-for="(corridaGrupo, indice) in corridas.quartas"
            :key="corridaGrupo.codigo"
          >
            <CardCorrida
              :corrida="corridaGrupo"
              :indice="indice"
              :estagio="'quartas'"
            ></CardCorrida>
          </div>
        </div>
      </div>
      <div v-if="corridas.semi.length">
        <p class="sub-titulo">Semi Final</p>
        <div class="linha-corridas">
          <div
            v-for="(corridaGrupo, indice) in corridas.semi"
            :key="corridaGrupo.codigo"
          >
            <CardCorrida
              :corrida="corridaGrupo"
              :indice="indice"
              :estagio="'semi'"
            ></CardCorrida>
          </div>
        </div>
      </div>
      <div v-if="corridas.final.length">
        <p class="sub-titulo">Final</p>
        <div class="linha-corridas">
          <div
            v-for="(corridaGrupo, indice) in corridas.final"
            :key="corridaGrupo.codigo"
          >
            <CardCorrida
              :corrida="corridaGrupo"
              :indice="indice"
              :estagio="'final'"
            ></CardCorrida>
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
