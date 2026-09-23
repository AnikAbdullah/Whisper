import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import connectDB from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const __dirname = path.resolve();
const app = express();

const port = ENV.PORT || 3000;

// middlewares
app.use(express.json({ limit: "5mb" }));
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// make ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.use((_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDB();
});
