import mongoose from "mongoose";
import { logger } from "./logger";

const { METRICS_DB_USER, METRICS_DB, METRICS_DB_HOST, METRICS_DB_PASSWORD, METRICS_DB_PORT } = process.env;

export async function mongodbConfig() {
  await mongoose.connect(`mongodb://${METRICS_DB_HOST}/${METRICS_DB}`);
}

const connection = mongoose.connection;
connection.once("open", function() {
  logger.info("MongoDB database connection established successfully");
});

