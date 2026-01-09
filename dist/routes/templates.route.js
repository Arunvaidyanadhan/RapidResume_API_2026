"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templatesRoutes = templatesRoutes;
const templates_1 = require("../config/templates");
async function templatesRoutes(app) {
    /**
     * GET /templates
     * Returns all available template metadata
     * Frontend uses this to dynamically render template selection UI
     */
    app.get("/templates", async (req, reply) => {
        try {
            const templates = (0, templates_1.getAllTemplates)();
            return reply.send({
                templates,
                count: templates.length,
            });
        }
        catch (error) {
            app.log.error("Error fetching templates:", error);
            return reply.status(500).send({
                error: "Failed to fetch templates",
                message: error.message || "An unexpected error occurred",
            });
        }
    });
}
