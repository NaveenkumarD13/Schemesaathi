
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { MatchedScheme } from "../data/matchSchemes";
import type { EligibilityFormData } from "../types/eligibility";

import { eligibilitySchema } from "../schema/eligibiltySchema";
import { matchSchemes } from "../data/matchSchemes";

import ProgressBar from "./ProgressBar";
import PersonalDetails from "./PersonalDetails";
import Occupation from "./Occupation";
import Income from "./Income";
import Education from "./Education";
import Review from "./Review";
import LoadingScreen from "./LoadingScreen";
import Results from "./Results";

const TOTAL_STEPS = 5;

const EligibilityForm = () => {
  // Step Management
  const [currentStep, setCurrentStep] = useState(1);

  // Loading State
  const [loading, setLoading] = useState(false);

  // Matched Schemes
  const [matchedSchemes, setMatchedSchemes] = useState<MatchedScheme[]>([]);

  // Results Screen
  const [showResults, setShowResults] = useState(false);

  // Submit Handler
  const onSubmit = async (data: EligibilityFormData) => {
    console.log("Submit Called");

    setLoading(true);

    try {
      // Simulate processing while the eligibility matcher runs.
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const results = matchSchemes(data);

      setMatchedSchemes(results);
      setShowResults(true);
    } catch (error) {
      console.error("Scheme matching failed:", error);
    } finally {
      setLoading(false);
    }
  };

  // React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<EligibilityFormData>({
    resolver: zodResolver(eligibilitySchema),

    // Validate while typing
    mode: "onChange",

    // Revalidate immediately after fixing an error
    reValidateMode: "onChange",

    defaultValues: {
      fullName: "",
      age: undefined,
      gender: "",
      state: "",
      district: "",

      occupation: "",

      annualIncome: undefined,
      category: "",

      disability: false,
      minority: false,
      bplCard: false,

      education: "",
      studyStatus: undefined,
      puccaHouseOwnership: "not_sure",
    },
  });

  // Form Steps
  const steps = [
    <PersonalDetails
      key="personal-details"
      register={register}
      errors={errors}
    />,

    <Occupation
      key="occupation"
      register={register}
      errors={errors}
    />,

    <Income
      key="income"
      register={register}
      errors={errors}
    />,

    <Education
      key="education"
      register={register}
      errors={errors}
    />,

    <Review
      key="review"
      data={watch()}
    />,
  ];

  // Next Step
  const nextStep = async () => {
    let isValid = false;

    switch (currentStep) {
      case 1:
        isValid = await trigger([
          "fullName",
          "age",
          "gender",
          "state",
          "district",
        ]);
        break;

      case 2:
        isValid = await trigger("occupation");
        break;

      case 3:
        isValid = await trigger([
          "annualIncome",
          "category",
        ]);
        break;

      case 4:
        isValid = await trigger([
          "education",
          "studyStatus",
        ]);
        break;

      default:
        isValid = true;
    }

    console.log("Current Step:", currentStep);

    if (!isValid) return;

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // Previous Step
  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Loading Screen
  if (loading) {
    return <LoadingScreen />;
  }

  // Results Screen
  if (showResults) {
    return <Results schemes={matchedSchemes} />;
  }

  // Render Form
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      {/* Heading */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-slate-900">
          AI Eligibility Checker
        </h1>

        <p className="mt-3 text-slate-600">
          Fill in your details and let SchemeSaathi AI find the
          best government schemes for you.
        </p>
      </div>

      {/* Progress */}
      <ProgressBar
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
      />

      {/* Form */}
      <form
        onSubmit={(event) => {
          if (currentStep < TOTAL_STEPS) {
            event.preventDefault();
            return;
          }

          void handleSubmit(onSubmit)(event);
        }}
        className="mt-10 rounded-3xl bg-white p-8 shadow-xl"
      >
        {steps[currentStep - 1]}

        {/* Navigation */}
        <div className="mt-10 flex items-center justify-between">
          <button
            type="button"
            onClick={previousStep}
            disabled={currentStep === 1}
            className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          {currentStep < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={nextStep}
              className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="rounded-xl bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700"
            >
              Check Eligibility
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EligibilityForm;