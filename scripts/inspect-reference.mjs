import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';

// Read only rendered appearance and behavior; never fetch implementation source.
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome', headless: true });
const directory = '.artifacts/reference';
await mkdir(directory, { recursive: true });
const measurements = {};
const inspect = page => page.evaluate(() => {
  const styleKeys = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'color', 'backgroundColor', 'padding', 'margin', 'gap', 'border', 'display', 'gridTemplateColumns', 'gridTemplateRows', 'maxWidth', 'maxHeight', 'position', 'animation', 'transition'];
  return {
    viewport: { width: innerWidth, height: innerHeight },
    scrollHeight: document.documentElement.scrollHeight,
    text: document.body.innerText,
    elements: [...document.querySelectorAll('header, main, main > div, h1, h2, h3, h4, section, aside, article, ul, li, p, canvas, footer, footer div, footer span, a, button, img')]
      .filter(element => element.getBoundingClientRect().width > 0)
      .map(element => ({
        tag: element.tagName,
        text: element.tagName === 'MAIN' || element.tagName === 'DIV' ? '' : element.textContent?.trim().slice(0, 150),
        label: element.getAttribute('aria-label'), href: element.getAttribute('href'),
        bounds: element.getBoundingClientRect().toJSON(),
        styles: Object.fromEntries(styleKeys.map(key => [key, getComputedStyle(element)[key]])),
      })),
  };
});
try {
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  for (const [name, path] of [['home', '/'], ['careers', '/careers'], ['terms', '/terms'], ['privacy', '/privacy'], ['role', '/careers/mts-ml-systems']]) {
    for (const [device, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
      await page.setViewportSize({ width, height });
      await page.goto(`https://www.conway.ai${path}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2500);
      await page.screenshot({ path: `${directory}/${name}-${device}.png`, fullPage: true });
      measurements[`${name}-${device}`] = await inspect(page);
      if (name === 'careers') {
        await page.getByRole('button', { name: 'Engineering', exact: true }).click();
        await page.waitForTimeout(500);
        await page.screenshot({ path: `${directory}/careers-${device}-filtered.png`, fullPage: true });
        measurements[`careers-${device}-filtered`] = await inspect(page);
      }
      if (name === 'home') {
        await page.waitForTimeout(1600);
        await page.screenshot({ path: `${directory}/${name}-${device}-later.png`, fullPage: true });
        if (device === 'mobile') {
          await page.getByRole('button', { name: 'Open menu' }).click();
          await page.waitForTimeout(500);
          await page.screenshot({ path: `${directory}/menu-mobile.png`, fullPage: true });
          measurements.menu = await inspect(page);
          await page.getByRole('button', { name: 'Close menu' }).last().click();
        } else {
          const button = page.getByRole('link', { name: 'Contact Team' });
          await button.hover();
          await page.waitForTimeout(400);
          measurements.hover = await button.evaluate(element => ({ opacity: getComputedStyle(element).opacity, background: getComputedStyle(element).backgroundColor, transform: getComputedStyle(element).transform }));
        }
      }
    }
  }
  for (const [width, height] of [[320, 568], [768, 1024], [1024, 768], [1280, 720], [1920, 1080]]) {
    await page.setViewportSize({ width, height });
    await page.goto('https://www.conway.ai/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1800);
    measurements[`home-${width}`] = await inspect(page);
    await page.screenshot({ path: `${directory}/home-${width}.png`, fullPage: true });
  }
  await writeFile(`${directory}/measurements.json`, JSON.stringify(measurements, null, 2));
  console.log(Object.fromEntries(Object.entries(measurements).map(([name, data]) => [name, { height: data.scrollHeight, headings: data.elements?.filter(e => /^H[123]$/.test(e.tag)).map(e => e.text) }])));
} finally {
  await browser.close();
}
