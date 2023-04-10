import { useRef } from "react";
import {
  SpeechConfig,
  SpeechSynthesizer,
  AudioConfig,
} from "microsoft-cognitiveservices-speech-sdk";
import { SpeechOptions } from "../App";

interface TextToSpeechProps {
  speechOptions: SpeechOptions;
}

export default function TextToSpeech({ speechOptions }: TextToSpeechProps) {
  const inputBox = useRef<HTMLTextAreaElement>(null);

  const synthesize = () => {
    if (!inputBox.current) return;

    const speechConfig = SpeechConfig.fromAuthorizationToken(
      speechOptions.speechKey,
      speechOptions.speechRegion
    );
    speechConfig.speechSynthesisLanguage = "en-US";
    speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";
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
      <button className="btn btn-accent mt-3" onClick={synthesize}>
        Synthesize Speech
      </button>
    </div>
  );
}
