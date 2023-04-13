import { FC, useRef } from "react";

import styles from "./MessageForm.module.scss";

export type MessageFormProps = {
  text: string;
  onUpdateText: (value: string) => void;
  onSubmit: () => void;
};

export const MessageForm: FC<MessageFormProps> = ({
  text,
  onUpdateText,
  onSubmit,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onClick = () => {
    onSubmit();

    if (textareaRef.current) {
      textareaRef.current.value = "";
    }
  };

  return (
    <div className={styles.container}>
      <textarea
        ref={textareaRef}
        value={text}
        rows={3}
        onChange={(event) => onUpdateText(event.target.value)}
      />
      <div className={styles.buttonContainer}>
        <button onClick={onClick}>Submit</button>
      </div>
    </div>
  );
};
