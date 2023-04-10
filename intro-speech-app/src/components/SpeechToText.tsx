import { useState } from "react";
import {
  SpeechConfig,
  AudioConfig,
  SpeechRecognizer,
  ResultReason,
} from "microsoft-cognitiveservices-speech-sdk";
import { SpeechOptions } from "../App";

interface SpeechToTextProps {
  speechOptions: SpeechOptions;
}

export default function SpeechToText({ speechOptions }: SpeechToTextProps) {
  const [speechRecognizer, setSpeechRecognizer] = useState<SpeechRecognizer>();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  const startRecording = () => {
    const speechConfig = SpeechConfig.fromAuthorizationToken(
      speechOptions.speechKey,
      speechOptions.speechRegion
    );
    const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
    const speechRecognizer = new SpeechRecognizer(speechConfig, audioConfig);
    speechRecognizer.recognized = (s, e) => {
      if (e.result.reason == ResultReason.RecognizedSpeech) {
        setTranscript((prev) => prev + " " + e.result.text);
      }
    };
    setSpeechRecognizer(speechRecognizer);
    setIsRecording(true);
    speechRecognizer.startContinuousRecognitionAsync();
  };

  const stopRecording = () => {
    if (speechRecognizer) {
      setIsRecording(false);
      speechRecognizer.stopContinuousRecognitionAsync();
    }
  };

  const clearTranscript = () => {
    setTranscript("");
  };

  return (
    <div className="w-full px-10 py-5">
      <h2 className="text-2xl font-semibold">Speech To Text</h2>
      {!isRecording ? (
        <button className="btn btn-primary" onClick={startRecording}>
          Start Recording
        </button>
      ) : (
        <button className="btn btn-error" onClick={stopRecording}>
          Stop Recording
        </button>
      )}
      <button className="btn btn-secondary ml-3" onClick={clearTranscript}>
        Clear Transcript
      </button>

      <div className="w-full">
        <h3>Transcript:</h3>
        <div className="chat chat-start">
          <div className="chat-bubble chat-bubble-accent">{transcript}</div>
        </div>
      </div>
    </div>
  );
}
