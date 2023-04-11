import { useEffect, useState } from "react";
import SpeechToText from "./components/Proper/SpeechToText";
import TextToSpeech from "./components/Proper/TextToSpeech";
import SpeechToTextBasic from "./components/Basic/SpeechToTextBasic";
import TextToSpeechBasic from "./components/Basic/TextToSpeechBasic";

export type SpeechOptions = {
  speechKey: string;
  speechRegion: string;
};

// The simplest setup
const AppBasic = () => {
  return (
    <main className="flex min-h-screen w-full flex-col justify-between px-4 py-24 mx-auto prose">
      <h1 className="text-center">Intro to Speech Service</h1>
      <SpeechToTextBasic />
      <TextToSpeechBasic />
    </main>
  );
};

// The proper setup
const App = () => {
  const [speechOptions, setSpeechOptions] = useState<SpeechOptions>({
    speechKey: "",
    speechRegion: "",
  });

  useEffect(() => {
    // top level await to fetch speech configs
    (async function () {
      const { token, region } = await (
        await fetch(`http://localhost:7071/api/getSpeechConfigs`)
      ).json();
      setSpeechOptions({ speechKey: token, speechRegion: region });
    })();
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col justify-between px-4 py-24 mx-auto prose">
      <h1 className="text-center">Intro to Speech Service</h1>
      <SpeechToText speechOptions={speechOptions} />
      <TextToSpeech speechOptions={speechOptions} />
    </main>
  );
};

export default App;
