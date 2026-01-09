import Handlebars from "handlebars";

Handlebars.registerHelper("presentOrEnd", function (
  current: boolean,
  endDate: string
) {
  return current ? "Present" : endDate;
});

Handlebars.registerHelper("splitLines", function (text: string) {
  if (!text) return [];
  return text.split("\n");
});
