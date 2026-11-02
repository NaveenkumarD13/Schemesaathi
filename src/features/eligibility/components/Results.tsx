import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Landmark,
  IndianRupee,
  ArrowRight,
  Bookmark,
  Percent,
  Check,
  ShieldAlert,
  ClipboardCheck,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import type { MatchedScheme } from "../data/matchSchemes";
import {
  saveScheme,
  getSavedSchemes,
} from "../../savedSchemes/utils/savedSchemes";

interface ResultsProps {
  schemes: MatchedScheme[];
}

const Results = ({ schemes }: ResultsProps) => {
  const navigate = useNavigate();

  const hasResults = schemes.length > 0;

  const [savedSchemeIds, setSavedSchemeIds] = useState<number[]>([]);

  // Load saved schemes when component mounts
  useEffect(() => {
    const saved = getSavedSchemes();
    setSavedSchemeIds(saved.map((scheme) => scheme.id));
  }, []);

  // Save scheme
  const handleSaveScheme = (scheme: MatchedScheme) => {
    const saved = saveScheme(scheme);

    if (saved) {
      toast.success("Scheme saved successfully ❤️");

      setSavedSchemeIds((prev) =>
        prev.includes(scheme.id) ? prev : [...prev, scheme.id]
      );
    } else {
      toast.info("Scheme already saved.");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="mb-6 flex justify-center">
          <div
            className={`rounded-full p-5 ${
              hasResults ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {hasResults ? (
              <CheckCircle2 size={54} className="text-green-600" />
            ) : (
              <XCircle size={54} className="text-red-500" />
            )}
          </div>
        </div>

        <h1 className="text-4xl font-bold text-slate-900">
          {hasResults
            ? "Your Scheme Matches"
            : "No Potential Matches Found"}
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          {hasResults ? (
            <>
              We found{" "}
              <span className="font-semibold text-green-600">
                {schemes.length} potential scheme
                {schemes.length > 1 ? "s" : ""}
              </span>{" "}
              based on your information.
            </>
          ) : (
            "We couldn't find a potential match using the current scheme data and configured criteria."
          )}
        </p>

        {hasResults && (
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">
            These are preliminary matches, not confirmed eligibility decisions.
            Always verify the latest requirements with the official scheme
            authority before applying.
          </p>
        )}
      </motion.div>

      {/* No Results */}
      {!hasResults && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-16 max-w-3xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-lg"
        >
          <div className="mb-5 flex justify-center">
            <div className="rounded-full bg-slate-100 p-4">
              <Info size={42} className="text-slate-600" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            Don't Give Up!
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            This doesn't necessarily mean you are ineligible for every
            government benefit. Our current scheme database and matching rules
            may be incomplete.
          </p>

          <ul className="mt-5 space-y-2 text-left text-slate-600">
            <li>• Review your age, income, occupation and category.</li>
            <li>• Check whether your information was entered correctly.</li>
            <li>• Explore official government scheme portals for other options.</li>
          </ul>

          <button
            type="button"
            onClick={() => navigate("/eligibility")}
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
          >
            Review Eligibility Details
            <ArrowRight size={18} />
          </button>
        </motion.div>
      )}

      {/* Matching Schemes */}
      {hasResults && (
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {schemes.map((scheme, index) => {
            const isSaved = savedSchemeIds.includes(scheme.id);
            const reasons = scheme.reasons ?? [];
            const missingChecks = scheme.missingChecks ?? [];

            return (
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.12 }}
                whileHover={{ y: -5 }}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg transition hover:shadow-xl"
              >
                {/* Scheme Category and Score */}
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      <Landmark size={16} />
                      {scheme.category}
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900">
                      {scheme.name}
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                      {scheme.type} Scheme
                    </p>
                  </div>

                  <div className="shrink-0 rounded-xl bg-green-600 px-3 py-2 text-white">
                    <div className="flex items-center gap-1">
                      <Percent size={16} />
                      <span className="font-semibold">
                        {scheme.matchScore ?? 0}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Verification Status */}
                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <ShieldAlert
                    size={21}
                    className="mt-0.5 shrink-0 text-amber-700"
                  />

                  <div>
                    <h3 className="font-semibold text-amber-900">
                      Potential Match — Verification Required
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-amber-800">
                      This score reflects the configured matching checks. It
                      is not a probability of eligibility or a guarantee of
                      approval.
                    </p>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mt-6 flex items-start gap-3">
                  <IndianRupee
                    size={20}
                    className="mt-1 shrink-0 text-green-600"
                  />

                  <div>
                    <h3 className="font-semibold text-slate-800">
                      Benefits
                    </h3>

                    <p className="mt-1 leading-7 text-slate-600">
                      {scheme.benefits}
                    </p>
                  </div>
                </div>

                {/* Eligibility Information */}
                <div className="mt-5">
                  <h3 className="font-semibold text-slate-800">
                    Eligibility Information
                  </h3>

                  <p className="mt-2 leading-7 text-slate-600">
                    {scheme.eligibility}
                  </p>
                </div>

                {/* Matching Reasons */}
                {reasons.length > 0 && (
                  <div className="mt-6 rounded-2xl border border-green-200 bg-green-50/70 p-5">
                    <h3 className="flex items-center gap-2 font-semibold text-green-900">
                      <CheckCircle2 size={19} />
                      Why This Scheme Matched
                    </h3>

                    <ul className="mt-3 space-y-2">
                      {reasons.map((reason, reasonIndex) => (
                        <li
                          key={`${scheme.id}-reason-${reasonIndex}`}
                          className="flex items-start gap-2 text-sm leading-6 text-green-900"
                        >
                          <Check
                            size={16}
                            className="mt-1 shrink-0"
                          />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Missing Checks */}
                {missingChecks.length > 0 && (
                  <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50/70 p-5">
                    <h3 className="flex items-center gap-2 font-semibold text-amber-900">
                      <ClipboardCheck size={19} />
                      What You Need to Verify
                    </h3>

                    <ul className="mt-3 space-y-2">
                      {missingChecks.map((check, checkIndex) => (
                        <li
                          key={`${scheme.id}-check-${checkIndex}`}
                          className="flex items-start gap-2 text-sm leading-6 text-amber-900"
                        >
                          <span className="mt-0.5">•</span>
                          <span>{check}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Documents */}
                {scheme.documents.length > 0 && (
                  <div className="mt-5">
                    <h3 className="font-semibold text-slate-800">
                      Documents to Check
                    </h3>

                    <ul className="mt-2 space-y-1 text-sm leading-6 text-slate-600">
                      {scheme.documents.map((document, documentIndex) => (
                        <li key={`${scheme.id}-document-${documentIndex}`}>
                          • {document}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      Confirm the final document list on the official portal.
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    disabled={isSaved}
                    onClick={() => handleSaveScheme(scheme)}
                    className={`flex items-center gap-2 rounded-xl px-5 py-3 font-medium transition ${
                      isSaved
                        ? "cursor-not-allowed bg-green-600 text-white"
                        : "border border-green-600 text-green-700 hover:bg-green-50"
                    }`}
                  >
                    {isSaved ? (
                      <>
                        <Check size={18} />
                        Saved
                      </>
                    ) : (
                      <>
                        <Bookmark size={18} />
                        Save Scheme
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/schemes/${scheme.id}`, {
                        state: { scheme },
                      })
                    }
                    className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700"
                  >
                    View Details
                    <ArrowRight size={18} />
                  </button>

                  {scheme.applyLink && (
                    <a
                      href={
                        scheme.applyLink.startsWith("http")
                          ? scheme.applyLink
                          : `https://${scheme.applyLink}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      Official Portal
                      <ArrowRight size={18} />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Footer Note */}
      {hasResults && (
        <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-600">
          <strong className="text-slate-800">Please note:</strong> SchemeSaathi
          provides preliminary guidance based on its current dataset. Scheme
          rules, income limits, documents and application links may change.
          Confirm the current requirements with the relevant official
          government department before applying.
        </div>
      )}
    </div>
  );
};

export default Results;