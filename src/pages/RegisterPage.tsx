import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    // Full name validation
    const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

    if (!nameRegex.test(formData.name.trim())) {
      setError("Please enter a valid full name using letters only.");
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

    setIsSubmitting(true);

    // Get existing users
    const existingUsers = JSON.parse(
      localStorage.getItem("schemeSaathi_users") || "[]"
    );

    // Check existing email
    const userExists = existingUsers.some(
      (user: { email: string }) =>
        user.email.toLowerCase() === formData.email.trim().toLowerCase()
    );

    if (userExists) {
      setIsSubmitting(false);
      setError("An account with this email already exists.");
      return;
    }

    // Create new user
    const newUser = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };

    // Save registered user
    existingUsers.push(newUser);

    localStorage.setItem(
      "schemeSaathi_users",
      JSON.stringify(existingUsers)
    );

    /*
      IMPORTANT:
      Do NOT save schemeSaathi_currentUser here.
      The user is registered, but NOT logged in yet.
      currentUser will be created after successful login.
    */

    setSuccess(
      "Account created successfully! Redirecting you to login..."
    );

    setIsSubmitting(false);

    // Redirect to Login
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f8faf9] px-4 py-10">
      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Green Glow */}
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-green-500/10 blur-[130px]" />

        {/* Emerald Glow */}
        <div className="absolute -bottom-40 -right-40 h-[550px] w-[550px] rounded-full bg-emerald-500/10 blur-[140px]" />

        {/* Center Green Glow */}
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-600/5 blur-[120px]" />

        {/* Small Green Glow */}
        <div className="absolute right-[15%] top-[20%] h-32 w-32 rounded-full bg-green-400/10 blur-3xl" />
      </div>

      {/* ================= GRID ================= */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(22,163,74,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(22,163,74,0.6) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      {/* ================= MAIN ================= */}

      <div className="relative z-10 w-full max-w-[470px]">
        {/* ================= BRAND ================= */}

        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[20px] border border-green-400/30 bg-gradient-to-br from-green-400/20 via-emerald-500/10 to-green-600/20 shadow-[0_0_40px_rgba(34,197,94,0.12)] backdrop-blur-xl">
            <Sparkles className="h-7 w-7 text-green-600" />
          </div>

          <h1 className="text-2xl font-black tracking-tight text-gray-900">
            Scheme
            <span className="text-green-600">Saathi</span>
          </h1>

          <p className="mt-1.5 text-sm text-gray-500">
            Your intelligent guide to government schemes
          </p>
        </div>

        {/* ================= CARD ================= */}

        <div className="relative overflow-hidden rounded-[30px] border border-gray-200 bg-white p-7 shadow-[0_25px_80px_rgba(0,0,0,0.10)] backdrop-blur-2xl sm:p-9">
          {/* Card Top Glow */}

          <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-green-400/10 blur-[80px]" />

          {/* ================= HEADER ================= */}

          <div className="relative mb-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-50 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-green-600">
              <Sparkles className="h-3 w-3" />
              Get Started
            </div>

            <h2 className="text-[30px] font-bold tracking-tight text-gray-900">
              Create your account
            </h2>

            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Join SchemeSaathi and discover government welfare schemes
              personalized for you.
            </p>
          </div>

          {/* ================= ERROR ================= */}

          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-600 shadow-lg shadow-red-950/5">
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-red-500" />
              <span>{error}</span>
            </div>
          )}

          {/* ================= SUCCESS ================= */}

          {success && (
            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3.5 text-sm text-green-700 shadow-lg shadow-green-950/5">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              <span>{success}</span>
            </div>
          )}

          {/* ================= FORM ================= */}

          <form onSubmit={handleRegister} className="relative space-y-5">
            {/* NAME */}

            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-[11px] font-bold uppercase tracking-[0.13em] text-gray-600"
              >
                Full Name
              </label>

              <div className="group relative">
                <User className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 transition-all duration-200 group-focus-within:text-green-600" />

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  placeholder="Enter your full name"
                  className="h-[52px] w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                />
              </div>
            </div>

            {/* EMAIL */}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-[11px] font-bold uppercase tracking-[0.13em] text-gray-600"
              >
                Email Address
              </label>

              <div className="group relative">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 transition-all duration-200 group-focus-within:text-green-600" />

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  placeholder="name@example.com"
                  className="h-[52px] w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-[11px] font-bold uppercase tracking-[0.13em] text-gray-600"
              >
                Password
              </label>

              <div className="group relative">
                <Lock className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-400 transition-all duration-200 group-focus-within:text-green-600" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  placeholder="Minimum 6 characters"
                  className="h-[52px] w-full rounded-2xl border border-gray-200 bg-gray-50 pl-11 pr-12 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-green-600"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-[18px] w-[18px]" />
                  ) : (
                    <Eye className="h-[18px] w-[18px]" />
                  )}
                </button>
              </div>

              <div className="mt-2 flex items-center gap-1.5 text-[11px] text-gray-400">
                <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
                Your password must contain at least 6 characters.
              </div>
            </div>

            {/* ================= BUTTON ================= */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative mt-2 flex h-[54px] w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-green-600 text-sm font-bold text-white shadow-[0_10px_30px_rgba(22,163,74,0.18)] transition-all duration-300 hover:-translate-y-[2px] hover:bg-green-700 hover:shadow-[0_15px_35px_rgba(22,163,74,0.25)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {/* Button Shine */}

              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Creating Account...
                </>
              ) : (
                <>
                  <span className="relative">Create Secure Account</span>

                  <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* ================= DIVIDER ================= */}

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />

            <span className="text-[10px] font-semibold tracking-[0.15em] text-gray-400">
              ALREADY A MEMBER?
            </span>

            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* ================= LOGIN ================= */}

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-green-600 transition hover:text-green-700 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>

        {/* ================= FOOTER ================= */}

        <p className="mt-6 text-center text-[11px] text-gray-400">
          © 2026 SchemeSaathi · Empowering citizens with better scheme
          discovery
        </p>
      </div>
    </div>
  );
}