import { MorphingText } from "@/components/magicui/morphing-text";
import { motion } from "motion/react";

type LoaderProps = {
  onSkip: () => void;
};

const texts = [
  "Hello", // English
  "مرحبا", // Arabic
  "Bonjour", // French
  "Bawo", // Yoruba
  "Olá", // Portuguese
];

export default function Loader({ onSkip }: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full relative">
      <MorphingText texts={texts} className="font-mono" />
      
      <motion.button 
        onClick={onSkip}
        className="mt-16 px-6 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        Skip Animation
      </motion.button>
    </div>
  );
}
