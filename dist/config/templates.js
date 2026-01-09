"use strict";
/**
 * Template Registry - Single Source of Truth (Backend)
 *
 * This is the authoritative source for all resume templates.
 * Frontend fetches this data via /templates API endpoint.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEMPLATE_REGISTRY = void 0;
exports.getTemplateById = getTemplateById;
exports.getAvailableTemplateIds = getAvailableTemplateIds;
exports.isValidTemplateId = isValidTemplateId;
exports.getAllTemplates = getAllTemplates;
const templates_1 = require("../templates");
const TEMPLATE_METADATA = {
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
function previewPath(id) {
    return `/previews/${id}.png`;
}
exports.TEMPLATE_REGISTRY = templates_1.TEMPLATE_IDS.map((id) => ({
    id,
    name: TEMPLATE_METADATA[id].name,
    description: TEMPLATE_METADATA[id].description,
    preview: previewPath(id),
    templateFile: templates_1.TEMPLATE_FILES[id],
}));
/**
 * Get template config by ID
 */
function getTemplateById(id) {
    return exports.TEMPLATE_REGISTRY.find(t => t.id === id);
}
/**
 * Get all available template IDs
 */
function getAvailableTemplateIds() {
    return exports.TEMPLATE_REGISTRY.map(t => t.id);
}
/**
 * Check if template ID is valid
 */
function isValidTemplateId(id) {
    return exports.TEMPLATE_REGISTRY.some(t => t.id === id);
}
/**
 * Get all templates (for API endpoint)
 * Returns template metadata without internal implementation details
 */
function getAllTemplates() {
    return exports.TEMPLATE_REGISTRY.map(({ templateFile, ...rest }) => rest);
}
