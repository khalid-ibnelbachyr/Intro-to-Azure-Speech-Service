import { Inter } from "next/font/google";
import SpeechToText from "@/components/SpeechToText";
import TextToSpeech from "@/components/TextToSpeech";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen w-full flex-col items-center justify-between p-24 mx-auto ${inter.className} prose`}
    >
      <h1>Intro to Speech Service</h1>

      <SpeechToText />
      <TextToSpeech />
    </main>
  );
}
