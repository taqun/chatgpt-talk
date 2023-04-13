import { useState, useEffect, useCallback } from "react";

declare const window: CustomWindow;

interface UseSpeechRecognitionHook {
  isListening: boolean;
  hasSound: boolean;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
}

export const useSpeechRecognition = (): UseSpeechRecognitionHook => {
  const [isListening, setIsListening] = useState(false);
  const [hasSound, setHasSound] = useState<boolean>(false);
  const [autostartEnabled, setAutostartEnabled] = useState<boolean>(false);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );

  const startListening = useCallback(() => {
    setIsListening(true);
    setAutostartEnabled(true);
    recognition?.start();
  }, [recognition]);

  const stopListening = useCallback(() => {
    setIsListening(false);
    setAutostartEnabled(false);
    recognition?.stop();
  }, [recognition]);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      return;
    }

    const speechRecognition = new window.webkitSpeechRecognition();
    speechRecognition.lang = "ja";
    speechRecognition.continuous = true;
    //speechRecognition.interimResults = true;

    speechRecognition.onresult = (event) => {
      console.log(event);
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript;
      setTranscript(transcript);
    };

    speechRecognition.onstart = () => {
      console.log("onstart");
    };

    speechRecognition.onend = () => {
      console.log("onend");

      if (autostartEnabled) {
        setIsListening(true);
        speechRecognition.start();
      }
    };

    speechRecognition.onsoundstart = () => {
      console.log("sound start");
      setHasSound(true);
    };

    speechRecognition.onsoundend = () => {
      console.log("sound end");
      setHasSound(false);
    };

    setRecognition(speechRecognition);

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  return {
    isListening,
    hasSound,
    transcript,
    startListening,
    stopListening,
  };
};
