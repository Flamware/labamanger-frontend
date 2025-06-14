export interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
  mobilePhone: {
    country: string;
    localNumber: string;
    prefix: number;
  };
  officePhone: {
    country: string;
    localNumber: string;
    prefix: number;
  };
  room: string;
  ranking: {
    wosHindex: number;
    wosCitations: number;
    scopusHindex: number;
    scopusCitations: number;
    googleScholarHindex: number;
    googleScholarCitations: number;
  };
  links: {
    orcidURL: string | null;
    gravatarURL: string;
    halURL: string | null;
    facebookURL: string;
    googleScholarURL: string;
    academiaURL: string;
    researcherIdURL: string;
    cordisURL: string | null;
    researchGateURL: string;
    dblpURL: string;
    linkedInURL: string;
    adScientificIndexURL: string;
    githubURL: string;
  };
  webpageId: string;
}

