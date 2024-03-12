// Import necessary hooks and classes from React and the Microsoft Cognitive Services Speech SDK
import { useState, useEffect, useRef } from "react";
import {
  SpeechConfig,
  AudioConfig,
  SpeechRecognizer,
  ResultReason,
} from "microsoft-cognitiveservices-speech-sdk";
// Import the SpeechOptions type from the parent App component (or another location)
import { SpeechOptions } from "../../App";

interface SpeechToTextProps {
  speechOptions: SpeechOptions;
}

export default function SpeechToText({ speechOptions }: SpeechToTextProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const speechRecognizerRef = useRef<SpeechRecognizer | null>(null);

  useEffect(() => {
    return () => {
      if (speechRecognizerRef.current) {
        speechRecognizerRef.current.stopContinuousRecognitionAsync(
          () => {},
          (err) => console.error(err)
        );
        speechRecognizerRef.current.close();
        speechRecognizerRef.current = null;
      }
    };
  }, []);

  const startRecording = () => {
    const speechConfig = SpeechConfig.fromAuthorizationToken(
      speechOptions.speechKey,
      speechOptions.speechRegion
    );
    speechConfig.speechRecognitionLanguage = "fr-FR";

    const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognized = (s, e) => {
      if (e.result.reason === ResultReason.RecognizedSpeech) {
        setTranscript((prevTranscript) => `${prevTranscript} ${e.result.text}`);
      }
    };

    recognizer.startContinuousRecognitionAsync(
      () => {},
      (err) => console.error(err)
    );
    speechRecognizerRef.current = recognizer;
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (speechRecognizerRef.current) {
      speechRecognizerRef.current.stopContinuousRecognitionAsync(
        () => setIsRecording(false),
        (err) => console.error(err)
      );
    }
  };

  const clearTranscript = () => setTranscript("");

  return (
    <div className="w-full px-10 py-5">
      <h2 className="text-2xl font-semibold">Reconnaissance vocale</h2>
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
