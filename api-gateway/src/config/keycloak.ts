import session from "express-session"
import Keycloak from "keycloak-connect"

const memoryStore = new session.MemoryStore()

const kcConfig: any = {
  clientId: process.env.CLIENT_ID,
  bearerOnly: true,
  serverUrl: process.env.AUTH_API_URL,
  realm: process.env.KEYCLOAK_HELM,
  credenciais: {
    secret: process.env.CLIENT_SECRET
  }
}

export const keycloak = new Keycloak({ store: memoryStore }, kcConfig)