import { useEffect, useState } from "react";

import styles from "./App.module.scss";
import { MessageForm } from "./components/MessageForm";
import { Message } from "./models/MessageStore";
import { postMessage } from "./api/OpenAIClient";
import { Speaker } from "./sound/Speaker";
import { useSpeechRecognition } from "./hooks/useSpeechRecognition";
import { MicControl } from "./components/MicControl";

const speaker = new Speaker();

function App() {
  const [inputText, setInputText] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "system-prompt",
      role: "system",
      content: "あなたは優秀なアシスタントとして振る舞ってください。",
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isListening, hasSound, transcript, startListening, stopListening } =
    useSpeechRecognition();

  const onSubmit = async (content: string) => {
    const newMessages = [...messages];
    newMessages.push({
      id: new Date().getTime().toString(),
      role: "user",
      content,
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
    if (transcript == "") return;

    onSubmit(transcript);
  }, [transcript]);

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
      <div className={styles.micControlContainer}>
        <MicControl
          isListening={isListening}
          hasSound={hasSound}
          onStartListening={() => startListening()}
          onStopListening={() => stopListening()}
        />
      </div>
      <div className={styles.messageFormContainer}>
        <MessageForm
          text={inputText}
          onUpdateText={(text) => setInputText(text)}
          onSubmit={() => onSubmit(inputText)}
        />
      </div>
    </div>
  );
}

export default App;
