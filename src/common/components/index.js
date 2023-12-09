import BotaoPadrao from "./BotaoPadrao/index.vue";
import ModalPadrao from "./ModalPadrao/index.vue";
import InputPadrao from "./InputPadrao/index.vue";
import AvisoPadrao from "./AvisoPadrao/index.vue";

// Layout
import MenuLateralLogo from "./_Layout/MenuLateralLogo/index.vue";

export default {
  install(app) {
    app.component("BotaoPadrao", BotaoPadrao);
    app.component("ModalPadrao", ModalPadrao);
    app.component("InputPadrao", InputPadrao);
    app.component("AvisoPadrao", AvisoPadrao);

    // Layout
    app.component("MenuLateralLogo", MenuLateralLogo);
  },
};
