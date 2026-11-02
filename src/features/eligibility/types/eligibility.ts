
export type HouseOwnershipAnswer = "yes" | "no" | "not_sure";

export interface EligibilityFormData {
  // Personal Details
  fullName: string;
  age: number;
  gender: string;
  state: string;
  district: string;

  // Occupation
  occupation: string;

  // Income & Category
  annualIncome: number;
  category: string;
  disability: boolean;
  minority: boolean;
  bplCard: boolean;
  
  // Education
  education: string;
  studyStatus: "studying" | "completed" | "planning";

  // House Ownership
  puccaHouseOwnership?: HouseOwnershipAnswer;
}
