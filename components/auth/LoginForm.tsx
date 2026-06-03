"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import * as z from "zod";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().optional(),
});

type Values = z.infer<typeof schema>;

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", remember: true },
  });

  const onSubmit = async (data: Values) => {
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Signed in", { description: data.email });
    router.push("/dashboard");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <SocialButton />

      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#9CA3AF]">
        <span className="h-px flex-1 bg-[#ECEEF2]" />
        or continue with email
        <span className="h-px flex-1 bg-[#ECEEF2]" />
      </div>

      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs text-[#6B7280]">
              Work email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
              className="h-10"
              aria-invalid={fieldState.invalid}
              {...field}
            />
            {fieldState.error && (
              <p className="text-xs text-[#DC2626]">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-xs text-[#6B7280]">
                Password
              </Label>
              <a
                href="/forgot-password"
                className="text-xs text-[#6B7280] transition hover:text-[#0F172A]"
              >
                Forgot?
              </a>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                className="h-10 pr-10"
                aria-invalid={fieldState.invalid}
                {...field}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#6B7280] transition hover:text-[#0F172A]"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {fieldState.error && (
              <p className="text-xs text-[#DC2626]">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        name="remember"
        control={form.control}
        render={({ field }) => (
          <label className="flex select-none items-center gap-2 text-xs text-[#6B7280]">
            <input
              type="checkbox"
              checked={!!field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-[#D1D5DB] accent-[#0F172A]"
            />
            Keep me signed in on this device
          </label>
        )}
      />

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="h-10 w-full rounded-lg bg-[#0F172A] text-white hover:bg-[#1F2937]"
      >
        {form.formState.isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Sign in
            <ArrowRight className="ml-1 h-4 w-4" />
          </>
        )}
      </Button>

      <p className="text-center text-xs text-[#6B7280]">
        New to Planet Metrics?{" "}
        <a href="/signup" className="font-medium text-[#0F172A] hover:underline">
          Create an account
        </a>
      </p>
    </form>
  );
}

function SocialButton() {
  return (
    <button
      type="button"
      className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#E5E7EB] bg-white text-sm font-medium text-[#0F172A] transition hover:bg-[#F6F7F9]"
      onClick={() => toast("Google sign-in is a demo")}
    >
      <GoogleIcon />
      Continue with Google
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.6 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1S8.7 6 12 6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.6 14.6 2.7 12 2.7 6.9 2.7 2.7 6.9 2.7 12S6.9 21.3 12 21.3c6.9 0 9.2-4.8 9.2-7.3 0-.5-.1-.9-.1-1.3H12z" />
    </svg>
  );
}

export default LoginForm;
