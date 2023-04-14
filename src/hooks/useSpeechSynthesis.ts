import { useEffect, useState } from "react";

interface UseSpeechSynthesisHook {
  speak: (text: string) => void;
}

export const useSpeechSynthesis = (): UseSpeechSynthesisHook => {
  const [speechSynthesis, setSpeechSynthesis] =
    useState<SpeechSynthesis | null>(null);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

  const speak = (text: string) => {
    speechSynthesis?.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.pitch = 1.0;
    utter.rate = 1.2;
    utter.voice = voice;
    speechSynthesis?.speak(utter);
  };

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      return;
    }

    const synth = window.speechSynthesis;
    if (synth != null) {
      setSpeechSynthesis(synth);

      const timer: NodeJS.Timer = setInterval(() => {
        if (synth.getVoices().length != 0) {
          synth.getVoices().forEach((v) => {
            if (v.name.match(/日本語/)) {
              setVoice(v);
            }
          });

          clearInterval(timer);
        }
      }, 10);
    }
  }, []);

  return { speak };
};
