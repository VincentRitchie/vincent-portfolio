"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Field({
  label,
  htmlFor,
  hint,
  required,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor} className="text-xs font-medium text-foreground">
        {label} {required && <span className="text-fuchsia-400">*</span>}
      </Label>
      {children}
      {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

export const TextField = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string }
>(function TextField({ label, hint, required, className, ...props }, ref) {
  return (
    <Field label={label} htmlFor={props.id} hint={hint} required={required}>
      <Input
        ref={ref}
        className={cn("border-border bg-background/60", className)}
        required={required}
        {...props}
      />
    </Field>
  );
});

export function TextAreaField({
  label,
  hint,
  required,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  hint?: string;
}) {
  return (
    <Field label={label} htmlFor={props.id} hint={hint} required={required}>
      <Textarea
        className={cn("min-h-[120px] resize-y border-border bg-background/60", className)}
        required={required}
        {...props}
      />
    </Field>
  );
}

export function SelectField({
  label,
  hint,
  required,
  value,
  onValueChange,
  options,
  placeholder,
  id,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  value: string;
  onValueChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  id?: string;
}) {
  return (
    <Field label={label} htmlFor={id} hint={hint} required={required}>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id={id} className="border-border bg-background/60">
          <SelectValue placeholder={placeholder ?? "Select…"} />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
}
