import { createProxyMiddleware } from "http-proxy-middleware";
import { IRoutes } from "./routes";
import { Express } from "express";

export const setupProxies = (app: Express, routes: IRoutes[]) => {
  routes.forEach((route: IRoutes) => {
    app.use(route.url, createProxyMiddleware(route.proxy));
  });
};
