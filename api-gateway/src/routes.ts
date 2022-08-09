import express, { Response } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import urls from "./apiUrls";
import { getVersionApi } from "./utils";
import { HealthController } from "./controllers/health.controller";


export const api = `api/${getVersionApi()}`;
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

router.get(`/${api}/health`, async (_, res: Response) => {
  const contorller = new HealthController();
  const response = await contorller.getStatusHealth();
  return res.send(response);
});

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
  `/${api}/checkin`,
  createProxyMiddleware({
    target: CHECKIN_API_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/${api}/checkin/access-release`]: "/v1/access-release",
      [`^/${api}/checkin/health`]: "/v1/health",
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
      [`^/${api}/manager/logout`]: "/v1/logout",
      [`^/${api}/manager/refresh-token`]: "/v1/refresh-token",
    },
  })
);

router.use(
  `/${api}/partners`,
  createProxyMiddleware({
    target: PARTNERS_API_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/${api}/partners/health`]: "/v1/health",
      [`^/${api}/partners/contacts`]: "/v1/contacts",
      [`^/${api}/partners/contacts/create`]: "/v1/contacts/create",
      [`^/${api}/partners/contacts/update`]: "/v1/contacts/update",
      [`^/${api}/partners/contacts/delete`]: "/v1/contacts/delete",

      [`^/${api}/partners/partners`]: "/v1/partners",
      [`^/${api}/partners/partners/create`]: "/v1/partners/create",
      [`^/${api}/partners/partners/update`]: "/v1/partners/update",
      [`^/${api}/partners/partners/delete`]: "/v1/partners/delete",

      [`^/${api}/partners/modalities`]: "/v1/modalities",
      [`^/${api}/partners/modalities/create`]: "/v1/modalities/create",
      [`^/${api}/partners/modalities/update`]: "/v1/modalities/update",
      [`^/${api}/partners/modalities/delete`]: "/v1/modalities/delete",

      [`^/${api}/partners/contracts`]: "/v1/contracts",
      [`^/${api}/partners/contracts/create`]: "/v1/contracts/create",
      [`^/${api}/partners/contracts/update`]: "/v1/contracts/update",
      [`^/${api}/partners/contracts/delete`]: "/v1/contracts/delete",

      [`^/${api}/partners/register`]: "/v1/register",
    },
  })
);
