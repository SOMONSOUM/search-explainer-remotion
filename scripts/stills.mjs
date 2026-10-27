// Renders one still per scene (default: 60% through each scene) for quick visual QA.
// usage: node scripts/stills.mjs [browserExecutable] [scale]
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition, openBrowser} from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs';

const browserExecutable = process.argv[2] || undefined;
const scale = Number(process.argv[3] || 0.5);
const ids = (process.argv[4] || '').split(',').filter(Boolean);

const entry = path.resolve('src/index.ts');
const serveUrl = await bundle({entryPoint: entry});
const browser = await openBrowser('chrome', {browserExecutable, chromeMode: 'headless-shell', chromiumOptions: {gl: 'swiftshader'}});
const comp = await selectComposition({serveUrl, id: 'SearchExplainer', puppeteerInstance: browser});

const {SCENES} = JSON.parse(fs.readFileSync('scripts/scenes.json', 'utf8'));
for (let i = 0; i < SCENES.length; i++) {
  const s = SCENES[i];
  if (ids.length && !ids.includes(s.id)) continue;
  const end = i + 1 < SCENES.length ? SCENES[i + 1].start : 341.29;
  const t = s.start + Math.min((end - s.start) * 0.6, 6);
  const frame = Math.min(comp.durationInFrames - 1, Math.round(t * comp.fps));
  await renderStill({composition: comp, serveUrl, frame, scale, output: `out/stills/${s.id}.png`, puppeteerInstance: browser, timeoutInMilliseconds: 120000});
  console.log('done', s.id, frame);
}
await browser.close({silent: true});
