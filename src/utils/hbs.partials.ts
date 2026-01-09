import Handlebars from "handlebars";
import fs from "fs";
import path from "path";

function registerPartialFromFile(partialName: string, fileName: string) {
  const partialPath = path.join(process.cwd(), "src", "templates", "partials", fileName);
  if (!fs.existsSync(partialPath)) return;
  const source = fs.readFileSync(partialPath, "utf8");
  Handlebars.registerPartial(partialName, source);
}

registerPartialFromFile("baseStyles", "baseStyles.hbs");
