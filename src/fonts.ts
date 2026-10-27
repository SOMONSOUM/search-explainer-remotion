import {continueRender, delayRender, staticFile} from 'remotion';

const files: Array<[string, string, string]> = [
  ['Montserrat', '600', 'fonts/montserrat-latin-600-normal.woff2'],
  ['Montserrat', '700', 'fonts/montserrat-latin-700-normal.woff2'],
  ['Montserrat', '800', 'fonts/montserrat-latin-800-normal.woff2'],
  ['JetBrains Mono', '400', 'fonts/jetbrains-mono-latin-400-normal.woff2'],
  ['JetBrains Mono', '700', 'fonts/jetbrains-mono-latin-700-normal.woff2'],
];

const handle = delayRender('Loading fonts');
Promise.all(
  files.map(([family, weight, path]) => {
    const face = new FontFace(family, `url(${staticFile(path)}) format('woff2')`, {weight});
    return face.load().then((f) => (document.fonts as unknown as {add(f: FontFace): void}).add(f));
  }),
)
  .catch((err) => console.warn('Font load failed, falling back', err))
  .finally(() => continueRender(handle));
