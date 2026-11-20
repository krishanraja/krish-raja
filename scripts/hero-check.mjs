import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { preview } from 'vite';

// Use the built site's real CSS, fonts and both React trees. No external services are needed.
const server = await preview({ configFile: false, preview: { host: '127.0.0.1', port: 0 } });
const origin = 'http://127.0.0.1:' + server.httpServer.address().port;
let browser;

/** Read the physical line that each word occupies, including copy that spans DOM nodes. */
const renderedLines = paragraph => paragraph.evaluate(element => {
  const lines = [];
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    for (const match of node.textContent.matchAll(/\S+/g)) {
      const range = document.createRange();
      range.setStart(node, match.index);
      range.setEnd(node, match.index + match[0].length);
      const rect = range.getBoundingClientRect();
      const previous = lines.at(-1);
      if (previous && Math.abs(rect.top - previous.y) < 1) previous.words.push(match[0]);
      else lines.push({ y: rect.top, words: [match[0]] });
    }
  }
  return lines.map(line => line.words.join(' '));
});

async function checkLead(page, label) {
  const lines = await renderedLines(page.locator('#hero .mp-sub'));
  assert.equal(lines.join(' '), "The pace of change is intense. I'm here to help.", label);
  assert(lines.at(-1).endsWith("I'm here to help."), label + ' split the final phrase: ' + lines.join(' | '));
}

try {
  browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const [width, height, mobile] of [[320,568,true],[360,640,true],[375,667,true],[390,844,true],
    [412,915,true],[430,932,true],[540,800,true],[767,1024,true],[980,1750,true],[1024,768,false],[1440,880,false]]) {
    const context = await browser.newContext({ viewport:{width,height}, hasTouch:mobile, isMobile:mobile, reducedMotion:'reduce' });
    await context.addInitScript(() => sessionStorage.setItem('kr-loaded', '1'));
    await context.route('**/*', route => {
      const url = new URL(route.request().url());
      if (url.origin !== origin) return route.fulfill({ status:204 });
      if (url.pathname.startsWith('/api/')) return route.fulfill({ json:{ available:false } });
      return route.continue();
    });
    const page = await context.newPage();
    try {
      await page.goto(origin);
      const stage = page.locator('#how-i-operate');
      const open = stage.getByRole('button', { name:'Open my brain' });
      await open.waitFor();
      await page.evaluate(() => document.fonts.ready);
      if (mobile) {
        await checkLead(page, width + 'px portrait');
        const enlarged = await page.addStyleTag({ content:'html { font-size:125% } #hero .mp-sub {font-family:Arial,sans-serif}' });
        await checkLead(page, width + 'px enlarged fallback font');
        await enlarged.evaluate(el => el.remove());
      }
      assert.equal(await page.locator('#hero .mr-index').count(), 6);
      assert.equal(await page.locator('#hero .mp-qualities li').count(), 4);
      await open.click();
      await stage.getByRole('button',{name:'The Taste & Judgement Engine'}).click();
      assert.equal(await stage.locator('.item.on h2').textContent(),'The Taste & Judgement Engine');
      if (mobile) await checkLead(page, width + 'px revealed');
      await page.keyboard.press('Escape');
      assert(await open.evaluate(el => el === document.activeElement));
      await page.locator('#hero [data-route="immersion"].mr-index').click();
      await page.locator('#lightning-lessons').getByRole('button',{name:'Get in touch'}).click();
      const dialog = page.getByRole('dialog');
      assert.equal(await dialog.locator('.mr-context').textContent(),'AI Immersion Session');
      assert.equal(await dialog.locator('.mr-emailto strong').innerText(),'krish@mindmake.co');
      await page.keyboard.press('Escape');
      console.log(width + '×' + height + ' hero passed');
    } finally {
      await context.close();
    }
  }
} finally {
  await browser?.close();
  await server.close();
}
