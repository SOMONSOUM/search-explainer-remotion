export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_SECONDS = 341.29;

export const C = {
  bg: '#000000',
  white: '#ffffff',
  purple: '#b26cf7',
  panel: '#070b11',
  panelBorder: '#172230',
  dim: '#5f6f82',
  text: '#d5dde8',
  teal: '#17c3b2',
  amber: '#f5b300',
  red: '#ff4d33',
  orange: '#ff7a33',
};

export const FONT_TITLE = "'Montserrat', 'Helvetica Neue', Arial, sans-serif";
export const FONT_MONO = "'JetBrains Mono', 'SF Mono', Menlo, monospace";

/** [light, mid, dark] stops used by every glossy element. */
export const GRAD = {
  pink: ['#ffa6cf', '#ff5fa8', '#c21a6c'],
  blue: ['#8ec9ff', '#3f93f5', '#1d58cf'],
  green: ['#8bffc4', '#35e394', '#10a566'],
  cyan: ['#9cf6ff', '#26d4ee', '#0b9fc4'],
  lime: ['#e4ff7a', '#a8e63a', '#6aa80f'],
  dark: ['#182a45', '#0f1d33', '#0a1424'],
  white: ['#ffffff', '#eef1f6', '#c4ccd8'],
  red: ['#ff8a6b', '#ff4d33', '#c22a14'],
  orange: ['#ffa466', '#ff7a33', '#d4501a'],
} as const;

export type Tone = keyof typeof GRAD;
