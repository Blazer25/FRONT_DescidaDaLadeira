<template>
  <div class="container">
    <MenuLateralLogo />

    <div class="corridas">
      <div class="d-flex justify-content-center">
        <h1 class="titulo mt-1">CORRIDAS</h1>
      </div>
      <div v-if="corridasCarregadas.length">
        <p class="sub-titulo">1ª Fase</p>
        <div v-if="corridas.fase1.length" class="overflow-auto">
          <div class="linha-corridas">
            <div
              v-for="(corridaFase, indice) in corridas.fase1"
              :key="corridaFase.codigo"
            >
              <CardCorrida
                :corrida="corridaFase"
                :indice="indice"
                :estagio="'fase1'"
              ></CardCorrida>
            </div>
          </div>
        </div>
        <div v-else>Não há registro de corridas na 1ª fase!</div>
        <div v-if="corridas.fase2.length" class="overflow-auto">
          <p class="sub-titulo">2ª Fase</p>
          <div class="linha-corridas">
            <div
              v-for="(corridaFase, indice) in corridas.fase2"
              :key="corridaFase.codigo"
            >
              <CardCorrida
                :corrida="corridaFase"
                :indice="indice"
                :estagio="'fase2'"
              ></CardCorrida>
            </div>
          </div>
        </div>
        <div v-if="corridas.fase3.length" class="overflow-auto">
          <p class="sub-titulo">3ª Fase</p>
          <div class="linha-corridas">
            <div
              v-for="(corridaFase, indice) in corridas.fase3"
              :key="corridaFase.codigo"
            >
              <CardCorrida
                :corrida="corridaFase"
                :indice="indice"
                :estagio="'fase3'"
              ></CardCorrida>
            </div>
          </div>
        </div>
        <div v-if="corridas.fase4.length" class="overflow-auto">
          <p class="sub-titulo">4ª Fase</p>
          <div class="linha-corridas">
            <div
              v-for="(corridaFase, indice) in corridas.fase4"
              :key="corridaFase.codigo"
            >
              <CardCorrida
                :corrida="corridaFase"
                :indice="indice"
                :estagio="'fase4'"
              ></CardCorrida>
            </div>
          </div>
        </div>
  
        <div v-if="corridas.fase5.length" class="overflow-auto">
          <p class="sub-titulo">Final</p>
          <div class="linha-corridas">
            <div
              v-for="(corridaFase, indice) in corridas.fase5"
              :key="corridaFase.codigo"
            >
              <CardCorrida
                :corrida="corridaFase"
                :indice="indice"
                :estagio="'fase5'"
              ></CardCorrida>
            </div>
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
  name: "Corridas",

  data() {
    return {
      corridas: {
        fase1: [],
        fase2: [],
        fase3: [],
        fase4: [],
        fase5: [],
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
        if (corrida.estagio === "fase1") this.corridas.fase1.push(corrida);
        if (corrida.estagio === "fase2") this.corridas.fase2.push(corrida);
        if (corrida.estagio === "fase3") this.corridas.fase3.push(corrida);
        if (corrida.estagio === "fase4") this.corridas.fase4.push(corrida);
        if (corrida.estagio === "fase5") this.corridas.fase5.push(corrida);
      });
    },
  },
};
</script>

<style scoped lang="scss" src="./styles.scss" />
