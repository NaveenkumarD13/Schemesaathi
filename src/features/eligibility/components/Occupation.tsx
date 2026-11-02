import { motion } from "framer-motion";
import {
  GraduationCap,
  Tractor,
  Briefcase,
  Building2,
  CircleDollarSign,
  UserRound,
  House,
  UserX,
} from "lucide-react";
import type {
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import type { EligibilityFormData } from "../types/eligibility";
import { occupations as occupationTitles } from "../data/occupations";

interface OccupationProps {
  register: UseFormRegister<EligibilityFormData>;
  errors: FieldErrors<EligibilityFormData>;
}

const occupationDetails = {
  Student: ["Scholarships & Education", GraduationCap],
  Farmer: ["Agriculture & Subsidies", Tractor],
  "Government Employee": ["Public Welfare Benefits", Building2],
  "Private Employee": ["Skill & Housing Schemes", Briefcase],
  "Self Employed": ["Loans & Financial Support", CircleDollarSign],
  "Business Owner": ["MSME & Startup Schemes", Building2],
  Unemployed: ["Employment & Training", UserX],
  "Senior Citizen": ["Pension & Healthcare", UserRound],
  Homemaker: ["Women Empowerment", House],
} as const;

const occupations = occupationTitles.map((title) => ({
  title,
  description: occupationDetails[title][0],
  icon: occupationDetails[title][1],
}));

const Occupation = ({
  register,
  errors,
}: OccupationProps) => {
  return (
    <div className="space-y-8">

      {/* Heading */}

      <div>

        <h2 className="text-3xl font-bold text-slate-900">
          Occupation
        </h2>

        <p className="mt-2 text-slate-600">
          Select the option that best describes you.
        </p>

      </div>

      {/* Occupation Cards */}

      <div className="grid gap-5 md:grid-cols-2">

        {occupations.map((occupation) => {
          const Icon = occupation.icon;

          return (
            <motion.label
              key={occupation.title}
              whileHover={{
                y: -5,
                scale: 1.02,
              }}
              transition={{
                duration: 0.2,
              }}
              className="group cursor-pointer"
            >
              <input
                type="radio"
                value={occupation.title}
                {...register("occupation")}
                className="peer hidden"
              />

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 peer-checked:border-green-600 peer-checked:bg-green-50 peer-checked:shadow-lg hover:border-green-300 hover:shadow-md">

                <div className="mb-4 inline-flex rounded-xl bg-green-100 p-3 text-green-700 transition group-hover:bg-green-600 group-hover:text-white">

                  <Icon size={28} />

                </div>

                <h3 className="text-lg font-semibold text-slate-900">
                  {occupation.title}
                </h3>

                <p className="mt-1 text-sm text-slate-600">
                  {occupation.description}
                </p>

              </div>

            </motion.label>
          );
        })}

      </div>

      {errors.occupation && (
        <p className="text-sm font-medium text-red-500">
          {errors.occupation.message}
        </p>
      )}

    </div>
  );
};

export default Occupation;