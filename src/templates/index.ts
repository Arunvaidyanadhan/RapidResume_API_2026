export const TEMPLATE_FILES = {
  "ats-master": "ats-master.hbs",
  "professional": "professional.hbs",
  "executive": "executive.hbs",
  "academic": "academic.hbs",
  "modern-compact": "modern-compact.hbs",
} as const;

export type TemplateId = keyof typeof TEMPLATE_FILES;

export const TEMPLATE_IDS = Object.keys(TEMPLATE_FILES) as TemplateId[];

export function getTemplateFile(templateId: string): string | undefined {
  return (TEMPLATE_FILES as Record<string, string>)[templateId];
}
