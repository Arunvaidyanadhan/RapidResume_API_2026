import { ResumeInput, ResumeViewModel } from "../types/resume";

function normalizeString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function compact<T>(items: T[]): T[] {
  return items.filter(Boolean);
}

export function normalizeResumeInput(input: unknown): ResumeInput {
  const safe = input && typeof input === "object" ? (input as Record<string, unknown>) : {};
  const profile = safe.profile && typeof safe.profile === "object" ? (safe.profile as Record<string, unknown>) : {};

  return {
    profile: {
      firstName: normalizeString(profile.firstName),
      lastName: normalizeString(profile.lastName),
      headline: normalizeString(profile.headline),
      email: normalizeString(profile.email),
      phone: normalizeString(profile.phone),
      location: normalizeString(profile.location),
      website: normalizeString(profile.website),
      linkedin: normalizeString(profile.linkedin),
      summary: normalizeString(profile.summary),
    },
    experience: normalizeArray<Record<string, unknown>>(safe.experience)
      .map((item) => ({
        id: normalizeString(item.id),
        role: normalizeString(item.role),
        company: normalizeString(item.company),
        location: normalizeString(item.location),
        startDate: normalizeString(item.startDate),
        endDate: normalizeString(item.endDate),
        current: Boolean(item.current),
        highlights: compact(normalizeArray<string>(item.highlights).map(normalizeString)),
      }))
      .filter((item) => item.role || item.company || item.highlights.length || item.startDate || item.endDate),
    education: normalizeArray<Record<string, unknown>>(safe.education)
      .map((item) => ({
        id: normalizeString(item.id),
        degree: normalizeString(item.degree),
        institution: normalizeString(item.institution),
        location: normalizeString(item.location),
        startDate: normalizeString(item.startDate),
        endDate: normalizeString(item.endDate),
        current: Boolean(item.current),
        details: normalizeString(item.details),
      }))
      .filter((item) => item.degree || item.institution || item.details || item.startDate || item.endDate),
    skills: normalizeArray<Record<string, unknown>>(safe.skills)
      .map((item) => ({
        id: normalizeString(item.id),
        name: normalizeString(item.name),
        level: normalizeString(item.level),
      }))
      .filter((item) => item.name),
    projects: normalizeArray<Record<string, unknown>>(safe.projects)
      .map((item) => ({
        id: normalizeString(item.id),
        name: normalizeString(item.name),
        role: normalizeString(item.role),
        link: normalizeString(item.link),
        summary: normalizeString(item.summary),
        highlights: compact(normalizeArray<string>(item.highlights).map(normalizeString)),
      }))
      .filter((item) => item.name || item.summary || item.highlights.length),
    certifications: normalizeArray<Record<string, unknown>>(safe.certifications)
      .map((item) => ({
        id: normalizeString(item.id),
        name: normalizeString(item.name),
        issuer: normalizeString(item.issuer),
        year: normalizeString(item.year),
      }))
      .filter((item) => item.name || item.issuer || item.year),
    languages: normalizeArray<Record<string, unknown>>(safe.languages)
      .map((item) => ({
        id: normalizeString(item.id),
        name: normalizeString(item.name),
        proficiency: normalizeString(item.proficiency),
      }))
      .filter((item) => item.name),
  };
}

export function validateResumeInput(input: ResumeInput): { valid: boolean; error?: string } {
  if (!input.profile.firstName) return { valid: false, error: "First name is required" };
  if (!input.profile.lastName) return { valid: false, error: "Last name is required" };
  if (!input.profile.email) return { valid: false, error: "Email is required" };
  if (!/\S+@\S+\.\S+/.test(input.profile.email)) return { valid: false, error: "Invalid email format" };
  if (!input.profile.phone) return { valid: false, error: "Phone number is required" };
  if (!input.profile.summary) return { valid: false, error: "Professional summary is required" };
  if (!input.experience.length) return { valid: false, error: "At least one experience entry is required" };
  if (!input.education.length) return { valid: false, error: "At least one education entry is required" };
  if (!input.skills.length) return { valid: false, error: "At least one skill is required" };
  return { valid: true };
}

function formatDateRange(startDate: string, endDate: string, current: boolean): string {
  return [startDate, current ? "Present" : endDate].filter(Boolean).join(" - ");
}

export function createResumeViewModel(input: ResumeInput): ResumeViewModel {
  const fullName = [input.profile.firstName, input.profile.lastName].filter(Boolean).join(" ");
  const contactLine = [input.profile.email, input.profile.phone, input.profile.location].filter(Boolean).join(" | ");

  return {
    ...input,
    fullName: fullName || "Your Name",
    contactLine,
    links: [input.profile.linkedin, input.profile.website].filter(Boolean),
    experience: input.experience.map((item) => ({
      ...item,
      dateRange: formatDateRange(item.startDate, item.endDate, item.current),
    })),
    education: input.education.map((item) => ({
      ...item,
      dateRange: formatDateRange(item.startDate, item.endDate, item.current),
    })),
    projects: input.projects,
    skills: input.skills,
    certifications: input.certifications,
    languages: input.languages,
  };
}
