import React from 'react';
import {useAnim, range, fade} from '../anim';
import {C, FONT_MONO, Tone} from '../theme';
import {
  Abs, Bold, Brand, ESLogo, Glossy, Icon, IconName, Label, Line, Mono, PRODUCT_ICONS,
  SearchBar, Stage, Tile, Win,
} from '../ui';

/* ---------- shared: the "cloudxberry.store" window ---------- */

const WIN_W = 1300;
const WIN_H = 640;

const StoreWindow: React.FC<{children?: React.ReactNode; query: string; caret?: boolean}> = ({children, query, caret}) => (
  <Win w={WIN_W} h={WIN_H}>
    <Abs x={150} y={82}>
      <SearchBar text={query} w={1000} h={64} caret={caret} />
    </Abs>
    {children}
  </Win>
);

const COLS = 11;
const ROWS = 3;

const TileGrid: React.FC<{
  tone: Tone;
  start?: number;
  lit?: number[];
  litTone?: Tone;
  y?: number;
}> = ({tone, start = 0.3, lit = [], litTone = 'cyan', y = 190}) => {
  const a = useAnim();
  return (
    <Abs x={(WIN_W - (COLS * 92 - 12)) / 2} y={y}>
      <div style={{display: 'grid', gridTemplateColumns: `repeat(${COLS}, 80px)`, gap: 12}}>
        {range(COLS * ROWS).map((i) => {
          const s = a.pop(start + i * 0.025, 0.4);
          return (
            <div key={i} style={{transform: `scale(${s})`, opacity: fade(s)}}>
              <Tile icon={PRODUCT_ICONS[(i * 5) % PRODUCT_ICONS.length]} tone={lit.includes(i) ? litTone : tone} size={80} />
            </div>
          );
        })}
      </div>
    </Abs>
  );
};

/* ---------- 0:00 Searching data sounds simple ---------- */

export const S00Intro: React.FC = () => {
  const a = useAnim();
  const bracket = a.p(5.2, 1.2);
  const bar = a.pop(6.4, 0.6);
  return (
    <Stage>
      <StoreWindow query={a.typed('wireless headphones', 1.2, 9)} caret={a.t < 5}>
        <TileGrid tone="dark" />
        {/* bracket from the search bar down to the product bar */}
        <Line x1={150} y1={114} x2={110} y2={114} progress={bracket} color="#2c6fd6" />
        <Line x1={110} y1={114} x2={110} y2={540} progress={bracket} color="#2c6fd6" />
        <Line x1={1150} y1={114} x2={1190} y2={114} progress={bracket} color="#2c6fd6" />
        <Line x1={1190} y1={114} x2={1190} y2={540} progress={bracket} color="#2c6fd6" />
        <Abs x={150} y={510} style={{transform: `scale(${bar})`, opacity: fade(bar), transformOrigin: 'center'}}>
          <Glossy tone="blue" w={1000} h={64} r={20} style={{gap: 16, fontFamily: FONT_MONO, fontWeight: 700, fontSize: 26, color: '#06223f'}}>
            <Icon name="db" size={28} color="#06223f" />
            millions of products
          </Glossy>
        </Abs>
      </StoreWindow>
    </Stage>
  );
};

/* ---------- 0:12 The obvious answer, and why it fails (SQL) ---------- */

export const S01Sql: React.FC = () => {
  const a = useAnim();
  const sql = "SELECT * FROM products WHERE name LIKE '%wireless headphones%'";
  const line = a.lin(3.2, 2.2);
  return (
    <Stage>
      <Win w={1100} h={330} url="psql :: cloudxberry-store" icons={false} colorDots>
        <div style={{padding: '40px 42px'}}>
          <Mono size={25} color="#e8eef6" style={{whiteSpace: 'pre-wrap', lineHeight: 1.6, maxWidth: 1000}}>
            <span style={{color: C.teal}}>&gt; </span>
            {a.typed(sql, 0.6, 24)}
          </Mono>
          <div style={{marginTop: 50, height: 3, width: 420 * line, background: C.red, boxShadow: '0 0 16px rgba(255,77,51,0.8)', marginLeft: 220}} />
          <Mono size={20} color={C.red} style={{marginLeft: 220, marginTop: 14, opacity: a.p(5.4, 0.4)}}>0 rows  ·  full table scan</Mono>
        </div>
      </Win>
    </Stage>
  );
};

/* ---------- 0:19 What if they misspell it ---------- */

export const S02Typo: React.FC = () => {
  const a = useAnim();
  const q = 'wireles headphones';
  return (
    <Stage>
      <StoreWindow query={a.typed(q, 1.0, 10)} caret>
        <TileGrid tone="dark" start={0} />
      </StoreWindow>
    </Stage>
  );
};

/* ---------- 0:23 Or different words for the same thing ---------- */

export const S03Synonym: React.FC = () => {
  const a = useAnim();
  const line = a.p(1.6, 0.9);
  return (
    <Stage>
      <StoreWindow query={a.typed('bluetooth headset', 0.3, 12)}>
        <TileGrid tone="blue" start={0} lit={[]} />
        <Line x1={150} y1={114} x2={120} y2={114} progress={line} color="#ff5fa8" />
        <Line x1={120} y1={114} x2={120} y2={300} progress={a.p(2.0, 0.6)} color="#ff5fa8" />
        <Line x1={120} y1={300} x2={190} y2={300} progress={a.p(2.4, 0.4)} color="#ff5fa8" />
      </StoreWindow>
    </Stage>
  );
};

/* ---------- 0:26 Thousands match. Which comes first ---------- */

export const S04Thousands: React.FC = () => {
  const a = useAnim();
  return (
    <Stage>
      <StoreWindow query="bluetooth headset">
        <Abs x={150} y={190}>
          {[1, 2, 3].map((n, i) => (
            <div key={n} style={{display: 'flex', alignItems: 'center', gap: 18, height: 76, width: 270, borderRadius: 18, background: '#0b1118', marginBottom: 22, padding: '0 20px', opacity: a.p(0.4 + i * 0.25), border: '1.5px solid #131c27'}}>
              <Mono size={30} color={C.dim}>{`0${n}`}</Mono>
              <Tile icon="headphones" tone="green" size={44} />
            </div>
          ))}
        </Abs>
        <Abs x={520} y={190}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(16, 30px)', gap: 8}}>
            {range(16 * 10).map((i) => (
              <div key={i} style={{width: 30, height: 30, borderRadius: 6, background: 'linear-gradient(180deg,#8bffc4,#16b574)', opacity: fade((a.t - 0.2 - i * 0.008) * 6), boxShadow: '0 0 10px rgba(53,227,148,0.35)'}} />
            ))}
          </div>
        </Abs>
      </StoreWindow>
    </Stage>
  );
};

/* ---------- 0:30 Plus a brand, and a price range ---------- */

export const S05BrandPrice: React.FC = () => {
  const a = useAnim();
  const tags = ['tag', 'tag', 'tag', 'tag', 'tag', 'tag'] as IconName[];
  const hot = a.t > 2 ? 1 : -1;
  return (
    <Stage>
      <StoreWindow query="bluetooth headset">
        <Line x1={650} y1={146} x2={650} y2={190} progress={a.p(0.5, 0.3)} color="#ff5fa8" />
        <Line x1={400} y1={190} x2={900} y2={190} progress={a.p(0.8, 0.5)} color="#ff5fa8" />
        <Abs x={540} y={210} style={{opacity: a.p(1.2)}}><Label size={20}>Brand</Label></Abs>
        <Abs x={440} y={270}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 120px)', gap: 18}}>
            {tags.map((n, i) => (
              <div key={i} style={{transform: `scale(${a.pop(1.4 + i * 0.12, 0.4)})`}}>
                <Tile icon={n} tone={i === hot ? 'cyan' : 'dark'} size={120} style={{height: 80}} />
              </div>
            ))}
          </div>
        </Abs>
      </StoreWindow>
    </Stage>
  );
};

/* ---------- 0:35 Not text. Relevance ---------- */

export const S06Relevance: React.FC = () => {
  const a = useAnim();
  const widths = [640, 520, 380, 260];
  return (
    <Stage>
      <StoreWindow query="bluetooth headset">
        <Abs x={210} y={190}><Label size={18}>Relevance</Label></Abs>
        {widths.map((w, i) => (
          <Abs key={i} x={150} y={240 + i * 86}>
            <div style={{display: 'flex', alignItems: 'center', gap: 22, opacity: a.p(0.3 + i * 0.2)}}>
              <Tile icon="headphones" tone="blue" size={58} />
              <Glossy tone="green" w={w * a.p(0.6 + i * 0.25, 1)} h={48} r={14} style={{justifyContent: 'flex-end'}} />
            </div>
          </Abs>
        ))}
      </StoreWindow>
    </Stage>
  );
};

/* ---------- 0:40 And this is where Elasticsearch comes in ---------- */

export const S07EsComesIn: React.FC = () => {
  const a = useAnim();
  const s = a.pop(0.3, 0.7);
  return (
    <Stage>
      {[0, 1, 2].map((i) => {
        const r = 1 + ((a.t * 0.5 + i / 3) % 1) * 1.6;
        return (
          <div key={i} style={{position: 'absolute', width: 220 * r, height: 220 * r, borderRadius: '50%', border: '2px solid rgba(38,212,238,0.5)', opacity: 1 - (r - 1) / 1.6}} />
        );
      })}
      <div style={{transform: `scale(${s})`}}>
        <ESLogo size={220} />
      </div>
    </Stage>
  );
};

/* ---------- 0:43 A search and analytics engine ---------- */

export const S08Engine: React.FC = () => {
  const a = useAnim();
  const items: Array<[IconName | null, number]> = [['search', 0.3], [null, 0.7], ['chart', 1.1]];
  return (
    <Stage style={{flexDirection: 'column', gap: 36}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 0}}>
        {items.map(([icon, d], i) => (
          <React.Fragment key={i}>
            {i > 0 && <div style={{width: 60, height: 4, background: '#26d4ee', boxShadow: '0 0 14px #26d4ee', opacity: a.p(d)}} />}
            <div style={{transform: `scale(${a.pop(d, 0.5)})`}}>
              <Glossy tone="cyan" w={i === 1 ? 260 : 270} h={170} r={34}>
                {icon ? <Icon name={icon} size={70} color="#0a3a4a" stroke={1.8} /> : <ESLogo size={110} />}
              </Glossy>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div style={{opacity: a.p(1.6), textAlign: 'center'}}>
        <Bold size={34} style={{letterSpacing: 3}}>ELASTICSEARCH</Bold>
        <Mono size={19} color="#d9e6f2" bold style={{letterSpacing: 4, marginTop: 14}}>DISTRIBUTED SEARCH &amp; ANALYTICS ENGINE</Mono>
        <div style={{height: 3, width: 560 * a.p(2, 0.8), background: '#26d4ee', margin: '18px auto 0', boxShadow: '0 0 14px #26d4ee'}} />
      </div>
    </Stage>
  );
};
