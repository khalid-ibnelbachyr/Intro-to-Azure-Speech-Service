// Import necessary hooks and classes from React and the Microsoft Cognitive Services Speech SDK
import { useRef } from "react";
import {
  SpeechConfig,
  SpeechSynthesizer,
  AudioConfig,
} from "microsoft-cognitiveservices-speech-sdk";
import { SpeechOptions } from "../../App";

// Define props interface for component
interface TextToSpeechProps {
  speechOptions: SpeechOptions; // Includes speechKey and speechRegion
}

// Functional component for text-to-speech conversion
export default function TextToSpeech({ speechOptions }: TextToSpeechProps) {
  // useRef hook to access the textarea DOM element
  const inputBox = useRef<HTMLTextAreaElement>(null);

  // Function to synthesize speech from text
  const synthesizeSpeech = () => {
    // Ensure the inputBox is not null
    if (!inputBox.current) return;

    // Initialize speech configuration with authorization token and region
    const speechConfig = SpeechConfig.fromAuthorizationToken(
      speechOptions.speechKey,
      speechOptions.speechRegion
    );
    // Set the language and voice for speech synthesis
    speechConfig.speechSynthesisLanguage = "fr-FR"; // Set language to French
    speechConfig.speechSynthesisVoiceName = "fr-FR-JosephineNeural"; // Set voice

    // Set up the audio output to default speaker
    const audioConfig = AudioConfig.fromDefaultSpeakerOutput();

    // Initialize speech synthesizer with the speech and audio configurations
    const speechSynthesizer = new SpeechSynthesizer(speechConfig, audioConfig);

    // Synthesize the text to speech
    speechSynthesizer.speakTextAsync(inputBox.current.value, (result) => {
      // Close the synthesizer after speech synthesis
      if (result) {
        speechSynthesizer.close();
        return result.audioData;
      }
    });
  };

  // Render the component UI
  return (
    <div className="w-full px-10 py-5">
      <h2 className="text-2xl font-semibold">Synthèse vocale</h2>
      <textarea className="textarea w-full" ref={inputBox} /> {/* Text input area */}
      <br />
      <button className="btn btn-accent mt-3" onClick={synthesizeSpeech}>
        Synthesize Speech {/* Button to trigger speech synthesis */}
      </button>
    </div>
  );
}
