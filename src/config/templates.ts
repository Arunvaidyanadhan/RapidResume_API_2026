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
  modern: {
    name: "Modern",
    description: "Clean and professional design with modern aesthetics",
  },
  "template-2": {
    name: "Classic",
    description: "Traditional resume layout with timeless appeal",
  },
  "template-3": {
    name: "Executive",
    description: "Bold, high-contrast layout suited for leadership roles",
  },
  "template-4": {
    name: "Sidebar",
    description: "Two-column layout with a clean sidebar for quick scanning",
  },
  "template-5": {
    name: "Soft Minimal",
    description: "Simple, elegant design with minimal color and strong readability",
  },
  "template-6": {
    name: "Professional",
    description: "ATS-friendly format optimized for applicant tracking systems",
  },
  "template-7": {
    name: "Simple ATS",
    description: "Ultra-clean single-column template for fast scanning",
  },
  "template-8": {
    name: "Fresher Focus",
    description: "Education + projects first. Great for students and freshers",
  },
  "template-9": {
    name: "Project Spotlight",
    description: "Project-first layout for portfolios and hands-on roles",
  },
  complete: {
    name: "Complete",
    description: "Comprehensive layout with all sections included",
  },
  "ats-minimal": {
    name: "Minimal ATS",
    description: "Strict ATS-safe typography and spacing with clean section rules",
  },
  "modern-pro": {
    name: "Modern Pro",
    description: "Modern professional look with balanced whitespace and hierarchy",
  },
  "creative-print": {
    name: "Creative Print",
    description: "Tasteful creative styling that remains printable and professional",
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
