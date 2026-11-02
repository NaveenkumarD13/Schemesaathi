import type {
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import type { EligibilityFormData } from "../types/eligibility";
import { states } from "../data/states";

interface PersonalDetailsStepProps {
  register: UseFormRegister<EligibilityFormData>;
  errors: FieldErrors<EligibilityFormData>;
}

const PersonalDetails = ({
  register,
  errors,
}: PersonalDetailsStepProps) => {
  return (
    <div className="space-y-6">

      <div>

        <h2 className="text-3xl font-bold text-slate-900">
          Personal Information
        </h2>

        <p className="mt-2 text-slate-600">
          Tell us a little about yourself.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Full Name */}

        <div>

          <label className="mb-2 block font-medium text-slate-700">
            Full Name
          </label>

          <input
            type="text"
            {...register("fullName")}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
            placeholder="Enter your full name"
          />

          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.fullName.message}
            </p>
          )}

        </div>

        {/* Age */}

        <div>

          <label className="mb-2 block font-medium text-slate-700">
            Age
          </label>

       <input
  type="text"
  inputMode="numeric"
  {...register("age", {
    valueAsNumber: true,
  })}
  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
  placeholder="Enter your age"
/>

          {errors.age && (
            <p className="mt-1 text-sm text-red-500">
              {errors.age.message}
            </p>
          )}

        </div>

        {/* Gender */}

        <div>

          <label className="mb-2 block font-medium text-slate-700">
            Gender
          </label>

          <select
            {...register("gender")}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          {errors.gender && (
            <p className="mt-1 text-sm text-red-500">
              {errors.gender.message}
            </p>
          )}

        </div>

        {/* State */}

        <div>

          <label className="mb-2 block font-medium text-slate-700">
            State
          </label>

          <select
            {...register("state")}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
          >
            <option value="">Select State</option>

            {states.map((state) => (
              <option
                key={state}
                value={state}
              >
                {state}
              </option>
            ))}

          </select>

          {errors.state && (
            <p className="mt-1 text-sm text-red-500">
              {errors.state.message}
            </p>
          )}

        </div>

      </div>

      {/* District */}

      <div>

        <label className="mb-2 block font-medium text-slate-700">
          District
        </label>

        <input
          type="text"
          {...register("district")}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
          placeholder="Enter your district"
        />

        {errors.district && (
          <p className="mt-1 text-sm text-red-500">
            {errors.district.message}
          </p>
        )}

      </div>

    </div>
  );
};

export default PersonalDetails;