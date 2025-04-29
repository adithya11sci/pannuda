
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import { useAccessibility } from "@/contexts/AccessibilityContext";

interface VoiceCommandOptions {
  onPlayVideo?: () => void;
  onPauseVideo?: () => void;
}

const useVoiceCommands = (options?: VoiceCommandOptions) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const navigate = useNavigate();
  const { listening, speak } = useAccessibility();

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.error("Speech recognition not supported in this browser");
      toast.error("Voice commands are not supported in your browser");
      return;
    }

    // Initialize speech recognition
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = "en-US";

    recognitionInstance.onstart = () => {
      setIsListening(true);
      console.log("Voice recognition started");
    };

    recognitionInstance.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      if (event.error === "no-speech") {
        // No need to show error for silence
        return;
      }
      toast.error(`Voice recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognitionInstance.onend = () => {
      setIsListening(false);
      console.log("Voice recognition ended");
      
      // Restart if we're still supposed to be listening
      if (listening) {
        recognitionInstance.start();
      }
    };

    recognitionInstance.onresult = (event) => {
      const current = event.resultIndex;
      const currentTranscript = event.results[current][0].transcript.trim().toLowerCase();
      setTranscript(currentTranscript);

      if (event.results[current].isFinal) {
        handleCommand(currentTranscript);
      }
    };

    setRecognition(recognitionInstance);

    return () => {
      if (recognitionInstance) {
        recognitionInstance.stop();
      }
    };
  }, [navigate, options]);

  useEffect(() => {
    if (recognition) {
      if (listening && !isListening) {
        try {
          recognition.start();
        } catch (error) {
          // Recognition might already be started
          console.log("Recognition already started");
        }
      } else if (!listening && isListening) {
        recognition.stop();
      }
    }
  }, [listening, recognition, isListening]);

  const handleCommand = (command: string) => {
    console.log("Voice command received:", command);
    
    // Normalize command by removing extra spaces and converting to lowercase
    const normalizedCommand = command.toLowerCase().trim();

    // Handle navigation commands
    if (normalizedCommand.includes("open dashboard") || normalizedCommand === "dashboard") {
      navigate("/dashboard");
      toast.success("Navigating to dashboard");
      speak("Opening dashboard");
      return;
    }
    
    if (normalizedCommand.includes("open classroom") || normalizedCommand === "classroom") {
      navigate("/courses");
      toast.success("Navigating to classroom");
      speak("Opening classroom");
      return;
    }
    
    if (normalizedCommand.includes("open physics") || normalizedCommand === "physics") {
      navigate("/course/physics");
      toast.success("Opening Physics course");
      speak("Opening physics course");
      return;
    }
    
    if (normalizedCommand.includes("open chemistry") || normalizedCommand === "chemistry") {
      navigate("/course/chemistry");
      toast.success("Opening Chemistry course");
      speak("Opening chemistry course");
      return;
    }
    
    if (normalizedCommand.includes("open unit 1") || normalizedCommand === "unit 1") {
      // Assuming we're already in a course page
      navigate("?unit=1");
      toast.success("Opening Unit 1");
      speak("Opening unit one");
      return;
    }
    
    if (normalizedCommand.includes("open unit 2") || normalizedCommand === "unit 2") {
      navigate("?unit=2");
      toast.success("Opening Unit 2");
      speak("Opening unit two");
      return;
    }
    
    if (normalizedCommand.includes("go back") || normalizedCommand === "back") {
      navigate(-1);
      toast.success("Going back");
      speak("Going back");
      return;
    }
    
    if (normalizedCommand.includes("go home") || normalizedCommand === "home") {
      navigate("/");
      toast.success("Going to homepage");
      speak("Going to home page");
      return;
    }
    
    if (normalizedCommand.includes("go to login") || normalizedCommand === "login") {
      navigate("/login");
      toast.success("Going to login page");
      speak("Going to login page");
      return;
    }
    
    if (normalizedCommand.includes("go to admin") || normalizedCommand === "admin") {
      navigate("/admin");
      toast.success("Going to admin panel");
      speak("Going to admin panel");
      return;
    }
    
    // Handle video commands
    if (normalizedCommand.includes("play video") || normalizedCommand === "play") {
      if (options?.onPlayVideo) {
        options.onPlayVideo();
        toast.success("Playing video");
        speak("Playing video");
        return;
      }
    }
    
    if (normalizedCommand.includes("pause video") || normalizedCommand === "pause") {
      if (options?.onPauseVideo) {
        options.onPauseVideo();
        toast.success("Pausing video");
        speak("Pausing video");
        return;
      }
    }
    
    // Command not recognized
    toast.error("Command not recognized: " + normalizedCommand);
    speak("Command not recognized");
  };

  return { isListening, transcript };
};

export default useVoiceCommands;
