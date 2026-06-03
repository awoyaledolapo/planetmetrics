import AuthShell from "@/components/auth/AuthShell";
import SignUpForm from "@/components/auth/SignUpForm";

export const metadata = { title: "Create your account · Planet Metrics" };

export default function SignUpPage() {
  return (
    <AuthShell
      eyebrow="Create account"
      title="Get started in seconds"
      description="No credit card required. Cancel anytime during your 14-day trial."
    >
      <SignUpForm />
    </AuthShell>
  );
}
