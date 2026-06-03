import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = { title: "Sign in · Planet Metrics" };

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Sign in to Planet Metrics"
      description="Track every subscription, every renewal, every dollar — in one place."
    >
      <LoginForm />
    </AuthShell>
  );
}
