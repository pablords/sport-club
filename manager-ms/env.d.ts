
declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: "development" | "production"
        APP_PORT?: number
        APP_HOST: string
        CLIENT_SECRET: string
        AUTH_API_URL: string
        CLIENT_ID: string
        KEYCLOAK_HELM: string
        DB_REDIS_PORT: string
        DB_REDIS_PASSWORD: string
        DB_REDIS_HOST: string
      }
    }
  }

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export { }
