import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'node:net';
import { chromium } from 'playwright-core';

const port = await new Promise((resolve, reject) => {
  const probe = createServer();
  probe.on('error', reject);
  probe.listen(0, '127.0.0.1', () => { const port = probe.address().port; probe.close(() => resolve(port)); });
});
const base = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', String(port), '-H', '127.0.0.1'], { stdio: ['ignore', 'pipe', 'pipe'] });
let serverLog = '';
server.stdout.on('data', data => { serverLog += data; });
server.stderr.on('data', data => { serverLog += data; });
const directory = '.artifacts/implementation';
const differences = {};
let reference;
try { reference = JSON.parse(await readFile('.artifacts/reference/measurements.json', 'utf8')); } catch { /* optional live reference capture */ }
let browser;
try {
  let ready = false;
  for (let attempt = 0; attempt < 80; attempt++) {
    if (server.exitCode !== null) throw new Error(serverLog);
    try { if ((await fetch(base)).ok) { ready = true; break; } } catch { /* startup */ }
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  assert(ready, 'Preview server did not start');
  browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome', headless: true });
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  page.setDefaultTimeout(10000);
  const errors = [];
  const external = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('request', request => { if (/^https?:/.test(request.url()) && !request.url().startsWith(base)) external.push(request.url()); });
  await mkdir(directory, { recursive: true });

  for (const [name, width, height] of [['desktop',1440,900],['mobile',390,844],['320',320,568],['768',768,1024],['1024',1024,768],['1280',1280,720],['1920',1920,1080]]) {
    await page.setViewportSize({ width, height });
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2300);
    await page.screenshot({ path: `${directory}/home-${name}.png`, fullPage: true });
    const actual = await page.evaluate(() => ({
      height: document.querySelector('.hero').getBoundingClientRect().bottom,
      width: document.documentElement.scrollWidth,
      elements: [...document.querySelectorAll('.hero, .hero h1, .hero p, canvas')].map(element => ({ tag: element.tagName, bounds: element.getBoundingClientRect().toJSON() })),
    }));
    assert.equal(Math.round(actual.height), height, `Hero must fill exactly the first viewport at ${width}×${height}`);
    assert.equal(actual.width, width, `No horizontal overflow at ${width}×${height}`);
    const expected = reference?.[`home-${name}`];
    if (expected) {
      const refElements = expected.elements.filter(element => ['MAIN','H1','P','CANVAS'].includes(element.tag));
      differences[`home-${name}`] = actual.elements.map((element, index) => {
        const ref = refElements[index];
        assert.equal(element.tag, ref.tag);
        const deltas = Object.fromEntries(['x','y','width','height'].map(key => [key, +(element.bounds[key] - ref.bounds[key]).toFixed(3)]));
        return { tag: element.tag, deltas, max: Math.max(...Object.values(deltas).map(Math.abs)) };
      });
    }
  }

  for (const [name, path] of [['careers','/careers'],['privacy','/privacy'],['terms','/terms'],['role','/careers/ml-systems']]) {
    for (const [device, width, height] of [['desktop',1440,900],['mobile',390,844]]) {
      await page.setViewportSize({ width, height });
      await page.goto(base + path, { waitUntil: 'networkidle' });
      await page.screenshot({ path: `${directory}/${name}-${device}.png`, fullPage: true });
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `No overflow: ${name}-${device}`);
      assert(!/Conway|Aster/i.test(await page.locator('body').innerText()), 'No original or previous fictional branding');
      if (name === 'careers' && reference) {
        const actual = await page.locator('main, .career-card, footer').evaluateAll(elements => elements.map(element => ({ tag: element.tagName, bounds: element.getBoundingClientRect().toJSON() })));
        const expected = reference[`careers-${device}`].elements.filter(element => ['MAIN', 'FOOTER'].includes(element.tag) || element.tag === 'A' && element.href?.startsWith('/careers/'));
        differences[`careers-${device}`] = actual.map((element, index) => {
          const deltas = Object.fromEntries(['x','y','width','height'].map(key => [key, +(element.bounds[key] - expected[index].bounds[key]).toFixed(3)]));
          return { tag: element.tag, deltas, max: Math.max(...Object.values(deltas).map(Math.abs)) };
        });
      }
      if (name === 'terms' || name === 'privacy') assert.equal(await page.locator('.legal-section').count(), name === 'terms' ? 13 : 8);
    }
  }

  // Homepage controls retain their actual navigation behavior, not invented modals.
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(base, { waitUntil: 'networkidle' });
  assert.equal(await page.getByRole('link', { name: 'Explore our systems', exact: true }).getAttribute('href'), '#systems');
  assert.equal(await page.getByRole('link', { name: 'View GitHub', exact: true }).getAttribute('href'), 'https://github.com/zen-tradings');
  assert.match(await page.getByRole('link', { name: 'Log In', exact: true }).getAttribute('href'), /^https:\/\/example.com/);
  // Systems loop below the hero: tabs switch stages, anchor scrolls to it.
  await page.getByRole('link', { name: 'Explore our systems', exact: true }).click();
  await page.waitForTimeout(900);
  assert(Math.abs((await page.locator('#systems').boundingBox()).y - 72) < 4, 'Systems section clears sticky header');
  assert.equal(await page.locator('.stage-tools a').count(), 3);
  await page.getByRole('tab', { name: /Deploy/ }).click();
  assert.match(await page.getByRole('tabpanel').innerText(), /Deploy strategies/);
  await page.screenshot({ path: `${directory}/systems-desktop.png`, fullPage: false });
  // Pipeline flowchart below the loop: 8 nodes, 2 decision gates, revealed on scroll.
  await page.locator('#pipeline').scrollIntoViewIfNeeded();
  assert.equal(await page.locator('.flow-node').count(), 8);
  assert.equal(await page.locator('.flow-decision').count(), 2);
  await page.waitForFunction(() => getComputedStyle(document.querySelector('.flow-node:last-child')).opacity === '1');
  await page.screenshot({ path: `${directory}/pipeline-desktop.png`, fullPage: false });
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Careers' }).click();
  await page.waitForURL('**/careers');
  assert.equal(await page.locator('.career-card').count(), 7);
  await page.getByRole('button', { name: 'Research', exact: true }).click();
  assert.equal(await page.locator('.career-card').count(), 2);
  await page.getByRole('button', { name: 'Engineering', exact: true }).click();
  assert.equal(await page.locator('.career-card').count(), 4);
  await page.screenshot({ path: `${directory}/careers-desktop-filtered.png`, fullPage: true });
  await page.getByRole('button', { name: 'Operations', exact: true }).click();
  assert.equal(await page.locator('.career-card').count(), 1);
  await page.getByRole('button', { name: 'All', exact: true }).click();
  await page.locator('.career-card').nth(2).click();
  await page.waitForURL('**/careers/ml-systems');
  await page.getByRole('button', { name: 'Submit Application' }).click();
  assert.equal(await page.locator('input:invalid, textarea:invalid').count(), 4);
  await page.getByLabel('Name*', { exact: true }).fill('Example Person');
  await page.getByLabel('Email*', { exact: true }).fill('person@example.com');
  await page.locator('input[type="file"]').setInputFiles({ name: 'sample.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4\nSample test document') });
  await page.getByLabel('Message*', { exact: true }).fill('This is a local interface test, not a real application.');
  await page.getByRole('button', { name: 'Submit Application' }).click();
  assert.match(await page.getByRole('status').innerText(), /No application or personal information has been sent/);

  await page.goto(base + '/privacy', { waitUntil: 'networkidle' });
  await page.locator('.legal-toc').getByRole('button', { name: 'Security', exact: true }).click();
  assert.equal(new URL(page.url()).hash, '');
  await page.waitForTimeout(1000);
  const section = await page.locator('#security').boundingBox();
  assert(section.y >= 72 && section.y <= 110, 'Anchor clears sticky header');

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base, { waitUntil: 'networkidle' });
  const menuButton = page.getByRole('button', { name: 'Open menu' });
  await menuButton.click();
  const menu = page.getByRole('dialog', { name: 'Navigation' });
  await menu.waitFor({ state: 'visible' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${directory}/menu-mobile.png`, fullPage: true });
  assert.deepEqual(await page.locator('.mobile-links a').allTextContents(), ['Home','Careers','Contact','Log In']);
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press('Tab');
    assert(await menu.evaluate(element => element.contains(document.activeElement)), 'Menu focus is contained');
  }
  await page.keyboard.press('Escape');
  assert.equal(await menu.isVisible(), false);
  assert(await menuButton.evaluate(element => element === document.activeElement), 'Focus returns to trigger');
  await menuButton.click();
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Careers' }).click();
  await page.waitForURL('**/careers');
  assert.equal(await page.evaluate(() => document.body.style.overflow), '');

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(base, { waitUntil: 'networkidle' });
  const canvas = page.locator('canvas').first();
  const still = await canvas.evaluate(element => element.toDataURL());
  await page.waitForTimeout(150);
  assert.equal(await canvas.evaluate(element => element.toDataURL()), still);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.waitForTimeout(150);
  assert.notEqual(await canvas.evaluate(element => element.toDataURL()), still);
  assert.deepEqual(errors, [], 'No browser errors');
  assert.deepEqual(external, [], 'No third-party requests or data submission');

  await writeFile(`${directory}/structural-differences.json`, JSON.stringify(differences, null, 2));
  const maxDifference = Math.max(0, ...Object.values(differences).flat().map(element => element.max));
  const pairs = ['home-desktop','home-mobile','menu-mobile','careers-desktop','careers-mobile','role-desktop','role-mobile','privacy-desktop','privacy-mobile','terms-desktop','terms-mobile'];
  await writeFile('.artifacts/comparison.html', `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Reference / reconstruction comparison</title><style>body{margin:24px;background:#eee;font:14px Arial}h1{font-size:22px}section{margin:32px 0}section>div{display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:start}figure{margin:0}figcaption{padding:8px;background:#fff}img{display:block;width:100%;height:auto;border:1px solid #ccc}</style><h1>Identical viewport comparison</h1><p>Branding, copy, font assets, and generated artwork are intentionally replaced. Geometry is compared separately in implementation/structural-differences.json.</p>${pairs.map(pair => `<section><h2>${pair}</h2><div><figure><figcaption>Reference</figcaption><img src="reference/${pair}.png" alt="Reference ${pair}"></figure><figure><figcaption>Reconstruction</figcaption><img src="implementation/${pair}.png" alt="Reconstruction ${pair}"></figure></div></section>`).join('')}</html>`);
  console.log('Homepage / careers bounding-box maximum difference:', maxDifference, 'CSS px');
  console.log('Differences:', JSON.stringify(Object.fromEntries(Object.entries(differences).map(([key, elements]) => [key, elements.filter(element => element.max > 1)])), null, 2));
  if (!process.argv.includes('--capture-only') && reference) assert(maxDifference <= 2, 'Structural difference exceeds 2px; inspect screenshots and fix the layout');
  console.log('PASS: production routes, 7 responsive layouts, navigation, menu keyboard behavior, career filters, form validation, legal contents scrolling, reduced motion, and no browser errors.');
  console.log(`Screenshots and structural comparison: ${directory}/`);
} finally {
  await browser?.close();
  server.kill('SIGTERM');
}
