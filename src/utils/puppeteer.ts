import puppeteer from "puppeteer";

export async function generatePdf(html: string): Promise<Buffer> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
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
