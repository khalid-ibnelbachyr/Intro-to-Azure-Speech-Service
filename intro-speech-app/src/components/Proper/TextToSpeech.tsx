// Import necessary hooks and classes from React and the Microsoft Cognitive Services Speech SDK
import { useRef } from "react";
import {
  SpeechConfig,
  SpeechSynthesizer,
  AudioConfig,
} from "microsoft-cognitiveservices-speech-sdk";
import { SpeechOptions } from "../../App";

// Interface to type the props received by the component
interface TextToSpeechProps {
  speechOptions: SpeechOptions; // Contains the authorization details for speech service
}

// Functional component for converting text to speech
export default function TextToSpeech({ speechOptions }: TextToSpeechProps) {
  // Reference to the text area where users can input text for speech synthesis
  const inputBox = useRef<HTMLTextAreaElement>(null);

  // Function to handle speech synthesis
  const synthesizeSpeech = () => {
    // Guard clause to exit function if inputBox is not initialized
    if (!inputBox.current) return;

    // Initialize speech configuration with authorization token and service region
    const speechConfig = SpeechConfig.fromAuthorizationToken(
      speechOptions.speechKey,
      speechOptions.speechRegion
    );
    // Set the language and voice for the speech synthesis
    speechConfig.speechSynthesisLanguage = "fr-FR"; // Language set to French
    speechConfig.speechSynthesisVoiceName = "fr-FR-JosephineNeural"; // Specific voice for synthesis

    // Configure audio output to the default speaker of the device
    const audioConfig = AudioConfig.fromDefaultSpeakerOutput();

    // Create a new speech synthesizer instance with the specified speech and audio configurations
    const speechSynthesizer = new SpeechSynthesizer(speechConfig, audioConfig);

    // Perform text to speech synthesis asynchronously
    speechSynthesizer.speakTextAsync(
      inputBox.current.value,
      result => {
        // Log success if speech synthesis was successful
        if (result) {
          console.log("Speech synthesis succeeded.");
        }
      },
      error => {
        // Log error if speech synthesis failed
        console.error("Error occurred during speech synthesis:", error);
      }
    ).then(() => {
      // Always close the synthesizer to release resources after synthesis
      speechSynthesizer.close();
    }).catch(error => {
      // Log error if there was an issue closing the synthesizer
      console.error("An error occurred while closing the synthesizer:", error);
      // Ensure the synthesizer is closed to release resources
      speechSynthesizer.close();
    });
  };

  // Render the UI of the component
  return (
    <div className="w-full px-10 py-5">
      <h2>Text To Speech</h2>
      {/* Textarea for input text */}
      <textarea className="textarea w-full" ref={inputBox} />
      <br />
      {/* Button to trigger speech synthesis */}
      <button className="btn btn-accent mt-3" onClick={synthesizeSpeech}>
        Synthesize Speech
      </button>
    </div>
  );
}

