import BotaoPadrao from "./BotaoPadrao/index.vue";
import ModalPadrao from "./ModalPadrao/index.vue";
import InputPadrao from "./InputPadrao/index.vue";
import AvisoPadrao from "./AvisoPadrao/index.vue";
import TabelaPadrao from "./TabelaPadrao/index.vue";
import SelectPadrao from "./SelectPadrao/index.vue";
import MiniCardPadrao from "./MiniCardPadrao/index.vue";
import SelecionarEquipes from "./SelecionarEquipes/index.vue";

// Layout
import MenuLateralLogo from "./_Layout/MenuLateralLogo/index.vue";

export default {
  install(app) {
    app.component("BotaoPadrao", BotaoPadrao);
    app.component("ModalPadrao", ModalPadrao);
    app.component("InputPadrao", InputPadrao);
    app.component("AvisoPadrao", AvisoPadrao);
    app.component("TabelaPadrao", TabelaPadrao);
    app.component("SelectPadrao", SelectPadrao);
    app.component("MiniCardPadrao", MiniCardPadrao);
    app.component("SelecionarEquipes", SelecionarEquipes);

    // Layout
    app.component("MenuLateralLogo", MenuLateralLogo);
  },
};
