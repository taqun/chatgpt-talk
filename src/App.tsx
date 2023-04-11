import { useEffect, useState } from "react";

import styles from "./App.module.scss";
import { MessageForm } from "./components/MessageForm";
import { Message } from "./models/MessageStore";
import { postMessage } from "./api/OpenAIClient";
import { Speaker } from "./sound/Speaker";

const speaker = new Speaker();

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "system-prompt",
      role: "system",
      content:
        "あなたは映画に出てくるような優秀であると同時にユーモアも持ち合わせた優れたAIとして返答してください。",
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (message: string) => {
    const newMessages = [...messages];
    newMessages.push({
      id: new Date().getTime().toString(),
      role: "user",
      content: message,
    });
    setMessages(newMessages);

    const requestMessages = newMessages.map((message) => {
      return { role: message.role, content: message.content };
    });

    setIsLoading(true);

    const responseMessage = await postMessage(requestMessages);
    if (responseMessage) {
      setMessages([...newMessages, responseMessage]);
      speaker.speak(responseMessage.content);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (window) {
      speaker.initialize(window);
    }
  }, [window]);

  return (
    <div className={styles.appContainer}>
      <div>
        {messages.map((message) => {
          if (message.role == "system") {
            return null;
          }
          return (
            <div key={message.id}>
              <p>
                <b>{message.role}</b>: {message.content}
              </p>
            </div>
          );
        })}
      </div>
      {isLoading && (
        <div>
          <p>isLoading...</p>
        </div>
      )}
      <div className={styles.messageFormContainer}>
        <MessageForm onSubmit={onSubmit} />
      </div>
    </div>
  );
}

export default App;
