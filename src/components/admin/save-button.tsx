"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Save, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type State = "idle" | "saving" | "saved";

export function SaveButton({
  onSave,
  label = "Save changes",
  savedLabel = "Saved",
  className,
  disabled,
}: {
  onSave: () => Promise<void>;
  label?: string;
  savedLabel?: string;
  className?: string;
  disabled?: boolean;
}) {
  const [state, setState] = useState<State>("idle");

  const handle = async () => {
    setState("saving");
    try {
      await onSave();
      setState("saved");
      setTimeout(() => setState("idle"), 1800);
    } catch (err) {
      setState("idle");
      console.error("[save-button] save failed:", err);
      toast.error(err instanceof Error ? err.message : "Save failed");
    }
  };

  return (
    <Button
      type="button"
      onClick={handle}
      disabled={state === "saving" || disabled}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_28px_-8px_rgba(217,70,239,0.7)] transition-all hover:shadow-[0_0_40px_-6px_rgba(217,70,239,0.9)] disabled:opacity-70",
        className
      )}
    >
      {state === "saving" && (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Saving…
        </>
      )}
      {state === "saved" && (
        <>
          <CheckCircle2 className="h-4 w-4" />
          {savedLabel}
        </>
      )}
      {state === "idle" && (
        <>
          <Save className="h-4 w-4" />
          {label}
        </>
      )}
    </Button>
  );
}
