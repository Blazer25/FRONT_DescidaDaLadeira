import BotaoPadrao from "./BotaoPadrao/index.vue";
import ModalPadrao from "./ModalPadrao/index.vue";
import InputPadrao from "./InputPadrao/index.vue";
import InputFilePadrao from "./InputFilePadrao/index.vue";
import AvisoPadrao from "./AvisoPadrao/index.vue";
import TabelaPadrao from "./TabelaPadrao/index.vue";
import SelectPadrao from "./SelectPadrao/index.vue";
import MiniCardPadrao from "./MiniCardPadrao/index.vue";
import SelecionarEquipes from "./SelecionarEquipes/index.vue";
import CardCorrida from "./CardCorrida/index.vue";
import SelecionarPartipantesCorrida from "./SelecionarPartipantesCorrida/index.vue";

// Layout
import MenuLateralLogo from "./_Layout/MenuLateralLogo/index.vue";

export default {
  install(app) {
    app.component("BotaoPadrao", BotaoPadrao);
    app.component("ModalPadrao", ModalPadrao);
    app.component("InputPadrao", InputPadrao);
    app.component("InputFilePadrao", InputFilePadrao);
    app.component("AvisoPadrao", AvisoPadrao);
    app.component("TabelaPadrao", TabelaPadrao);
    app.component("SelectPadrao", SelectPadrao);
    app.component("MiniCardPadrao", MiniCardPadrao);
    app.component("SelecionarEquipes", SelecionarEquipes);
    app.component("CardCorrida", CardCorrida);
    app.component("SelecionarPartipantesCorrida", SelecionarPartipantesCorrida);

    // Layout
    app.component("MenuLateralLogo", MenuLateralLogo);
  },
};
