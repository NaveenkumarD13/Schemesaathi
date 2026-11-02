
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleHelp,
  GraduationCap,
  MapPin,
  User,
  Wallet,
  House,
} from "lucide-react";

import type {
  EligibilityFormData,
  HouseOwnershipAnswer,
} from "../features/eligibility/types/eligibility";

import { states } from "../features/eligibility/data/states";
import { occupations } from "../features/eligibility/data/occupations";
import { educationLevels } from "../features/eligibility/data/educationLevels";
import { categories } from "../features/eligibility/data/categories";

const ELIGIBILITY_STORAGE_KEY = "eligibilityData";

const EligibilityPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<EligibilityFormData>({
    fullName: "",
    age: 18,
    gender: "",
    state: "",
    district: "",
    occupation: "",
    annualIncome: 0,
    category: "",
    disability: false,
    minority: false,
    bplCard: false,
   education: "",
studyStatus: "completed",
puccaHouseOwnership: "not_sure",
  });

  const updateField = (
    field: keyof EligibilityFormData,
    value: string | number | boolean
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
  };

  const validateStep = (): boolean => {
    setError("");

    if (step === 1) {
      if (!formData.fullName.trim()) {
        setError("Please enter your full name.");
        return false;
      }

      if (formData.fullName.trim().length < 3) {
        setError("Full name must be at least 3 characters.");
        return false;
      }

      if (
        !Number.isFinite(formData.age) ||
        formData.age < 0 ||
        formData.age > 120
      ) {
        setError("Please enter a valid age.");
        return false;
      }

      if (!formData.gender) {
        setError("Please select your gender.");
        return false;
      }

      if (!formData.state) {
        setError("Please select your state.");
        return false;
      }

      if (!formData.district.trim()) {
        setError("Please enter your district.");
        return false;
      }
    }

    if (step === 2) {
      if (!formData.occupation) {
        setError("Please select your occupation.");
        return false;
      }

      if (!formData.education) {
        setError("Please select your highest education level.");
        return false;
      }

      if (
        !Number.isFinite(formData.annualIncome) ||
        formData.annualIncome < 0
      ) {
        setError("Please enter a valid annual family income.");
        return false;
      }

      if (!formData.category) {
        setError("Please select your social category.");
        return false;
      }
    }

    return true;
  };

  const nextStep = () => {
    if (!validateStep()) return;

    if (step < 3) {
      setStep((previous) => previous + 1);
    }
  };

  const previousStep = () => {
    setError("");

    if (step > 1) {
      setStep((previous) => previous - 1);
    }
  };

  const handleSubmit = () => {
    if (!validateStep()) return;

    const cleanedData: EligibilityFormData = {
      ...formData,
      fullName: formData.fullName.trim(),
      district: formData.district.trim(),
      age: Number(formData.age),
      annualIncome: Number(formData.annualIncome),
      puccaHouseOwnership:
        formData.puccaHouseOwnership ?? "not_sure",
    };

    localStorage.setItem(
      ELIGIBILITY_STORAGE_KEY,
      JSON.stringify(cleanedData)
    );

    navigate("/schemes");
  };

  const steps = [
    { number: 1, title: "Personal", icon: User },
    { number: 2, title: "Background", icon: GraduationCap },
    { number: 3, title: "Eligibility", icon: Check },
  ];

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100";

  const houseOptions: {
    value: HouseOwnershipAnswer;
    label: string;
  }[] = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
    { value: "not_sure", label: "Not sure" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            <CircleHelp size={17} />
            Smart Eligibility Checker
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Find schemes made for you
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Tell us a little about yourself. SchemeSaathi will
            analyze your profile and find government schemes
            that may be relevant to you.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            {steps.map((item, index) => {
              const Icon = item.icon;
              const active = step >= item.number;

              return (
                <div
                  key={item.number}
                  className="flex flex-1 items-center"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        active
                          ? "bg-green-600 text-white"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {step > item.number ? (
                        <Check size={18} />
                      ) : (
                        <Icon size={18} />
                      )}
                    </div>

                    <div className="hidden sm:block">
                      <p
                        className={`text-sm font-semibold ${
                          active
                            ? "text-slate-900"
                            : "text-slate-400"
                        }`}
                      >
                        Step {item.number}
                      </p>
                      <p className="text-xs text-slate-500">
                        {item.title}
                      </p>
                    </div>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`mx-3 h-px flex-1 ${
                        step > item.number
                          ? "bg-green-600"
                          : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          {/* Step 1: Personal details */}
          {step === 1 && (
            <div className="p-6 sm:p-10">
              <div className="mb-8">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <User size={23} />
                </div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Let's get to know you
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  Start with your basic personal information.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(event) =>
                      updateField("fullName", event.target.value)
                    }
                    placeholder="Enter your full name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Age
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="120"
                    value={formData.age}
                    onChange={(event) =>
                      updateField("age", Number(event.target.value))
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Gender
                  </label>

                  <select
                    value={formData.gender}
                    onChange={(event) =>
                      updateField("gender", event.target.value)
                    }
                    className={inputClass}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <MapPin size={16} />
                    State
                  </label>

                  <select
                    value={formData.state}
                    onChange={(event) =>
                      updateField("state", event.target.value)
                    }
                    className={inputClass}
                  >
                    <option value="">Select state</option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    District
                  </label>

                  <input
                    type="text"
                    value={formData.district}
                    onChange={(event) =>
                      updateField("district", event.target.value)
                    }
                    placeholder="Enter your district"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Background */}
          {step === 2 && (
            <div className="p-6 sm:p-10">
              <div className="mb-8">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <GraduationCap size={23} />
                </div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Your background
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  This helps us identify education, employment
                  and income-based opportunities.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Occupation
                  </label>

                  <select
                    value={formData.occupation}
                    onChange={(event) =>
                      updateField("occupation", event.target.value)
                    }
                    className={inputClass}
                  >
                    <option value="">Select occupation</option>
                    {occupations.map((occupation) => (
                      <option key={occupation} value={occupation}>
                        {occupation}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Highest Education
                  </label>

                  <select
                    value={formData.education}
                    onChange={(event) =>
                      updateField("education", event.target.value)
                    }
                    className={inputClass}
                  >
                    <option value="">Select education</option>
                    {educationLevels.map((education) => (
                      <option key={education} value={education}>
                        {education}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Wallet size={16} />
                    Annual Family Income
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                      ₹
                    </span>

                    <input
                      type="number"
                      min="0"
                      value={formData.annualIncome}
                      onChange={(event) =>
                        updateField(
                          "annualIncome",
                          Number(event.target.value)
                        )
                      }
                      placeholder="Enter annual income"
                      className={`${inputClass} pl-9`}
                    />
                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    Enter the approximate total annual income of your family.
                  </p>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Social Category
                  </label>

                  <select
                    value={formData.category}
                    onChange={(event) =>
                      updateField("category", event.target.value)
                    }
                    className={inputClass}
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Eligibility details */}
          {step === 3 && (
            <div className="p-6 sm:p-10">
              <div className="mb-8">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <Check size={23} />
                </div>

                <h2 className="text-2xl font-bold text-slate-900">
                  A few final questions
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  These details help us identify schemes with specific
                  eligibility requirements.
                </p>
              </div>

              <div className="space-y-5">
                {/* Disability */}
                <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-green-300 hover:bg-green-50">
                  <div>
                    <p className="font-semibold text-slate-900">
                      Are you a person with a disability?
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Helps identify disability-specific schemes.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={formData.disability}
                    onChange={(event) =>
                      updateField("disability", event.target.checked)
                    }
                    className="h-5 w-5 accent-green-600"
                  />
                </label>

                {/* Minority */}
                <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-green-300 hover:bg-green-50">
                  <div>
                    <p className="font-semibold text-slate-900">
                      Do you belong to a minority community?
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Used when a scheme specifically requires this.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={formData.minority}
                    onChange={(event) =>
                      updateField("minority", event.target.checked)
                    }
                    className="h-5 w-5 accent-green-600"
                  />
                </label>

                {/* BPL */}
                <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-green-300 hover:bg-green-50">
                  <div>
                    <p className="font-semibold text-slate-900">
                      Do you have a BPL card?
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Helps identify schemes designed for BPL households.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={formData.bplCard}
                    onChange={(event) =>
                      updateField("bplCard", event.target.checked)
                    }
                    className="h-5 w-5 accent-green-600"
                  />
                </label>

                {/* Pucca house ownership */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                      <House size={20} />
                    </div>

                    <div>
                      <p className="font-semibold text-slate-900">
                        Does your household own a pucca house?
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        A pucca house is a permanent home made with durable
                        materials such as brick and cement. Some housing
                        schemes have specific ownership conditions.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {houseOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border bg-white p-3 transition ${
                          (formData.puccaHouseOwnership ?? "not_sure") ===
                          option.value
                            ? "border-green-500 ring-2 ring-green-100"
                            : "border-slate-200 hover:border-green-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="puccaHouseOwnership"
                          value={option.value}
                          checked={
                            (formData.puccaHouseOwnership ?? "not_sure") ===
                            option.value
                          }
                          onChange={() =>
                            updateField("puccaHouseOwnership", option.value)
                          }
                          className="h-4 w-4 accent-green-600"
                        />

                        <span className="text-sm font-medium text-slate-700">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Privacy note */}
              <div className="mt-8 rounded-2xl border border-green-100 bg-green-50 p-4">
                <p className="text-sm leading-6 text-green-800">
                  <strong>Your information matters.</strong> These details
                  help generate personalized recommendations. Always verify
                  eligibility with the official scheme authority before
                  applying.
                </p>
              </div>
            </div>
          )}

          {/* Validation error */}
          {error && (
            <div className="border-t border-red-100 bg-red-50 px-6 py-4 sm:px-10">
              <p className="text-sm font-medium text-red-700">{error}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-6 py-5 sm:px-10">
            <button
              type="button"
              onClick={previousStep}
              disabled={step === 1}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 font-semibold transition ${
                step === 1
                  ? "cursor-not-allowed text-slate-300"
                  : "text-slate-600 hover:bg-white hover:text-slate-900"
              }`}
            >
              <ArrowLeft size={18} />
              Back
            </button>

            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700"
              >
                Continue
                <ArrowRight size={18} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700"
              >
                Find My Schemes
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          SchemeSaathi provides informational recommendations. Always verify
          eligibility and application details on the official government
          website.
        </p>
      </div>
    </div>
  );
};

export default EligibilityPage;
