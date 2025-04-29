
import { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { toast } from "@/components/ui/sonner";

type AccessibilityContextType = {
  highContrast: boolean;
  toggleHighContrast: () => void;
  textToSpeech: boolean;
  toggleTextToSpeech: () => void;
  captionsEnabled: boolean;
  toggleCaptions: () => void;
  speak: (text: string) => void;
  stopSpeaking: () => void;
  fontSize: "normal" | "large" | "x-large";
  setFontSize: (size: "normal" | "large" | "x-large") => void;
  listening: boolean;
  toggleListening: () => void;
  lastCommand: string;
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
};

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [textToSpeech, setTextToSpeech] = useState(false);
  const [captionsEnabled, setCaptionsEnabled] = useState(false);
  const [fontSize, setFontSize] = useState<"normal" | "large" | "x-large">("normal");
  const [listening, setListening] = useState(false);
  const [lastCommand, setLastCommand] = useState("");

  // Load saved preferences from localStorage on component mount
  useEffect(() => {
    const savedHighContrast = localStorage.getItem("highContrast") === "true";
    const savedTextToSpeech = localStorage.getItem("textToSpeech") === "true";
    const savedCaptions = localStorage.getItem("captionsEnabled") === "true";
    const savedFontSize = localStorage.getItem("fontSize") as "normal" | "large" | "x-large" | null;

    setHighContrast(savedHighContrast);
    setTextToSpeech(savedTextToSpeech);
    setCaptionsEnabled(savedCaptions);
    if (savedFontSize) {
      setFontSize(savedFontSize);
    }
  }, []);

  // Effect for updating document classes based on accessibility settings
  useEffect(() => {
    // Handle high contrast mode
    if (highContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }

    // Handle font size
    document.documentElement.classList.remove("text-normal", "text-large", "text-x-large");
    document.documentElement.classList.add(`text-${fontSize}`);

    // Save preferences to localStorage
    localStorage.setItem("highContrast", highContrast.toString());
    localStorage.setItem("textToSpeech", textToSpeech.toString());
    localStorage.setItem("captionsEnabled", captionsEnabled.toString());
    localStorage.setItem("fontSize", fontSize);
  }, [highContrast, textToSpeech, captionsEnabled, fontSize]);

  const toggleHighContrast = () => {
    setHighContrast((prev) => !prev);
    toast(`High contrast mode ${!highContrast ? "enabled" : "disabled"}`);
  };

  const toggleTextToSpeech = () => {
    setTextToSpeech((prev) => !prev);
    toast(`Text-to-speech ${!textToSpeech ? "enabled" : "disabled"}`);
  };

  const toggleCaptions = () => {
    setCaptionsEnabled((prev) => !prev);
    toast(`Captions ${!captionsEnabled ? "enabled" : "disabled"}`);
  };

  const speak = (text: string) => {
    if (!textToSpeech) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Create a new speech synthesis utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Speak the text
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
  };

  const toggleListening = () => {
    setListening(prev => !prev);
    toast(`Voice commands ${!listening ? "enabled" : "disabled"}`);
  };
  
  const value = {
    highContrast,
    toggleHighContrast,
    textToSpeech,
    toggleTextToSpeech,
    captionsEnabled,
    toggleCaptions,
    speak,
    stopSpeaking,
    fontSize,
    setFontSize,
    listening,
    toggleListening,
    lastCommand,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};
