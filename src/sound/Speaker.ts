export class Speaker {
  private synth: SpeechSynthesis | null = null;
  private voice: SpeechSynthesisVoice | null = null;

  initialize(window: Window) {
    this.synth = window.speechSynthesis;

    if (this.synth != null) {
      const timer: NodeJS.Timer = setInterval(() => {
        if (this.synth?.getVoices().length != 0) {
          this.synth?.getVoices().forEach((v) => {
            if (v.name.match(/日本語/)) {
              this.voice = v;
            }
          });

          clearInterval(timer);
        }
      }, 10);
    }
  }

  speak(text: string) {
    this.synth?.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = this.voice;
    utter.pitch = 1.0;
    utter.rate = 1.2;
    this.synth?.speak(utter);
  }
}
