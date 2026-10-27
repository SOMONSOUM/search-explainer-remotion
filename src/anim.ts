import {Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

/**
 * Scene-local animation helpers. Every scene is rendered inside a <Sequence>,
 * so `t` is "seconds since this scene started" and all timings are in seconds
 * (change FPS in theme.ts and everything still lines up).
 */
export const useAnim = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;

  /** 0 -> 1 ease-out between start and start+dur */
  const p = (start: number, dur = 0.6) =>
    interpolate(t, [start, start + dur], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  /** 0 -> 1 with a little overshoot (use for scale) */
  const pop = (start: number, dur = 0.5) =>
    interpolate(t, [start, start + dur], [0, 1], {...clamp, easing: Easing.out(Easing.back(1.7))});
  /** Linear 0 -> 1 */
  const lin = (start: number, dur: number) => interpolate(t, [start, start + dur], [0, 1], clamp);
  /** typewriter */
  const typed = (text: string, start: number, cps = 16) =>
    text.slice(0, Math.max(0, Math.min(text.length, Math.floor((t - start) * cps))));
  /** 0..1 repeating */
  const loop = (period: number, offset = 0) => (((t + offset) % period) + period) % period / period;
  /** smooth sine 0..1 */
  const wave = (period: number, offset = 0) => 0.5 + 0.5 * Math.sin(((t + offset) / period) * Math.PI * 2);

  return {t, frame, fps, p, pop, lin, typed, loop, wave};
};

export const range = (n: number) => Array.from({length: n}, (_, i) => i);
export const fade = (v: number) => Math.max(0, Math.min(1, v));
