import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { Separator } from "@/components/ui/separator";

interface OnboardingProps {
  onComplete: () => void;
}

const onboardingMessages = [
  { content: "Welcome to Flow.", delay: 0 },
  { content: "Clear your mind through raw, unfiltered writing.", delay: 2 },
  { content: "Thoughts will fade into the background to make space for new ones.", delay: 4 },
  { content: "Feel free to alter your thoughts within 5 minutes, after which you can leave them to rest.", delay: 6 },
  { content: "Don't worry. You can always come back to read your thought process.", delay: 8 },
];

export function Onboarding({ onComplete }: OnboardingProps) {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold text-foreground mb-4">Onboarding</h2>
      <Separator className="mb-6" />
      <div className="space-y-4">
        {onboardingMessages.map((message, index) => (
          <div
            key={index}
            className="animate-in fade-in slide-in-from-bottom-2 duration-500"
            style={{
              animationDelay: `${message.delay * 100}ms`,
              opacity: 1 - index * 0.12,
            }}
          >
            <p className="text-foreground text-base leading-relaxed">
              {message.content}
            </p>
            <span className="text-xs text-muted-foreground mt-1 block">
              {(index + 1) * 2}s ago
            </span>
          </div>
        ))}
      </div>
      <Button
        variant="ghost"
        onClick={onComplete}
        className="mt-8 text-muted-foreground hover:text-foreground px-0 hover:bg-transparent"
      >
        <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={2} />
      </Button>
    </div>
  );
}
