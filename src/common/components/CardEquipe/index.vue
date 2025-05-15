<template>
  <div class="card-equipe">
    <div class="card-equipe__logo">
      <img v-if="equipe.logoUrl" :src="equipe.logoUrl" alt="Logo da equipe" />
      <div v-else class="card-equipe__logo-placeholder">Sem logo</div>
    </div>
    <div class="card-equipe__info">
      <h3 class="card-equipe__nome">{{ equipe.nome }}</h3>
      <p class="card-equipe__detalhe">
        <span>Integrantes:</span> {{ equipe.quantidadeIntegrantes }}
      </p>
      <p class="card-equipe__detalhe">
        <span>Nº Carrinho:</span> {{ equipe.numeroCarrinho }}
      </p>
      <p class="card-equipe__status" :class="{ 'inativa': !equipe.ativa }">
        Status: <span>{{ equipe.ativa ? 'Ativa' : 'Inativa' }}</span>
      </p>
    </div>
    <div class="card-equipe__acoes">
      <button class="card-equipe__btn editar" @click="$emit('editar', equipe)">Editar</button>
      <button class="card-equipe__btn ativar" :class="{ inativar: equipe.ativa }" @click="$emit('ativarInativar', equipe)">
        {{ equipe.ativa ? 'Inativar' : 'Ativar' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardEquipe',
  props: {
    equipe: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped src="./styles.scss" />
