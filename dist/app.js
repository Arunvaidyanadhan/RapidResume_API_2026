"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildApp = buildApp;
const fastify_1 = __importDefault(require("fastify"));
const view_1 = __importDefault(require("@fastify/view"));
const handlebars_1 = __importDefault(require("handlebars"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("@fastify/cors"));
const rate_limit_1 = __importDefault(require("@fastify/rate-limit"));
const static_1 = __importDefault(require("@fastify/static"));
const pdf_route_1 = require("./routes/pdf.route");
const templates_route_1 = require("./routes/templates.route");
const preview_routes_1 = require("./routes/preview.routes");
function buildApp() {
    const app = (0, fastify_1.default)({ logger: true });
    app.register(view_1.default, {
        engine: { handlebars: handlebars_1.default },
        root: path_1.default.join(process.cwd(), "src", "templates"),
    });
    app.register(cors_1.default, {
        origin: (origin, cb) => {
            const allowedOrigins = [
                "https://rapidresume.in",
                "https://www.rapidresume.in",
                "http://localhost:3000",
                "http://localhost:5173"
            ];
            // Allow server-to-server or curl requests (no origin)
            if (!origin) {
                cb(null, true);
                return;
            }
            if (allowedOrigins.includes(origin)) {
                cb(null, true);
            }
            else {
                cb(new Error("Not allowed by CORS"), false);
            }
        },
        methods: ["GET", "POST"],
    });
    app.register(rate_limit_1.default, { max: 50, timeWindow: "1 minute" });
    app.register(preview_routes_1.previewRoutes);
    // Serve static preview images
    app.register(static_1.default, {
        root: path_1.default.join(__dirname, "../previews"),
        prefix: "/previews/",
    });
    // Health check endpoint
    app.get("/health", async (req, reply) => {
        return reply.send({ status: "ok", service: "resume-pdf-service" });
    });
    app.register(pdf_route_1.pdfRoutes);
    app.register(templates_route_1.templatesRoutes);
    return app;
}
