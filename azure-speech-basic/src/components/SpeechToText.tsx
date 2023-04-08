import React, { useState } from "react";
import {
  SpeechConfig,
  AudioConfig,
  SpeechRecognizer,
  ResultReason,
  CancellationReason,
} from "microsoft-cognitiveservices-speech-sdk";

const speechConfig = SpeechConfig.fromSubscription(
  "0eb065722ee542248125bce0c6b40600",
  "westeurope"
);
const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
const speechRecognizer = new SpeechRecognizer(speechConfig, audioConfig);

export default function SpeechToText() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");

  const startRecording = () => {
    speechRecognizer.recognizing = (s, e) => {
      console.log(`RECOGNIZING: Text=${e.result.text}`);
    };

    speechRecognizer.recognized = (s, e) => {
      if (e.result.reason == ResultReason.RecognizedSpeech) {
        console.log(`RECOGNIZED: Text=${e.result.text}`);
        setTranscript((prev) => prev + e.result.text);
      } else if (e.result.reason == ResultReason.NoMatch) {
        console.log("NOMATCH: Speech could not be recognized.");
      }
    };

    speechRecognizer.canceled = (s, e) => {
      console.log(`CANCELED: Reason=${e.reason}`);

      if (e.reason == CancellationReason.Error) {
        console.log(`"CANCELED: ErrorCode=${e.errorCode}`);
        console.log(`"CANCELED: ErrorDetails=${e.errorDetails}`);
        console.log(
          "CANCELED: Did you set the speech resource key and region values?"
        );
      }

      speechRecognizer.stopContinuousRecognitionAsync();
    };

    speechRecognizer.sessionStopped = (s, e) => {
      console.log("\n    Session stopped event.");
      speechRecognizer.stopContinuousRecognitionAsync();
    };

    setIsRecording(true);
    speechRecognizer.startContinuousRecognitionAsync();
  };

  const stopRecording = () => {
    setIsRecording(false);
    speechRecognizer.stopContinuousRecognitionAsync();
  };

  const clearTranscript = () => {
    setTranscript("");
  };

  return (
    <div className="">
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
          <div className="chat-bubble">{transcript}</div>
        </div>
      </div>
    </div>
  );
}
