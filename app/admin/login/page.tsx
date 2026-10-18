"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError("Invalid password. Please try again.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #061B55 0%, #0B2878 60%, #0866E8 100%)" }}
    >
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#0866E8] opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 h-80 w-80 rounded-full bg-[#60A5FA] opacity-15 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md px-4">
        {/* Card */}
        <div className="rounded-3xl bg-white p-8 shadow-2xl sm:p-10">
          {/* Logo mark */}
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#061B55] to-[#0866E8]">
              <span className="text-sm font-extrabold text-white">MHR</span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#94A3B8]">My Hire Roads</p>
              <p className="text-sm font-semibold text-[#061B55]">Admin Dashboard</p>
            </div>
          </div>

          <h1 className="mb-1 text-2xl font-extrabold tracking-tight text-[#061B55]">
            Welcome back
          </h1>
          <p className="mb-8 text-sm text-[#64748B]">
            Sign in to review client submissions and resumes.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#061B55]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-xl border border-[#DCEBFF] bg-[#F8FAFF] px-4 py-3 pr-11 text-sm text-[#061B55] outline-none transition focus:border-[#0866E8] focus:bg-white focus:ring-2 focus:ring-[#0866E8]/20"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] transition hover:text-[#061B55]"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0 1 12 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 0 1 1.563-3.029m5.858.908a3 3 0 1 1 4.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88 6.59 6.59m7.532 7.532 3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0 1 12 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 0 1-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="shrink-0 text-red-500">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0866E8] py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#0B3D91] hover:shadow-lg disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white" />
                  </span>
                  Signing in…
                </span>
              ) : (
                "Sign In →"
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-white/40">
          My Hire Roads · Admin Portal
        </p>
      </div>
    </div>
  );
}
