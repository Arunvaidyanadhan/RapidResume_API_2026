"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEMPLATE_IDS = exports.TEMPLATE_FILES = void 0;
exports.getTemplateFile = getTemplateFile;
exports.TEMPLATE_FILES = {
    classic: "classic.hbs",
    modern: "modern-pro.hbs",
    executive: "executive.hbs",
    minimal: "minimal.hbs",
    creative: "creative.hbs",
};
exports.TEMPLATE_IDS = Object.keys(exports.TEMPLATE_FILES);
function getTemplateFile(templateId) {
    return exports.TEMPLATE_FILES[templateId];
}
