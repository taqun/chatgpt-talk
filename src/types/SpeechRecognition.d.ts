interface SpeechRecognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;

  onstart: (event: SpeechRecognitionEvent) => void;
  onend: (event: SpeechRecognitionEvent) => void;
  onsoundstart: (event: SpeechRecognitionEvent) => void;
  onsoundend: (event: SpeechRecognitionEvent) => void;
  onresult: (event: SpeechRecognitionEvent) => void;

  abort(): void;
  start(): void;
  stop(): void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}
