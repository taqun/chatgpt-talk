import axios from "axios";
import { Message } from "../models/MessageStore";

type RequestMessage = Pick<Message, "role" | "content">;

export const postMessage = async (messages: RequestMessage[]) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/v1/chat/completions",
      {
        messages,
      }
    );

    const data = response.data;
    const { role, content } = data.choices[0].message;

    return {
      id: data.id,
      role,
      content,
    };
  } catch (error) {
    console.log(error);
  }
};
