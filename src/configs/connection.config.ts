require("dotenv").config();

export const dbConfig = process.env.STATUS === "prod" ? process.env.MONGO_DB : process.env.MONGO_DEV
