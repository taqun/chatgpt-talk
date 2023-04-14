import { FC, useRef } from "react";

import styles from "./MessageForm.module.scss";

export type MessageFormProps = {
  onUpdateText: (value: string) => void;
  onSubmit: () => void;
};

export const MessageForm: FC<MessageFormProps> = ({
  onUpdateText,
  onSubmit,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onClick = () => {
    onSubmit();

    if (textareaRef.current != null) {
      textareaRef.current.value = "";
      console.log("clear");
    }
  };

  return (
    <div className={styles.container}>
      <textarea
        ref={textareaRef}
        rows={3}
        onChange={(event) => onUpdateText(event.target.value)}
      />
      <div className={styles.buttonContainer}>
        <button onClick={onClick}>Submit</button>
      </div>
    </div>
  );
};
