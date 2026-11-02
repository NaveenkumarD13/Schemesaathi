import {
  Search,
  BadgeCheck,
  FileText,
  CheckCircle,
} from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Search,
    title: "Search Schemes",
    description:
      "Search for government schemes based on your state, category, education, or occupation.",
  },
  {
    icon: BadgeCheck,
    title: "Check Eligibility",
    description:
      "Our AI verifies your eligibility instantly using the information you provide.",
  },
  {
    icon: FileText,
    title: "View Complete Details",
    description:
      "Read benefits, required documents, eligibility criteria, and application process.",
  },
  {
    icon: CheckCircle,
    title: "Apply with Confidence",
    description:
      "Proceed with your application knowing you've found the right scheme for you.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="bg-white py-24">

      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-20 max-w-3xl text-center"
        >

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

            Simple Process

          </span>

          <h2 className="mt-6 text-4xl font-bold text-slate-900 md:text-5xl">

            How SchemeSaathi Works

          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">

            Discover the right government schemes in four simple steps.

          </p>

        </motion.div>

        {/* Timeline */}

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (

              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.5,
                }}
                viewport={{ once: true }}
                className="relative rounded-3xl border border-green-100 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >

                {/* Step Number */}

                <div className="absolute -top-5 left-8 flex h-10 w-10 items-center justify-center rounded-full bg-green-600 font-bold text-white shadow-lg">

                  {index + 1}

                </div>

                {/* Icon */}

                <div className="mb-6 mt-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-green-600">

                  <Icon size={30} />

                </div>

                <h3 className="mb-4 text-2xl font-semibold text-slate-900">

                  {step.title}

                </h3>

                <p className="leading-7 text-slate-600">

                  {step.description}

                </p>

              </motion.div>

            );
          })}

        </div>

      </div>

    </section>
  );
};

export default HowItWorksSection;