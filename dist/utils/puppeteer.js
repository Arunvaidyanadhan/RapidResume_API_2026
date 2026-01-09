"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePdf = generatePdf;
const puppeteer_1 = __importDefault(require("puppeteer"));
async function generatePdf(html) {
    const browser = await puppeteer_1.default.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--disable-gpu"
        ]
    });
    const page = await browser.newPage();
    await page.setContent(html, {
        waitUntil: "domcontentloaded"
    });
    const pdfUint8Array = await page.pdf({
        format: "A4",
        printBackground: true
    });
    await browser.close();
    return Buffer.from(pdfUint8Array);
}
