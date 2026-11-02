import {
  User,
  Briefcase,
  IndianRupee,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

import type { EligibilityFormData } from "../types/eligibility";

interface ReviewProps {
  data: EligibilityFormData;
}

const Review = ({ data }: ReviewProps) => {
  return (
    <div className="space-y-8">

      {/* Heading */}

      <div>

        <h2 className="text-3xl font-bold text-slate-900">
          Review Your Details
        </h2>

        <p className="mt-2 text-slate-600">
          Please verify your information before checking your eligibility.
        </p>

      </div>

      {/* Details Card */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

        {/* Personal Details */}

        <div className="border-b border-slate-100 p-6">

          <h3 className="mb-5 flex items-center gap-2 text-xl font-semibold text-green-700">

            <User size={22} />

            Personal Details

          </h3>

          <div className="grid gap-4 md:grid-cols-2">

            <InfoRow
              label="Full Name"
              value={data.fullName}
            />

            <InfoRow
              label="Age"
              value={`${data.age} Years`}
            />

            <InfoRow
              label="Gender"
              value={data.gender}
            />

            <InfoRow
              label="State"
              value={data.state}
            />

            <InfoRow
              label="District"
              value={data.district}
            />

          </div>

        </div>

        {/* Occupation */}

        <div className="border-b border-slate-100 p-6">

          <h3 className="mb-5 flex items-center gap-2 text-xl font-semibold text-green-700">

            <Briefcase size={22} />

            Occupation

          </h3>

          <InfoRow
            label="Occupation"
            value={data.occupation}
          />

        </div>

        {/* Income */}

        <div className="border-b border-slate-100 p-6">

          <h3 className="mb-5 flex items-center gap-2 text-xl font-semibold text-green-700">

            <IndianRupee size={22} />

            Income & Category

          </h3>

          <div className="grid gap-4 md:grid-cols-2">

            <InfoRow
              label="Annual Income"
              value={`₹${data.annualIncome.toLocaleString()}`}
            />

            <InfoRow
              label="Category"
              value={data.category}
            />

            <InfoRow
              label="Disability"
              value={data.disability ? "Yes" : "No"}
            />

            <InfoRow
              label="Minority"
              value={data.minority ? "Yes" : "No"}
            />

            <InfoRow
              label="BPL Card"
              value={data.bplCard ? "Yes" : "No"}
            />

          </div>

        </div>

        {/* Education */}

        <div className="p-6">

          <h3 className="mb-5 flex items-center gap-2 text-xl font-semibold text-green-700">

            <GraduationCap size={22} />

            Education

          </h3>

          <InfoRow
            label="Highest Qualification"
            value={data.education}
          />

        </div>

      </div>

      {/* AI Message */}

      <div className="rounded-2xl border border-green-200 bg-green-50 p-5">

        <div className="flex items-start gap-3">

          <ShieldCheck
            size={26}
            className="mt-1 text-green-600"
          />

          <div>

            <h4 className="font-semibold text-green-700">
              AI Eligibility Check
            </h4>

            <p className="mt-1 text-sm leading-6 text-slate-600">
              Once you continue, SchemeSaathi AI will analyze your profile
              and recommend the most suitable Central and State Government
              Schemes based on your eligibility.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow = ({
  label,
  value,
}: InfoRowProps) => (
  <div className="rounded-xl bg-slate-50 p-4">

    <p className="text-sm text-slate-500">
      {label}
    </p>

    <p className="mt-1 font-semibold text-slate-900">
      {value}
    </p>

  </div>
);

export default Review;