import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import dotenv from "dotenv";
dotenv.config();

import { testAi } from "./src/services/ai.services.js";

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

//Test AI
testAi();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
