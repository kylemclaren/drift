import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
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
        <DropdownMenuContent align="end" className="w-52">
          <DropdownMenuItem onClick={onToggleTheme}>
            Toggle Theme
            <Kbd className="ml-auto">T</Kbd>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onToggleSearch}>
            Search Thoughts
            <KbdGroup className="ml-auto">
              <Kbd>⌘</Kbd>
              <Kbd>F</Kbd>
            </KbdGroup>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onClearThoughts}>
            Clear Thoughts
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
