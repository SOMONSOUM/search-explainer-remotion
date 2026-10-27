import React from 'react';
import {Composition} from 'remotion';
import {SearchExplainer} from './SearchExplainer';
import {DURATION_SECONDS, FPS, HEIGHT, WIDTH} from './theme';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="SearchExplainer"
    component={SearchExplainer}
    durationInFrames={Math.round(DURATION_SECONDS * FPS)}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);
