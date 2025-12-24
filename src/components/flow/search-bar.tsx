import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUp01Icon,
  ArrowDown01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";

interface SearchBarProps {
  isOpen: boolean;
  query: string;
  onQueryChange: (query: string) => void;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalResults: number;
}

export function SearchBar({
  isOpen,
  query,
  onQueryChange,
  onClose,
  onNext,
  onPrev,
  currentIndex,
  totalResults,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "f") {
        e.preventDefault();
        if (!isOpen) {
          // This will be handled by parent
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-3 z-50">
      <div className="max-w-2xl mx-auto flex items-center gap-2">
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search thoughts..."
          className="flex-1 bg-transparent border-none shadow-none focus-visible:ring-0"
        />
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {totalResults > 0 ? `${currentIndex + 1}/${totalResults}` : "0/0"}
        </span>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onPrev}
          disabled={totalResults === 0}
          aria-label="Previous result"
        >
          <HugeiconsIcon icon={ArrowUp01Icon} size={16} strokeWidth={2} />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onNext}
          disabled={totalResults === 0}
          aria-label="Next result"
        >
          <HugeiconsIcon icon={ArrowDown01Icon} size={16} strokeWidth={2} />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onClose}
          aria-label="Close"
        >
          <HugeiconsIcon icon={Cancel01Icon} size={16} strokeWidth={2} />
        </Button>
        <Kbd className="ml-1">Esc</Kbd>
      </div>
    </div>
  );
}
