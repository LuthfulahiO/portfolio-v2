import { MorphingText } from "@/components/magicui/morphing-text";

const texts = [
  "Hello", // English
  "مرحبا", // Arabic
  "Bonjour", // French
  "Bawo", // Yoruba
  "Olá", // Portuguese
];

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <MorphingText texts={texts} className="font-mono" />
    </div>
  );
}
