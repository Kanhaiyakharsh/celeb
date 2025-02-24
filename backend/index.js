// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");
// dotenv.config();
// // import { connect } from "mongoose"
// // import { connectDB } from "./config/db.js"
// const { connectDB } = require("./config/db.js");

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import user_route from "./routes/userRoute.js";
import 'dotenv/config';
import { connectDB } from "./config/db.js";




const app = express();
const API_KEY = process.env.OPENAI_API_KEY;


app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}))

app.use(bodyParser.json());
app.use(express.json())
const port = process.env.PORT || 4000;
//db connection
connectDB();

//open API
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
      // store: true,
      max_tokens: 100,
    }),
  };    

  try {
   const response = await fetch("https://api.openai.com/v1/chat/completions", options);

   const data = await response.json();
   res.send(data);

  } catch (error) {
    console.log(error);
  }
});


//for user routes
// const userRoute = require("./routes/userRoute");
// const user_route = require("./routes/userRoute");


// app.use("/", userRoute);
app.use("/api/user",user_route)

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
