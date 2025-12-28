import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { FlowHeader } from "./flow-header";
import { ThoughtInput } from "./thought-input";
import { ThoughtItem } from "./thought-item";
import { SearchBar } from "./search-bar";
import { Onboarding } from "./onboarding";
import { useFlowStore } from "./use-flow-store";
import { Separator } from "@/components/ui/separator";
import { downloadThoughts } from "@/lib/export-utils";
import { isDeleteConfirmationRequired } from "@/lib/env";
import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { HugeiconsIcon } from "@hugeicons/react";
import { MoreVerticalIcon } from "@hugeicons/core-free-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Flow() {
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean
    thoughtId?: string
  }>({ isOpen: false })
  const [clearConfirmation, setClearConfirmation] = useState(false)
  const [resetOnboardingConfirmation, setResetOnboardingConfirmation] = useState(false)
  const requiresConfirmation = isDeleteConfirmationRequired()

  const {
    thoughts,
    isLoaded,
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
    resetOnboarding,
    toggleTheme,
    toggleSearch,
    setSearchQuery,
    nextSearchResult,
    prevSearchResult,
  } = useFlowStore();

  // Group thoughts by date
  const groupedThoughts = thoughts.reduce(
    (acc, thought) => {
      const date = new Date(thought.createdAt);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateKey = `${year}-${month}-${day}`;

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

  // Delete handlers
  const handleDeleteThought = useCallback(
    (id: string) => {
      if (requiresConfirmation) {
        setDeleteConfirmation({ isOpen: true, thoughtId: id })
      } else {
        deleteThought(id)
        toast.success("Thought deleted")
      }
    },
    [requiresConfirmation, deleteThought]
  )

  const confirmDeleteThought = useCallback(() => {
    if (deleteConfirmation.thoughtId) {
      deleteThought(deleteConfirmation.thoughtId)
      setDeleteConfirmation({ isOpen: false })
      toast.success("Thought deleted")
    }
  }, [deleteConfirmation.thoughtId, deleteThought])

  const handleClearThoughts = useCallback(() => {
    if (requiresConfirmation) {
      setClearConfirmation(true)
    } else {
      clearThoughts()
      toast.success("All thoughts cleared")
    }
  }, [requiresConfirmation, clearThoughts])

  const confirmClearThoughts = useCallback(() => {
    clearThoughts()
    setClearConfirmation(false)
    toast.success("All thoughts cleared")
  }, [clearThoughts])

  const handleResetOnboarding = useCallback(() => {
    if (requiresConfirmation) {
      setResetOnboardingConfirmation(true)
    } else {
      resetOnboarding()
      toast.success("Onboarding reset")
    }
  }, [requiresConfirmation, resetOnboarding])

  const confirmResetOnboarding = useCallback(() => {
    resetOnboarding()
    setResetOnboardingConfirmation(false)
    toast.success("Onboarding reset")
  }, [resetOnboarding])

  // Download handlers
  const handleDownloadAll = useCallback(() => {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = String(today.getMonth() + 1).padStart(2, '0');
    const todayDay = String(today.getDate()).padStart(2, '0');
    const filename = `thoughts-archive-${todayYear}-${todayMonth}-${todayDay}.json`;
    downloadThoughts(thoughts, filename);
  }, [thoughts]);

  const handleDownloadDay = useCallback(
    (dateKey: string) => {
      const date = new Date(dateKey);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const filename = `thoughts-${year}-${month}-${day}.json`;
      downloadThoughts(groupedThoughts[dateKey], filename);
    },
    [groupedThoughts]
  );

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

  const highlightedThoughtId =
    searchQuery && searchResults.length > 0
      ? searchResults[currentSearchIndex]?.id
      : null;

  // Show minimal loading state while data loads
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background">
        <main className="pt-24 sm:pt-32 pb-24 px-4 sm:px-6">
          <div className="w-full max-w-2xl mx-auto">
            <div className="space-y-4 animate-pulse">
              <div className="h-24 bg-muted/50 rounded-lg" />
              <div className="h-8 bg-muted/30 rounded w-24" />
              <div className="space-y-2">
                <div className="h-16 bg-muted/30 rounded-lg" />
                <div className="h-16 bg-muted/30 rounded-lg" />
                <div className="h-16 bg-muted/30 rounded-lg" />
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <FlowHeader
        onToggleTheme={toggleTheme}
        onToggleSearch={toggleSearch}
        onClearThoughts={handleClearThoughts}
        onDownloadAll={handleDownloadAll}
        onResetOnboarding={handleResetOnboarding}
        thoughtsCount={thoughts.length}
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
                  const today = new Date();
                  const todayYear = today.getFullYear();
                  const todayMonth = String(today.getMonth() + 1).padStart(2, '0');
                  const todayDay = String(today.getDate()).padStart(2, '0');
                  const todayKey = `${todayYear}-${todayMonth}-${todayDay}`;
                  const isToday = dateKey === todayKey;

                  const date = new Date(dateKey);

                  const dateLabel = isToday
                    ? 'Today'
                    : date.toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                      });

                  return (
                    <div key={dateKey}>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold text-foreground">
                          {dateLabel}
                        </h2>
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            className="focus-visible:border-ring focus-visible:ring-ring/50 rounded-md text-foreground hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 size-8 inline-flex items-center justify-center outline-none focus-visible:ring-[3px]"
                            aria-label={`Options for ${dateLabel}`}
                          >
                            <HugeiconsIcon
                              icon={MoreVerticalIcon}
                              size={18}
                              strokeWidth={2}
                            />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleDownloadDay(dateKey)}
                            >
                              Download Day
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="space-y-2">
                        {groupedThoughts[dateKey].map((thought) => (
                          <ThoughtItem
                            key={thought.id}
                            thought={thought}
                            onUpdate={updateThought}
                            onDelete={handleDeleteThought}
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

      {requiresConfirmation && (
        <>
          <ConfirmationDialog
            isOpen={deleteConfirmation.isOpen}
            title="Delete Thought?"
            description="This thought will be permanently deleted. This action cannot be undone."
            actionLabel="Delete"
            cancelLabel="Cancel"
            variant="destructive"
            onConfirm={confirmDeleteThought}
            onCancel={() => setDeleteConfirmation({ isOpen: false })}
          />
          <ConfirmationDialog
            isOpen={clearConfirmation}
            title="Clear All Thoughts?"
            description="All thoughts will be permanently deleted. This action cannot be undone."
            actionLabel="Clear All"
            cancelLabel="Cancel"
            variant="destructive"
            onConfirm={confirmClearThoughts}
            onCancel={() => setClearConfirmation(false)}
          />
          <ConfirmationDialog
            isOpen={resetOnboardingConfirmation}
            title="Reset Onboarding?"
            description="This will restart the onboarding tutorial. You can complete it again to hide this message."
            actionLabel="Reset"
            cancelLabel="Cancel"
            variant="default"
            onConfirm={confirmResetOnboarding}
            onCancel={() => setResetOnboardingConfirmation(false)}
          />
        </>
      )}
    </div>
  );
}
