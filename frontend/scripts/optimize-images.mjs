
import sharp from 'sharp';
import { mkdir, writeFile, readFile } from 'node:fs/promises';

const OUT = 'src/assets/images';
await mkdir(OUT, { recursive: true });

// Paste the two imgSrc URLs from ProductCategories.jsx (the "Sluice & Penstock Gates" and
// "Industrial Fasteners (Nuts & Bolts)" entries) into the two PASTE placeholders. Do not retype them.
const SOURCES = {
  hero: {
    src: 'https://storage.googleapis.com/sk-enterprise/Website-hero-image/Website%20Image.jpeg',
    widths: [640, 1024, 1600], quality: 55, grade: true,
  },
  'category-gates':     { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1594uho43a3cuCVydJzh008X1-g568knhcOZefes_Rd3-DiSbTi-Jl_aJiDTN7iK4VMuABtzyNRXMh-xmQ32TR4C-DOcAHv0SfxE88pcxCceBXsQ5KZYBeS-5yBdgiECUuspNGKlQqvHdiTboe8l6hZ39hLEzNO0wLsdZ7ga5Pn4O_SGxH7yieGuXNKi6eGbpKNxj5G6ReOm83Mh9LpY3KhuMfMokm0fgnzxNOO8sslFOKEK-Lw0aoQseMfyeAMRkCIYKNRFyu3NJ', widths: [480, 800, 1200], quality: 72 },
  'category-fasteners': { src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbPCyFRH3D1Q5M0N1M1KRPN2tU609t1lITfRe2oP89QxULoeC2btZVjvY9Ckkkt8qXykD7mayKRR1QIxsgfbp-JU629tvcIBmNP07KJqsVrxnfvd3n4PbEU8ezlJvHe2XZnSZTSI0sOUrjeaOxiBpse8SuLzDxpFg0Cd_vZeRHFCfitiTAwcso0Qzt8zqrN7OCyob7mv-CKQ4Csg_zMVyK1jVc-4GkcHhdA9RDxstwCslzvZOVkmYGP_2bZaP7cCT1OS7SmLeQfz5Z', widths: [480, 800, 1200], quality: 72 },
};

for (const [name, cfg] of Object.entries(SOURCES)) {
  const res = await fetch(cfg.src);
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
  const input = Buffer.from(await res.arrayBuffer());
  const meta = await sharp(input).metadata();
  console.log(`${name}: source ${meta.width}x${meta.height}, ${(input.length / 1024).toFixed(0)} KB`);
  for (const w of cfg.widths) {
    let img = sharp(input).resize({ width: w, withoutEnlargement: true });
    // The hero used CSS `contrast-105 saturate-125`. Bake it in so no CSS filter runs while scrolling.
    if (cfg.grade) img = img.modulate({ saturation: 1.25 }).linear(1.05, -6.4);
    const buf = await img.webp({ quality: cfg.quality, effort: 5 }).toBuffer();
    await writeFile(`${OUT}/${name}-${w}.webp`, buf);
    console.log(`  ${name}-${w}.webp  ${(buf.length / 1024).toFixed(0)} KB`);
  }
}

// Navbar logo: 400x400 JPEG shown at about 33x33
const logo = await readFile('public/logo.jpg');
const logoBuf = await sharp(logo).resize(96, 96).webp({ quality: 85
  
 }).toBuffer();
await writeFile(`${OUT}/logo-96.webp`, logoBuf);
console.log(`logo-96.webp  ${(logoBuf.length / 1024).toFixed(1)} KB`);
