const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

function countPages(pdfPath) {
  const data = fs.readFileSync(pdfPath, "utf8");
  // count page objects: /Type /Page (not /Pages)
  const re = /\/Type\s*\/Page[^s]/g;
  const matches = data.match(re) || [];
  return matches.length;
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const url = "file:///" + path.resolve(__dirname, "public/resume/resume.html").replace(/\\/g, "/");
  await page.goto(url, { waitUntil: "networkidle" });
  const out = path.resolve(__dirname, "public/resume/Ishant_Goyal_Resume.pdf");
  await page.pdf({ path: out, format: "A4", printBackground: true });
  await browser.close();

  const pages = countPages(out);
  console.log(`PDF written: ${out} (${(fs.statSync(out).size / 1024).toFixed(0)} KB)`);
  console.log(`Page count: ${pages}`);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
