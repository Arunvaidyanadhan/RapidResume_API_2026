"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TEMPLATE_IDS = exports.TEMPLATE_FILES = void 0;
exports.getTemplateFile = getTemplateFile;
exports.TEMPLATE_FILES = {
    modern: "modern.hbs",
    "template-2": "template-2.hbs",
    "template-3": "template-3.hbs",
    "template-4": "template-4.hbs",
    "template-5": "template-5.hbs",
    "template-6": "template-6.hbs",
    "template-7": "template-7.hbs",
    "template-8": "template-8.hbs",
    "template-9": "template-9.hbs",
    "complete": "complete.hbs",
    "ats-minimal": "ats-minimal.hbs",
    "modern-pro": "modern-pro.hbs",
    "creative-print": "creative-print.hbs",
};
exports.TEMPLATE_IDS = Object.keys(exports.TEMPLATE_FILES);
function getTemplateFile(templateId) {
    return exports.TEMPLATE_FILES[templateId];
}
