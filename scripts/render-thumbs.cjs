const { chromium } = require('playwright'); const fs=require('fs');
(async()=>{const items=JSON.parse(fs.readFileSync(process.argv[2]));const out=process.argv[3];
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:720}});
for(const it of items){await p.goto('http://127.0.0.1:4182/render.html?d='+encodeURIComponent(JSON.stringify(it)));await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(150);
await p.screenshot({path:`${out}/${it.id}.png`});}
await b.close();})();
