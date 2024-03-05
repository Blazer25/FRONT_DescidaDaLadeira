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
          <DropDownPadrao
            @dropDownSelecionar="dropDownSelecionar"
            v-if="opcoesDropdown.length"
            :linha="row"
            :opcoes="opcoesDropdown"
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
    return {
      opcoesTeste: [{ valor: "opcao1", texto: "Opção 1" }],
    };
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
    opcoesDropdown: {
      type: Array,
      required: false,
      default: [],
    },
  },

  methods: {
    dropDownSelecionar(evento) {
      this.$emit("eventoTabela", evento);
    },
  },
};
</script>

<style lang="scss" scoped src="./styles.scss" />
