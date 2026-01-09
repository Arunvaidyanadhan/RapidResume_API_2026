"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfRoutes = pdfRoutes;
const pdf_service_1 = require("../services/pdf.service");
const templates_1 = require("../config/templates");
function validateResumeData(data) {
    if (!data || typeof data !== "object") {
        return { valid: false, error: "Invalid request body" };
    }
    if (!data.personal || typeof data.personal !== "object") {
        return { valid: false, error: "Personal details are required" };
    }
    if (!data.personal.firstName || typeof data.personal.firstName !== "string" || data.personal.firstName.trim() === "") {
        return { valid: false, error: "First name is required" };
    }
    if (!data.personal.lastName || typeof data.personal.lastName !== "string" || data.personal.lastName.trim() === "") {
        return { valid: false, error: "Last name is required" };
    }
    if (!data.personal.email || typeof data.personal.email !== "string" || data.personal.email.trim() === "") {
        return { valid: false, error: "Email is required" };
    }
    if (!data.personal.phone || typeof data.personal.phone !== "string" || data.personal.phone.trim() === "") {
        return { valid: false, error: "Phone number is required" };
    }
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.personal.email)) {
        return { valid: false, error: "Invalid email format" };
    }
    return { valid: true };
}
async function pdfRoutes(app) {
    app.post("/generate-pdf/:template", async (req, reply) => {
        try {
            const templateId = req.params.template;
            // Validate template ID using registry
            if (!(0, templates_1.isValidTemplateId)(templateId)) {
                const { getAvailableTemplateIds } = await Promise.resolve().then(() => __importStar(require("../config/templates")));
                const availableIds = getAvailableTemplateIds();
                return reply.status(400).send({
                    error: "Invalid template",
                    message: `Template ID '${templateId}' not found. Available templates: ${availableIds.join(", ")}`,
                });
            }
            const templateConfig = (0, templates_1.getTemplateById)(templateId);
            if (!templateConfig) {
                return reply.status(400).send({
                    error: "Template configuration error",
                    message: `Template '${templateId}' configuration not found`,
                });
            }
            // Validate request body
            const validation = validateResumeData(req.body);
            if (!validation.valid) {
                return reply.status(400).send({
                    error: "Validation failed",
                    message: validation.error,
                });
            }
            // Generate PDF using template file name
            const pdf = await (0, pdf_service_1.createResumePdf)(req.body, templateConfig.templateFile);
            reply
                .header("Content-Type", "application/pdf")
                .header("Content-Disposition", "attachment; filename=resume.pdf")
                .send(pdf);
        }
        catch (error) {
            app.log.error("PDF generation error:", error);
            return reply.status(500).send({
                error: "PDF generation failed",
                message: error.message || "An unexpected error occurred while generating the PDF",
            });
        }
    });
}
