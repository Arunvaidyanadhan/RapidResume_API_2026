import "../utils/hbs.helpers";
import "../utils/hbs.partials";
import Handlebars from "handlebars";
import fs from "fs";
import path from "path";
import { ResumeData } from "../types/resume";
import { generatePdf } from "../utils/puppeteer";

export async function createResumePdf(
  data: ResumeData,
  templateFileName: string
): Promise<Buffer> {
  // templateFileName is now the actual .hbs filename (e.g., "modern.hbs")

  // Resolve template path from the repo source so it works in both ts-node and dist runs
  const templatePath = path.join(process.cwd(), "src", "templates", templateFileName);

  // Check if template file exists
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template file not found: ${templatePath}`);
  }

  // Read and compile template
  const source = fs.readFileSync(templatePath, "utf8");
  const template = Handlebars.compile(source);
  
  // Render template with data
  const html = template(data);

  // Generate PDF
  return generatePdf(html);
}

