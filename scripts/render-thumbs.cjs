/**
 * Renders the designed In public thumbnails (public/media/thumbs/<id>.webp).
 *
 * The design is public/files/thumbs/render.html; items.json lists each card's
 * text and photo. This screenshots one 1280x720 PNG per item, which then get
 * converted to WebP in public/media/thumbs/.
 *
 *   (cd public/files/thumbs && python3 -m http.server 4182) &
 *   node scripts/render-thumbs.cjs public/files/thumbs/items.json <out-dir>
 *
 * Run by hand when an appearance gets a designed thumbnail (the `thumb` field
 * in appearances.ts).
 */
const { chromium } = require('playwright'); const fs=require('fs');
(async()=>{const items=JSON.parse(fs.readFileSync(process.argv[2]));const out=process.argv[3];
const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH??'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
for(const it of items){await p.goto('http://127.0.0.1:4182/render.html?d='+encodeURIComponent(JSON.stringify(it)));await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(150);
await p.screenshot({path:`${out}/${it.id}.png`});}
await b.close();})();
