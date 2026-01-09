"use strict";
// src/utils/generatePreviews.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//npx ts-node src/utils/generatePreviews.ts
require("../utils/hbs.helpers"); // <-- Register all helpers
require("../utils/hbs.partials"); // <-- Register partials
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const handlebars_1 = __importDefault(require("handlebars"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const templates_1 = require("../config/templates");
const mockResumeData_1 = __importDefault(require("../mockData/mockResumeData"));
async function generatePreview(templateFile, outputFile) {
    const templatePath = path_1.default.join(__dirname, '../templates', templateFile);
    if (!fs_1.default.existsSync(templatePath)) {
        console.warn(`Template file not found: ${templatePath}, skipping preview`);
        return;
    }
    const source = fs_1.default.readFileSync(templatePath, 'utf8');
    const template = handlebars_1.default.compile(source);
    // Use full mock data instead of minimal sample
    const html = template(mockResumeData_1.default);
    const browser = await puppeteer_1.default.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    await page.setViewport({ width: 1200, height: 1600 });
    await page.screenshot({ path: outputFile, fullPage: true });
    await browser.close();
}
async function main() {
    const previewsDir = path_1.default.join(__dirname, '../../previews');
    if (!fs_1.default.existsSync(previewsDir))
        fs_1.default.mkdirSync(previewsDir);
    for (const template of templates_1.TEMPLATE_REGISTRY) {
        const outputFile = path_1.default.join(previewsDir, `${template.id}.png`);
        console.log(`Generating preview for ${template.id} → ${outputFile}`);
        await generatePreview(template.templateFile, outputFile);
    }
    console.log('All previews generated!');
}
main().catch(err => {
    console.error('Error generating previews:', err);
    process.exit(1);
});
