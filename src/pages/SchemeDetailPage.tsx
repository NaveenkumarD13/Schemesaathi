
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ExternalLink,
  FileText,
  IndianRupee,
  Landmark,
  Percent,
} from "lucide-react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import type { MatchedScheme } from "../features/eligibility/data/matchSchemes";
import { schemes } from "../features/eligibility/data/schemes";

const SchemeDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  // Scheme data available through navigation, if provided.
  const navigationScheme = location.state?.scheme as
    | MatchedScheme
    | undefined;

  // Find the scheme from its URL ID.
  // This also works when the user opens or refreshes the URL directly.
  const schemeId = id ? Number(id) : undefined;

  const schemeFromData = Number.isInteger(schemeId)
    ? schemes.find((item) => item.id === schemeId)
    : undefined;

  // Prefer the matched scheme when it corresponds to this URL.
  // Otherwise, use the base scheme from schemes.ts.
  const scheme =
    schemeFromData &&
    navigationScheme?.id === schemeFromData.id
      ? navigationScheme
      : schemeFromData ??
        (id === undefined ? navigationScheme : undefined);

  if (!scheme) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xl">
          <Landmark
            size={44}
            className="mx-auto mb-5 text-slate-400"
          />

          <h1 className="text-3xl font-bold text-slate-900">
            Scheme Not Found
          </h1>

          <p className="mt-4 leading-7 text-slate-600">
            We couldn't find this scheme. It may have been removed
            or the URL may be incorrect.
          </p>

          <button
            onClick={() => navigate("/schemes")}
            className="mt-8 rounded-xl bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
          >
            Back to Schemes
          </button>
        </div>
      </div>
    );
  }

  // Directly opened schemes may not have a calculated match score
  // or personalized reasons. Do not invent either one.
  const matchScore =
    typeof scheme.matchScore === "number"
      ? scheme.matchScore
      : undefined;

  const reasons =
    "reasons" in scheme && Array.isArray(scheme.reasons)
      ? scheme.reasons
      : [];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-6xl px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate("/schemes")}
          className="mb-8 flex items-center gap-2 text-green-700 transition hover:text-green-800"
        >
          <ArrowLeft size={20} />
          Back to Schemes
        </button>

        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-white p-8 shadow-xl"
        >
          <div className="flex flex-col justify-between gap-6 lg:flex-row">
            <div className="min-w-0">
              <div className="mb-4 flex flex-wrap gap-3">
                <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                  {scheme.category}
                </span>

                <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                  {scheme.type}
                </span>
              </div>

              <h1 className="break-words text-3xl font-bold text-slate-900 sm:text-4xl">
                {scheme.name}
              </h1>

              <p className="mt-5 leading-8 text-slate-600">
                {scheme.eligibility}
              </p>
            </div>

            <div className="shrink-0 self-start rounded-3xl bg-green-600 p-8 text-center text-white lg:self-center">
              <Percent size={34} className="mx-auto mb-3" />

              <p className="text-sm">
                {matchScore !== undefined
                  ? "Match Score"
                  : "Eligibility"}
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {matchScore !== undefined
                  ? `${matchScore}%`
                  : "Check"}
              </h2>

              {matchScore === undefined && (
                <p className="mt-2 max-w-36 text-sm">
                  Verify your eligibility on the official website.
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Info Grid */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl bg-white p-8 shadow-lg"
          >
            <div className="mb-4 flex items-center gap-3">
              <IndianRupee className="text-green-600" />

              <h2 className="text-2xl font-bold text-slate-900">
                Benefits
              </h2>
            </div>

            <p className="leading-8 text-slate-600">
              {scheme.benefits}
            </p>
          </motion.div>

          {/* Eligibility */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-3xl bg-white p-8 shadow-lg"
          >
            <div className="mb-4 flex items-center gap-3">
              <BadgeCheck className="text-green-600" />

              <h2 className="text-2xl font-bold text-slate-900">
                Eligibility
              </h2>
            </div>

            <p className="leading-8 text-slate-600">
              {scheme.eligibility}
            </p>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              Eligibility depends on the scheme's official rules.
              Please verify all conditions before applying.
            </p>
          </motion.div>
        </div>

        {/* Documents */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 rounded-3xl bg-white p-8 shadow-lg"
        >
          <div className="mb-6 flex items-center gap-3">
            <FileText className="text-green-600" />

            <h2 className="text-2xl font-bold text-slate-900">
              Documents Required
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {scheme.documents.map((document) => (
              <div
                key={document}
                className="flex items-start gap-3 rounded-xl bg-slate-100 p-4"
              >
                <CheckCircle2
                  className="mt-0.5 shrink-0 text-green-600"
                  size={20}
                />

                <span className="text-slate-700">{document}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Why Recommended */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 rounded-3xl bg-white p-8 shadow-lg"
        >
          <div className="mb-6 flex items-center gap-3">
            <Landmark className="text-green-600" />

            <h2 className="text-2xl font-bold text-slate-900">
              Why SchemeSaathi Recommended This
            </h2>
          </div>

          {reasons.length > 0 ? (
            <div className="space-y-4">
              {reasons.map((reason) => (
                <div
                  key={reason}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-green-600"
                  />

                  <span className="text-slate-700">{reason}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="leading-7 text-slate-600">
              Personalized matching details are not available for
              this direct visit. Complete the eligibility form to
              see recommendations based on your profile.
            </p>
          )}
        </motion.div>

        {/* Apply */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 text-center"
        >
          <a
            href={scheme.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-2xl bg-green-600 px-8 py-4 text-lg font-semibold text-white transition hover:bg-green-700"
          >
            Apply on Official Website

            <ExternalLink size={22} />
            <ArrowRight size={20} />
          </a>

          <p className="mt-4 text-sm text-slate-500">
            You will be redirected to an external website. Verify
            the scheme details and eligibility there.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SchemeDetailPage;
