import { useCallback, useEffect, useState } from 'react'
import type { Thought } from './types'
import {
  generateThoughtId,
  getThoughtsCollection,
} from '@/lib/thoughts-collection'
import { applyTheme, getThemeName } from '@/lib/themes'

const ONBOARDING_KEY = 'flow-onboarding-complete'
const THEME_KEY = 'flow-theme'

export function useFlowStore() {
  const [thoughts, setThoughts] = useState<Array<Thought>>([])
  const [isThoughtsLoaded, setIsThoughtsLoaded] = useState(false)
  const [isPrefsLoaded, setIsPrefsLoaded] = useState(false)
  const [isOnboarding, setIsOnboarding] = useState(true)
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [isBlurred, setIsBlurred] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0)

  // Combined loaded state - ready when both thoughts and prefs are loaded
  const isLoaded = isThoughtsLoaded && isPrefsLoaded

  // Subscribe to thoughts collection on client only
  useEffect(() => {
    const collection = getThoughtsCollection()

    // Helper to get sorted thoughts
    const getSortedThoughts = () => {
      const all = collection.toArray
      return all.sort((a, b) => b.createdAt - a.createdAt)
    }

    // Subscribe to changes with includeInitialState to get data once loaded
    const subscription = collection.subscribeChanges(
      () => {
        setThoughts(getSortedThoughts())
        setIsThoughtsLoaded(true)
      },
      { includeInitialState: true }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedOnboarding = localStorage.getItem(ONBOARDING_KEY)
    const savedTheme = localStorage.getItem(THEME_KEY) as
      | 'light'
      | 'dark'
      | null

    if (savedOnboarding === 'true') {
      setIsOnboarding(false)
    }
    if (savedTheme) {
      setTheme(savedTheme)
    }

    // Initialize theme colors
    const themeName = getThemeName()
    const initialTheme = savedTheme || 'dark'
    applyTheme(themeName, initialTheme)

    setIsPrefsLoaded(true)
  }, [])

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem(THEME_KEY, theme)

    // Apply color theme
    const themeName = getThemeName()
    applyTheme(themeName, theme)
  }, [theme])

  const addThought = useCallback((content: string) => {
    if (!content.trim()) return
    const newThought: Thought = {
      id: generateThoughtId(),
      content: content.trim(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    getThoughtsCollection().insert(newThought)
  }, [])

  const updateThought = useCallback((id: string, content: string) => {
    getThoughtsCollection().update(id, (draft) => {
      draft.content = content
      draft.updatedAt = Date.now()
    })
  }, [])

  const deleteThought = useCallback((id: string) => {
    getThoughtsCollection().delete(id)
  }, [])

  const clearThoughts = useCallback(() => {
    const collection = getThoughtsCollection()
    thoughts.forEach((t) => collection.delete(t.id))
  }, [thoughts])

  const completeOnboarding = useCallback(() => {
    setIsOnboarding(false);
    localStorage.setItem(ONBOARDING_KEY, "true");
  }, []);

  const resetOnboarding = useCallback(() => {
    setIsOnboarding(true)
    localStorage.removeItem(ONBOARDING_KEY)
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
    isLoaded,
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
    resetOnboarding,
    toggleTheme,
    toggleBlur,
    toggleSearch,
    setSearchQuery,
    nextSearchResult,
    prevSearchResult,
  };
}
