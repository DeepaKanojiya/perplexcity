import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import http from "http";
import dotenv from "dotenv";
dotenv.config();
import { initSoketServer } from "./src/sockets/server.socket.js";

const PORT = process.env.PORT || 3000;
const httpServer = http.createServer(app);
// Connect to MongoDB
connectDB();

initSoketServer(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
