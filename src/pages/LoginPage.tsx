import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Required fields
    if (!formData.email.trim() || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    // Get registered users
    const existingUsers = JSON.parse(
      localStorage.getItem("schemeSaathi_users") || "[]"
    );

    // Check email and password
    const validUser = existingUsers.find(
      (user: {
        name: string;
        email: string;
        password: string;
      }) =>
        user.email.toLowerCase() === formData.email.trim().toLowerCase() &&
        user.password === formData.password
    );

    if (!validUser) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    // Store currently logged-in user
    localStorage.setItem(
      "schemeSaathi_currentUser",
      JSON.stringify(validUser)
    );

    setIsSubmitting(true);
    setSuccess("Login successful! Redirecting...");

    // Go to homepage
    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f8faf9] px-4 py-10">
      {/* ================= BACKGROUND EFFECTS ================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Green Glow */}
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-green-500/10 blur-[120px]" />

        {/* Emerald Glow */}
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[120px]" />

        {/* Center Green Glow */}
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-600/5 blur-[120px]" />
      </div>

      {/* ================= BACKGROUND GRID ================= */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(22,163,74,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(22,163,74,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ================= MAIN CONTENT ================= */}

      <div className="relative z-10 w-full max-w-md">
        {/* ================= BRAND ================= */}

        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[20px] border border-green-400/30 bg-gradient-to-br from-green-400/20 via-emerald-500/10 to-green-600/20 shadow-xl shadow-green-500/10 backdrop-blur-xl">
            <Sparkles className="h-8 w-8 text-green-600" />
          </div>

          <h1 className="text-3xl font-black tracking-tight text-gray-900">
            Scheme
            <span className="text-green-600">Saathi</span>
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Your guide to government schemes
          </p>
        </div>

        {/* ================= LOGIN CARD ================= */}

        <div className="relative overflow-hidden rounded-[30px] border border-gray-200 bg-white p-7 shadow-2xl shadow-gray-900/10 backdrop-blur-2xl sm:p-8">
          {/* Card Glow */}

          <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-green-400/10 blur-[80px]" />

          {/* ================= HEADER ================= */}

          <div className="relative mb-7">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-green-600">
              <ShieldCheck className="h-3.5 w-3.5" />
              Welcome Back
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Access your personalized scheme recommendations and saved
              schemes.
            </p>
          </div>

          {/* ================= ERROR ================= */}

          {error && (
            <div className="mb-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-600">
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />
              <span>{error}</span>
            </div>
          )}

          {/* ================= SUCCESS ================= */}

          {success && (
            <div className="mb-5 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3.5 text-sm text-green-700">
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-green-600" />
              <span>{success}</span>
            </div>
          )}

          {/* ================= LOGIN FORM ================= */}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* EMAIL */}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-gray-600"
              >
                Email Address
              </label>

              <div className="group relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-green-600" />

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  autoComplete="email"
                  disabled={isSubmitting}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-gray-600"
              >
                Password
              </label>

              <div className="group relative">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-green-600" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-12 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={isSubmitting}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* ================= LOGIN BUTTON ================= */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-green-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-xl hover:shadow-green-500/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {!isSubmitting && (
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              )}

              {isSubmitting ? (
                <>
                  <span className="relative h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  <span className="relative">Signing in...</span>
                </>
              ) : (
                <>
                  <span className="relative">Secure Login</span>

                  <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* ================= DIVIDER ================= */}

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">
              OR
            </span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* ================= REGISTER LINK ================= */}

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-green-600 transition-colors hover:text-green-700 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* ================= FOOTER ================= */}

        <p className="mt-6 text-center text-xs text-gray-400">
          © 2026 SchemeSaathi · Your Guide to Government Schemes
        </p>
      </div>
    </div>
  );
}