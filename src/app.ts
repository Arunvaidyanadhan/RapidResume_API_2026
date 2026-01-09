import Fastify from "fastify";
import fastifyView from "@fastify/view";
import handlebars from "handlebars";
import path from "path";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import fastifyStatic from "@fastify/static";
import { pdfRoutes } from "./routes/pdf.route";
import { templatesRoutes } from "./routes/templates.route";
import { previewRoutes } from "./routes/preview.routes";

export function buildApp() {


  const app = Fastify({ logger: true });
  app.register(fastifyView, {
  engine: { handlebars },
  root: path.join(process.cwd(), "src", "templates"),
});
app.register(cors, {
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
    } else {
      cb(new Error("Not allowed by CORS"), false);
    }
  },
  methods: ["GET", "POST"],
});

  app.register(rateLimit, { max: 50, timeWindow: "1 minute" });
app.register(previewRoutes);
  // Serve static preview images
  app.register(fastifyStatic, {
    root: path.join(__dirname, "../previews"),
    prefix: "/previews/",
  });

  // Health check endpoint
  app.get("/health", async (req, reply) => {
    return reply.send({ status: "ok", service: "resume-pdf-service" });
  });

  app.register(pdfRoutes);
  app.register(templatesRoutes);

  return app;
}
