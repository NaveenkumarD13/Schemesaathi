import { motion } from "framer-motion";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar = ({
  currentStep,
  totalSteps,
}: ProgressBarProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-10">

      {/* Step Info */}

      <div className="mb-3 flex items-center justify-between">

        <p className="text-sm font-medium text-slate-600">
          Step {currentStep} of {totalSteps}
        </p>

        <p className="text-sm font-semibold text-green-600">
          {Math.round(progress)}%
        </p>

      </div>

      {/* Progress Track */}

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">

        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
          }}
        />

      </div>

    </div>
  );
};

export default ProgressBar;