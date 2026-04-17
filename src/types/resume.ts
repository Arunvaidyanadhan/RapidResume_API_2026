export interface ResumeProfile {
  firstName: string;
  lastName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  summary: string;
}

export interface ResumeExperience {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  highlights: string[];
  dateRange?: string;
}

export interface ResumeEducation {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  details: string;
  dateRange?: string;
}

export interface ResumeSkill {
  id: string;
  name: string;
  level: string;
}

export interface ResumeProject {
  id: string;
  name: string;
  role: string;
  link: string;
  summary: string;
  highlights: string[];
}

export interface ResumeCertification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface ResumeLanguage {
  id: string;
  name: string;
  proficiency: string;
}

export interface ResumeInput {
  profile: ResumeProfile;
  experience: ResumeExperience[];
  education: ResumeEducation[];
  skills: ResumeSkill[];
  projects: ResumeProject[];
  certifications: ResumeCertification[];
  languages: ResumeLanguage[];
}

export interface ResumeViewModel extends ResumeInput {
  fullName: string;
  contactLine: string;
  links: string[];
}
