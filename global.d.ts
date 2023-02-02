namespace NodeJS {
    interface ProcessEnv {
      STATUS: "dev" | "prod";
      MONGO_DB: string;
      MONGO_DEV: string;
      PORT: number;
      SECRET_AT: string;
    }
  }