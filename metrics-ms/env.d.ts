declare global {
  namespace NodeJS {
    interface ProcessEnv {
        APP_PORT: string
        APP_HOST: string
        METRICS_DB_PORT: string
        METRICS_DB_HOST: string
        METRICS_DB_ENGINE: string
        METRICS_DB: string
        METRICS_DB_USER: string
        METRICS_DB_PASSWORD: string
        KAFKA_BROKER: string
        KAFKA_CLIENT_ID: string

    }
  }
}


export {}