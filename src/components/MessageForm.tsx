import { FC, useRef, useState } from "react";

import styles from "./MessageForm.module.scss";

export type MessageFormProps = {
  onSubmit: (message: string) => void;
};

export const MessageForm: FC<MessageFormProps> = ({ onSubmit }) => {
  const [message, setMessage] = useState<string>("やぁ、調子どう？");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onClick = () => {
    onSubmit(message);

    setMessage("");
    if (textareaRef.current) {
      textareaRef.current.value = "";
    }
  };

  return (
    <div className={styles.container}>
      <textarea
        ref={textareaRef}
        defaultValue={message}
        rows={3}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button onClick={onClick}>Submit</button>
    </div>
  );
};
