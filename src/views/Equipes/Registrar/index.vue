<template>
  <div class="container">
    <MenuLateralLogo />
    <div class="informacoes" v-if="!registroSucesso">
        <div v-if="!trocarInputs">
          <div class="input-registrar">
            <InputPadrao
            :descricao="'Nome da equipe:'"
            :value="formEquipe.nome"
            :placeholder="'Digite aqui o nome da equipe:'"
            @input:padrao="formEquipe.nome = $event"
          />
          </div>

          <div class="input-registrar">
            <InputPadrao
            :descricao="'Número do carrinho:'"
            :value="formEquipe.numeroCarrinho"
            :placeholder="'Digite aqui o número do carrinho:'"
            @input:padrao="formEquipe.numeroCarrinho = $event"
            :mask="'##'"
          />
          </div>

          <div class="input-registrar">
            <label>Quantidade de integrantes</label>
            <SelectPadrao
              :opcoes="quantidadeIntegrantes"
              :placeholder="'Selecione:'"
              @selectOpcoes="setarQuantidadeIntegrantes"
            />
          </div>

          <div class="input-file">
            <InputFilePadrao
              label-text="Selecionar logo"
              :input-id="'logo-upload'"
              @fileSelected="setLogoUrl"
              :resetKey="resetKeyLogo"
            />
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
            <InputPadrao
            :descricao="`Nome completo do ${ alterarFormIntegrantes }° integrante`"
            :value="formEquipe.integrantes[alterarFormIntegrantes].nomeCompleto"
            @input:padrao="formEquipe.integrantes[alterarFormIntegrantes].nomeCompleto = $event"
          />
          </div>
          <div class="input-registrar">
            <InputPadrao
              :descricao="`RA do ${ alterarFormIntegrantes }° integrante`"
              :value="formEquipe.integrantes[alterarFormIntegrantes].RA"
              :mask="'#############'"
              @input:padrao="formEquipe.integrantes[alterarFormIntegrantes].RA = $event"
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
                !formEquipe.integrantes[alterarFormIntegrantes].RA ||
                formEquipe.integrantes[alterarFormIntegrantes].RA.length < 13
              "
            />
          </div>
        </div>
      </div>
      <div class="registro-sucesso" v-if="registroSucesso">
        <div>
          <p>
            Equipe registrada com <span style="color: #ff1100">sucesso</span>,
          </p>
          <p>agora você pode fechar está página</p>
        </div>
      </div>
    </div>

    <!-- Modal de revisar dados -->
    <div v-if="modal.revisar">
      <ModalPadrao v-if="modal.revisar" @fechar-modal="modal.revisar = false">
        <p class="tituloModal">Revisar detalhes</p>
        <p class="fonte1p3 mb-1">
          Revise os detalhes sobre a equipe para realizar o cadastro:
        </p>

        <p class="fonte1p3">
          <span class="texto-negrito">Nome da equipe:</span>
          {{ formEquipe.nome }}
        </p>
        <p class="fonte1p3 mt-1 mb-1">
          <span class="texto-negrito">Número do carrinho:</span>
          {{ formEquipe.numeroCarrinho }}
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
          <BotaoPadrao :texto="'Registrar Equipe'" class="mt-1" @click="registrar" />
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
</template>

<script>
import { mapActions } from "pinia";
import { useEquipe } from "../../../stores/equipe";
import { useUpload } from "../../../stores/upload";
import { uploadToS3urlPreAssinada } from "../../../common/functions/Upload";

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
        numeroCarrinho: "",
        logoUrl: null,
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

      quantidadeIntegrantes: [
        {
          texto: "2 integrantes",
          valor: 2,
        },
        {
          texto: "3 integrantes",
          valor: 3,
        },
        {
          texto: "4 integrantes",
          valor: 4,
        },
        {
          texto: "5 integrantes",
          valor: 5,
        },
      ],

      resetKeyLogo: 0,
    };
  },

  computed: {},

  methods: {
    ...mapActions(useEquipe, ["registrarEquipe"]),
    ...mapActions(useUpload, ["uploadLogo"]),

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
      const numeroCarrinho = this.formEquipe.numeroCarrinho;
      const logoUrl = this.formEquipe.logoUrl;

      const resultado = await this.registrarEquipe({
        nome,
        quantidadeIntegrantes,
        integrantes,
        numeroCarrinho,
        logoUrl
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

    setarQuantidadeIntegrantes(evento) {
      this.formEquipe.quantidadeIntegrantes = evento?.evento?.target?.value || null;
    },

    async setLogoUrl(file) {
      const res = await this.uploadLogo({
        fileName: file.name,
        contentType: file.type,
      });

      if (res.status === 200) {
        const urlPreAssinada = res.data.url;
        try {
          const resUpload = await uploadToS3urlPreAssinada({ file, urlPreAssinada });
          if (resUpload.status === 200) {
            this.formEquipe.logoUrl = resUpload.data;
          } else {
            this.resetKeyLogo++;

            this.modal.aviso = true;
            this.msgErro =
              resUpload.response?.data?.mensagem ||
              "Erro inesperado, verifique sua conexão com a rede e tenta novamente!";
          }
        } catch (error) {
          this.resetKeyLogo++;
          console.error("Erro ao fazer upload do arquivo:", error);
          this.modal.aviso = true;
          this.msgErro = error?.message || "Erro inesperado, verifique sua conexão com a rede e tenta novamente!";
        }
      } else {
        this.resetKeyLogo++;
        this.modal.aviso = true;
        this.msgErro =
          res.response?.data?.mensagem ||
          "Erro inesperado, verifique sua conexão com a rede e tenta novamente!";
      }

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
