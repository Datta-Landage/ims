import { getRequestListener } from "@hono/node-server";
import app from "../src/app";
import { connectDB } from "../src/config/database";

// Global DB Connection for Serverless
connectDB();

export default getRequestListener(app.fetch);
