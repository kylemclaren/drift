import { HugeiconsIcon } from "@hugeicons/react";
import { GithubIcon, Menu02Icon } from "@hugeicons/core-free-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Kbd } from "@/components/ui/kbd";

interface FlowHeaderProps {
  onToggleTheme: () => void;
  onToggleSearch: () => void;
  onClearThoughts: () => void;
}

export function FlowHeader({
  onToggleTheme,
  onToggleSearch,
  onClearThoughts,
}: FlowHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-end p-4 sm:p-6">
      <DropdownMenu>
        <DropdownMenuTrigger
          className="focus-visible:border-ring focus-visible:ring-ring/50 rounded-md text-foreground hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 size-9 inline-flex items-center justify-center outline-none focus-visible:ring-[3px]"
          aria-label="Actions"
        >
          <HugeiconsIcon icon={Menu02Icon} size={20} strokeWidth={2} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuItem onClick={onToggleTheme}>
            Toggle Theme
            <Kbd className="ml-auto">T</Kbd>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onToggleSearch}>
            Search Thoughts
            <Kbd className="ml-auto">⌘ F</Kbd>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onClearThoughts}>
            Clear Thoughts
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <a
              href="https://github.com/kylemclaren/drift"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <HugeiconsIcon icon={GithubIcon} size={16} strokeWidth={2} />
              GitHub
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
