"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import * as z from "zod";
import { ArrowRight, Loader2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
});

type Values = z.infer<typeof schema>;

export function ForgotPasswordForm() {
  const [sent, setSent] = useState<string | null>(null);
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: Values) => {
    await new Promise((r) => setTimeout(r, 700));
    setSent(data.email);
    toast.success("Reset link sent", { description: data.email });
  };

  if (sent) {
    return (
      <div className="space-y-5 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-[#ECEEF2] bg-[#F6F7F9]">
          <Mail size={18} className="text-[#0F172A]" />
        </div>
        <div className="space-y-1.5">
          <p className="text-sm text-[#0F172A]">Check your inbox</p>
          <p className="text-xs text-[#6B7280]">
            We sent a reset link to <span className="text-[#0F172A]">{sent}</span>. The
            link expires in 30 minutes.
          </p>
        </div>
        <div className="flex flex-col gap-2 text-xs">
          <button
            type="button"
            onClick={() => setSent(null)}
            className="text-[#6B7280] transition hover:text-[#0F172A]"
          >
            Use a different email
          </button>
          <a href="/login" className="text-[#6B7280] transition hover:text-[#0F172A]">
            ← Back to sign in
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs text-[#6B7280]">
              Account email
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

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="h-10 w-full rounded-lg bg-[#0F172A] text-white hover:bg-[#1F2937]"
      >
        {form.formState.isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Send reset link
            <ArrowRight className="ml-1 h-4 w-4" />
          </>
        )}
      </Button>

      <p className="text-center text-xs text-[#6B7280]">
        Remembered it?{" "}
        <a href="/login" className="font-medium text-[#0F172A] hover:underline">
          Back to sign in
        </a>
      </p>
    </form>
  );
}

export default ForgotPasswordForm;
