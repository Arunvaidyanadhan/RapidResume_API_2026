// src/routes/preview.routes.ts
import { FastifyInstance } from "fastify";
import { getTemplateById } from "../config/templates";
import path from "path";
import fs from "fs";

export async function previewRoutes(app: FastifyInstance) {
  app.get("/preview/:templateId", async (req, reply) => {
    const templateId = (req.params as any).templateId;
    const templateConfig = getTemplateById(templateId);

    if (!templateConfig) {
      return reply.status(404).send({ error: "Template not found" });
    }

    // Construct preview image path
    const previewPath = path.join(__dirname, "../../previews", path.basename(templateConfig.preview));

    if (!fs.existsSync(previewPath)) {
      return reply.status(404).send({ error: "Preview not available" });
    }

    return reply.sendFile(path.basename(previewPath)); // served via fastify-static
  });
}
