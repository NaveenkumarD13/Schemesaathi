import type {
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import type { EligibilityFormData } from "../types/eligibility";

import { categories } from "../data/categories";

interface IncomeProps {
  register: UseFormRegister<EligibilityFormData>;
  errors: FieldErrors<EligibilityFormData>;
}

const Income = ({
  register,
  errors,
}: IncomeProps) => {
  return (
    <div className="space-y-8">

      {/* Heading */}

      <div>

        <h2 className="text-3xl font-bold text-slate-900">
          Income & Category
        </h2>

        <p className="mt-2 text-slate-600">
          This information helps us identify schemes you are eligible for.
        </p>

      </div>

      {/* Annual Income */}

      <div>

        <label className="mb-2 block font-medium text-slate-700">
          Annual Family Income (₹)
        </label>

      <input
  type="text"
  inputMode="numeric"
  placeholder="Enter annual income"
  {...register("annualIncome", {
    valueAsNumber: true,
  })}
  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
/>

        {errors.annualIncome && (
          <p className="mt-1 text-sm text-red-500">
            {errors.annualIncome.message}
          </p>
        )}

      </div>

      {/* Category */}

      <div>

        <label className="mb-2 block font-medium text-slate-700">
          Category
        </label>

        <select
          {...register("category")}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
        >
          <option value="">
            Select Category
          </option>

          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}

        </select>

        {errors.category && (
          <p className="mt-1 text-sm text-red-500">
            {errors.category.message}
          </p>
        )}

      </div>

      {/* Additional Details */}

      <div className="space-y-4">

<label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4 transition-all duration-300 hover:border-green-500 hover:bg-green-50">
          <span className="font-medium text-slate-700">
            Person with Disability (PwD)
          </span>

          <input
            type="checkbox"
            {...register("disability")}
            className="h-5 w-5 cursor-pointer accent-green-600"
          />

        </label>

<label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4 transition-all duration-300 hover:border-green-500 hover:bg-green-50">
          <span className="font-medium text-slate-700">
            Minority Community
          </span>

          <input
            type="checkbox"
            {...register("minority")}
            className="h-5 w-5 cursor-pointer accent-green-600"
          />

        </label>

<label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 p-4 transition-all duration-300 hover:border-green-500 hover:bg-green-50">
          <span className="font-medium text-slate-700">
            BPL Card Holder
          </span>

          <input
            type="checkbox"
            {...register("bplCard")}
            className="h-5 w-5 cursor-pointer accent-green-600"
          />

        </label>

      </div>

    </div>
  );
};

export default Income;