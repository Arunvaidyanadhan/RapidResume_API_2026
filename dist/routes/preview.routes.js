"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.previewRoutes = previewRoutes;
const templates_1 = require("../config/templates");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
async function previewRoutes(app) {
    app.get("/preview/:templateId", async (req, reply) => {
        const templateId = req.params.templateId;
        const templateConfig = (0, templates_1.getTemplateById)(templateId);
        if (!templateConfig) {
            return reply.status(404).send({ error: "Template not found" });
        }
        // Construct preview image path
        const previewPath = path_1.default.join(__dirname, "../../previews", path_1.default.basename(templateConfig.preview));
        if (!fs_1.default.existsSync(previewPath)) {
            return reply.status(404).send({ error: "Preview not available" });
        }
        return reply.sendFile(path_1.default.basename(previewPath)); // served via fastify-static
    });
}
