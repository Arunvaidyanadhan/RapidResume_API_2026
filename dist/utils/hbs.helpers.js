"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handlebars_1 = __importDefault(require("handlebars"));
handlebars_1.default.registerHelper("presentOrEnd", function (current, endDate) {
    return current ? "Present" : endDate;
});
handlebars_1.default.registerHelper("splitLines", function (text) {
    if (!text)
        return [];
    return text.split("\n");
});
