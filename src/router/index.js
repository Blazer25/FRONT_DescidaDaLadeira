import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home/index.vue";
import RegistrarEquipes from "../views/Equipes/Registrar/index.vue";
import ListarEquipes from "../views/Equipes/Listar/index.vue";
import Login from "../views/Login/index.vue";
import Cronometro from "../views/Cronometro/index.vue";
import Corridas from "../views/Corridas/index.vue";
import AreaAdministrativa from "../views/AreaAdministrativa/index.vue";
import Regulamento from "../views/Regulamento/index.vue";
import Ranking from "../views/Ranking/index.vue";
import CadastrarEquipesPorFase from '../views/Equipes/CadastrarPorFase/index.vue'

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
      auth: true,
    },
  },
  {
    path: "/cadastrarCorridasPorFase",
    name: "CadastrarEquipesPorFase",
    component: CadastrarEquipesPorFase,
    meta: {
      auth: true,
    },
  },
  {
    path: "/listarequipes",
    name: "ListarEquipes",
    component: ListarEquipes,
    meta: {
      auth: true,
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
    path: "/corridas",
    name: "Corridas",
    component: Corridas,
    meta: {
      auth: true,
    },
  },

  {
    path: "/regulamento",
    name: "Regulamento",
    component: Regulamento,
    meta: {
      auth: false,
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
    path: "/ranking",
    name: "Ranking",
    component: Ranking,
    meta: {
      auth: false,
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
