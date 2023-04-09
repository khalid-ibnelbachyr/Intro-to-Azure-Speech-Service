import { useState } from "react";
import SpeechToText from "./components/SpeechToText";
import TextToSpeech from "./components/TextToSpeech";

const App = () => (
  <main className="flex min-h-screen w-full flex-col justify-between px-4 py-24 mx-auto prose">
    <h1 className="text-center">Intro to Speech Service</h1>
    <SpeechToText />
    <TextToSpeech />
  </main>
);

export default App;
