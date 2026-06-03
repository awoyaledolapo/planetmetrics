"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import * as z from "zod";
import { ArrowRight, Eye, EyeOff, Loader2, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().min(2, "Tell us your name"),
  email: z.string().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "At least 8 characters")
    .regex(/[A-Z]/, "Add an uppercase letter")
    .regex(/[0-9]/, "Add a number"),
  terms: z.boolean().refine((v) => v === true, { message: "Accept the terms" }),
});

type Values = z.infer<typeof schema>;

export function SignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "", terms: false },
    mode: "onBlur",
  });

  const password = form.watch("password") ?? "";
  const strength = scorePassword(password);

  const onSubmit = async (data: Values) => {
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Account created", { description: data.email });
    router.push("/dashboard");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <Controller
        name="name"
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs text-[#6B7280]">
              Full name
            </Label>
            <Input
              id="name"
              placeholder="Ada Lovelace"
              autoComplete="name"
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
            <Label htmlFor="password" className="text-xs text-[#6B7280]">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 8 characters"
                autoComplete="new-password"
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
            <PasswordStrength score={strength} />
            {fieldState.error && (
              <p className="text-xs text-[#DC2626]">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        name="terms"
        control={form.control}
        render={({ field, fieldState }) => (
          <div>
            <label className="flex select-none items-start gap-2 text-xs text-[#6B7280]">
              <input
                type="checkbox"
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                className="mt-0.5 h-3.5 w-3.5 rounded border-[#D1D5DB] accent-[#0F172A]"
              />
              <span>
                I agree to the{" "}
                <a href="#" className="text-[#0F172A] underline-offset-2 hover:underline">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#0F172A] underline-offset-2 hover:underline">
                  Privacy Policy
                </a>
                .
              </span>
            </label>
            {fieldState.error && (
              <p className="mt-1 text-xs text-[#DC2626]">{fieldState.error.message}</p>
            )}
          </div>
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
            Create account
            <ArrowRight className="ml-1 h-4 w-4" />
          </>
        )}
      </Button>

      <p className="text-center text-xs text-[#6B7280]">
        Already have an account?{" "}
        <a href="/login" className="font-medium text-[#0F172A] hover:underline">
          Sign in
        </a>
      </p>
    </form>
  );
}

function scorePassword(p: string) {
  let s = 0;
  if (p.length >= 8) s++;
  if (/[A-Z]/.test(p)) s++;
  if (/[0-9]/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s; // 0..4
}

function PasswordStrength({ score }: { score: number }) {
  const labels = ["Too weak", "Weak", "Okay", "Strong", "Excellent"];
  const colors = [
    "bg-[#DC2626]",
    "bg-[#DC2626]",
    "bg-[#D97706]",
    "bg-[#16A34A]",
    "bg-[#16A34A]",
  ];
  return (
    <div className="space-y-1 pt-1">
      <div className="grid grid-cols-4 gap-1">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`h-1 rounded-full transition-colors ${
              i < score ? colors[score] : "bg-[#E5E7EB]"
            }`}
          />
        ))}
      </div>
      <p className="flex items-center gap-1.5 text-[11px] text-[#6B7280]">
        {score >= 3 && <Check size={11} className="text-[#16A34A]" />}
        {labels[score]}
      </p>
    </div>
  );
}

export default SignUpForm;
