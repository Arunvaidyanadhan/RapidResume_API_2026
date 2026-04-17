import "../utils/hbs.helpers";
import "../utils/hbs.partials";
import Handlebars from "handlebars";
import fs from "fs";
import path from "path";
import { ResumeInput } from "../types/resume";
import { generatePdf } from "../utils/puppeteer";
import { createResumeViewModel } from "../utils/resumeSchema";

export async function createResumePdf(
  data: ResumeInput,
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
  const viewModel = createResumeViewModel(data);
  
  // Render template with data
  const html = template(viewModel);

  // Generate PDF
  return generatePdf(html);
}

