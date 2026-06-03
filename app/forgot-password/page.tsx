import AuthShell from "@/components/auth/AuthShell";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata = { title: "Reset your password · Planet Metrics" };

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      eyebrow="Password reset"
      title="Forgot your password?"
      description="Enter the email tied to your account and we'll send a secure reset link."
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
