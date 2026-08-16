const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const os = require("os");

const FF = require("ffmpeg-static");
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "aud-"));

const n = (m) => 440 * Math.pow(2, (m - 69) / 12);
const CH = (r, t, f) => [n(r), n(t), n(f)].map((x) => +x.toFixed(3));

const chords = {
  Am: CH(45, 60, 64),
  F: CH(53, 57, 60),
  C: CH(48, 52, 55),
  G: CH(43, 47, 50),
  Dm: CH(50, 53, 57),
  Bb: CH(46, 50, 53),
  Em: CH(40, 43, 47),
  D: CH(38, 42, 45),
  Gm: CH(43, 46, 50),
  A: CH(33, 37, 40),
  "F#m": CH(30, 33, 37),
  E: CH(28, 32, 35),
};

// unique progression + mood per video (7 different songs)
const tracks = {
  "online-clock": {
    prog: ["Am", "F", "C", "G"],
    pluckGap: 3.0,
    pluckStart: 0.5,
    bassStep: 0.9,
    tremolo: 0.3,
    vibrato: 5.2,
    echo: "0.8:0.7:70|140:0.22|0.13",
    melodyOct: 2,
  },
  "multi-agent": {
    prog: ["C", "G", "Am", "F"],
    pluckGap: 2.5,
    pluckStart: 1.0,
    bassStep: 0.6,
    tremolo: 0.45,
    vibrato: 6,
    echo: "0.8:0.7:55|110:0.26|0.16",
    melodyOct: 2,
  },
  "room-sathi": {
    prog: ["Dm", "Bb", "F", "C"],
    pluckGap: 3.3,
    pluckStart: 0.75,
    bassStep: 1.0,
    tremolo: 0.26,
    vibrato: 4.6,
    echo: "0.8:0.7:80|160:0.2|0.12",
    melodyOct: 1,
  },
  astroknowledge: {
    prog: ["Em", "C", "G", "D"],
    pluckGap: 3.6,
    pluckStart: 1.5,
    bassStep: 1.1,
    tremolo: 0.24,
    vibrato: 4.2,
    echo: "0.8:0.7:90|180:0.24|0.14",
    melodyOct: 1,
  },
  "lohiya-suppliers": {
    prog: ["F", "C", "Gm", "Bb"],
    pluckGap: 2.9,
    pluckStart: 1.25,
    bassStep: 0.75,
    tremolo: 0.4,
    vibrato: 5.5,
    echo: "0.8:0.7:60|120:0.25|0.15",
    melodyOct: 2,
  },
  "dream-mantra": {
    prog: ["G", "Em", "C", "D"],
    pluckGap: 3.1,
    pluckStart: 2.0,
    bassStep: 0.85,
    tremolo: 0.48,
    vibrato: 6.4,
    echo: "0.8:0.7:65|130:0.21|0.12",
    melodyOct: 1,
  },
  "dream-mantra-crm": {
    prog: ["A", "F#m", "D", "E"],
    pluckGap: 2.7,
    pluckStart: 1.75,
    bassStep: 0.65,
    tremolo: 0.52,
    vibrato: 5.8,
    echo: "0.8:0.7:50|100:0.27|0.17",
    melodyOct: 2,
  },
};

function buildSegExpr(progIndex, chord, t) {
  const [r, tf, f] = chords[chord];
  const DUR = 16;
  const env = (x) => `min(t/${x},1)*min((${DUR}-t)/${x},1)`;
  const vib = t.vibrato;
  const mult = Math.pow(2, t.melodyOct);

  const parts = [
    // warm pad
    `0.09*sin(2*PI*${r}*t)*${env(2.5)}`,
    `0.09*sin(2*PI*${tf}*t)*${env(2.5)}`,
    `0.09*sin(2*PI*${f}*t)*${env(2.5)}`,
    `0.05*sin(2*PI*${(r / 4).toFixed(3)}*t)*${env(2.5)}`,
  ];

  // rhythmic bass groove — root & fifth alternating at the track's tempo
  {
    let b0 = 0.3 + progIndex * 0.2;
    let bi = 0;
    while (b0 < DUR - 0.5) {
      const note = bi % 2 === 0 ? r / 2 : f / 2;
      parts.push(
        `0.1*sin(2*PI*${note.toFixed(3)}*(t-${b0.toFixed(2)}))*exp(-4.5*(t-${b0.toFixed(2)}))*gte(t,${b0.toFixed(2)})`
      );
      if (bi % 4 === 1) {
        parts.push(
          `0.04*sin(2*PI*${(r / 4).toFixed(3)}*(t-${b0.toFixed(2)}))*exp(-3.5*(t-${b0.toFixed(2)}))*gte(t,${b0.toFixed(2)})`
        );
      }
      b0 += t.bassStep;
      bi++;
    }
  }

  // melodic plucks — note sequence unique per chord position, with vibrato
  const seq = [r * mult, tf * mult, f * mult, r * mult * 2, f * mult, tf * mult * 2, r * mult, f * mult * 2];
  let t0 = t.pluckStart + progIndex * 0.4;
  let i = 0;
  while (t0 < DUR - 1.2) {
    const note = seq[i % seq.length];
    const fm = `(1+0.006*sin(2*PI*${vib}*(t-${t0.toFixed(2)})))`;
    parts.push(
      `0.13*sin(2*PI*${note.toFixed(3)}*${fm}*(t-${t0.toFixed(2)}))*exp(-2.2*(t-${t0.toFixed(2)}))*(1+0.2*sin(2*PI*${vib}*(t-${t0.toFixed(2)})))*gte(t,${t0.toFixed(2)})`
    );
    t0 += t.pluckGap;
    i++;
  }
  return parts.join("+");
}

function run(args) {
  execFileSync(FF, args, { stdio: "pipe" });
}

(async () => {
  const videoDir = path.resolve(__dirname, "public/videos");
  const files = fs.readdirSync(videoDir).filter((f) => f.endsWith(".webm"));
  for (const file of files) {
    const name = file.replace(".webm", "");
    const t = tracks[name];
    if (!t) {
      console.log(`skip ${name} (no track config)`);
      continue;
    }
    console.log(`[${name}] building song (${t.prog.join("-")})...`);
    const segs = [];
    t.prog.forEach((chord, i) => {
      const expr = buildSegExpr(i, chord, t);
      const wav = path.join(TMP, `${name}-${i}.wav`);
      run(["-y", "-v", "error", "-f", "lavfi", "-i", `aevalsrc='${expr}':s=44100:d=16`, "-c:a", "pcm_s16le", wav]);
      segs.push(wav);
    });
    const music = path.join(TMP, `${name}-music.wav`);
    const inputs = segs.flatMap((s) => ["-i", s]);
    const ins = segs.map((_, i) => `[${i}:a]`).join("");
    run([
      "-y", "-v", "error",
      ...inputs,
      "-filter_complex",
      `${ins}concat=n=${segs.length}:v=0:a=1,tremolo=f=${t.tremolo}:d=0.35,aecho=${t.echo},volume=1.15[out]`,
      "-map", "[out]", "-c:a", "pcm_s16le", music,
    ]);
    const tmpOut = path.join(videoDir, `${name}.tmp.webm`);
    run([
      "-y", "-v", "error",
      "-i", path.join(videoDir, file),
      "-i", music,
      "-map", "0:v", "-map", "1:a",
      "-c:v", "copy", "-c:a", "libopus", "-b:a", "96k", "-shortest",
      tmpOut,
    ]);
    fs.renameSync(tmpOut, path.join(videoDir, file));
    console.log(`[${name}] muxed ✓`);
  }
  fs.rmSync(TMP, { recursive: true, force: true });
  console.log("ALL DONE");
})().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
