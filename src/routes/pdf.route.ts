import { FastifyInstance } from "fastify";
import { createResumePdf } from "../services/pdf.service";
import { ResumeInput } from "../types/resume";
import { getTemplateById, isValidTemplateId } from "../config/templates";
import { normalizeResumeInput, validateResumeInput } from "../utils/resumeSchema";

export async function pdfRoutes(app: FastifyInstance) {
  app.post<{
    Params: { template: string };
    Body: ResumeInput;
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
      const normalizedInput = normalizeResumeInput(req.body);
      const validation = validateResumeInput(normalizedInput);
      if (!validation.valid) {
        return reply.status(400).send({
          error: "Validation failed",
          message: validation.error,
        });
      }

      // Generate PDF using template file name
      const pdf = await createResumePdf(normalizedInput, templateConfig.templateFile);

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
