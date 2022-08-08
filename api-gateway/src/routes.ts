import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import urls from "./apiUrls";
import { getVersionApi } from "./utils";

const api = `api/${getVersionApi()}`;
export const router = express.Router();

const {
  CHECKIN_API_URL,
  KEYCLOAK_API_URL,
  MANAGER_API_URL,
  METRICS_API_URL,
  NOTIFICATIONS_API_URL,
  PARTNERS_API_URL,
  PAYMENTS_API_URL,
} = urls;

router.get(`/${api}/health`, (_, res) =>
  res.send({ message: "api-gateway is running", uptime: new Date() })
);

router.use(
  `/${api}/payments`,
  createProxyMiddleware({
    target: PAYMENTS_API_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/${api}/payments/payment-methods`]: "payment-methods",
      [`^/${api}/payments/payment-transactions`]: "payment-transactions",
      [`^/${api}/payments/health`]: "health",
    },
  })
);

router.use(
  `/${api}/manager`,
  createProxyMiddleware({
    target: MANAGER_API_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/${api}/manager/login`]: "/v1/login",
      [`^/${api}/manager/register-user`]: "/v1/register-user",
      [`^/${api}/manager/health`]: "/v1/health",
    },
  })
);
