import { useEffect } from "react";
import { FlowHeader } from "./flow-header";
import { ThoughtInput } from "./thought-input";
import { ThoughtItem } from "./thought-item";
import { SearchBar } from "./search-bar";
import { Onboarding } from "./onboarding";
import { useFlowStore } from "./use-flow-store";
import { Separator } from "@/components/ui/separator";

export function Flow() {
  const {
    thoughts,
    isOnboarding,
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
    toggleSearch,
    setSearchQuery,
    nextSearchResult,
    prevSearchResult,
  } = useFlowStore();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        // Only handle Cmd+F in inputs
        if ((e.metaKey || e.ctrlKey) && e.key === "f") {
          e.preventDefault();
          toggleSearch();
        }
        return;
      }

      if (e.key === "t" || e.key === "T") {
        toggleTheme();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "f") {
        e.preventDefault();
        toggleSearch();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [toggleTheme, toggleSearch]);

  // Get today's date for header
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // Group thoughts by date
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayThoughts = thoughts.filter(
    (t) => t.createdAt >= todayStart.getTime()
  );

  const highlightedThoughtId =
    searchQuery && searchResults.length > 0
      ? searchResults[currentSearchIndex]?.id
      : null;

  return (
    <div className="min-h-screen bg-background">
      <FlowHeader
        onToggleTheme={toggleTheme}
        onToggleSearch={toggleSearch}
        onClearThoughts={clearThoughts}
      />

      <main className="pt-32 pb-24 px-6">
        <div className="w-full max-w-2xl mx-auto">
          {isOnboarding ? (
            <Onboarding onComplete={completeOnboarding} />
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-foreground mb-4">
                Today
              </h2>
              <ThoughtInput onSubmit={addThought} />
              <div className="mt-6 space-y-2">
                {todayThoughts.map((thought) => (
                  <ThoughtItem
                    key={thought.id}
                    thought={thought}
                    onUpdate={updateThought}
                    onDelete={deleteThought}
                    isHighlighted={thought.id === highlightedThoughtId}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <SearchBar
        isOpen={isSearchOpen}
        query={searchQuery}
        onQueryChange={setSearchQuery}
        onClose={toggleSearch}
        onNext={nextSearchResult}
        onPrev={prevSearchResult}
        currentIndex={currentSearchIndex}
        totalResults={searchResults.length}
      />
    </div>
  );
}
