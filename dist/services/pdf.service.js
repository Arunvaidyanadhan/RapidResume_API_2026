"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResumePdf = createResumePdf;
require("../utils/hbs.helpers");
require("../utils/hbs.partials");
const handlebars_1 = __importDefault(require("handlebars"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const puppeteer_1 = require("../utils/puppeteer");
async function createResumePdf(data, templateFileName) {
    // templateFileName is now the actual .hbs filename (e.g., "modern.hbs")
    // Resolve template path from the repo source so it works in both ts-node and dist runs
    const templatePath = path_1.default.join(process.cwd(), "src", "templates", templateFileName);
    // Check if template file exists
    if (!fs_1.default.existsSync(templatePath)) {
        throw new Error(`Template file not found: ${templatePath}`);
    }
    // Read and compile template
    const source = fs_1.default.readFileSync(templatePath, "utf8");
    const template = handlebars_1.default.compile(source);
    // Render template with data
    const html = template(data);
    // Generate PDF
    return (0, puppeteer_1.generatePdf)(html);
}
