import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import connectDB from "./lib/db.js";

const __dirname = path.resolve();
const app = express();

const port = ENV.PORT || 3000;
app.use(express.json());

// middlewares
app.use(express.json());

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
