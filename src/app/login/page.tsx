"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button, Input, GlassCard } from "@/components/ui";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  const handleSocialLogin = (provider: string) => {
    signIn(provider, { callbackUrl: "/dashboard" });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-onyx-black overflow-hidden selection:bg-accent-ice/30 selection:text-white">
      {/* Background Animated Dots */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,var(--accent-ice)_0%,transparent_50%)] opacity-[0.03] blur-3xl scale-150 animate-[pulse_10s_ease-in-out_infinite_alternate]" />

      <GlassCard
        variant="ultra"
        className="relative z-10 w-full max-w-md p-10 flex flex-col items-center gap-8 shadow-2xl"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center w-full"
        >
          <h1 className="font-heading text-4xl font-bold tracking-[0.2em] text-ghost-white mb-2 uppercase">
            Onyx
          </h1>
          <p className="text-ash-platinum text-sm tracking-wider uppercase font-medium">
            SMM Yönetim Paneli
          </p>
        </motion.div>

        {error && (
          <div className="w-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl backdrop-blur-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-ash-platinum font-medium ml-1">
              E-posta
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresinizi girin"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-ash-platinum font-medium ml-1 flex justify-between">
              <span>Şifre</span>
              <button
                type="button"
                className="text-ash-platinum hover:text-ghost-white transition-colors hover:underline"
              >
                Şifremi Unuttum
              </button>
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="mt-2 group relative overflow-hidden"
          >
            <span className="relative z-10">
              {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          </Button>
        </form>

        <div className="w-full flex items-center gap-4 py-2">
          <div className="flex-1 h-px bg-glass-medium" />
          <span className="text-xs font-mono text-ash-platinum tracking-wider uppercase">
            Veya
          </span>
          <div className="flex-1 h-px bg-glass-medium" />
        </div>

        <div className="w-full flex gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => handleSocialLogin("google")}
            className="flex-1 border-glass-medium flex items-center justify-center gap-2 hover:bg-glass-ultra"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-sm">Google</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => handleSocialLogin("github")}
            className="flex-1 border-glass-medium flex items-center justify-center gap-2 hover:bg-glass-ultra"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
              />
            </svg>
            <span className="text-sm">GitHub</span>
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}
