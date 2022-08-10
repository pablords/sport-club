import urls from "./apiUrls";
import { getVersionApi } from "./utils";
export const api = `api/${getVersionApi()}`;

const {
  CHECKIN_API_URL,
  KEYCLOAK_API_URL,
  MANAGER_API_URL,
  METRICS_API_URL,
  NOTIFICATIONS_API_URL,
  PARTNERS_API_URL,
  PAYMENTS_API_URL,
} = urls;

export interface IRoutes {
  url: string;
  auth: boolean;
  context: "partners" | "manager" | "payments" | "checkin" | "notifications"
  proxy: {
    target: string;
    changeOrigin: boolean;
    pathRewrite: {
      [regexp: string]: string;
    };
  };
}

export const ROUTES: IRoutes[] = [
  {
    url: `/${api}/payments`,
    auth: true,
    context: "payments",
    proxy: {
      target: PAYMENTS_API_URL,
      changeOrigin: true,
      pathRewrite: {
        [`^/${api}/payments/payment-methods`]: "payment-methods",
        [`^/${api}/payments/payment-transactions`]: "payment-transactions",
        [`^/${api}/payments/health`]: "health",
      },
    },
  },

  {
    url: `/${api}/checkin`,
    auth: true,
    context: "checkin",
    proxy: {
      target: CHECKIN_API_URL,
      changeOrigin: true,
      pathRewrite: {
        [`^/${api}/checkin/access-release`]: "/v1/access-release",
        [`^/${api}/checkin/health`]: "/v1/health",
      },
    },
  },

  {
    url: `/${api}/manager`,
    context: "manager",
    auth: false,
    proxy: {
      target: MANAGER_API_URL,
      changeOrigin: true,
      pathRewrite: {
        [`^/${api}/manager/login`]: "/v1/login",
        [`^/${api}/manager/register-user`]: "/v1/register-user",
        [`^/${api}/manager/health`]: "/v1/health",
        [`^/${api}/manager/logout`]: "/v1/logout",
        [`^/${api}/manager/refresh-token`]: "/v1/refresh-token",
      },
    },
  },

  {
    url: `/${api}/partners`,
    context: "partners",
    auth: false,
    proxy: {
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
    },
  },
];
