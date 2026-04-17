export const TEMPLATE_FILES = {
  classic: "classic.hbs",
  modern: "modern-pro.hbs",
  executive: "executive.hbs",
  minimal: "minimal.hbs",
  creative: "creative.hbs",
} as const;

export type TemplateId = keyof typeof TEMPLATE_FILES;

export const TEMPLATE_IDS = Object.keys(TEMPLATE_FILES) as TemplateId[];

export function getTemplateFile(templateId: string): string | undefined {
  return (TEMPLATE_FILES as Record<string, string>)[templateId];
}
