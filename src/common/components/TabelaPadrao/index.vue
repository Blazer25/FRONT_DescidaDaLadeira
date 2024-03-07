<template>
  <div class="table-container">
    <table class="custom-table">
      <thead>
        <tr>
          <th v-for="(campo, index) in colunas" :key="index">
            {{ campo.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in dados" :key="rowIndex">
          <td v-for="(campo, campoIndex) in colunas" :key="campoIndex">
            {{ row[campo.name] }}
          </td>
          <SelectPadrao
            @selectOpcoes="selectOpcoes"
            v-if="opcoesSelect.length"
            :linha="row"
            :opcoes="opcoesSelect"
          />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "tabelaPadrao",

  data() {
    return {};
  },

  props: {
    colunas: {
      type: Array,
      required: true,
    },
    dados: {
      type: Array,
      required: true,
    },
    opcoesSelect: {
      type: Array,
      required: false,
      default: [],
    },
  },

  methods: {
    selectOpcoes(evento) {
      this.$emit("eventoTabela", evento);
    },
  },
};
</script>

<style lang="scss" scoped src="./styles.scss" />
