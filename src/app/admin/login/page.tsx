"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Lock, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const callbackUrl = search.get("callbackUrl") || "/admin";
  const error = search.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLocalError(null);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (!res || res.error) {
      setLocalError("Invalid credentials. Please try again.");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  };

  const errMsg = localError || (error ? "Authentication failed." : null);

  return (
    <div className="relative grid min-h-screen place-items-center bg-background px-4 py-12 text-foreground">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[10%] h-80 w-80 rounded-full bg-violet-700/15 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[10%] h-80 w-80 rounded-full bg-fuchsia-700/12 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl border border-violet-400/40 bg-violet-500/15 text-violet-200">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight">
            Admin Sign In
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Obasiochie Vincent Chimaobi — Portfolio CMS
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm sm:p-8"
        >
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-border bg-background/60 pl-9"
                  placeholder="admin@obasiochie.dev"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-xs font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-border bg-background/60 pl-9"
                />
              </div>
            </div>

            {errMsg && (
              <div className="rounded-lg border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
                {errMsg}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_28px_-8px_rgba(217,70,239,0.7)]"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </div>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link href="/" className="hover:text-violet-200">
            ← Back to public site
          </Link>
        </p>
      </div>
    </div>
  );
}
