import React, { useRef } from "react";
import {
  SpeechConfig,
  SpeechSynthesizer,
  AudioConfig,
} from "microsoft-cognitiveservices-speech-sdk";

const speechConfig = SpeechConfig.fromSubscription(
  "0eb065722ee542248125bce0c6b40600",
  "westeurope"
);
speechConfig.speechSynthesisLanguage = "en-US";
speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";

export default function TextToSpeech() {
  const inputBox = useRef<HTMLTextAreaElement>(null);

  const synthesize = () => {
    if (!inputBox.current) return;

    const audioConfig = AudioConfig.fromDefaultSpeakerOutput();
    const speechSynthesizer = new SpeechSynthesizer(speechConfig, audioConfig);
    speechSynthesizer.speakTextAsync(
      inputBox.current.value,
      (result) => {
        if (result) {
          speechSynthesizer.close();
          return result.audioData;
        }
      },
      (error) => {
        console.log(error);
        speechSynthesizer.close();
      }
    );
  };

  return (
    <div className="w-full px-10">
      <h2>Text To Speech</h2>
      <textarea className="textarea w-full" ref={inputBox} />
      <br />
      <button className="btn" onClick={synthesize}>
        Synthesize{" "}
      </button>
    </div>
  );
}
