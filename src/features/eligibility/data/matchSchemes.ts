
import { schemes } from "../data/schemes";
import type { Scheme } from "../data/schemes";
import type { EligibilityFormData } from "../types/eligibility";

export type EligibilityStatus =
  | "potential-match"
  | "needs-verification";

export interface MatchedScheme extends Scheme {
  matchScore: number;
  reasons: string[];
  missingChecks: string[];
  eligibilityStatus: EligibilityStatus;
}

const normalize = (value: unknown): string =>
  String(value ?? "").trim().toLowerCase();

export const matchSchemes = (
  user: EligibilityFormData
): MatchedScheme[] => {
  const userAge = Number(user.age);
  const userIncome = Number(user.annualIncome);

  if (
    !Number.isFinite(userAge) ||
    userAge < 0 ||
    !Number.isFinite(userIncome) ||
    userIncome < 0
  ) {
    return [];
  }

  const userState = normalize(user.state);
  const userOccupation = normalize(user.occupation);
  const userEducation = normalize(user.education);
  const userCategory = normalize(user.category);
  const userStudyStatus = normalize(user.studyStatus);

  const results: MatchedScheme[] = [];

  for (const scheme of schemes) {
    const reasons: string[] = [];
    const missingChecks: string[] = [];

    // Age
    if (userAge < scheme.minAge || userAge > scheme.maxAge) {
      continue;
    }
    reasons.push("Age matches the configured criteria");

    // State
    const schemeState = normalize(scheme.state);

    if (schemeState !== "all") {
      if (!userState) {
        missingChecks.push("Confirm your state");
      } else if (schemeState !== userState) {
        continue;
      } else {
        reasons.push("State matches the configured criteria");
      }
    } else if (userState) {
      reasons.push("State matches the configured criteria");
    } else {
      missingChecks.push("Confirm your state");
    }

    // Income
    if (scheme.incomeLimitApplies !== false) {
      if (userIncome > scheme.maxIncome) {
        continue;
      }
      reasons.push("Income is within the configured limit");
    } else {
      missingChecks.push(
        "Verify whether an income limit applies to this scheme"
      );
    }

    // Current study status for schemes restricted to students.
    // Do not treat a completed graduate as a current student.
    const studentOnly =
      scheme.occupations.length === 1 &&
      normalize(scheme.occupations[0]) === "student";

    if (studentOnly) {
      if (!userStudyStatus) {
        missingChecks.push(
          "Confirm whether you are currently enrolled in a course"
        );
      } else if (userStudyStatus !== "studying") {
        continue;
      } else {
        reasons.push("Current study status matches the configured criterion");
      }
    }

    // Occupation
    if (!studentOnly && scheme.occupations.length > 0) {
      if (!userOccupation) {
        missingChecks.push("Confirm your occupation");
      } else if (
        !scheme.occupations.some(
          (item) =>
            normalize(item) === userOccupation ||
            normalize(item) === "all"
        )
      ) {
        continue;
      } else {
        reasons.push("Occupation matches the configured criteria");
      }
    } else if (!studentOnly) {
      missingChecks.push(
        "Verify occupation and scheme-specific participation requirements"
      );
    }

    // Education
    if (scheme.education.length > 0) {
      if (!userEducation) {
        missingChecks.push("Confirm your education");
      } else if (
        !scheme.education.some(
          (item) =>
            normalize(item) === userEducation ||
            normalize(item) === "all"
        )
      ) {
        continue;
      } else {
        reasons.push("Education matches the configured criteria");
      }
    }

    // Social category
    if (scheme.categories.length > 0) {
      if (!userCategory) {
        missingChecks.push("Confirm your category");
      } else if (
        !scheme.categories.some(
          (item) => normalize(item) === userCategory
        )
      ) {
        continue;
      } else {
        reasons.push("Category matches the configured criteria");
      }
    }

    // Disability
    if (scheme.disability !== null) {
      if (user.disability !== scheme.disability) {
        continue;
      }
      if (scheme.disability) {
        reasons.push("Disability criterion matches");
      }
    }

    // Minority
    if (scheme.minority !== null) {
      if (user.minority !== scheme.minority) {
        continue;
      }
      if (scheme.minority) {
        reasons.push("Minority criterion matches");
      }
    }

    // BPL
    if (scheme.bpl !== null) {
      if (user.bplCard !== scheme.bpl) {
        continue;
      }
      if (scheme.bpl) {
        reasons.push("BPL criterion matches");
      }
    }

    // Configured housing rule
    if (scheme.requiresNoPuccaHouse === true) {
      const houseOwnership = user.puccaHouseOwnership ?? "not_sure";

      if (houseOwnership === "yes") {
        continue;
      }

      if (houseOwnership === "no") {
        reasons.push(
          "House ownership matches the configured housing criterion"
        );
      } else {
        missingChecks.push(
          "Confirm whether your household owns a pucca house"
        );
      }
    }

    // Official criteria must always be checked before applying.
    missingChecks.push(
      "Verify all official scheme-specific eligibility conditions"
    );

    if (!scheme.applyLink) {
      missingChecks.push("Official application link is unavailable");
    }

    // Informational score only, not an eligibility probability.
    const totalChecks = reasons.length + missingChecks.length;
    const matchScore =
      totalChecks > 0
        ? Math.round((reasons.length / totalChecks) * 100)
        : 0;

    results.push({
      ...scheme,
      matchScore,
      reasons,
      missingChecks,
      eligibilityStatus: "needs-verification",
    });
  }

  return results.sort(
    (a, b) =>
      b.matchScore - a.matchScore ||
      a.name.localeCompare(b.name)
  );
};
