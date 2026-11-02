
export interface Scheme {
  id: number;
  name: string;
  category: string;
  type: "Central" | "State";
  state: "All" | string;
  occupations: string[];
  minAge: number;
  maxAge: number;
  incomeLimitApplies?: boolean;
  maxIncome: number;
  categories: string[];
  disability: boolean | null;
  minority: boolean | null;
  bpl: boolean | null;
  education: string[];
  benefits: string;
  eligibility: string;
  documents: string[];
  applyLink: string;
  matchScore?: number;

  // True when the configured housing rule requires
  // the household not to own a pucca house.
  requiresNoPuccaHouse?: boolean;
}

export const schemes: Scheme[] = [
  {
    id: 1,
    name: "PM Scholarship Scheme",
    category: "Education",
    type: "Central",
    state: "All",
    occupations: ["Student"],
    minAge: 18,
    maxAge: 30,
    maxIncome: 800000,
    categories: ["General", "OBC", "SC", "ST", "EWS"],
    disability: null,
    minority: null,
    bpl: null,
    education: ["12th Pass", "Graduate", "Post Graduate"],
    benefits: "Scholarship assistance for higher education students.",
    eligibility:
      "Students pursuing higher education with required eligibility criteria.",
    documents: [
      "Aadhaar Card",
      "Income Certificate",
      "Educational Certificates",
      "Bank Account Details",
      "Caste Certificate (if applicable)",
    ],
    applyLink: "https://scholarships.gov.in",
  },

  {
    id: 2,
    name: "PMAY - Pradhan Mantri Awas Yojana",
    category: "Housing",
    type: "Central",
    state: "All",
    occupations: [
      "Private Employee",
      "Government Employee",
      "Self Employed",
      "Business Owner",
      "Farmer",
      "Homemaker",
    ],
    minAge: 18,
    maxAge: 70,
    maxIncome: 1800000,
    categories: ["General", "OBC", "SC", "ST", "EWS"],
    disability: null,
    minority: null,
    bpl: null,
    education: ["All"],

    requiresNoPuccaHouse: true,

    benefits: "Financial assistance for affordable housing.",
    eligibility:
      "Housing assistance subject to the applicable PMAY programme's household, housing, income and other eligibility conditions.",
    documents: [
      "Aadhaar Card",
      "Income Certificate",
      "Address Proof",
      "Bank Account Details",
      "Property Documents",
    ],
    applyLink: "https://pmaymis.gov.in",
  },

  {
    id: 3,
    name: "Ayushman Bharat PM-JAY",
    category: "Healthcare",
    type: "Central",
    state: "All",
    occupations: [
      "Student",
      "Farmer",
      "Government Employee",
      "Private Employee",
      "Self Employed",
      "Business Owner",
      "Senior Citizen",
      "Homemaker",
    ],
    minAge: 0,
    maxAge: 100,
    maxIncome: 500000,
    categories: ["General", "OBC", "SC", "ST", "EWS"],
    disability: null,
    minority: null,
    bpl: true,
    education: ["All"],
    benefits: "Health insurance coverage for eligible families.",
    eligibility:
      "Families meeting the applicable PM-JAY beneficiary eligibility criteria.",
    documents: [
      "Aadhaar Card",
      "Ration Card",
      "Mobile Number",
      "PM-JAY Eligibility Card",
    ],
    applyLink: "https://beneficiary.nha.gov.in",
  },

  {
    id: 4,
    name: "National Apprenticeship Promotion Scheme",
    category: "Employment",
    type: "Central",
    state: "All",

    // The scheme has no occupation restriction.
    occupations: ["All"],

    minAge: 18,
    maxAge: 35,
    maxIncome: 1000000,
    incomeLimitApplies: false,
    categories: ["General", "OBC", "SC", "ST", "EWS"],
    disability: null,
    minority: null,
    bpl: null,
    education: [
      "12th Pass",
      "Diploma",
      "Graduate",
      "Post Graduate",
    ],
    benefits: "Apprenticeship training with stipend support.",
    eligibility:
      "Apprenticeship opportunities subject to the applicable programme, apprenticeship and establishment requirements.",
    documents: [
      "Aadhaar Card",
      "Educational Certificates",
      "Bank Account",
      "Resume",
    ],
    applyLink: "https://www.apprenticeshipindia.gov.in",
  },

  {
    id: 5,
    name: "Scholarship for Students with Disabilities",
    category: "PwD Education",
    type: "Central",
    state: "All",
    occupations: ["Student"],
    minAge: 10,
    maxAge: 35,
    maxIncome: 250000,
    categories: ["General", "OBC", "SC", "ST", "EWS"],
    disability: true,
    minority: null,
    bpl: null,
    education: [
      "10th Pass",
      "12th Pass",
      "Diploma",
      "Graduate",
      "Post Graduate",
    ],
    benefits: "Financial support for students with disabilities.",
    eligibility:
      "Students with disabilities who meet the applicable scholarship, income and educational requirements.",
    documents: [
      "Disability Certificate",
      "Aadhaar Card",
      "Income Certificate",
      "Educational Certificates",
      "Bank Account",
    ],
    applyLink: "https://scholarships.gov.in",
  },

  {
    id: 6,
    name: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    category: "Agriculture",
    type: "Central",
    state: "All",
    occupations: ["Farmer"],
    minAge: 18,
    maxAge: 100,
    maxIncome: 0,
    incomeLimitApplies: false,
    categories: ["General", "OBC", "SC", "ST", "EWS"],
    disability: null,
    minority: null,
    bpl: null,
    education: ["All"],
    benefits: "Income support for eligible landholding farmer families.",
    eligibility:
      "Landholding farmer families with cultivable land recorded in the applicable State or Union Territory land records. Exclusions and e-KYC requirements apply.",
    documents: [
      "Aadhaar Card",
      "Land Ownership Records",
      "Bank Account Details",
      "Mobile Number",
    ],
    applyLink: "https://pmkisan.gov.in",
  },

  {
    id: 7,
    name: "PM Vishwakarma",
    category: "Skill & Enterprise",
    type: "Central",
    state: "All",
    occupations: ["Self Employed", "Business Owner"],
    minAge: 18,
    maxAge: 100,
    maxIncome: 0,
    incomeLimitApplies: false,
    categories: ["General", "OBC", "SC", "ST", "EWS"],
    disability: null,
    minority: null,
    bpl: null,
    education: ["All"],
    benefits:
      "Training, toolkit incentive, concessional credit and marketing support for traditional artisans and craftspeople.",
    eligibility:
      "Self-employed artisans and craftspeople working in one of the 18 notified traditional trades. Registration, family and prior-loan conditions apply.",
    documents: [
      "Aadhaar Card",
      "Mobile Number",
      "Bank Account Details",
      "Trade or Artisan Details",
    ],
    applyLink: "https://pmvishwakarma.gov.in",
  },

  {
    id: 8,
    name: "PM Street Vendor's AtmaNirbhar Nidhi (PM SVANidhi)",
    category: "Self Employment",
    type: "Central",
    state: "All",
    occupations: ["Self Employed", "Business Owner"],
    minAge: 18,
    maxAge: 100,
    maxIncome: 0,
    incomeLimitApplies: false,
    categories: ["General", "OBC", "SC", "ST", "EWS"],
    disability: null,
    minority: null,
    bpl: null,
    education: ["All"],
    benefits:
      "Working-capital support and incentives for eligible street vendors.",
    eligibility:
      "Street vendors identified in an urban local-body survey or holding the required certificate, identity card or letter of recommendation.",
    documents: [
      "Aadhaar Card",
      "Mobile Number",
      "Certificate or Identity Card",
      "Letter of Recommendation (if applicable)",
    ],
    applyLink: "https://pmsvanidhi.mohua.gov.in",
  },

  {
    id: 9,
    name: "Atal Pension Yojana (APY)",
    category: "Pension",
    type: "Central",
    state: "All",
    occupations: ["All"],
    minAge: 18,
    maxAge: 40,
    maxIncome: 0,
    incomeLimitApplies: false,
    categories: ["General", "OBC", "SC", "ST", "EWS"],
    disability: null,
    minority: null,
    bpl: null,
    education: ["All"],
    benefits:
      "Guaranteed minimum pension of up to ₹5,000 per month after age 60, subject to contribution.",
    eligibility:
      "Indian citizens aged 18 to 40 with a savings bank or post-office account. New subscribers who are or have been income-tax payers are not eligible.",
    documents: [
      "Aadhaar Card",
      "Savings Bank or Post Office Account",
      "Mobile Number",
    ],
    applyLink: "https://www.financialservices.gov.in/atal-pension-yojana-apy",
  },
];
