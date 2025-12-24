import { useState, useEffect, useCallback } from "react";
import type { Thought } from "./types";

const STORAGE_KEY = "flow-thoughts";
const ONBOARDING_KEY = "flow-onboarding-complete";
const THEME_KEY = "flow-theme";

function generateId() {
  return Math.random().toString(36).substring(2, 15);
}

export function useFlowStore() {
  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [isOnboarding, setIsOnboarding] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isBlurred, setIsBlurred] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);

  // Load from localStorage on mount
  useEffect(() => {
    const savedThoughts = localStorage.getItem(STORAGE_KEY);
    const savedOnboarding = localStorage.getItem(ONBOARDING_KEY);
    const savedTheme = localStorage.getItem(THEME_KEY) as "light" | "dark" | null;

    if (savedThoughts) {
      setThoughts(JSON.parse(savedThoughts));
    }
    if (savedOnboarding === "true") {
      setIsOnboarding(false);
    }
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  // Save thoughts to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(thoughts));
  }, [thoughts]);

  const addThought = useCallback((content: string) => {
    if (!content.trim()) return;
    const newThought: Thought = {
      id: generateId(),
      content: content.trim(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setThoughts((prev) => [newThought, ...prev]);
  }, []);

  const updateThought = useCallback((id: string, content: string) => {
    setThoughts((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, content, updatedAt: Date.now() } : t
      )
    );
  }, []);

  const deleteThought = useCallback((id: string) => {
    setThoughts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const clearThoughts = useCallback(() => {
    setThoughts([]);
  }, []);

  const completeOnboarding = useCallback(() => {
    setIsOnboarding(false);
    localStorage.setItem(ONBOARDING_KEY, "true");
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const toggleBlur = useCallback(() => {
    setIsBlurred((prev) => !prev);
  }, []);

  const toggleSearch = useCallback(() => {
    setIsSearchOpen((prev) => !prev);
    if (isSearchOpen) {
      setSearchQuery("");
      setCurrentSearchIndex(0);
    }
  }, [isSearchOpen]);

  const searchResults = thoughts.filter((t) =>
    t.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const nextSearchResult = useCallback(() => {
    if (searchResults.length > 0) {
      setCurrentSearchIndex((prev) => (prev + 1) % searchResults.length);
    }
  }, [searchResults.length]);

  const prevSearchResult = useCallback(() => {
    if (searchResults.length > 0) {
      setCurrentSearchIndex((prev) =>
        prev === 0 ? searchResults.length - 1 : prev - 1
      );
    }
  }, [searchResults.length]);

  return {
    thoughts,
    isOnboarding,
    theme,
    isBlurred,
    isSearchOpen,
    searchQuery,
    currentSearchIndex,
    searchResults,
    addThought,
    updateThought,
    deleteThought,
    clearThoughts,
    completeOnboarding,
    toggleTheme,
    toggleBlur,
    toggleSearch,
    setSearchQuery,
    nextSearchResult,
    prevSearchResult,
  };
}
