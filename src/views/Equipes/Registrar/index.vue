<template>
  <div class="container">
    <MenuLateralLogo />
    <div class="informacoes" v-if="!registroSucesso">
      <div class="w-65">
        <div v-if="!trocarInputs">
          <div class="input-registrar">
            <label>Nome da equipe</label>
            <input type="text" v-model="formEquipe.nome" />
          </div>
          <div class="input-registrar">
            <label>Quantidade de integrantes</label>
            <select v-model="formEquipe.quantidadeIntegrantes">
              <option value="" selected>Selecione:</option>
              <option value="2">2 integrantes</option>
              <option value="3">3 integrantes</option>
              <option value="4">4 integrantes</option>
              <option value="5">5 integrantes</option>
            </select>
          </div>

          <BotaoPadrao
            class="botao"
            :texto="'Próximo'"
            @click:botaoPadrao="inserirDadosIntegrantes"
            :disabled="!formEquipe.nome || !formEquipe.quantidadeIntegrantes"
          />
        </div>

        <div v-if="trocarInputs">
          <div class="input-registrar">
            <label
              >Nome completo do {{ alterarFormIntegrantes }}° integrante</label
            >
            <input
              type="text"
              v-model="
                formEquipe.integrantes[alterarFormIntegrantes].nomeCompleto
              "
            />
          </div>
          <div class="input-registrar">
            <label>RA do {{ alterarFormIntegrantes }}° integrante</label>
            <input
              type="text"
              v-model="formEquipe.integrantes[alterarFormIntegrantes].RA"
              v-mask="'#############'"
            />
          </div>

          <div class="w-100 d-flex justify-content-around">
            <BotaoPadrao
              class="botao bg-cinza"
              :texto="'Voltar'"
              @click:botaoPadrao="integranteAnterior"
            />
            <BotaoPadrao
              class="botao"
              :texto="
                alterarFormIntegrantes == formEquipe.quantidadeIntegrantes
                  ? 'Revisar'
                  : 'Próximo'
              "
              @click:botaoPadrao="verificarEnviar"
              :disabled="
                !formEquipe.integrantes[alterarFormIntegrantes].nomeCompleto ||
                !formEquipe.integrantes[alterarFormIntegrantes].RA
              "
            />
          </div>
        </div>
      </div>
    </div>
    <div class="registro-sucesso" v-if="registroSucesso">
      <div>
        <p>
          Equipe registrada com <span style="color: #00a2ff">sucesso</span>,
        </p>
        <p>agora você pode fechar está página</p>
      </div>
    </div>

    <!-- Modal de revisar dados -->
    <div v-if="modal.revisar">
      <ModalPadrao v-if="modal.revisar" @fechar-modal="modal.revisar = false">
        <p class="tituloModal">Revisar detalhes</p>
        <p class="fonte1p3 mb-1">
          Revise os detalhes sobre sua equipe para realizar o cadastro:
        </p>

        <p class="fonte1p3">
          <span class="texto-negrito">Nome da equipe:</span>
          {{ formEquipe.nome }}
        </p>
        <p class="fonte1p3 mb-1">
          <span class="texto-negrito">Número de integrantes:</span>
          {{ formEquipe.quantidadeIntegrantes }}
        </p>

        <p
          v-for="(integrante, index) in formEquipe.integrantes"
          :key="index"
          class="fonte1p3 mb-1"
        >
          <div v-if="integrante.ativo">
            <p>{{ integrante.nomeCompleto }}</p>
            <p>RA: {{ integrante.RA }}</p>
          </div>
        </p>

        <div class="mt-1">
          <BotaoPadrao
            class="mr-0p5 bg-cinza"
            :texto="'Voltar'"
            @click="modal.revisar = false"
          />
          <BotaoPadrao :texto="'Registrar Equipe'" @click="registrar" />
        </div>
      </ModalPadrao>
    </div>

    <div v-if="modal.aviso">
      <ModalPadrao v-if="modal.aviso" @fechar-modal="fecharModalAviso">
        <p class="tituloModal">Erro ao registrar equipe</p>
        <p class="fonte1p3 mb-1">
          {{ msgErro }}
        </p>
      </ModalPadrao>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useEquipe } from "../../../stores/equipe";

export default {
  name: "RegistrarEquipes",

  data() {
    return {
      modal: {
        revisar: false,
        aviso: false,
      },
      formEquipe: {
        nome: null,
        quantidadeIntegrantes: "",
        integrantes: {
          1: {
            ativo: false,
            nomeCompleto: null,
            RA: null,
          },
          2: {
            ativo: false,
            nomeCompleto: null,
            RA: null,
          },
          3: {
            ativo: false,
            nomeCompleto: null,
            RA: null,
          },
          4: {
            ativo: false,
            nomeCompleto: null,
            RA: null,
          },
          5: {
            ativo: false,
            nomeCompleto: null,
            RA: null,
          },
        },
      },

      trocarInputs: false,
      alterarFormIntegrantes: 1,
      registroSucesso: false,
      msgErro: "",
    };
  },

  computed: {},

  methods: {
    ...mapActions(useEquipe, ["registrarEquipe"]),

    setarDadosIntegrantesAtivos() {
      const quantidadeIntegrantes = Number(
        this.formEquipe.quantidadeIntegrantes
      );

      for (let i = 1; i <= 5; i++) {
        this.formEquipe.integrantes[i].ativo = i <= quantidadeIntegrantes;
      }
    },

    inserirDadosIntegrantes() {
      this.setarDadosIntegrantesAtivos();
      this.trocarInputs = true;
    },

    verificarEnviar() {
      const quantidadeIntegrantes = Number(
        this.formEquipe.quantidadeIntegrantes
      );

      this.alterarFormIntegrantes === quantidadeIntegrantes
        ? this.revisarDados()
        : this.proximoIntegrante();
    },

    proximoIntegrante() {
      this.alterarFormIntegrantes++;
    },
    integranteAnterior() {
      if (this.alterarFormIntegrantes === 1) {
        this.trocarInputs = false;
        return;
      }
      this.alterarFormIntegrantes--;
      this.trocarInputs = true;
    },

    revisarDados() {
      this.modal.revisar = true;
    },

    async registrar() {
      const nome = this.formEquipe.nome;
      const quantidadeIntegrantes = Number(
        this.formEquipe.quantidadeIntegrantes
      );
      const integrantes = this.formataIntegrantes();

      const resultado = await this.registrarEquipe({
        nome,
        quantidadeIntegrantes,
        integrantes,
      });

      if (!resultado) {
        this.modal.revisar = false;
        this.modal.aviso = true;
        this.msgErro =
          "Erro inesperado, verifique sua conexão com a rede e tenta novamente!";
      }

      if (resultado.status === 201) {
        this.modal.revisar = false;
        this.registroSucesso = true;
      } else {
        this.modal.revisar = false;
        this.modal.aviso = true;
        this.msgErro =
          resultado.response?.data?.mensagem ||
          "Erro inesperado, verifique sua conexão com a rede e tenta novamente!";
      }
    },

    formataIntegrantes() {
      const integrantes = this.formEquipe.integrantes;
      const retornarIntegrantes = [];

      for (let i = 1; i <= 5; i++) {
        const integrante = integrantes[i];
        if (integrante.ativo && integrante.nomeCompleto && integrante.RA) {
          retornarIntegrantes.push({
            nome: integrante.nomeCompleto,
            RA: integrante.RA,
          });
        }
      }

      return retornarIntegrantes;
    },

    limparIntegrantesEquipe() {
      this.formEquipe.integrantes = {
        1: {
          ativo: false,
          nomeCompleto: null,
          RA: null,
        },
        2: {
          ativo: false,
          nomeCompleto: null,
          RA: null,
        },
        3: {
          ativo: false,
          nomeCompleto: null,
          RA: null,
        },
        4: {
          ativo: false,
          nomeCompleto: null,
          RA: null,
        },
        5: {
          ativo: false,
          nomeCompleto: null,
          RA: null,
        },
      };
    },

    fecharModalAviso() {
      this.modal.aviso = false;
      this.msgErro = "";
    },
  },

  watch: {
    "formEquipe.quantidadeIntegrantes"() {
      this.limparIntegrantesEquipe();
    },
  },
};
</script>

<style lang="scss" scoped src="./styles.scss" />
