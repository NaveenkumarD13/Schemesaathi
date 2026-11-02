import { Link } from "react-router-dom";
import {
  ArrowRight,
  Search,
  Sparkles,
  CheckCircle2,
  Bot,
} from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section id="home"className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-100">

      {/* Background Blur */}

      <div className="absolute -left-24 top-16 h-80 w-80 rounded-full bg-green-300/30 blur-3xl" />

      <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-emerald-300/30 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl flex-col items-center justify-between gap-20 px-6 py-20 lg:flex-row">

        {/* ================= LEFT ================= */}

        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          {/* Badge */}

          <motion.div
            animate={{
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-100 px-4 py-2 text-sm font-medium text-green-700 shadow-sm"
          >
            <Sparkles size={18} />

            AI Powered Government Scheme Assistant
          </motion.div>

          {/* Heading */}

          <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl lg:text-7xl">

            Find the Right{" "}

            <span className="bg-gradient-to-r from-green-600 via-emerald-500 to-green-700 bg-clip-text text-transparent">

              Government Scheme

            </span>

            <br />

            Made For You.

          </h1>

          {/* Description */}

          <p className="mb-8 max-w-xl text-lg leading-8 text-slate-600">

            Discover government schemes that match your profile.
            SchemeSaathi uses AI to check eligibility, recommend
            benefits, and guide you through every step.

          </p>

          {/* Buttons */}

          <div className="mb-10 flex flex-wrap gap-4">

            <Link
              to="/eligibility"
              className="group flex items-center gap-2 rounded-xl bg-green-600 px-6 py-4 font-semibold text-white shadow-lg shadow-green-300 transition-all duration-300 hover:scale-105 hover:bg-green-700 active:scale-95"
            >
              Check Eligibility

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/schemes"
              className="rounded-xl border border-green-600 px-6 py-4 font-semibold text-green-700 transition-all duration-300 hover:scale-105 hover:bg-green-50 active:scale-95"
            >
              Explore Schemes
            </Link>

          </div>

          {/* Search */}

          <div className="flex items-center rounded-2xl border border-slate-200 bg-white p-4 shadow-xl transition-all duration-300 hover:shadow-2xl">

            <Search
              size={22}
              className="mr-3 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search PM Kisan, PMAY, Ayushman Bharat..."
              className="w-full bg-transparent text-slate-700 placeholder:text-slate-400 outline-none"
            />

          </div>

          {/* Stats */}

          <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">

            {[
              ["500+", "Schemes"],
              ["50K+", "Citizens"],
              ["AI", "Powered"],
              ["24/7", "Assistant"],
            ].map(([number, label]) => (

              <motion.div
                key={label}
                whileHover={{
                  y: -6,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="cursor-pointer"
              >

                <h2 className="text-3xl font-bold text-green-600">

                  {number}

                </h2>

                <p className="mt-1 text-slate-600">

                  {label}

                </p>

              </motion.div>

            ))}

          </div>

        </motion.div>
                {/* ================= RIGHT ================= */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{
            opacity: 1,
            x: 0,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { duration: 0.8 },
            x: { duration: 0.8 },
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="relative w-full max-w-md"
        >
          <div className="rounded-3xl border border-white/50 bg-white/70 p-6 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-green-200">

            {/* Header */}

            <div className="mb-6 flex items-center justify-between rounded-2xl bg-green-100 p-4">

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-green-600 p-3 text-white shadow-lg">

                  <Bot size={24} />

                </div>

                <div>

                  <h3 className="font-bold text-green-700">

                    SchemeSaathi AI

                  </h3>

                  <p className="text-xs text-green-600">

                    Online Assistant

                  </p>

                </div>

              </div>

              <CheckCircle2
                size={22}
                className="text-green-600"
              />

            </div>

            {/* Chat Messages */}

            <div className="space-y-4">

              <div className="max-w-[85%] rounded-2xl bg-slate-100 p-3 text-sm text-slate-700 shadow-sm">
                👋 Hello! I can help you find suitable schemes.
              </div>

              <div className="max-w-[85%] rounded-2xl bg-green-100 p-3 text-sm text-slate-700 shadow-sm">
                📍 Which state are you from?
              </div>

              <div className="ml-auto max-w-[75%] rounded-2xl bg-slate-100 p-3 text-sm text-slate-700 shadow-sm">
                Tamil Nadu
              </div>

              <div className="max-w-[85%] rounded-2xl bg-green-100 p-3 text-sm text-slate-700 shadow-sm">
                🎓 What is your occupation?
              </div>

              <div className="ml-auto max-w-[75%] rounded-2xl bg-slate-100 p-3 text-sm text-slate-700 shadow-sm">
                Student
              </div>

              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: [1, 1.02, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="rounded-2xl bg-green-600 p-4 text-sm font-medium text-white shadow-lg"
              >
                🎉 Found 12 matching schemes for you!
              </motion.div>

            </div>

            {/* Button */}

            <button className="mt-6 w-full rounded-xl bg-green-600 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-green-700 active:scale-95">

              View Recommendations

            </button>

          </div>

       

        </motion.div>

      </div>

    </section>
  );
};

export default HeroSection;