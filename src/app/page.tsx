import { MorphingText } from "@/components/magicui/morphing-text";

const texts = [
  "Hello", // English
  "مرحبا", // Arabic
  "Bonjour", // French
  "Hallo", // German
  "Bawo", // Yoruba
  "Hola", // Spanish
  "Ciao", // Italian
  "你好", // Chinese
  "नमस्ते", // Hindi
  "Olá", // Portuguese
];

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <main className="flex flex-col w-full">
        <MorphingText texts={texts} />
      </main>
    </div>
  );
}
