"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handlebars_1 = __importDefault(require("handlebars"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function registerPartialFromFile(partialName, fileName) {
    const partialPath = path_1.default.join(process.cwd(), "src", "templates", "partials", fileName);
    if (!fs_1.default.existsSync(partialPath))
        return;
    const source = fs_1.default.readFileSync(partialPath, "utf8");
    handlebars_1.default.registerPartial(partialName, source);
}
registerPartialFromFile("baseStyles", "baseStyles.hbs");
