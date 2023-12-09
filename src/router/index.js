import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home/index.vue";
import RegistrarEquipes from "../views/RegistrarEquipes/index.vue";
import Login from "../views/Login/index.vue";
import Cronometro from "../views/Cronometro/index.vue";
import Ranking from "../views/Ranking/index.vue";
import AreaAdministrativa from "../views/AreaAdministrativa/index.vue";

import verificadorRotas from "./routes";

const routes = [
  {
    path: "/",
    name: "Home_",
    component: Home,
    meta: {
      auth: false,
    },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      auth: false,
    },
  },
  {
    path: "/registrarequipes",
    name: "RegistrarEquipes",
    component: RegistrarEquipes,
    meta: {
      auth: false,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      auth: false,
    },
  },
  {
    path: "/cronometro",
    name: "Cronometro",
    component: Cronometro,
    meta: {
      auth: true,
    },
  },
  {
    path: "/ranking",
    name: "Ranking",
    component: Ranking,
    meta: {
      auth: true,
    },
  },

  {
    path: "/areaadministrativa",
    name: "AreaAdministrativa",
    component: AreaAdministrativa,
    meta: {
      auth: true,
    },
  },

  {
    path: "/:catchAll(.*)",
    component: () => import("../views/Errors/PaginaNaoEncontrada/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(verificadorRotas);

export default router;
