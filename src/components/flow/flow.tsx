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

  // Group thoughts by date
  const groupedThoughts = thoughts.reduce(
    (acc, thought) => {
      const date = new Date(thought.createdAt);
      date.setHours(0, 0, 0, 0);
      const dateKey = date.toISOString().split('T')[0];

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(thought);
      return acc;
    },
    {} as Record<string, typeof thoughts>
  );

  // Sort dates in descending order (newest first)
  const sortedDates = Object.keys(groupedThoughts).sort().reverse();

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

      <main className="pt-24 sm:pt-32 pb-24 px-4 sm:px-6">
        <div className="w-full max-w-2xl mx-auto">
          {isOnboarding ? (
            <Onboarding onComplete={completeOnboarding} />
          ) : (
            <>
              <ThoughtInput onSubmit={addThought} />
              <div className="mt-8 space-y-8">
                {sortedDates.map((dateKey) => {
                  const date = new Date(dateKey);
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const isToday = date.getTime() === today.getTime();

                  const dateLabel = isToday
                    ? 'Today'
                    : date.toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                      });

                  return (
                    <div key={dateKey}>
                      <h2 className="text-2xl font-semibold text-foreground mb-4">
                        {dateLabel}
                      </h2>
                      <div className="space-y-2">
                        {groupedThoughts[dateKey].map((thought) => (
                          <ThoughtItem
                            key={thought.id}
                            thought={thought}
                            onUpdate={updateThought}
                            onDelete={deleteThought}
                            isHighlighted={thought.id === highlightedThoughtId}
                            searchQuery={searchQuery}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
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
