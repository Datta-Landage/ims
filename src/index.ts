import { serve } from "@hono/node-server";
import dns from "dns";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import app from "./app";
import { Config } from "./config";
import { connectDB } from "./config/database";

// Override DNS servers to bypass ISP issues with MongoDB SRV records
try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch (err) {
  // Ignore DNS errors
}

// Global DB Connection
connectDB();

if (!(app instanceof Hono)) {
  throw new Error("Application must be an instance of Hono");
}

// 1. Export the handler for Vercel
export default handle(app);

// 2. Local Development & Node Server
const port = Number(Config.PORT) || 3000;

if (!process.env.VERCEL) {
  console.log(`🚀 Node Server running on port ${port}`);
  serve({
    fetch: app.fetch,
    port: port,
  });
}
