// Import necessary hooks and classes from React and the Microsoft Cognitive Services Speech SDK
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

// Define the prop types for this component
interface SpeechToTextProps {
  speechOptions: SpeechOptions;
}

// The SpeechToText functional component
export default function SpeechToText({ speechOptions }: SpeechToTextProps) {
  // State hooks for managing recording status, and the transcript text
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  // Ref hook to keep a persistent reference to the SpeechRecognizer instance
  const speechRecognizerRef = useRef<SpeechRecognizer | null>(null);

  // useEffect hook for cleanup on component unmount or when recording stops
  useEffect(() => {
    return () => {
      // If there's an existing SpeechRecognizer instance, stop recognition and close it
      if (speechRecognizerRef.current) {
        speechRecognizerRef.current.stopContinuousRecognitionAsync();
        speechRecognizerRef.current.close();
        speechRecognizerRef.current = null;
      }
    };
  }, []);

  // Function to start recording and speech recognition
  const startRecording = () => {
    // Initialize speech configuration with the authorization token and service region from props
    const speechConfig = SpeechConfig.fromAuthorizationToken(
      speechOptions.speechKey,
      speechOptions.speechRegion
    );
    // Set the recognition language to French
    speechConfig.speechRecognitionLanguage = "fr-FR";

    // Configure the audio source to use the default microphone input
    const audioConfig = AudioConfig.fromDefaultMicrophoneInput();
    // Create a new SpeechRecognizer instance with the specified configurations
    const recognizer = new SpeechRecognizer(speechConfig, audioConfig);

    // Subscribe to the recognized event to handle speech recognition results
    recognizer.recognized = (s, e) => {
      // If speech is successfully recognized, append it to the transcript
      if (e.result.reason === ResultReason.RecognizedSpeech) {
        setTranscript((prevTranscript) => `${prevTranscript} ${e.result.text}`);
      }
    };

    // Start continuous speech recognition
    recognizer.startContinuousRecognitionAsync();
    // Update the speechRecognizerRef with the current recognizer instance
    speechRecognizerRef.current = recognizer;
    // Update the recording state to true
    setIsRecording(true);
  };

  // Function to stop recording
  const stopRecording = () => {
    // If a SpeechRecognizer instance exists, stop recognition and update recording state
    if (speechRecognizerRef.current) {
      speechRecognizerRef.current.stopContinuousRecognitionAsync();
      setIsRecording(false);
    }
  };

  // Function to clear the current transcript
  const clearTranscript = () => setTranscript("");

  // Render the component UI
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
