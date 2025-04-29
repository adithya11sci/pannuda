
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Contrast, Speaker, Captions, Mic, Monitor } from "lucide-react";

const AccessibilityPanel = () => {
  const { 
    highContrast, 
    toggleHighContrast, 
    textToSpeech, 
    toggleTextToSpeech, 
    captionsEnabled, 
    toggleCaptions, 
    fontSize, 
    setFontSize,
    listening,
    toggleListening
  } = useAccessibility();

  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Accessibility</h3>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant={highContrast ? "default" : "outline"}
          size="sm"
          className="flex items-center gap-1 h-auto py-1"
          onClick={toggleHighContrast}
          aria-pressed={highContrast}
        >
          <Contrast className="h-4 w-4" />
          <span className="sr-only md:not-sr-only md:inline-block">Contrast</span>
        </Button>
        
        <Button
          variant={textToSpeech ? "default" : "outline"}
          size="sm"
          className="flex items-center gap-1 h-auto py-1"
          onClick={toggleTextToSpeech}
          aria-pressed={textToSpeech}
        >
          <Speaker className="h-4 w-4" />
          <span className="sr-only md:not-sr-only md:inline-block">TTS</span>
        </Button>
        
        <Button
          variant={captionsEnabled ? "default" : "outline"}
          size="sm"
          className="flex items-center gap-1 h-auto py-1"
          onClick={toggleCaptions}
          aria-pressed={captionsEnabled}
        >
          <Captions className="h-4 w-4" />
          <span className="sr-only md:not-sr-only md:inline-block">Captions</span>
        </Button>
        
        <Button
          variant={listening ? "default" : "outline"}
          size="sm"
          className="flex items-center gap-1 h-auto py-1"
          onClick={toggleListening}
          aria-pressed={listening}
        >
          <Mic className="h-4 w-4" />
          <span className="sr-only md:not-sr-only md:inline-block">Voice</span>
        </Button>
      </div>
      
      <div className="space-y-2">
        <span className="text-xs text-muted-foreground block">Font Size</span>
        <div className="flex gap-2">
          <Button
            variant={fontSize === "normal" ? "default" : "outline"}
            size="sm"
            onClick={() => setFontSize("normal")}
            aria-pressed={fontSize === "normal"}
            className="flex-1 h-8"
          >
            A
          </Button>
          <Button
            variant={fontSize === "large" ? "default" : "outline"}
            size="sm"
            onClick={() => setFontSize("large")}
            aria-pressed={fontSize === "large"}
            className="flex-1 h-8"
          >
            <span className="text-lg">A</span>
          </Button>
          <Button
            variant={fontSize === "x-large" ? "default" : "outline"}
            size="sm"
            onClick={() => setFontSize("x-large")}
            aria-pressed={fontSize === "x-large"}
            className="flex-1 h-8"
          >
            <span className="text-xl">A</span>
          </Button>
        </div>
      </div>
      
      <div className="text-xs text-center text-muted-foreground">
        <Monitor className="h-3 w-3 inline-block mr-1" />
        ARIA Compliant
      </div>
    </div>
  );
};

export default AccessibilityPanel;
