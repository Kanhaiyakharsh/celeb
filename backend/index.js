import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import user_route from "./routes/userRoute.js";
import profileRoutes from "./routes/profileRoutes.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import kycRoutes from "./routes/kycRoutes.js";
import analytics_router from "./routes/adminRoutes.js";
// import authRoutes from "./routes/"

dotenv.config();

const app = express();
const API_KEY = process.env.OPENAI_API_KEY;

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use("/uploads", express.static("uploads")); // Serve uploaded images

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 4000;

// DB Connection
connectDB();

// OpenAI API Endpoint
app.post("/campaign", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "assistant", content: req.body.message }],
      max_tokens: 100,
    }),
  };

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

// Routes
app.use("/api/user", user_route);
app.use("/api/user/profiles", profileRoutes);
app.disable("etag");
// app.use("/api/auth", authRoutes);
app.use("/api/kyc", kycRoutes);

app.use("/admin", analytics_router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
