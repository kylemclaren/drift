import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mic01Icon } from "@hugeicons/core-free-icons";

interface ThoughtInputProps {
  onSubmit: (content: string) => void;
}

export function ThoughtInput({ onSubmit }: ThoughtInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
          className="text-muted-foreground hover:text-foreground hover:bg-transparent shrink-0"
          aria-label="Write by voice"
        >
          <HugeiconsIcon icon={Mic01Icon} size={20} strokeWidth={2} />
        </Button>
      </div>
      <div className="h-px bg-border mt-2" />
    </div>
  );
}
