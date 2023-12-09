<template>
  <div class="ranking-container">
    <h1 class="titulo">RANKING</h1>
    <div v-if="itemsMock.length" class="ranking-list">
      <div v-for="(item, index) in itemsMock" :key="index" class="ranking-item">
        <div v-if="item.id" class="corrida-anterior">
          <p style="text-align: center">Corrida {{ item.id }}</p>
          <span>
            <BotaoPadrao class="botao" :texto="'Remover'" />
          </span>
          <span>
            <BotaoPadrao class="botao" :texto="'Alterar'" />
          </span>
          <div class="carrinho-list">
            <div
              v-for="(carrinho, indexCarrinho) in item.corrida"
              :key="indexCarrinho"
              class="carrinho-item"
            >
              <div>
                <span><b>Posição:</b> {{ carrinho.posicao }}</span
                ><br />
                <!-- <span><b>Carrinho:</b> {{ carrinho.carrinho }}</span
                >  -->
                <span><b>Carrinho:</b> {{ carrinho.carrinho }}</span>
                <br />
                <span><b>Tempo:</b> {{ carrinho.tempo }}</span
                ><br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="sem-ranking">Não existe ranking no momento...</div>
  </div>
</template>

<script>
export default {
  name: "Ranking",

  data() {
    return {
      itemsMock: [
        {
          id: 1,
          corrida: [
            {
              posicao: "1",
              carrinho: "Corrida teste",
              tempo: "01:22",
            },
            {
              posicao: "2",
              carrinho: "Corrida testada",
              tempo: "01:30",
            },
          ],
        },
        {
          id: 2,
          corrida: [
            {
              posicao: "1",
              carrinho: "Corrida teste",
              tempo: "01:22",
            },
            {
              posicao: "2",
              carrinho: "Corrida testada",
              tempo: "01:30",
            },
          ],
        },
      ],
    };
  },

  mounted() {},

  computed: {},
};
</script>

<style scoped>
.ranking-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.titulo {
  font-size: 24px;
  margin-bottom: 20px;
}

.ranking-list {
  width: 100%;
  margin-top: 20px;
}

.ranking-item {
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  background-color: white;
}

.corrida-anterior {
  margin-bottom: 10px;
}

.carrinho-list {
  max-height: 200px;
  margin-top: 10px;
}

.carrinho-item {
  padding: 5px;
  border: 1px solid #ccc;
  margin-bottom: 5px;
  border: none;
}

.sem-ranking {
  margin-top: 20px;
  font-style: italic;
}

@media (max-width: 768px) {
  .ranking-container {
    padding: 10px;
  }

  .titulo {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .ranking-item {
    padding: 8px;
    margin-bottom: 8px;
  }

  .carrinho-item {
    padding: 4px;
    margin-bottom: 4px;
  }
}
</style>
