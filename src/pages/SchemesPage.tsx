import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { matchSchemes } from "../features/eligibility/data/matchSchemes";
import type { MatchedScheme } from "../features/eligibility/data/matchSchemes";
import type { EligibilityFormData } from "../features/eligibility/types/eligibility";

const ELIGIBILITY_STORAGE_KEY = "eligibilityData";

function isValidProfile(value: unknown): value is EligibilityFormData {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    return false;
  }

  const profile = value as Record<string, unknown>;

  return (
    typeof profile.fullName === "string" &&
    profile.fullName.trim().length > 0 &&
    typeof profile.age === "number" &&
    Number.isFinite(profile.age) &&
    profile.age > 0 &&
    profile.age <= 120 &&
    typeof profile.gender === "string" &&
    profile.gender.trim().length > 0 &&
    typeof profile.state === "string" &&
    profile.state.trim().length > 0 &&
    typeof profile.district === "string" &&
    profile.district.trim().length > 0 &&
    typeof profile.annualIncome === "number" &&
    Number.isFinite(profile.annualIncome) &&
    profile.annualIncome >= 0 &&
    typeof profile.occupation === "string" &&
    profile.occupation.trim().length > 0 &&
    typeof profile.education === "string" &&
    profile.education.trim().length > 0 &&
    typeof profile.category === "string" &&
    profile.category.trim().length > 0 &&
    typeof profile.disability === "boolean" &&
    typeof profile.minority === "boolean" &&
    typeof profile.bplCard === "boolean"
  );
}

function isHttpUrl(value: unknown): value is string {
  if (typeof value !== "string" || !value.trim()) {
    return false;
  }

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export default function SchemesPage() {
  const [schemes, setSchemes] = useState<MatchedScheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileAvailable, setProfileAvailable] = useState(false);
  const [profileError, setProfileError] = useState(false);

  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem(
        ELIGIBILITY_STORAGE_KEY
      );

      if (!savedProfile) {
        setProfileAvailable(false);
        return;
      }

      const userData: unknown = JSON.parse(savedProfile);

      if (!isValidProfile(userData)) {
        setProfileError(true);
        return;
      }

      const results = matchSchemes(userData);

      setSchemes(results);
      setProfileAvailable(true);
    } catch (error) {
      console.error("Failed to load eligibility profile:", error);
      setProfileError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16">
        <div
          className="flex flex-col items-center justify-center gap-3 text-center"
          role="status"
          aria-live="polite"
        >
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-green-100 border-t-green-600" />
          <p className="text-sm font-medium text-slate-600">
            Loading your matched schemes...
          </p>
        </div>
      </main>
    );
  }

  if (profileError) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12">
        <section className="rounded-2xl border border-amber-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-2xl">
            !
          </div>

          <h1 className="mb-2 text-2xl font-bold text-slate-900">
            Unable to load your profile
          </h1>

          <p className="mx-auto mb-6 max-w-lg text-sm leading-6 text-slate-600">
            Your saved eligibility information is missing required details
            or could not be read correctly. Please revisit the eligibility
            form and save your details again.
          </p>

          <Link
            to="/eligibility"
            className="inline-flex items-center justify-center rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Update Eligibility Details
          </Link>
        </section>
      </main>
    );
  }

  if (!profileAvailable) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-12">
        <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-8 w-8"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v18m9-9H3"
              />
            </svg>
          </div>

          <h1 className="mb-3 text-2xl font-bold text-slate-900">
            Find Schemes for You
          </h1>

          <p className="mx-auto mb-6 max-w-lg text-sm leading-6 text-slate-600">
            Complete your eligibility profile so SchemeSaathi can identify
            government schemes that may be relevant to your circumstances.
          </p>

          <Link
            to="/eligibility"
            className="inline-flex items-center justify-center rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Check My Eligibility
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-green-700">
          SchemeSaathi
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Government Schemes for You
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
          Explore schemes matched to your saved eligibility profile and
          review their benefits and application details.
        </p>
      </header>

      {schemes.length === 0 ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              className="h-7 w-7"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16 16 4 4"
              />
            </svg>
          </div>

          <h2 className="mb-2 text-xl font-semibold text-slate-900">
            No matching schemes found
          </h2>

          <p className="mx-auto mb-6 max-w-md text-sm leading-6 text-slate-600">
            We couldn't find any matches using your current profile and
            scheme matching rules. You can review your details and try again.
          </p>

          <Link
            to="/eligibility"
            className="inline-flex items-center justify-center rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Review My Profile
          </Link>
        </section>
      ) : (
        <>
          <div className="mb-5 flex items-center justify-between gap-3">
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-slate-900">
                {schemes.length}
              </span>{" "}
              {schemes.length === 1 ? "scheme" : "schemes"} found
            </p>

            <Link
              to="/eligibility"
              className="text-sm font-semibold text-green-700 underline-offset-4 transition hover:text-green-800 hover:underline"
            >
              Update profile
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {schemes.map((scheme) => (
              <article
                key={scheme.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-green-200 hover:shadow-md sm:p-6"
              >
                <div>
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h2 className="text-lg font-bold leading-6 text-slate-900 sm:text-xl">
                      {scheme.name}
                    </h2>

                    <span className="shrink-0 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-800">
                      Potential match
                    </span>
                  </div>

                  <p className="mb-5 text-sm leading-6 text-slate-600">
                    {scheme.benefits}
                  </p>

                  <div className="mb-5 rounded-xl border border-green-100 bg-green-50/60 p-4">
                    <h3 className="mb-2 text-sm font-semibold text-slate-800">
                      Why this scheme matched
                    </h3>

                    {scheme.reasons && scheme.reasons.length > 0 ? (
                      <ul className="space-y-2">
                        {scheme.reasons.map((reason, index) => (
                          <li
                            key={`${scheme.id}-reason-${index}`}
                            className="flex items-start gap-2 text-sm leading-5 text-slate-600"
                          >
                            <span
                              className="mt-1 text-green-700"
                              aria-hidden="true"
                            >
                              ✓
                            </span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm leading-5 text-slate-600">
                        This scheme passed the currently configured demo
                        matching rules. Review the official eligibility
                        requirements before applying.
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-auto border-t border-slate-100 pt-4">
                  <p className="mb-3 text-xs leading-5 text-slate-500">
                    This is an initial indication based on the available
                    matching rules, not a guarantee of eligibility or
                    approval. Verify the official scheme guidelines before
                    applying.
                  </p>

                  {isHttpUrl(scheme.applyLink) ? (
                    <a
                      href={scheme.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      View Application Details
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <p className="rounded-xl bg-slate-100 px-4 py-3 text-center text-sm font-medium text-slate-600">
                      Application link unavailable
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </main>
  );
}