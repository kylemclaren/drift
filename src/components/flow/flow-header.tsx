import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu02Icon } from "@hugeicons/core-free-icons";

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
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-end p-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground hover:bg-transparent"
            aria-label="Actions"
          >
            <HugeiconsIcon icon={Menu02Icon} size={20} strokeWidth={2} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={onToggleTheme}>
            Toggle Theme
            <DropdownMenuShortcut>T</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onToggleSearch}>
            Search Thoughts
            <DropdownMenuShortcut>⌘F</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onClearThoughts}>
            Clear Thoughts
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
