declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: "development" | "production" | "test"
        APP_PORT: string
        APP_HOST: string
      }
    }
  }


export { }