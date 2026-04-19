/**
 * Template Registry - Single Source of Truth (Backend)
 * 
 * This is the authoritative source for all resume templates.
 * Frontend fetches this data via /templates API endpoint.
 */

import { TEMPLATE_FILES, TEMPLATE_IDS, TemplateId } from "../templates";

export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  preview: string; // Path to preview image (e.g., '/previews/modern.png')
  templateFile: string; // EJS/Handlebars template filename (e.g., 'modern.hbs')
}

const TEMPLATE_METADATA: Record<TemplateId, { name: string; description: string }> = {
  "ats-master": {
    name: "ATS Master",
    description: "Single-column layout optimized for ATS parsing and maximum readability",
  },
  "professional": {
    name: "Professional",
    description: "Two-column balanced design with sidebar for skills and education",
  },
  "executive": {
    name: "Executive",
    description: "Leadership-focused layout with compact sections and premium spacing",
  },
  "academic": {
    name: "Academic",
    description: "Education and research-focused with emphasis on publications and credentials",
  },
  "modern-compact": {
    name: "Modern Compact",
    description: "Clean minimalist design with contemporary typography and breathing room",
  },
};

function previewPath(id: string) {
  return `/previews/${id}.png`;
}

export const TEMPLATE_REGISTRY: TemplateConfig[] = TEMPLATE_IDS.map((id) => ({
  id,
  name: TEMPLATE_METADATA[id].name,
  description: TEMPLATE_METADATA[id].description,
  preview: previewPath(id),
  templateFile: TEMPLATE_FILES[id],
}));

/**
 * Get template config by ID
 */
export function getTemplateById(id: string): TemplateConfig | undefined {
  return TEMPLATE_REGISTRY.find(t => t.id === id);
}

/**
 * Get all available template IDs
 */
export function getAvailableTemplateIds(): string[] {
  return TEMPLATE_REGISTRY.map(t => t.id);
}

/**
 * Check if template ID is valid
 */
export function isValidTemplateId(id: string): boolean {
  return TEMPLATE_REGISTRY.some(t => t.id === id);
}

/**
 * Get all templates (for API endpoint)
 * Returns template metadata without internal implementation details
 */
export function getAllTemplates(): Omit<TemplateConfig, 'templateFile'>[] {
  return TEMPLATE_REGISTRY.map(({ templateFile, ...rest }) => rest);
}
