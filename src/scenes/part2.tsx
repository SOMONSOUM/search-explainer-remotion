import React from 'react';
import {useAnim, range, fade} from '../anim';
import {C, FONT_MONO} from '../theme';
import {
  Abs, Bold, Brand, Chip, DocIcon, DocTile, ESLogo, Glossy, Icon, Label, Line, Mono, Panel,
  PRODUCT_ICONS, SearchBar, Stage, Tile,
} from '../ui';

/* ---------- 0:48 Take data, index it, make it fast ---------- */

export const S09IndexIt: React.FC = () => {
  const a = useAnim();
  const flow = a.lin(2.0, 3.2);
  return (
    <Stage>
      <div style={{display: 'flex', alignItems: 'center', gap: 90}}>
        <Panel w={300} h={380} bg="#0c1320" border="#1b2840">
          <div style={{padding: '16px 22px', display: 'flex', gap: 14, alignItems: 'center'}}>
            <Mono size={16} color={C.teal}>1</Mono>
            <Bold size={18} style={{letterSpacing: 2}}>DATA</Bold>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 50px)', gap: 18, padding: '10px 28px'}}>
            {range(16).map((i) => {
              const gone = fade((flow * 16 - i) / 2);
              return (
                <div key={i} style={{opacity: a.p(0.2 + i * 0.05) * (1 - gone), transform: `translate(${gone * 160}px, ${(i % 3) * gone * 6}px)`}}>
                  <DocIcon size={38} color="#8fb4e8" />
                </div>
              );
            })}
          </div>
        </Panel>
        <div style={{opacity: a.p(1.6), transform: `scale(${a.pop(1.6)})`}}><ESLogo size={130} /></div>
        <Panel w={300} h={380} border="#13525e" bg="#06151a" style={{opacity: a.p(2.4)}}>
          <div style={{padding: '16px 22px'}}><Bold size={18} color="#8ef3ff" style={{letterSpacing: 2}}>INDEX</Bold></div>
          <div style={{padding: '8px 26px', display: 'flex', flexDirection: 'column', gap: 18}}>
            {range(6).map((i) => (
              <Glossy key={i} tone="cyan" w={248 * a.p(2.6 + i * 0.35, 0.7)} h={30} r={9} glow={false} />
            ))}
          </div>
        </Panel>
      </div>
    </Stage>
  );
};

/* ---------- 0:55 / 0:59 million documents ---------- */

const DocGrid: React.FC<{scan?: boolean; hit?: number[]}> = ({scan, hit = []}) => {
  const a = useAnim();
  const cols = 28;
  const head = scan ? Math.floor(a.t * 13) : -1;
  return (
    <div style={{display: 'grid', gridTemplateColumns: `repeat(${cols}, 38px)`, gap: 8}}>
      {range(cols * 3).map((i) => (
        <div key={i} style={{opacity: fade((a.t - 0.2 - i * 0.006) * 8), filter: scan && i === head ? 'brightness(2.4)' : undefined}}>
          <DocTile size={38} tone={scan && i < head ? 'dark' : hit.includes(i) ? 'green' : 'blue'} />
        </div>
      ))}
    </div>
  );
};

export const S10Millions: React.FC = () => {
  const a = useAnim();
  return (
    <Stage style={{flexDirection: 'column', gap: 70}}>
      <SearchBar text={a.typed('wireless hea', 0.5, 9)} w={760} h={72} caret />
      <DocGrid />
      <Label size={20} style={{opacity: a.p(1.5)}}>Millions of product documents</Label>
    </Stage>
  );
};

export const S11Scanning: React.FC = () => {
  const a = useAnim();
  return (
    <Stage style={{flexDirection: 'column', gap: 70}}>
      <SearchBar text="wireless headphones" w={760} h={72} />
      <DocGrid scan />
      <Label size={20}>Millions of product documents</Label>
      <Mono size={22} color={C.orange} style={{opacity: a.p(2.5)}}>checking document {Math.floor(a.t * 1800).toLocaleString()} …</Mono>
    </Stage>
  );
};

/* ---------- 1:05 Prepared first, found instantly ---------- */

const IndexTable: React.FC<{
  rows: Array<[string, string]>;
  head: [string, string];
  w?: number;
  progress?: number;
  border?: string;
}> = ({rows, head, w = 780, progress = 1, border = '#16675f'}) => (
  <Panel w={w} border={border} bg="#050e10" style={{padding: '18px 26px'}}>
    <div style={{display: 'flex', justifyContent: 'space-between', color: C.teal, fontFamily: FONT_MONO, fontSize: 16, letterSpacing: 3, paddingBottom: 14, borderBottom: '1px solid #123a3c'}}>
      <span>{head[0]}</span><span>{head[1]}</span>
    </div>
    {rows.map(([k, v], i) => (
      <div key={k} style={{display: 'flex', justifyContent: 'space-between', padding: '20px 0', fontFamily: FONT_MONO, fontSize: 24, color: '#e8eef6', opacity: fade(progress * rows.length - i)}}>
        <span>{k}</span>
        <span style={{color: '#37d3c8'}}>{v}</span>
      </div>
    ))}
  </Panel>
);

export const S12Prepared: React.FC = () => {
  const a = useAnim();
  return (
    <Stage style={{flexDirection: 'column', gap: 36}}>
      <SearchBar text="wireless headphones" w={620} h={66} />
      <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
        <IndexTable head={['TERM', 'DOCUMENTS']} rows={[['wireless', 'doc 1, doc 7, doc 42'], ['headphones', 'doc 1, doc 12, doc 42']]} w={760} progress={a.p(0.4, 1)} />
        <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
          {['doc 1', 'doc 42'].map((d, i) => (
            <div key={d} style={{transform: `scale(${a.pop(1.6 + i * 0.3)})`}}>
              <Glossy tone="green" w={140} h={62} r={16} style={{fontFamily: FONT_MONO, fontWeight: 700, fontSize: 26, color: '#06382a'}}>{d}</Glossy>
            </div>
          ))}
        </div>
      </div>
      <div style={{opacity: a.p(3), textAlign: 'left'}}>
        <Mono size={20} color="#ff6a5a">no index  -&gt;  scan millions  -&gt;  slow</Mono>
        <Mono size={20} color="#5df2a6" style={{marginTop: 8, opacity: a.p(3.6)}}>index     -&gt;  direct lookup  -&gt;  fast</Mono>
      </div>
    </Stage>
  );
};

/* ---------- 1:11 / 1:18 The book ---------- */

const Page: React.FC<{side: 'l' | 'r'}> = ({side}) => (
  <div
    style={{
      position: 'absolute', top: 0, [side === 'l' ? 'left' : 'right']: 0, width: 262, height: 300,
      background: 'repeating-linear-gradient(180deg,#fff 0 22px,#cfe0f3 22px 24px)',
      borderRadius: side === 'l' ? '8px 0 0 8px' : '0 8px 8px 0',
      boxShadow: 'inset 0 0 30px rgba(0,60,120,0.15)',
    }}
  />
);

export const Book: React.FC<{flip: number; style?: React.CSSProperties}> = ({flip, style}) => (
  <div style={{position: 'relative', width: 560, height: 322, padding: 11, borderRadius: 16, background: 'linear-gradient(180deg,#5aa6ff,#1d58cf)', boxShadow: '0 20px 60px rgba(40,120,255,0.3)', perspective: 1400, ...style}}>
    <div style={{position: 'relative', width: 538, height: 300}}>
      <Page side="l" />
      <Page side="r" />
      <div style={{position: 'absolute', left: 262, width: 14, height: 300, background: 'linear-gradient(90deg,#1d58cf,#3f93f5,#1d58cf)'}} />
      <div
        style={{
          position: 'absolute', left: 276, top: 0, width: 262, height: 300, transformOrigin: 'left center',
          transform: `rotateY(${-flip * 175}deg)`, background: 'repeating-linear-gradient(180deg,#fff 0 22px,#cfe0f3 22px 24px)',
          borderRadius: '0 8px 8px 0', boxShadow: '-10px 0 30px rgba(0,0,0,0.25)', backfaceVisibility: 'hidden',
        }}
      />
    </div>
  </div>
);

export const S13Pages: React.FC = () => {
  const a = useAnim();
  const flip = (a.t * 0.9) % 1;
  return (
    <Stage>
      <div style={{display: 'flex', alignItems: 'center', gap: 40}}>
        <Book flip={flip} />
        <Chip text="headphones" size={22} style={{opacity: a.p(0.3)}} />
      </div>
    </Stage>
  );
};

export const S14Slow: React.FC = () => {
  const a = useAnim();
  return (
    <Stage>
      <div style={{display: 'flex', alignItems: 'center', gap: 40}}>
        <Book flip={Math.min(1, (a.t * 1.6) % 1.3)} />
        <Chip text="headphones" size={22} />
      </div>
    </Stage>
  );
};

export const S15BookIndex: React.FC = () => {
  const a = useAnim();
  return (
    <Stage>
      <div style={{display: 'flex', alignItems: 'center', gap: 44}}>
        <IndexTable head={['TERM', 'PAGES']} rows={[['wireless', '12, 63'], ['headphones', '12, 45, 87']]} w={500} progress={a.p(0.2, 1)} />
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          {['page 12', 'page 45', 'page 87'].map((p, i) => (
            <div key={p} style={{transform: `scale(${a.pop(1.2 + i * 0.25)})`}}>
              <Glossy tone="green" w={170} h={50} r={14} style={{fontFamily: FONT_MONO, fontWeight: 700, fontSize: 22, color: '#06382a'}}>{p}</Glossy>
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
};

/* ---------- 1:26 The same idea, built from your data ---------- */

export const S16Built: React.FC = () => {
  const a = useAnim();
  const fill = a.p(2.4, 3);
  return (
    <Stage>
      <div style={{display: 'flex', alignItems: 'center', gap: 50}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 18}}>
          {[1, 2, 3].map((n, i) => (
            <div key={n} style={{transform: `scale(${a.pop(0.2 + i * 0.25)})`}}>
              <Glossy tone="blue" w={170} h={66} r={16} style={{fontFamily: FONT_MONO, fontWeight: 700, fontSize: 30}}>{n}</Glossy>
            </div>
          ))}
        </div>
        <div style={{width: 70, height: 3, background: '#36508a', opacity: a.p(1)}} />
        <div style={{transform: `scale(${a.pop(1.2)})`}}><ESLogo size={90} /></div>
        <div style={{width: 70, height: 3, background: '#36508a', opacity: a.p(1.6)}} />
        <IndexTable head={['TERM', 'DOCUMENTS']} rows={[['wireless', 'doc 2'], ['headphones', 'doc 2, doc 3'], ['sony', 'doc 2'], ['galaxy', 'doc 3']]} w={560} progress={fill} />
      </div>
    </Stage>
  );
};

/* ---------- 1:34 Three products in the catalogue ---------- */

const PRODUCTS: Array<[string, string, string, string]> = [
  ['apple', 'AIRPODS PRO', 'doc 1', 'apple'],
  ['SONY', 'WIRELESS HEADPHONES', 'doc 2', 'sony'],
  ['SAMSUNG', 'GALAXY BUDS', 'doc 3', 'samsung'],
];

export const S17Catalogue: React.FC = () => {
  const a = useAnim();
  return (
    <Stage style={{flexDirection: 'column', gap: 28}}>
      <div style={{width: 940, height: 40, background: '#0d141c', borderRadius: 8, fontFamily: FONT_MONO, color: C.dim, fontSize: 15, display: 'flex', alignItems: 'center', padding: '0 16px', opacity: a.p(0.1)}}>
        &gt;&gt;&gt; cloudxberry.store
      </div>
      <div style={{display: 'flex', gap: 34}}>
        {PRODUCTS.map(([brand, name, doc], i) => (
          <div key={name} style={{transform: `translateY(${(1 - a.pop(0.4 + i * 0.35)) * 60}px)`, opacity: a.p(0.4 + i * 0.35)}}>
            <Glossy tone="blue" w={290} h={350} r={30} style={{flexDirection: 'column', gap: 26}}>
              <Brand label={brand} size={86} dark={brand === 'SAMSUNG'} />
              <Bold size={24} style={{textAlign: 'center', maxWidth: 230, lineHeight: 1.2}}>{name}</Bold>
              <div style={{padding: '8px 36px', borderRadius: 12, background: '#0a1d3d', fontFamily: FONT_MONO, color: '#8ec9ff', fontWeight: 700, fontSize: 22}}>{doc}</div>
            </Glossy>
          </div>
        ))}
      </div>
    </Stage>
  );
};

/* ---------- 1:43 Does the word literally appear ---------- */

export const S18Literal: React.FC = () => {
  const a = useAnim();
  const rows: Array<[string, string, boolean, boolean]> = [
    ['doc 1', 'AIRPODS PRO', false, false],
    ['doc 2', 'SONY WIRELESS HEADPHONES', true, true],
    ['doc 3', 'GALAXY BUDS', false, false],
  ];
  return (
    <Stage style={{flexDirection: 'column', gap: 40}}>
      <SearchBar text={a.typed('wireless headphones', 0.3, 12)} w={860} h={64} />
      <div style={{width: 1000}}>
        <div style={{display: 'flex', justifyContent: 'flex-end', gap: 120, paddingRight: 70, fontFamily: FONT_MONO, color: C.dim, fontSize: 17, marginBottom: 10}}>
          <span>wireless</span><span>headphones</span>
        </div>
        {rows.map(([d, n, w, h], i) => {
          const hit = w && h && a.t > 3.2;
          return (
            <div key={d} style={{opacity: a.p(1.8 + i * 0.25), display: 'flex', alignItems: 'center', height: 78, padding: '0 24px', borderRadius: 14, border: `2px solid ${hit ? '#35e394' : '#101820'}`, boxShadow: hit ? '0 0 30px rgba(53,227,148,0.35)' : 'none', marginBottom: 8}}>
              <div style={{padding: '4px 12px', borderRadius: 8, background: '#0c1a2a', color: '#5aa3ff', fontFamily: FONT_MONO, fontSize: 17, marginRight: 24}}>{d}</div>
              <Bold size={22} style={{flex: 1}}>{n}</Bold>
              {[w, h].map((ok, k) => {
                const show = a.t > 2.6 + i * 0.3 + k * 0.3;
                return (
                  <div key={k} style={{width: 150, display: 'flex', justifyContent: 'center', opacity: show ? 1 : 0}}>
                    <div style={{width: 34, height: 34, borderRadius: 17, background: ok ? 'linear-gradient(#8bffc4,#10a566)' : 'transparent', border: ok ? 'none' : '2px solid #4a5666', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <Icon name={ok ? 'check' : 'minus'} size={20} color={ok ? '#06382a' : '#7b8899'} stroke={3} />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
        <div style={{display: 'flex', justifyContent: 'flex-end', opacity: a.p(4.2)}}>
          <Glossy tone="green" h={44} r={10} style={{padding: '0 26px', fontFamily: FONT_MONO, fontWeight: 700, fontSize: 19, color: '#06382a'}}>1 of 3 products</Glossy>
        </div>
      </div>
    </Stage>
  );
};

/* ---------- 1:50 Ranking, autocomplete, typos and filters ---------- */

export const S19Features: React.FC = () => {
  const a = useAnim();
  const Row: React.FC<{label: string; d: number; from: React.ReactNode; to: React.ReactNode}> = ({label, d, from, to}) => (
    <div style={{display: 'flex', alignItems: 'center', gap: 34, opacity: a.p(d), marginBottom: 46}}>
      <Bold size={20} style={{width: 220, letterSpacing: 1.5}}>{label}</Bold>
      <div style={{width: 300, height: 66, borderRadius: 14, background: '#0b141c', border: '1.5px solid #15202b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_MONO, fontSize: 26, color: '#fff'}}>{from}</div>
      <div style={{color: '#26d4ee', fontSize: 40, fontFamily: FONT_MONO, opacity: a.p(d + 0.6)}}>→</div>
      <div style={{opacity: a.p(d + 1)}}>
        <Glossy tone="cyan" w={340} h={74} r={18} style={{fontFamily: FONT_MONO, fontWeight: 700, fontSize: 28, color: '#06303d'}}>{to}</Glossy>
      </div>
    </div>
  );
  return (
    <Stage>
      <div>
        <Row label="RANKING" d={0.3} from={<span style={{display: 'flex', gap: 26}}>{[3, 1, 2].map((n) => <span key={n} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 14}}><Icon name="trophy" size={24} color="#8392a6" />{n}</span>)}</span>} to={<span style={{display: 'flex', gap: 26}}>{[1, 2, 3].map((n) => <span key={n} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: 14}}><Icon name="trophy" size={24} color="#06303d" />{n}</span>)}</span>} />
        <Row label="AUTOCOMPLETE" d={1.5} from={<span>head<span style={{color: '#6b7a8c'}}>phones</span></span>} to="headphones" />
        <Row label="TYPOS" d={2.7} from={<span style={{color: '#ff8a8a'}}>wireles</span>} to="wireless" />
      </div>
    </Stage>
  );
};

/* ---------- 1:55 A typo, and it still finds them ---------- */

export const S20TypoFinds: React.FC = () => {
  const a = useAnim();
  const word = 'headphones';
  const fixed = a.t > 3.4;
  return (
    <Stage style={{flexDirection: 'column', gap: 60}}>
      <div style={{display: 'flex', gap: 12}}>
        {word.split('').map((ch, i) => {
          const missing = i === 6;
          return (
            <div key={i} style={{transform: `translateY(${(1 - a.pop(0.2 + i * 0.1)) * 40}px)`, opacity: a.p(0.2 + i * 0.1)}}>
              {missing && !fixed ? (
                <div style={{width: 64, height: 76, borderRadius: 14, border: '2px dashed #ff4d33', boxShadow: '0 0 20px rgba(255,77,51,0.4)'}} />
              ) : (
                <Glossy tone={missing ? 'green' : 'pink'} w={64} h={76} r={14} style={{fontFamily: FONT_MONO, fontWeight: 700, fontSize: 38, color: missing ? '#06382a' : '#2a0e1c'}}>{ch}</Glossy>
              )}
            </div>
          );
        })}
      </div>
      <div style={{display: 'flex', gap: 26, opacity: a.p(4.2)}}>
        {['doc 1', 'doc 2', 'doc 3'].map((d, i) => (
          <Glossy key={d} tone="green" w={150} h={58} r={14} style={{fontFamily: FONT_MONO, fontWeight: 700, fontSize: 24, color: '#06382a', transform: `scale(${a.pop(4.2 + i * 0.2)})`}}>{d}</Glossy>
        ))}
      </div>
    </Stage>
  );
};

/* ---------- 2:04 Then filter, and sort what is left ---------- */

export const S21Filter: React.FC = () => {
  const a = useAnim();
  const sorted = a.t > 3.4;
  const w = sorted ? [720, 560, 400, 260] : [460, 700, 300, 580];
  return (
    <Stage>
      <div style={{display: 'flex', alignItems: 'center', gap: 50}}>
        <Panel w={250} bg="#0c1320" border="#1b2840" style={{padding: 22, display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center'}}>
          <Icon name="filter" size={46} color="#8392a6" />
          {['SONY', 'UNDER $200'].map((c, i) => (
            <div key={c} style={{transform: `scale(${a.pop(0.4 + i * 0.4)})`, width: '100%'}}>
              <Glossy tone="pink" h={64} r={14} w="100%" style={{gap: 10, fontFamily: "'Montserrat'", fontWeight: 800, fontSize: 20, color: '#2a0e1c'}}>
                <Icon name="check" size={22} color="#2a0e1c" stroke={3} />{c}
              </Glossy>
            </div>
          ))}
        </Panel>
        <div style={{display: 'flex', flexDirection: 'column', gap: 26}}>
          {w.map((x, i) => (
            <div key={i} style={{opacity: a.p(1.6 + i * 0.2)}}>
              <Glossy tone="green" w={x * a.p(1.8 + i * 0.2, 0.8)} h={56} r={14} style={{transition: 'none'}} />
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
};

/* ---------- 2:12 Product, website and document search ---------- */

export const S22Types: React.FC = () => {
  const a = useAnim();
  return (
    <Stage style={{flexDirection: 'column', gap: 0}}>
      <div style={{transform: `scale(${a.pop(0.2)})`}}><ESLogo size={88} /></div>
      <div style={{position: 'relative', width: 760, height: 50, opacity: a.p(0.8)}}>
        <div style={{position: 'absolute', left: 190, right: 190, top: 24, height: 2, background: '#2a3a52'}} />
        <div style={{position: 'absolute', left: 190, top: 24, width: 2, height: 26, background: '#2a3a52'}} />
        <div style={{position: 'absolute', right: 190, top: 24, width: 2, height: 26, background: '#2a3a52'}} />
        <div style={{position: 'absolute', left: 379, top: 0, width: 2, height: 24, background: '#2a3a52'}} />
      </div>
      <div style={{display: 'flex', gap: 34}}>
        {['PRODUCT', 'WEBSITE'].map((n, i) => (
          <div key={n} style={{opacity: a.p(1.2 + i * 0.4), transform: `translateY(${(1 - a.p(1.2 + i * 0.4)) * 30}px)`}}>
            <Panel w={350} bg="#0b1220" border="#1b2840" style={{padding: 24, paddingBottom: 18, display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center'}}>
              <SearchBar text="" w={300} h={36} />
              {i === 0 ? (
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, width: 300}}>
                  {range(4).map((k) => <Glossy key={k} tone="blue" h={70} r={14} w="100%" glow={false} />)}
                </div>
              ) : (
                <div style={{display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center', width: 300}}>
                  <Icon name="globe" size={80} color="#3f93f5" stroke={1.4} />
                  {[300, 260, 200].map((w) => <div key={w} style={{width: w, height: 8, borderRadius: 4, background: '#2c3a4d'}} />)}
                </div>
              )}
              <Bold size={22} style={{letterSpacing: 2}}>{n}</Bold>
            </Panel>
          </div>
        ))}
      </div>
    </Stage>
  );
};

/* ---------- 2:19 Search is not the only thing ---------- */

export const S23NotOnly: React.FC = () => {
  const a = useAnim();
  const fill = a.p(0.4, 3.2);
  return (
    <Stage>
      <div style={{position: 'relative', width: 620, height: 74, borderRadius: 18, background: '#0c1117', overflow: 'hidden', border: '1.5px solid #141c25'}}>
        <div style={{position: 'absolute', inset: 0, width: `${(0.28 + fill * 0.14) * 100}%`, background: gradientGreen}} />
        <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', paddingLeft: 36, gap: 14, fontFamily: "'Montserrat'", fontWeight: 800, fontSize: 24, color: '#06382a'}}>
          <Icon name="search" size={28} color="#06382a" stroke={2.4} />SEARCH
        </div>
      </div>
    </Stage>
  );
};
const gradientGreen = 'linear-gradient(180deg,#8bffc4,#35e394 55%,#10a566)';

/* ---------- 2:24 Not which match, but how many ---------- */

export const S24HowMany: React.FC = () => {
  const a = useAnim();
  const hits = [18, 35, 52, 74, 91, 99, 124, 140, 158, 170, 20, 66, 87];
  const count = Math.floor(a.lin(2.5, 5) * 1284);
  return (
    <Stage style={{flexDirection: 'column', alignItems: 'flex-start', gap: 40, paddingLeft: 0}}>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(17, 50px)', gap: 8}}>
        {range(17 * 6).map((i) => {
          const on = hits.includes(i) && a.t > 1.2 + hits.indexOf(i) * 0.25;
          return <Tile key={i} icon={PRODUCT_ICONS[(i * 3) % 16]} tone={on ? 'green' : 'blue'} size={50} style={{opacity: fade((a.t - i * 0.01) * 6)}} />;
        })}
      </div>
      <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
        <Glossy tone="pink" w={64} h={64} r={16}><Icon name="search" size={30} color="#2a0e1c" stroke={2.4} /></Glossy>
        <Mono size={44} color="#5df2a6" bold style={{opacity: a.p(2.5)}}>{count.toLocaleString()} <span style={{color: C.dim, fontSize: 22}}>matches</span></Mono>
      </div>
    </Stage>
  );
};

/* ---------- 2:33 Average price. And the biggest brand ---------- */

export const S25AvgBrand: React.FC = () => {
  const a = useAnim();
  const brands: Array<[string, number]> = [['SONY', 1], ['APPLE', 0.78], ['JBL', 0.55], ['BOSE', 0.4]];
  return (
    <Stage>
      <div style={{display: 'flex', gap: 30}}>
        <Panel w={560} h={340} style={{padding: 26}}>
          <Label size={15}>Average product price</Label>
          <Mono size={60} color="#f5b300" bold style={{marginTop: 90, textAlign: 'center'}}>
            {a.t < 1.8 ? 'avg(price)' : `$${(184.5 * a.p(1.8, 1.4)).toFixed(2)}`}
          </Mono>
        </Panel>
        <Panel w={560} h={340} style={{padding: 26}}>
          <Label size={15}>Most products</Label>
          <div style={{marginTop: 30, display: 'flex', flexDirection: 'column', gap: 16}}>
            {brands.map(([b, v], i) => (
              <div key={b} style={{display: 'flex', alignItems: 'center', gap: 16, opacity: a.p(2.4 + i * 0.2)}}>
                <Mono size={16} color={C.dim} style={{width: 70}}>{b}</Mono>
                <Glossy tone={i === 0 ? 'cyan' : 'blue'} w={380 * v * a.p(2.6 + i * 0.2, 0.9)} h={34} r={10} glow={false} />
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </Stage>
  );
};

/* ---------- 2:39 These calculations are aggregations ---------- */

export const S26Aggregations: React.FC = () => {
  const a = useAnim();
  const labels = ['avg(price)', 'count(*)', 'max(price)'];
  const values = ['184.50', '1,284', '$399'];
  const converge = a.p(3, 3.5);
  return (
    <Stage>
      <div style={{display: 'flex', gap: 34}}>
        {labels.map((l, p) => (
          <Panel key={l} w={330} h={250} bg="#04070c" style={{overflow: 'hidden'}}>
            {range(9).map((i) => {
              const bx = 30 + ((i * 97 + p * 31) % 270);
              const by = 30 + ((i * 61 + p * 17) % 190);
              const x = bx + (165 - bx) * converge + Math.sin(a.t * 2 + i) * 6 * (1 - converge);
              const y = by + (125 - by) * converge + Math.cos(a.t * 2 + i * 2) * 6 * (1 - converge);
              return <div key={i} style={{position: 'absolute', left: x, top: y, width: 14, height: 14, borderRadius: 7, background: '#3f93f5', boxShadow: '0 0 12px #3f93f5', opacity: 1 - fade((converge - 0.85) * 8)}} />;
            })}
            <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: fade((converge - 0.8) * 5)}}>
              <Mono size={16} color={C.dim}>{l}</Mono>
              <Mono size={50} color="#f5b300" bold>{values[p]}</Mono>
            </div>
          </Panel>
        ))}
      </div>
    </Stage>
  );
};
