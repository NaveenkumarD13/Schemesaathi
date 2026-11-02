import {
  Bot,
  BadgeCheck,
  Search,
  FileText,
  Bell,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Bot,
    title: "AI Scheme Recommendation",
    description:
      "Receive personalized government scheme recommendations based on your profile, occupation, income, and state.",
  },
  {
    icon: BadgeCheck,
    title: "Eligibility Checker",
    description:
      "Instantly verify your eligibility before applying, saving time and avoiding unnecessary applications.",
  },
  {
    icon: Search,
    title: "Smart Search",
    description:
      "Quickly search schemes by category, education, occupation, income level, or state.",
  },
  {
    icon: FileText,
    title: "Complete Scheme Details",
    description:
      "Access benefits, eligibility criteria, required documents, application process, and important dates.",
  },
  {
    icon: Bell,
    title: "Latest Scheme Updates",
    description:
      "Stay informed about newly launched government schemes and important application deadlines.",
  },
  {
    icon: Heart,
    title: "Save Favourite Schemes",
    description:
      "Bookmark schemes you like and access them anytime from your personalized dashboard.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const card = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

const FeaturesSection = () => {
  return (
    <section  id="features" className="relative overflow-hidden bg-gradient-to-b from-white to-green-50 py-24">

      {/* Background Glow */}

      <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-green-200/20 blur-3xl" />

      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-emerald-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

            Why Choose SchemeSaathi?

          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">

            Powerful Features Designed for Every Citizen

          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">

            Discover government schemes faster, verify eligibility,
            understand benefits, and stay updated—all in one place.

          </p>

        </motion.div>

        {/* Cards */}

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                variants={card}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.25 },
                }}
                className="group rounded-3xl border border-green-100 bg-white/80 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-green-300 hover:shadow-2xl"
              >

                {/* Icon */}

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">

                  <Icon size={30} />

                </div>

                {/* Title */}

                <h3 className="mb-4 text-2xl font-semibold text-slate-900">

                  {feature.title}

                </h3>

                {/* Description */}

                <p className="leading-7 text-slate-600">

                  {feature.description}

                </p>

                {/* Learn More */}

                <button className="mt-6 font-semibold text-green-600 transition group-hover:translate-x-1">

                  Learn More →

                </button>

              </motion.div>
            );
          })}

        </motion.div>

      </div>

    </section>
  );
};

export default FeaturesSection;