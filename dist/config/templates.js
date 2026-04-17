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
    classic: {
        name: "Classic",
        description: "ATS-safe single-column design with clear hierarchy",
    },
    modern: {
        name: "Modern",
        description: "Balanced two-column professional design with strong scanning",
    },
    executive: {
        name: "Executive",
        description: "Leadership-focused layout with premium spacing and bold sectioning",
    },
    minimal: {
        name: "Minimal",
        description: "Editorial and quiet layout that keeps focus on content",
    },
    creative: {
        name: "Creative",
        description: "Distinctive but professional layout with tasteful visual contrast",
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
