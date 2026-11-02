import type { MatchedScheme } from "../../eligibility/data/matchSchemes";

const STORAGE_KEY = "savedSchemes";

// Get all saved schemes
export const getSavedSchemes = (): MatchedScheme[] => {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
};

// Save a scheme
export const saveScheme = (scheme: MatchedScheme): boolean => {
  const saved = getSavedSchemes();

  const alreadyExists = saved.some(
    (item) => item.id === scheme.id
  );

  if (alreadyExists) {
    return false;
  }

  saved.push(scheme);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(saved)
  );

  return true;
};

// Remove a scheme
export const removeScheme = (
  schemeId: number
): void => {
  const updated = getSavedSchemes().filter(
    (scheme) => scheme.id !== schemeId
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  );
};

// Check whether a scheme is already saved
export const isSchemeSaved = (
  schemeId: number
): boolean => {
  return getSavedSchemes().some(
    (scheme) => scheme.id === schemeId
  );
};

// Remove all saved schemes
export const clearSavedSchemes = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};