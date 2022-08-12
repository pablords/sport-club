import { keycloak } from "./config/keycloak";
import { IRoutes } from "./routes";
import { Express } from "express";
import session from "express-session";

export const setupAuth = (app: Express, routes: IRoutes[]) => {
  app.use(
    keycloak.middleware({
      logout: "/logout",
      admin: "/",
    })
  );
  routes.forEach((r) => {
    if (r.auth) {
      app.use(r.url, keycloak.protect(), function (req, res, next) {
        next();
      });
    }
  });
};
