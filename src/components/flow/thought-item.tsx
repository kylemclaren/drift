import { useState, useRef, useEffect, useMemo } from "react";
import type { Thought } from "./types";

interface ThoughtItemProps {
  thought: Thought;
  onUpdate: (id: string, content: string) => void;
  onDelete: (id: string) => void;
  isHighlighted?: boolean;
  searchQuery?: string;
}

function highlightMatches(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)

  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-yellow-400/50 dark:bg-yellow-500/40 text-inherit rounded-sm px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  )
}

function getRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 5) return "";
  if (seconds < 60) return `${seconds}s ago`;
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

function getBlurAmount(timestamp: number): number {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = diff / 1000;

  // Start blurring at 0.5s, reach max blur (3px) at 4 seconds
  if (seconds < 0.5) return 0;
  const blur = Math.min(3, ((seconds - 0.5) / 3.5) * 3);
  return blur;
}

function getOpacity(timestamp: number): number {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = diff / 1000;

  // Fade from 1 to 0.35 over 6 seconds
  if (seconds < 0.5) return 1;
  const opacity = Math.max(0.35, 1 - ((seconds - 0.5) / 5.5) * 0.65);
  return opacity;
}

export function ThoughtItem({
  thought,
  onUpdate,
  onDelete,
  isHighlighted,
  searchQuery = '',
}: ThoughtItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [value, setValue] = useState(thought.content);
  const [relativeTime, setRelativeTime] = useState(getRelativeTime(thought.createdAt));
  const [blurAmount, setBlurAmount] = useState(getBlurAmount(thought.createdAt));
  const [opacity, setOpacity] = useState(getOpacity(thought.createdAt));
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Update relative time and blur every second
  useEffect(() => {
    const interval = setInterval(() => {
      setRelativeTime(getRelativeTime(thought.createdAt));
      setBlurAmount(getBlurAmount(thought.createdAt));
      setOpacity(getOpacity(thought.createdAt));
    }, 1000);
    return () => clearInterval(interval);
  }, [thought.createdAt]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (value.trim() !== thought.content) {
      if (value.trim()) {
        onUpdate(thought.id, value.trim());
      } else {
        onDelete(thought.id);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Backspace" && value === "") {
      onDelete(thought.id);
    }
    if (e.key === "Escape") {
      setValue(thought.content);
      textareaRef.current?.blur();
    }
  };

  const canEdit = useMemo(() => {
    const fiveMinutes = 5 * 60 * 1000;
    return Date.now() - thought.createdAt < fiveMinutes;
  }, [thought.createdAt]);

  const showClear = isHovered || isEditing || isHighlighted;

  return (
    <div
      className="group py-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        opacity: showClear ? 1 : opacity,
        transition: showClear ? 'opacity 0s' : 'opacity 1s ease-out',
      }}
    >
      {searchQuery && !isEditing && (
        <div
          onClick={() => canEdit && textareaRef.current?.focus()}
          style={{
            filter: showClear ? 'blur(0px)' : `blur(${blurAmount}px)`,
            transition: showClear ? 'filter 0s' : 'filter 1s ease-out',
          }}
          className={`w-full text-foreground text-base leading-relaxed whitespace-pre-wrap ${
            isHighlighted ? "bg-accent/20 -mx-2 px-2 rounded" : ""
          } ${canEdit ? "cursor-text" : "cursor-default"}`}
        >
          {highlightMatches(thought.content, searchQuery)}
        </div>
      )}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        readOnly={!canEdit}
        placeholder="Erase with Backspace ⌫"
        style={{
          filter: showClear ? 'blur(0px)' : `blur(${blurAmount}px)`,
          transition: showClear ? 'filter 0s' : 'filter 1s ease-out',
        }}
        className={`w-full bg-transparent border-none outline-none resize-none text-foreground placeholder:text-muted-foreground text-base leading-relaxed focus:ring-0 ${
          isHighlighted ? "bg-accent/20 -mx-2 px-2 rounded" : ""
        } ${!canEdit ? "cursor-default" : ""} ${searchQuery && !isEditing ? "sr-only" : ""}`}
        rows={1}
      />
      {relativeTime && (
        <span
          className="text-xs text-muted-foreground mt-1 block"
          style={{
            filter: showClear ? 'blur(0px)' : `blur(${blurAmount * 0.5}px)`,
            transition: showClear ? 'filter 0s' : 'filter 1s ease-out',
          }}
        >
          {relativeTime}
        </span>
      )}
    </div>
  );
}
