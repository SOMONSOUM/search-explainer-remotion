import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import './fonts';
import {DURATION_SECONDS} from './theme';
import {SCENES} from './timeline';
import {VISUALS} from './scenes';
import {Title, Watermark, Mono} from './ui';
import {useAnim} from './anim';

const SceneFrame: React.FC<{id: string; title: [string, string]; caption?: string; durationInFrames: number}> = ({
  id, title, caption, durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const {t} = useAnim();
  const Visual = VISUALS[id];
  const fadeIn = interpolate(frame, [0, 8], [0, 1], {extrapolateRight: 'clamp'});
  const fadeOut = interpolate(frame, [durationInFrames - 6, durationInFrames], [1, 0], {extrapolateLeft: 'clamp'});
  return (
    <AbsoluteFill style={{opacity: Math.min(fadeIn, fadeOut)}}>
      <Title a={title[0]} b={title[1]} t={t} />
      {Visual ? <Visual /> : null}
      {caption && (
        <div style={{position: 'absolute', bottom: 60, left: 0, right: 0, textAlign: 'center', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 30, color: '#fff'}}>
          {caption}
        </div>
      )}
    </AbsoluteFill>
  );
};

export const SearchExplainer: React.FC = () => {
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <Audio src={staticFile('narration.mp3')} />
      {SCENES.map((s, i) => {
        const end = i + 1 < SCENES.length ? SCENES[i + 1].start : DURATION_SECONDS;
        const from = Math.round(s.start * fps);
        const dur = Math.round(end * fps) - from;
        return (
          <Sequence key={s.id} from={from} durationInFrames={dur} name={`${s.id} ${s.title[1]}`}>
            <SceneFrame id={s.id} title={s.title} caption={s.caption} durationInFrames={dur} />
          </Sequence>
        );
      })}
      <Watermark />
    </AbsoluteFill>
  );
};
