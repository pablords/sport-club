declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      APP_PORT: number;
      APP_HOST: string;
      TIMEZONE: string;
      DB_ENGINE:
        | 'mariadb'
        | 'mongodb'
        | 'mssql'
        | 'oracle'
        | 'postgres'
        | 'sqlite';
      METRICS_DB_HOST: string
      METRICS_DB: string;
      METRICS_DB_USER: string;
      METRICS_DB_PASSWORD: string
      METRICS_DB_PORT: number
      METRICS_DB_ENGINE:
        | 'mariadb'
        | 'mongodb'
        | 'mssql'
        | 'oracle'
        | 'postgres'
        | 'sqlite';
      DB_HOST: string;
      DB_USER: string;
      DB_DATABASE: string;
      DB_PASSWORD: string;
      DB_PORT: number;
      KAFKA_BROKER: string;
      KAFKA_CLIENT_ID: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
