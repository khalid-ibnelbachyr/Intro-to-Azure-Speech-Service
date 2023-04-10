import { useEffect, useState } from "react";
import SpeechToText from "./components/SpeechToText";
import TextToSpeech from "./components/TextToSpeech";

export type SpeechOptions = {
  speechKey: string;
  speechRegion: string;
};

const App = () => {
  const [speechOptions, setSpeechOptions] = useState<SpeechOptions>({
    speechKey: "",
    speechRegion: "",
  });

  useEffect(() => {
    const domain =
      import.meta.env.MODE === "development"
        ? "http://localhost:7071"
        : "https://mango-meadow-0ef60e903.2.azurestaticapps.net/";

    fetch(`${domain}/api/tokenHandler`)
      .then((res) => res.json())
      .then((data) => {
        setSpeechOptions({ speechKey: data.token, speechRegion: data.region });
        console.log(data);
      })
      .catch((err) => console.log(err));
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
