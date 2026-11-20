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

async function checkLead(page, label, exactLines = false) {
  const lines = await renderedLines(page.locator('#hero .mp-sub'));
  assert.equal(lines.join(' '), "The pace of change is intense. I'm here to help.", label);
  assert(lines.at(-1).endsWith("I'm here to help."), label + ' split the final phrase: ' + lines.join(' | '));
  if (exactLines) assert.deepEqual(lines, ['The pace of change is intense.', "I'm here to help."], label + ' did not keep the two thoughts on separate lines');
  const hierarchy = await page.locator('#hero .mp-sub').evaluate(element => {
    const context = element.querySelector('.mp-context');
    const promise = element.querySelector('.mp-promise');
    return {
      context: parseFloat(getComputedStyle(context).fontSize),
      promise: parseFloat(getComputedStyle(promise).fontSize),
      routeIsGrouped: element.closest('.mp-decision')?.querySelector('.mr-route') !== null,
      bridgeWidth: element.closest('.mp-decision')?.querySelector('.mp-bridge')?.getBoundingClientRect().width ?? 0,
    };
  });
  assert(hierarchy.promise >= hierarchy.context * 1.45, label + ' lost the editorial type hierarchy');
  assert(hierarchy.routeIsGrouped, label + ' separated the reassurance from the route selector');
  assert(hierarchy.bridgeWidth >= 40, label + ' lost the copper bridge into the selector');
}

async function checkChannelArtwork(page, label) {
  const photo = page.locator('#build [data-id="channel"] .head .bg');
  await photo.scrollIntoViewIfNeeded();
  const faceInFrame = await photo.evaluate(async image => {
    await image.decode();
    const { width, height } = image.getBoundingClientRect();
    const style = getComputedStyle(image);
    const scale = style.objectFit === 'contain' ? Math.min : Math.max;
    const paintedWidth = image.naturalWidth * scale(width / image.naturalWidth, height / image.naturalHeight);
    const left = (width - paintedWidth) * parseFloat(style.objectPosition) / 100;
    // The entire head spans 74.7% to 87.1% of the original panoramic photograph.
    return left + paintedWidth * .747 >= 0 && left + paintedWidth * .871 <= width;
  });
  assert(faceInFrame, label + ' cropped the robot’s head out of the Make Your Mind Up card');
}

// Sample the actual animated mask halfway through each turn. Checking the end states
// alone would also pass a return button that jumped straight back to the portrait.
const sampleFold = stage => stage.evaluate(async element => {
  const cut = () => parseFloat(getComputedStyle(element).getPropertyValue('--peel-cut'));
  const start = cut();
  element.querySelector('.pv-trigger').click();
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  const wipe = element.getAnimations().find(animation => animation.transitionProperty === '--peel-cut');
  if (!wipe) throw new Error('The corner did not animate the photograph mask');
  const duration = wipe.effect.getTiming().duration;
  wipe.pause();
  wipe.currentTime = duration / 2;
  const middle = cut();
  wipe.finish();
  return { start, middle, end:cut(), duration };
});

try {
  browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const [width, height, mobile] of [[320,568,true],[360,640,true],[375,667,true],[390,844,true],
    [412,915,true],[430,932,true],[540,800,true],[767,1024,true],[980,1750,true],[1024,768,false],[1440,880,false]]) {
    const context = await browser.newContext({ viewport:{width,height}, hasTouch:mobile, isMobile:mobile, reducedMotion:'reduce' });
    await context.addInitScript(() => sessionStorage.setItem('kr-loaded', '1'));
    let holdContactRequest;
    const contactRequested = new Promise(resolve => { holdContactRequest = resolve; });
    await context.route('**/*', route => {
      const url = new URL(route.request().url());
      if (url.origin !== origin) return route.fulfill({ status:204 });
      if (url.pathname === '/api/contact') return holdContactRequest(route);
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
        await checkLead(page, width + 'px portrait', true);
        const enlarged = await page.addStyleTag({ content:'html { font-size:125% } #hero .mp-sub {font-family:Arial,sans-serif}' });
        await checkLead(page, width + 'px enlarged fallback font');
        await enlarged.evaluate(el => el.remove());
      } else await checkLead(page, width + 'px desktop', true);
      assert.equal(await page.locator('#hero .mr-index').count(), 6);
      assert.equal(await page.locator('#hero .mr-index[type="button"]').count(), 6);
      assert.deepEqual(await page.locator('#hero .mr-index').allTextContents(),
        ['Media','Immersion','Sprint','Ongoing','Audit','Modules']);
      assert.equal(await page.locator('#hero .mr-route').getAttribute('data-current'), 'media');
      assert.equal(await page.locator('#hero .mr-controls').count(), 0);
      assert.equal(await page.locator('.home > header').count(), 0);
      assert.equal(await page.locator('#hero').getByText('Leaders I work best with').count(), 0);
      const fit = page.locator('#build .engagement-fit');
      assert.deepEqual(await fit.getByRole('list', { name:'Leaders I work best with' }).getByRole('listitem').allTextContents(),
        ['curious','determined to evolve','strong standards','imaginative','could 10x if they had the fuel to']);
      assert.match(await fit.locator('p').innerText(), /creative, media & entertainment technologies\./);
      if (mobile) {
        assert.notEqual((await renderedLines(fit.locator('#engagement-fit-label'))).at(-1), 'with');
        const chipRows = await fit.locator('li').evaluateAll(items => new Set(items.map(item => Math.round(item.getBoundingClientRect().top))).size);
        assert.equal(chipRows, 2, width + 'px rendered the qualities across ' + chipRows + ' rows');
      }
      assert.equal(await page.locator('#hero').getByText(/creative, media & entertainment technologies/).count(), 0);
      await open.click();
      const back = stage.getByRole('button',{name:'Back to portrait'});
      assert.equal(await back.getAttribute('aria-expanded'), 'true');
      assert.equal(await stage.locator('.pv-portrait-peek').evaluate(el => getComputedStyle(el).opacity), '1');
      await back.click();
      assert.equal(await open.getAttribute('aria-expanded'), 'false');
      await open.click();
      await stage.getByRole('button',{name:'The Taste & Judgement Engine'}).click();
      assert.equal(await stage.locator('.item.on h2').textContent(),'The Taste & Judgement Engine');
      if (mobile) await checkLead(page, width + 'px revealed');
      await page.keyboard.press('Escape');
      assert(await open.evaluate(el => el === document.activeElement));
      if (width === 390 || width === 1440) {
        await page.mouse.move(0, 0);
        await page.emulateMedia({ reducedMotion:'no-preference' });
        const forward = await sampleFold(stage);
        const reverse = await sampleFold(stage);
        assert(forward.start < forward.middle && forward.middle < forward.end, 'Open must peel towards the portrait corner');
        assert(reverse.start > reverse.middle && reverse.middle > reverse.end, 'Return must follow the same diagonal back');
        assert.equal(forward.duration, reverse.duration);
        await page.emulateMedia({ reducedMotion:'reduce' });
        const artwork = {};
        for (const id of ['modules','media','sprint']) {
          await page.locator(`#hero .mr-index[data-route="${id}"]`).focus();
          artwork[id] = await page.locator(`#hero .mr-${id} img`).evaluate(async img => { await img.decode(); return img.currentSrc; });
        }
        assert.equal(artwork.modules, artwork.sprint);
        assert.notEqual(artwork.media, artwork.sprint);
      }
      if (width === 390) {
        await page.emulateMedia({ reducedMotion:'no-preference' });
        await page.locator('#hero .mr-route').scrollIntoViewIfNeeded();
        await page.locator('#hero [data-route="modules"].mr-index').click();
        await page.mouse.move(0, 0);
        await page.locator('#hero .mr-route').evaluate(el => el.setAttribute('data-rotating', ''));
        assert.equal(await page.locator('#hero .mr-current span').evaluate(el => getComputedStyle(el, '::after').animationName), 'mr-progress');
        await page.locator('#hero .mr-route').evaluate(el => el.removeAttribute('data-rotating'));
        await page.emulateMedia({ reducedMotion:'reduce' });
      }
      const routeUrl = page.url();
      await page.locator('#hero [data-route="immersion"].mr-index').click();
      assert.equal(page.url(), routeUrl);
      assert.equal(await page.locator('#hero .mr-mainlink').getAttribute('data-route'), 'immersion');
      await page.locator('#hero .mr-mainlink').click();
      const sessionContact = page.locator('#lightning-lessons').getByRole('button',{name:'Get in touch'});
      await sessionContact.evaluate(el => el.scrollIntoView({ block:'center' }));
      await page.waitForTimeout(900);
      await sessionContact.evaluate(el => el.click());
      const dialog = page.getByRole('dialog');
      assert.equal(await dialog.locator('.mr-context').textContent(),'AI Immersion Session');
      assert.equal(await dialog.locator('.mr-emailto strong').innerText(),'krish@mindmake.co');
      const contactRoute = await contactRequested;
      const submit = dialog.locator('button[type=submit]');
      assert.equal(await submit.innerText(), 'Send enquiry');
      assert(await submit.isDisabled(), 'An unresolved delivery check must not open an email app');
      const direct = width === 390 || !mobile;
      if (width === 320) await contactRoute.abort();
      else await contactRoute.fulfill({ json:{ available:direct } });
      await page.waitForFunction(() => document.querySelector('dialog button[type=submit]')?.disabled === false);
      assert.equal(await submit.innerText(), direct ? 'Send enquiry' : 'Open in email');
      await page.keyboard.press('Escape');
      await checkChannelArtwork(page, width + 'px');
      console.log(width + '×' + height + ' hero passed');
    } finally {
      await context.close();
    }
  }
} finally {
  await browser?.close();
  await server.close();
}
