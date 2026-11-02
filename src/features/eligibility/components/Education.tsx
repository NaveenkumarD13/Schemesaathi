
import { motion } from "framer-motion";
import {
  GraduationCap,
  School,
  BookOpen,
  University,
  Award,
} from "lucide-react";

import type {
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";

import type { EligibilityFormData } from "../types/eligibility";
import { educationLevels } from "../data/educationLevels";

interface EducationProps {
  register: UseFormRegister<EligibilityFormData>;
  errors: FieldErrors<EligibilityFormData>;
}

const iconMap = {
  "School Student": School,
  "10th Pass": BookOpen,
  "12th Pass": BookOpen,
  Diploma: Award,
  Undergraduate: GraduationCap,
  Graduate: GraduationCap,
  Postgraduate: University,
  "Post Graduate": University,
  Doctorate: University,
  "Not Studying": School,
};

const studyStatusOptions = [
  {
    value: "studying",
    label: "Currently Studying",
    description: "I am currently enrolled in a course.",
  },
  {
    value: "completed",
    label: "Course Completed",
    description:
      "I have completed my course and am not currently studying.",
  },
  {
    value: "planning",
    label: "Planning Further Studies",
    description: "I plan to join another course.",
  },
] as const;

const Education = ({ register, errors }: EducationProps) => {
  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900">
          Education Details
        </h2>

        <p className="mt-2 text-slate-600">
          Select your highest education qualification and current study status.
        </p>
      </div>

      {/* Education Cards */}
      <div className="grid gap-5 md:grid-cols-2">
        {educationLevels.map((level) => {
          const Icon =
            iconMap[level as keyof typeof iconMap] ?? GraduationCap;

          return (
            <motion.label
              key={level}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="group cursor-pointer"
            >
              <input
                type="radio"
                value={level}
                {...register("education")}
                className="peer sr-only"
              />

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-green-300 hover:shadow-md peer-checked:border-green-600 peer-checked:bg-green-50 peer-checked:shadow-lg">
                <div className="mb-4 inline-flex rounded-xl bg-green-100 p-3 text-green-700 transition group-hover:bg-green-600 group-hover:text-white">
                  <Icon size={28} />
                </div>

                <h3 className="text-lg font-semibold text-slate-900">
                  {level}
                </h3>

                <p className="mt-1 text-sm text-slate-600">
                  Select if this is your highest qualification.
                </p>
              </div>
            </motion.label>
          );
        })}
      </div>

      {errors.education && (
        <p className="text-sm font-medium text-red-500">
          {errors.education.message}
        </p>
      )}

      {/* Current Study Status */}
      <div className="space-y-4 border-t border-slate-200 pt-8">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            Current Study Status
          </h3>

          <p className="mt-1 text-sm text-slate-600">
            Tell us whether you are studying now, have completed your course,
            or plan to study again.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {studyStatusOptions.map((option) => (
            <motion.label
              key={option.value}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              className="cursor-pointer"
            >
              <input
                type="radio"
                value={option.value}
                {...register("studyStatus")}
                className="peer sr-only"
              />

              <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-green-300 hover:shadow-md peer-checked:border-green-600 peer-checked:bg-green-50 peer-checked:shadow-md">
                <h4 className="font-semibold text-slate-900">
                  {option.label}
                </h4>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {option.description}
                </p>
              </div>
            </motion.label>
          ))}
        </div>

        {errors.studyStatus && (
          <p className="text-sm font-medium text-red-500">
            {errors.studyStatus.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Education;
