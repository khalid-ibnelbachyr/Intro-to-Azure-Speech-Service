import { useRef } from "react";
import {
  SpeechConfig,
  SpeechSynthesizer,
  AudioConfig,
} from "microsoft-cognitiveservices-speech-sdk";

// Setup configs
const speechConfig = SpeechConfig.fromSubscription(
  "0eb065722ee542248125bce0c6b40600",
  "westeurope"
);
speechConfig.speechSynthesisLanguage = "fr-FR";
speechConfig.speechSynthesisVoiceName = "fr-FR-JosephineNeural";

export default function TextToSpeechBasic() {
  const inputBox = useRef<HTMLTextAreaElement>(null);

  const synthesizeSpeech = () => {
    // If no text is provided, return
    if (!inputBox.current) return;

    // Setup synthesizer
    // Must be new each time
    const audioConfig = AudioConfig.fromDefaultSpeakerOutput();
    const speechSynthesizer = new SpeechSynthesizer(speechConfig, audioConfig);

    speechSynthesizer.speakTextAsync(inputBox.current.value, (result) => {
      if (result) {
        speechSynthesizer.close();
        return result.audioData;
      }
    });
  };

  return (
    <div className="w-full px-10 py-5">
      <h2>Text To Speech</h2>
      <textarea className="textarea w-full" ref={inputBox} />
      <br />
      <button className="btn btn-accent mt-3" onClick={synthesizeSpeech}>
        Synthesize Speech
      </button>
    </div>
  );
}
