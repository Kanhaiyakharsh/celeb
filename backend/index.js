const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}))


app.use(bodyParser.json());
app.use(express.json())

dotenv.config();

const API_KEY =
  "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";

const port = process.env.PORT || 4000;

app.post("/campaign", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",

      messages: [{ role: "user", content: req.body.message }],
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
const userRoute = require("./routes/userRoute");
app.use("/", userRoute);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
