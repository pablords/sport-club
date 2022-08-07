import mongoose from "mongoose";
import { IDataLog } from "../../app/services/processDataStream.service";
const Schema = mongoose.Schema;

export const LogModel = new Schema({
    agent: { type: String },
    traceId: { type: String },
    middleware: { type: String },
    ip: { type: String },
    method: { type: String },
    path: { type: String },
    host: { type: String },
    platform: { type: String },
    origin: { type: String }
});
