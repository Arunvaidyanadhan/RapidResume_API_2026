import { FastifyInstance } from "fastify";
import { createResumePdf } from "../services/pdf.service";
import { ResumeData } from "../types/resume";
import { getTemplateById, isValidTemplateId } from "../config/templates";

function validateResumeData(data: any): { valid: boolean; error?: string } {
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

export async function pdfRoutes(app: FastifyInstance) {
  app.post<{
    Params: { template: string };
    Body: ResumeData;
  }>("/generate-pdf/:template", async (req, reply) => {
    try {
      const templateId = req.params.template;

      // Validate template ID using registry
      if (!isValidTemplateId(templateId)) {
        const { getAvailableTemplateIds } = await import("../config/templates");
        const availableIds = getAvailableTemplateIds();
        return reply.status(400).send({
          error: "Invalid template",
          message: `Template ID '${templateId}' not found. Available templates: ${availableIds.join(", ")}`,
        });
      }

      const templateConfig = getTemplateById(templateId);
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
      const pdf = await createResumePdf(req.body, templateConfig.templateFile);

      reply
        .header("Content-Type", "application/pdf")
        .header("Content-Disposition", "attachment; filename=resume.pdf")
        .send(pdf);
    } catch (error: any) {
      app.log.error("PDF generation error:", error);
      
      return reply.status(500).send({
        error: "PDF generation failed",
        message: error.message || "An unexpected error occurred while generating the PDF",
      });
    }
  });
}
