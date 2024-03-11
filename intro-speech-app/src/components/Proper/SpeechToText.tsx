import { useState, useEffect, useRef } from "react";
import {
  SpeechConfig,
  AudioConfig,
  SpeechRecognizer,
  ResultReason,
} from "microsoft-cognitiveservices-speech-sdk";
import { SpeechOptions } from "../../App";

interface SpeechToTextProps {
  speechOptions: SpeechOptions;
}

export default function SpeechToText({ speechOptions }: SpeechToTextProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const speechRecognizerRef = useRef<SpeechRecognizer | null>(null);

  useEffect(() => {
    // Cleanup function to unsubscribe and stop recognition when component unmounts or recording stops
    return () => {
      if (speechRecognizerRef.current) {
        speechRecognizerRef.current.stopContinuousRecognitionAsync();
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
    // Set the speech recognition language to French
    speechConfig.speechRecognitionLanguage = "fr-FR";

    const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
    const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

    recognizer.recognized = (s, e) => {
      if (e.result.reason === ResultReason.RecognizedSpeech) {
        setTranscript((prevTranscript) => `${prevTranscript} ${e.result.text}`);
      }
    };

    recognizer.startContinuousRecognitionAsync();
    speechRecognizerRef.current = recognizer;
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (speechRecognizerRef.current) {
      speechRecognizerRef.current.stopContinuousRecognitionAsync();
      setIsRecording(false);
    }
  };

  const clearTranscript = () => setTranscript("");

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
