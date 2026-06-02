"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { loginSchema, LoginFormData } from "@/lib/validators";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        setError("Invalid credentials.");
        return;
      }

      router.push("/admin/artifacts");
      router.refresh();
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neo-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-block bg-black px-4 py-2 mb-4">
            <span className="font-black text-white text-xs uppercase tracking-widest">
              Museum Admin
            </span>
          </div>
          <h1 className="font-black text-4xl uppercase tracking-tighter leading-none">
            Staff Access
          </h1>
          <p className="font-bold text-sm text-black/50 mt-2">
            Restricted area. Authorised personnel only.
          </p>
        </div>

        {/* Form card */}
        <div className="border-4 border-black bg-white shadow-neo-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Username"
              type="text"
              autoComplete="username"
              error={errors.username?.message}
              {...register("username")}
            />

            <Input
              label="Password"
              type="password"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register("password")}
            />

            {error && (
              <div className="border-4 border-neo-accent bg-neo-accent/10 p-4">
                <p className="font-black text-sm text-black uppercase tracking-wide">
                  {error}
                </p>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Access Panel"}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-xs font-bold text-black/30 uppercase tracking-wider text-center">
          No public registration. No password recovery.
        </p>
      </div>
    </div>
  );
}
