import { FastifyInstance } from "fastify";
import { getAllTemplates } from "../config/templates";

export async function templatesRoutes(app: FastifyInstance) {
  /**
   * GET /templates
   * Returns all available template metadata
   * Frontend uses this to dynamically render template selection UI
   */
  app.get("/templates", async (req, reply) => {
    try {
      const templates = getAllTemplates();
      return reply.send({
        templates,
        count: templates.length,
      });
    } catch (error: any) {
      app.log.error("Error fetching templates:", error);
      return reply.status(500).send({
        error: "Failed to fetch templates",
        message: error.message || "An unexpected error occurred",
      });
    }
  });
}
