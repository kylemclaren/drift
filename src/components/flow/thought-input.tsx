import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mic01Icon, StopIcon } from "@hugeicons/core-free-icons";

interface ThoughtInputProps {
  onSubmit: (content: string) => void;
}

type SpeechRecognition = typeof window.SpeechRecognition;

export function ThoughtInput({ onSubmit }: ThoughtInputProps) {
  const [value, setValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<InstanceType<SpeechRecognition> | null>(null);
  const baseValueRef = useRef("");

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  const startListening = useCallback(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    // Store the current value as the base before we start appending
    baseValueRef.current = value;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    let finalTranscript = "";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      const base = baseValueRef.current;
      const separator = base && !base.endsWith(" ") ? " " : "";
      setValue(base + separator + finalTranscript + interimTranscript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      stopListening();
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [stopListening, value]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        onSubmit(value);
        setValue("");
      }
    }
  };

  return (
    <div className="relative">
      <div className="flex items-start gap-2">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What's on your mind?"
          className="flex-1 bg-transparent border-none outline-none resize-none text-foreground placeholder:text-muted-foreground text-base leading-relaxed py-2 min-h-[40px] focus:ring-0"
          rows={1}
        />
        <Button
          variant="ghost"
          size="icon"
          className={`shrink-0 hover:bg-transparent ${
            isListening
              ? "text-red-500 hover:text-red-600"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label={isListening ? "Stop recording" : "Write by voice"}
          onClick={toggleListening}
        >
          <HugeiconsIcon
            icon={isListening ? StopIcon : Mic01Icon}
            size={20}
            strokeWidth={2}
          />
        </Button>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="h-px bg-border flex-1" />
        {value.trim() && (
          <span className="text-xs text-muted-foreground ml-3 flex items-center gap-1.5">
            <Kbd>↵</Kbd>
            <span>to capture</span>
          </span>
        )}
      </div>
    </div>
  );
}
