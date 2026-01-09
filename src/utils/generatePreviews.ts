// src/utils/generatePreviews.ts

//npx ts-node src/utils/generatePreviews.ts

import '../utils/hbs.helpers'; // <-- Register all helpers
import '../utils/hbs.partials'; // <-- Register partials
import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';
import puppeteer from 'puppeteer';
import { TEMPLATE_REGISTRY } from '../config/templates';
import mockResumeData from '../mockData/mockResumeData';

async function generatePreview(templateFile: string, outputFile: string) {
  const templatePath = path.join(__dirname, '../templates', templateFile);

  if (!fs.existsSync(templatePath)) {
    console.warn(`Template file not found: ${templatePath}, skipping preview`);
    return;
  }

  const source = fs.readFileSync(templatePath, 'utf8');
  const template = Handlebars.compile(source);

  // Use full mock data instead of minimal sample
  const html = template(mockResumeData);

  const browser = await puppeteer.launch({
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
  const previewsDir = path.join(__dirname, '../../previews');
  if (!fs.existsSync(previewsDir)) fs.mkdirSync(previewsDir);

  for (const template of TEMPLATE_REGISTRY) {
    const outputFile = path.join(previewsDir, `${template.id}.png`);
    console.log(`Generating preview for ${template.id} → ${outputFile}`);
    await generatePreview(template.templateFile, outputFile);
  }

  console.log('All previews generated!');
}

main().catch(err => {
  console.error('Error generating previews:', err);
  process.exit(1);
});
