import express from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openapi = new OpenAIApi(config);

app.post("/v1/chat/completions", async (req, res) => {
  const { messages } = req.body;

  if (messages == null) {
    return res.status(400).json({
      message: "missing required params",
    });
  }

  try {
    const response = await openapi.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
});

app.listen(3000, () => {
  console.log("express server start: http://localhost:3000/");
});
