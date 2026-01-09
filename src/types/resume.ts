export interface ResumeData {
  personal: {
    firstName: string;
    lastName: string;
    title?: string;
    email: string;
    phone: string;
    linkedin?: string;
  };
  summary?: string;
  skills?: string[];
  experience?: {
    jobTitle: string;
    employer: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    description?: string;
  }[];
  projects?: {
    name: string;
    description: string;
    link?: string;
  }[];
  education?: {
    degree: string;
    fieldOfStudy: string;
    school: string;
    startDate: string;
    endDate?: string;
  }[];
  certifications?: {
    name: string;
    issuer: string;
    year: string;
  }[];
}
