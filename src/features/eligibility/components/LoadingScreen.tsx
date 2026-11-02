import { motion } from "framer-motion";
import {
  Bot,
  LoaderCircle,
  CheckCircle2,
} from "lucide-react";

const loadingSteps = [
  "Reading your profile...",
  "Checking eligibility criteria...",
  "Matching Central Government schemes...",
  "Matching State Government schemes...",
  "Preparing your personalized recommendations...",
];

const LoadingScreen = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
        }}
        className="w-full max-w-2xl rounded-3xl border border-green-100 bg-white p-10 shadow-2xl"
      >

        {/* AI Icon */}

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100"
        >

          <Bot
            size={40}
            className="text-green-600"
          />

        </motion.div>

        {/* Heading */}

        <h2 className="text-center text-3xl font-bold text-slate-900">
          SchemeSaathi AI
        </h2>

        <p className="mt-3 text-center text-slate-600">
          Analyzing your profile and finding the best government
          schemes for you...
        </p>

        {/* Loading Animation */}

        <div className="mt-8 flex justify-center">

          <LoaderCircle
            size={38}
            className="animate-spin text-green-600"
          />

        </div>

        {/* Progress Steps */}

        <div className="mt-10 space-y-4">

          {loadingSteps.map((step, index) => (

            <motion.div
              key={step}
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.5,
              }}
              className="flex items-center gap-3 rounded-xl bg-green-50 p-4"
            >

              <CheckCircle2
                size={22}
                className="text-green-600"
              />

              <span className="text-slate-700">
                {step}
              </span>

            </motion.div>

          ))}

        </div>

        {/* Footer */}

        <motion.p
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="mt-10 text-center text-sm text-slate-500"
        >

          This usually takes only a few seconds...

        </motion.p>

      </motion.div>

    </div>
  );
};

export default LoadingScreen;