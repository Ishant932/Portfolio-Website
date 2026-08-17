// Generates public/og.png — a branded 1200x630 social/Google card with the
// logo and portrait, replacing the old stale site screenshot.
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const OUT = path.resolve(__dirname, "public/og.png");

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body {
    font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    background: radial-gradient(1200px 700px at 15% 10%, #1b1035 0%, #0a0618 55%, #05030d 100%);
    color: #fff;
    position: relative;
  }
  /* aurora blobs */
  .blob { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.55; }
  .b1 { width: 460px; height: 460px; left: -120px; top: -160px; background: #7c3aed; }
  .b2 { width: 420px; height: 420px; right: -140px; bottom: -180px; background: #f59e0b; opacity: 0.4; }
  .b3 { width: 380px; height: 380px; right: 340px; top: -140px; background: #ec4899; opacity: 0.35; }
  .grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(139,92,246,0.09) 1px, transparent 1px),
      linear-gradient(90deg, rgba(139,92,246,0.09) 1px, transparent 1px);
    background-size: 44px 44px;
    mask-image: radial-gradient(ellipse 90% 90% at 30% 40%, black, transparent 75%);
  }
  .card { position: relative; z-index: 2; height: 100%; display: flex; align-items: center; gap: 44px; padding: 0 64px; }
  .logo {
    width: 260px; height: 260px; border-radius: 34px; flex-shrink: 0;
    box-shadow: 0 0 0 3px rgba(251,191,36,0.35), 0 24px 70px rgba(124,58,237,0.5);
    transform: rotate(-4deg);
  }
  .right { flex: 1; min-width: 0; }
  .pills { display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap; }
  .pill {
    padding: 7px 16px; border-radius: 999px; font-size: 15px; font-weight: 700; color: #fff;
    box-shadow: 0 4px 18px rgba(0,0,0,0.35); white-space: nowrap;
  }
  .p1 { background: linear-gradient(90deg,#06b6d4,#2563eb); }
  .p2 { background: linear-gradient(90deg,#f59e0b,#e11d48); }
  .p3 { background: linear-gradient(90deg,#a855f7,#7c3aed); }
  h1 {
    font-size: 62px; font-weight: 800; letter-spacing: -1.5px; line-height: 1.05; white-space: nowrap;
  }
  h1 span { background: linear-gradient(90deg,#fbbf24,#fb7185,#a78bfa); -webkit-background-clip: text; background-clip: text; color: transparent; }
  .tag { margin-top: 14px; font-size: 20px; color: #cbd5e1; font-weight: 500; line-height: 1.45; }
  .divider { margin: 20px 0; width: 100%; height: 1px; background: linear-gradient(90deg, rgba(251,191,36,0.6), rgba(124,58,237,0.15), transparent); }
  .sites { display: flex; flex-direction: column; gap: 5px; font-size: 14.5px; color: #94a3b8; line-height: 1.3; }
  .sites b { color: #fbbf24; font-weight: 600; }
  .photo-wrap {
    width: 190px; height: 190px; border-radius: 50%; padding: 5px; flex-shrink: 0;
    background: conic-gradient(from 0deg, #fbbf24, #ec4899, #8b5cf6, #06b6d4, #fbbf24);
    box-shadow: 0 20px 60px rgba(236,72,153,0.45);
    margin-left: 6px;
  }
  .photo { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; object-position: top; }
  .photo-col { display: flex; align-items: center; }
</style>
</head>
<body>
  <div class="blob b1"></div>
  <div class="blob b2"></div>
  <div class="blob b3"></div>
  <div class="grid"></div>
  <div class="card">
    <img class="logo" src="file:///REPLACE_LOGO" alt="IG" />
    <div class="right">
      <div class="pills">
        <span class="pill p1">Full Stack Developer</span>
        <span class="pill p2">Software Developer</span>
        <span class="pill p3">AI Specialist</span>
      </div>
      <h1>Ishant <span>Goyal</span></h1>
      <p class="tag">BIG DREAMS, BOLD STEPS — building scalable full-stack &amp; AI products from Jaipur, India.</p>
      <div class="divider"></div>
      <div class="sites">
        <span><b>ishant.in</b> · github.com/Ishant932</span>
        <span>linkedin.com/in/ishant-goyal-740b31290</span>
      </div>
    </div>
    <div class="photo-col">
      <div class="photo-wrap">
        <img class="photo" src="file:///REPLACE_PHOTO" alt="Ishant Goyal" />
      </div>
    </div>
  </div>
</body>
</html>`;

(async () => {
  const logo = path.resolve(__dirname, "public/logo.png").replace(/\\/g, "/");
  const photo = path.resolve(__dirname, "public/images/ishant-photo.png").replace(/\\/g, "/");
  const doc = html.replace(/REPLACE_LOGO/g, logo).replace(/REPLACE_PHOTO/g, photo);

  const tmpHtml = path.join(__dirname, ".og-tmp.html");
  fs.writeFileSync(tmpHtml, doc);

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto("file:///" + tmpHtml.replace(/\\/g, "/"), { waitUntil: "networkidle" });
  await page.screenshot({ path: OUT, type: "png" });
  await browser.close();
  fs.unlinkSync(tmpHtml);

  const size = fs.statSync(OUT).size;
  console.log(`og.png written: ${(size / 1024).toFixed(0)} KB (1200x630)`);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
