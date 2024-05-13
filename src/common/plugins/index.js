import VueTheMask from "vue-the-mask";
import instanciaAxios from "../services/https";
import { createPinia } from "pinia";
import Swal from "sweetalert2";

const pinia = createPinia();

export default {
  install(app) {
    app.use(VueTheMask);
    app.use(pinia);

    app.config.globalProperties.$instanciaAxios = instanciaAxios;
    app.config.globalProperties.$swal = Swal;
  },
};
