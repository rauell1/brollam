"use client";

import { useActionState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle, Loader2 } from "lucide-react";
import { login } from "@/lib/actions/admin/auth";
import { idleState } from "@/lib/actions/admin/helpers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="h-11 w-full">
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          Signing In
        </>
      ) : (
        "Sign In"
      )}
    </Button>
  );
}

export function LoginForm({ databaseReady }: { databaseReady: boolean }) {
  const [state, formAction] = useActionState(login, idleState);
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "";
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="next" value={next} />
      {state.error ? (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-sm border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {state.error}
        </div>
      ) : null}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          ref={emailRef}
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={!databaseReady}
          className="mt-2"
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={!databaseReady}
          className="mt-2"
        />
      </div>
      <LoginButton />
    </form>
  );
}
