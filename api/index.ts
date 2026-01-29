import { handle } from "hono/vercel";
import app from "../src/app";
import { connectDB } from "../src/config/database";

// Global DB Connection for Serverless
connectDB();

export default handle(app);
