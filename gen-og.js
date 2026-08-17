// Generates public/og.png — a branded 1200x630 social/Google card.
// The PORTRAIT PHOTO is the dominant centerpiece (Google crops the center
// of the og:image as the search-result thumbnail), with the logo and name
// around it. Regenerate with: node gen-og.js
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
    background: radial-gradient(1200px 700px at 12% 8%, #1b1035 0%, #0a0618 55%, #05030d 100%);
    color: #fff;
    position: relative;
  }
  .blob { position: absolute; border-radius: 50%; filter: blur(90px); opacity: 0.5; }
  .b1 { width: 480px; height: 480px; left: -140px; top: -170px; background: #7c3aed; }
  .b2 { width: 440px; height: 440px; right: -150px; bottom: -190px; background: #f59e0b; opacity: 0.38; }
  .b3 { width: 400px; height: 400px; right: 330px; top: -150px; background: #ec4899; opacity: 0.32; }
  .grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(139,92,246,0.09) 1px, transparent 1px),
      linear-gradient(90deg, rgba(139,92,246,0.09) 1px, transparent 1px);
    background-size: 44px 44px;
    mask-image: radial-gradient(ellipse 95% 95% at 40% 45%, black, transparent 78%);
  }
  .card { position: relative; z-index: 2; height: 100%; }

  /* Left column: logo + name + pills + links */
  .left {
    position: absolute; left: 60px; top: 0; bottom: 0;
    width: 520px; display: flex; flex-direction: column; justify-content: center;
  }
  .logo {
    width: 128px; height: 128px; border-radius: 26px;
    box-shadow: 0 0 0 3px rgba(251,191,36,0.35), 0 18px 50px rgba(124,58,237,0.5);
    transform: rotate(-4deg); margin-bottom: 26px;
  }
  .pills { display: flex; gap: 9px; margin-bottom: 16px; flex-wrap: wrap; }
  .pill {
    padding: 6px 14px; border-radius: 999px; font-size: 14px; font-weight: 700; color: #fff;
    box-shadow: 0 4px 16px rgba(0,0,0,0.35); white-space: nowrap;
  }
  .p1 { background: linear-gradient(90deg,#06b6d4,#2563eb); }
  .p2 { background: linear-gradient(90deg,#f59e0b,#e11d48); }
  .p3 { background: linear-gradient(90deg,#a855f7,#7c3aed); }
  h1 {
    font-size: 58px; font-weight: 800; letter-spacing: -1.5px; line-height: 1.05; white-space: nowrap;
  }
  h1 span { background: linear-gradient(90deg,#fbbf24,#fb7185,#a78bfa); -webkit-background-clip: text; background-clip: text; color: transparent; }
  .tag { margin-top: 14px; font-size: 18px; color: #cbd5e1; font-weight: 500; line-height: 1.5; max-width: 480px; }
  .divider { margin: 20px 0; width: 100%; height: 1px; background: linear-gradient(90deg, rgba(251,191,36,0.6), rgba(124,58,237,0.15), transparent); }
  .sites { display: flex; flex-direction: column; gap: 5px; font-size: 14px; color: #94a3b8; line-height: 1.3; }
  .sites b { color: #fbbf24; font-weight: 600; }

  /* Right: LARGE portrait — centerpiece */
  .photo-wrap {
    position: absolute; right: 90px; top: 50%; transform: translateY(-50%);
    width: 460px; height: 460px; border-radius: 50%; padding: 8px;
    background: conic-gradient(from 0deg, #fbbf24, #ec4899, #8b5cf6, #06b6d4, #fbbf24);
    box-shadow: 0 30px 90px rgba(236,72,153,0.5);
  }
  .photo { width: 100%; height: 100%; border-radius: 50%; object-fit: cover; object-position: top; }
  .glow {
    position: absolute; right: 40px; top: 50%; transform: translateY(-50%);
    width: 560px; height: 560px; border-radius: 50%;
    background: radial-gradient(circle, rgba(251,191,36,0.28), rgba(236,72,153,0.18) 40%, transparent 70%);
    filter: blur(30px);
  }
</style>
</head>
<body>
  <div class="blob b1"></div>
  <div class="blob b2"></div>
  <div class="blob b3"></div>
  <div class="grid"></div>
  <div class="card">
    <div class="glow"></div>
    <div class="left">
      <img class="logo" src="file:///REPLACE_LOGO" alt="IG" />
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
    <div class="photo-wrap">
      <img class="photo" src="file:///REPLACE_PHOTO" alt="Ishant Goyal" />
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
