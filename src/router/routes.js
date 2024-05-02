import { useAuth } from "../stores/auth";

export default async function routes(to, from, next) {
  const rotasNaoVerificar = ["Home_", "Home", "Login", "Ranking"];
  if (
    rotasNaoVerificar.includes(to.name)
  ) {
    next();
    return;
  }
  const auth = useAuth();
  const autenticado = await auth.verificarToken();

  if (to.name == "Login" && autenticado) {
    next({ name: "Home" });
    return;
  }

  if (to.meta && to.meta.auth) {
    if (auth.token && auth.usuario) {
      if (autenticado) {
        next();
      } else {
        next({ name: "Login" });
      }
      return;
    }
    next({ name: "Login" });
  } else {
    next();
  }
}
