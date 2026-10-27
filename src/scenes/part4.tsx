import React from 'react';
import {useAnim, range, fade} from '../anim';
import {C, FONT_MONO} from '../theme';
import {
  Abs, Bold, Brand, Chip, ESLogo, Glossy, Icon, Label, Line, Mono, Panel, SearchBar, Server, Stage, Tile, Win,
} from '../ui';

/* ---------- 4:08 How does it handle huge amounts of data ---------- */

export const S40Huge: React.FC = () => {
  const a = useAnim();
  return (
    <Stage>
      <div style={{position: 'relative', width: 700, height: 520}}>
        <Abs x={30} y={40} style={{display: 'flex', gap: 12, transform: `scale(${a.pop(0.3)})`}}>
          <ESLogo size={70} />
          <Brand label="apple" size={50} dark />
        </Abs>
        <Abs x={250} y={150} style={{transform: `scale(${a.pop(1.0)})`}}>
          <Glossy tone="blue" w={140} h={130} r={20} />
        </Abs>
        {range(5).map((i) => {
          const y = ((a.t * 120 + i * 90) % 300);
          return <Abs key={i} x={300 + (i % 3) * 20} y={y} style={{opacity: a.p(1.6) * (1 - y / 300)}}><Glossy tone="white" w={34} h={34} r={9} glow={false} /></Abs>;
        })}
        <Abs x={200} y={290} style={{transform: `scale(${a.pop(0.7)})`}}><Server w={260} /></Abs>
      </div>
    </Stage>
  );
};

/* ---------- Node helper ---------- */

const ProductBadges: React.FC<{items: Array<[string, string]>; show?: number}> = ({items, show = 1}) => (
  <div style={{display: 'flex', gap: 10, opacity: fade(show), transform: `translateY(${(1 - fade(show)) * -20}px)`}}>
    {items.map(([b, n]) => (
      <Glossy key={n} tone="green" w={110} h={84} r={16} glow={false} style={{flexDirection: 'column', gap: 4}}>
        <Brand label={b} size={34} />
        <div style={{fontFamily: FONT_MONO, fontWeight: 700, fontSize: 9, color: '#06382a', textAlign: 'center', lineHeight: 1.1}}>{n}</div>
      </Glossy>
    ))}
  </div>
);

const Node: React.FC<{
  n: number;
  items?: Array<[string, string]>;
  show?: number;
  dead?: boolean;
  shardTone?: 'blue' | 'dark';
  children?: React.ReactNode;
}> = ({n, items, show = 1, dead, shardTone = 'blue', children}) => (
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, opacity: dead ? 0.3 : 1, position: 'relative'}}>
    {items && <ProductBadges items={items} show={show} />}
    <Glossy tone={shardTone} w={230} h={60} r={16} glow={false} style={{gap: 8}}>{children}</Glossy>
    <Server w={230} />
    <Label size={13}>Node {n}</Label>
  </div>
);

/* ---------- 4:13 Data spread across machines called nodes ---------- */

export const S41Nodes: React.FC = () => {
  const a = useAnim();
  return (
    <Stage>
      <div style={{display: 'flex', gap: 90, alignItems: 'flex-end'}}>
        {[0, 1, 2].map((i) => {
          const s = a.pop(0.3 + i * 0.3);
          return (
            <div key={i} style={{transform: `scale(${s})`, position: 'relative'}}>
              <div style={{position: 'absolute', top: -160, left: 80, display: 'flex', gap: 10}}>
                {range(3).map((k) => {
                  const y = ((a.t * 90 + k * 60 + i * 20) % 170);
                  return <div key={k} style={{opacity: a.p(1.2) * (1 - y / 190), transform: `translateY(${y}px)`}}><Glossy tone="blue" w={26} h={26} r={7} glow={false} /></div>;
                })}
              </div>
              <Node n={i + 1} />
            </div>
          );
        })}
      </div>
    </Stage>
  );
};

/* ---------- 4:22 Larger data sets, and more traffic ---------- */

const SETS: Array<Array<[string, string]>> = [
  [['SONY', 'WH-1000XM5'], ['JBL', 'TUNE 770NC']],
  [['apple', 'AIRPODS PRO'], ['SAMSUNG', 'GALAXY BUDS']],
  [['BOSE', 'QUIETCOMFORT'], ['SENN', 'MOMENTUM 4']],
];

export const S42Traffic: React.FC = () => {
  const a = useAnim();
  return (
    <Stage style={{transform: 'scale(1.25)'}}>
      <div style={{position: 'relative', display: 'flex', gap: 60}}>
        {SETS.map((s, i) => (
          <Node key={i} n={i + 1} items={s} show={a.p(0.3 + i * 0.3)} />
        ))}
        {range(7).map((k) => {
          const x = ((k * 211 + a.t * 160) % 680);
          const y = 30 + ((k * 97 + a.t * 60) % 300);
          return (
            <div key={k} style={{position: 'absolute', left: x, top: y, opacity: a.p(1.4)}}>
              <Glossy tone="pink" w={32} h={32} r={9}><Icon name="search" size={18} color="#2a0e1c" stroke={2.6} /></Glossy>
            </div>
          );
        })}
      </div>
    </Stage>
  );
};

/* ---------- 4:26 Copies across nodes, so a failure survives ---------- */

export const S43Replicas: React.FC = () => {
  const a = useAnim();
  const dead = a.t > 4.2;
  return (
    <Stage style={{flexDirection: 'column', gap: 24, transform: 'scale(1.25)'}}>
      <Mono size={16} color="#b9c4d2" style={{letterSpacing: 5}}>MORE NODES -&gt; SCALABILITY</Mono>
      <div style={{display: 'flex', gap: 60}}>
        {SETS.map((s, i) => (
          <Node key={i} n={i + 1} items={s} dead={dead && i === 1}>
            <div style={{display: 'flex', gap: 8, opacity: a.p(1.4 + i * 0.4)}}>
              {SETS[(i + 1) % 3].slice(0, 2).map(([b]) => <Brand key={b} label={b} size={30} />)}
            </div>
          </Node>
        ))}
      </div>
      {dead && <Mono size={18} color="#5df2a6" style={{opacity: a.p(4.4)}}>node 2 is down — every document still exists on another node</Mono>}
    </Stage>
  );
};

/* ---------- 4:31 Underneath it all, Apache Lucene ---------- */

export const S44Underneath: React.FC = () => {
  const a = useAnim();
  const rise = a.p(0.4, 1.2);
  return (
    <Stage>
      <div style={{width: 760, height: 330, borderRadius: 44, overflow: 'hidden', position: 'relative', boxShadow: '0 20px 70px rgba(38,212,238,0.35)', transform: `translateY(${(1 - rise) * 40}px)`, opacity: rise}}>
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#9cf6ff,#26d4ee 60%,#16b5d6)'}} />
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 105, background: 'linear-gradient(180deg,#c4ee4a,#8cc218)'}} />
        <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 30, paddingBottom: 20}}>
          <ESLogo size={120} />
          <Bold size={46} color="#073746" style={{letterSpacing: 2}}>ELASTICSEARCH</Bold>
        </div>
      </div>
    </Stage>
  );
};

/* ---------- 4:36 A search library for indexing and text ---------- */

export const S45Lucene: React.FC = () => {
  const a = useAnim();
  const tags = ['indexing', 'text search', 'scoring', 'analysis'];
  return (
    <Stage>
      <div style={{display: 'flex', alignItems: 'center', gap: 0}}>
        <div style={{transform: `scale(${a.pop(0.3)})`}}>
          <Glossy tone="lime" w={300} h={190} r={40} style={{flexDirection: 'column', gap: 10}}>
            <div style={{width: 96, height: 96, borderRadius: 24, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px rgba(0,0,0,0.25)'}}>
              <Icon name="search" size={50} color="#5b8a0b" stroke={2.2} />
            </div>
            <Mono size={15} color="#35520a" bold style={{letterSpacing: 4}}>LUCENE</Mono>
          </Glossy>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 24, marginLeft: 40}}>
          {tags.map((t, i) => (
            <div key={t} style={{display: 'flex', alignItems: 'center', opacity: a.p(1 + i * 0.35)}}>
              <div style={{width: 80 * a.p(1 + i * 0.35, 0.5), height: 2, background: '#6b7a8c'}} />
              <Mono size={22} color="#e8eef6" style={{marginLeft: 12}}>{t}</Mono>
            </div>
          ))}
        </div>
      </div>
    </Stage>
  );
};

/* ---------- 4:43 Elasticsearch builds a system around it ---------- */

export const S46System: React.FC = () => {
  const a = useAnim();
  const sat = [[-170, -40], [170, -40], [0, 160]];
  return (
    <Stage>
      <div style={{position: 'relative', width: 520, height: 520, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {[230, 170].map((r, i) => (
          <div key={r} style={{position: 'absolute', width: r * 2, height: r * 2, borderRadius: '50%', border: '3px solid #17909d', boxShadow: '0 0 24px rgba(38,212,238,0.3)', opacity: a.p(0.3 + i * 0.3), transform: `scale(${0.8 + 0.2 * a.p(0.3 + i * 0.3)})`}} />
        ))}
        <div style={{transform: `scale(${a.pop(0.2)})`, zIndex: 2}}>
          <Glossy tone="lime" w={150} h={150} r={34}><div style={{width: 74, height: 74, borderRadius: 18, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Icon name="search" size={40} color="#5b8a0b" stroke={2.2} /></div></Glossy>
        </div>
        {sat.map(([x, y], i) => (
          <div key={i} style={{position: 'absolute', transform: `translate(${x}px, ${y}px) scale(${a.pop(1 + i * 0.3)})`}}>
            <Server w={86} style={{height: 80}} />
          </div>
        ))}
        <div style={{position: 'absolute', bottom: 6, transform: `scale(${a.pop(2)})`}}>
          <Glossy tone="cyan" w={130} h={50} r={14} style={{fontFamily: FONT_MONO, fontWeight: 700, fontSize: 22, color: '#06303d'}}>API</Glossy>
        </div>
      </div>
    </Stage>
  );
};

/* ---------- 4:47 Put it together: the data going in ---------- */

export const S47DataIn: React.FC = () => {
  const a = useAnim();
  const y = a.p(1, 2.4);
  return (
    <Stage style={{flexDirection: 'column', gap: 30}}>
      <div style={{transform: `scale(${a.pop(0.3)})`, borderRadius: '50%', border: '4px solid #26d4ee', padding: 10, boxShadow: '0 0 30px rgba(38,212,238,0.5)'}}>
        <ESLogo size={74} style={{borderRadius: '50%'}} />
      </div>
      <div style={{height: 100, width: 4, background: 'linear-gradient(#26d4ee,transparent)', opacity: a.p(0.8)}} />
      <div style={{position: 'relative'}}>
        <Glossy tone="blue" w={560} h={110} r={26} style={{transform: `translateY(${(1 - a.pop(0.6)) * 60}px)`}} />
        {range(5).map((i) => (
          <div key={i} style={{position: 'absolute', left: 90 + i * 100, top: -120 + ((a.t * 110 + i * 40) % 220), opacity: a.p(1.4) * 0.9}}>
            <Glossy tone="white" w={26} h={26} r={7} glow={false} />
          </div>
        ))}
      </div>
    </Stage>
  );
};

/* ---------- 4:54 Indexed once, found in one step ---------- */

export const S48Radial: React.FC = () => {
  const a = useAnim();
  const N = 13;
  const cx = 480, cy = 440, R = 380;
  return (
    <Stage>
      <div style={{position: 'relative', width: 960, height: 520}}>
        {range(N).map((i) => {
          const ang = Math.PI * (1 - i / (N - 1));
          const x = cx + Math.cos(ang) * R;
          const y = cy - Math.sin(ang) * R * 0.95;
          const hot = i === 8 && a.t > 3.4;
          return (
            <React.Fragment key={i}>
              <Line x1={cx} y1={cy} x2={x} y2={y} progress={a.p(0.5 + i * 0.05, 0.8)} color={hot ? '#5df2a6' : '#3a4656'} width={hot ? 4 : 2} />
              <Abs x={x - 26} y={y - 20} style={{opacity: a.p(1.1 + i * 0.05)}}>
                <Glossy tone={hot ? 'green' : 'blue'} w={52} h={40} r={8} glow={hot} />
              </Abs>
            </React.Fragment>
          );
        })}
        <Abs x={cx - 38} y={cy - 38} style={{transform: `scale(${a.pop(0.2)})`}}>
          <div style={{width: 76, height: 76, borderRadius: '50%', border: '3px solid #26d4ee', background: '#08323a', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 24px rgba(38,212,238,0.5)'}}>
            <Icon name="layers" size={38} color="#8ef3ff" />
          </div>
        </Abs>
      </div>
    </Stage>
  );
};

/* ---------- 5:00 Four for search, one for analysis ---------- */

export const S49Product: React.FC = () => {
  const a = useAnim();
  const q = 'wireless headphones';
  const typed = a.typed(q, 0.8, 8);
  return (
    <Stage>
      <Win w={1180} h={520} url="cloudxberry-store" colorDots icons={false} style={{boxShadow: '0 0 50px rgba(38,212,238,0.15)', borderColor: '#17404a'}}>
        <div style={{display: 'flex', height: 480}}>
          <div style={{width: 250, background: '#0a0f16', padding: 24, display: 'flex', flexDirection: 'column', gap: 12, opacity: a.p(0.2)}}>
            <Label size={13}>Filters</Label>
            <Label size={11}>Brand</Label>
            {[['SONY', true], ['JBL', false], ['BOSE', false]].map(([b, on]) => (
              <div key={String(b)} style={{height: 40, borderRadius: 8, background: on ? 'linear-gradient(90deg,#35e394,#10a566)' : '#111923', display: 'flex', alignItems: 'center', padding: '0 12px', fontFamily: FONT_MONO, fontWeight: 700, fontSize: 14, color: on ? '#06382a' : '#9fb0c4'}}>{String(b)}</div>
            ))}
            <Label size={11} style={{marginTop: 10}}>Price</Label>
            <div style={{height: 6, borderRadius: 3, background: '#1a2430'}}><div style={{width: '60%', height: 6, borderRadius: 3, background: '#35e394'}} /></div>
            <Mono size={14} color="#cfd8e3">$100 - $300</Mono>
          </div>
          <div style={{flex: 1, padding: 22}}>
            <div style={{height: 52, borderRadius: 10, background: '#0e151d', border: '1.5px solid #17212c', display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', fontFamily: FONT_MONO, fontWeight: 700, fontSize: 20, color: '#fff'}}>
              <Icon name="search" size={20} color="#fc61a7" />{typed}
            </div>
            <div style={{marginTop: 12, height: 44, borderRadius: 8, background: '#0b1a22', display: 'flex', alignItems: 'center', gap: 12, padding: '0 14px', fontFamily: FONT_MONO, fontWeight: 700, fontSize: 18, color: '#5ad7f0', opacity: a.p(2.4)}}>
              <Icon name="search" size={18} color="#5ad7f0" />wireless headphones
              <span style={{marginLeft: 'auto', fontSize: 11, color: C.dim, letterSpacing: 3}}>SUGGESTED</span>
            </div>
            {[['SONY WH-1000XM5', '$179.99', 0.92], ['SONY WF-C700N', '$119.99', 0.7]].map(([n, p, w], i) => (
              <div key={String(n)} style={{marginTop: 14, opacity: a.p(3.2 + i * 0.5)}}>
                <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: FONT_MONO, fontWeight: 700, fontSize: 16, color: '#fff'}}>
                  <span>{String(n)}</span><span style={{color: '#5aa3ff'}}>{String(p)}</span>
                </div>
                <div style={{height: 5, borderRadius: 3, marginTop: 8, width: `${Number(w) * 100 * a.p(3.4 + i * 0.5, 0.8)}%`, background: 'linear-gradient(90deg,#8bffc4,#10a566)'}} />
              </div>
            ))}
          </div>
        </div>
      </Win>
    </Stage>
  );
};

/* ---------- 5:09 The work spreads across the cluster ---------- */

export const S50Cluster: React.FC = () => {
  const a = useAnim();
  return (
    <Stage style={{flexDirection: 'column', gap: 40}}>
      <div style={{transform: `scale(${a.pop(0.2)})`}}>
        <Glossy tone="pink" w={74} h={74} r={20}><Icon name="search" size={36} color="#2a0e1c" stroke={2.4} /></Glossy>
      </div>
      <div style={{display: 'flex', gap: 56}}>
        {range(4).map((i) => {
          const active = a.t > 1 + i * 0.5;
          return (
            <div key={i} style={{opacity: a.p(0.6 + i * 0.2), position: 'relative'}}>
              <div style={{position: 'absolute', left: 105, top: -40, width: 2, height: 40, background: active ? '#ff5fa8' : '#222c38'}} />
              <div style={{width: 210, height: 120, borderRadius: 14, background: active ? 'linear-gradient(180deg,#fff,#c4ccd8)' : 'linear-gradient(180deg,#2a2f38,#171a20)', boxShadow: active ? '0 0 30px rgba(255,95,168,0.35)' : 'none', padding: 16, fontFamily: FONT_MONO, fontWeight: 700, fontSize: 14, color: active ? '#20262f' : '#59616d', display: 'flex', alignItems: 'flex-start'}}>
                <Icon name="server" size={16} color={active ? '#20262f' : '#59616d'} style={{marginRight: 8}} />NODE {i + 1}
              </div>
            </div>
          );
        })}
      </div>
    </Stage>
  );
};

/* ---------- 5:13 Not another database, a search engine ---------- */

export const S51Engine: React.FC = () => {
  const a = useAnim();
  return (
    <Stage>
      <div style={{display: 'flex', alignItems: 'center', gap: 0}}>
        <div style={{transform: `scale(${a.pop(0.2)})`}}>
          <Glossy tone="blue" w={200} h={210} r={20} style={{flexDirection: 'column', gap: 12, justifyContent: 'flex-start', padding: 18, alignItems: 'stretch'}}>
            <Mono size={13} color="#06223f" bold style={{letterSpacing: 2}}>LARGE DATA</Mono>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, flex: 1}}>
              {range(12).map((i) => <div key={i} style={{background: 'rgba(255,255,255,0.55)', borderRadius: 4}} />)}
            </div>
          </Glossy>
        </div>
        <div style={{width: 60, height: 3, background: '#26d4ee', opacity: a.p(0.9)}} />
        <div style={{transform: `scale(${a.pop(1.1)})`}}>
          <Glossy tone="cyan" w={200} h={210} r={20} style={{flexDirection: 'column', gap: 12, justifyContent: 'flex-start', padding: 18, alignItems: 'stretch'}}>
            <Mono size={13} color="#06303d" bold style={{letterSpacing: 2}}>INDEX</Mono>
            {range(4).map((i) => <div key={i} style={{height: 18, borderRadius: 5, background: 'rgba(6,48,61,0.55)', width: `${100 - i * 12}%`}} />)}
          </Glossy>
        </div>
        <div style={{width: 60, height: 3, background: '#26d4ee', opacity: a.p(1.6)}} />
        <div style={{transform: `scale(${a.pop(2)})`}}>
          <div style={{width: 200, height: 210, borderRadius: 20, border: '2px solid #17909d', background: '#06151a', boxShadow: '0 0 40px rgba(38,212,238,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18}}>
            <Mono size={13} color="#fff" bold style={{letterSpacing: 2}}>ELASTICSEARCH</Mono>
            <ESLogo size={90} />
          </div>
        </div>
      </div>
    </Stage>
  );
};

/* ---------- 5:22 One technology, the whole range ---------- */

export const S52Range: React.FC = () => {
  const a = useAnim();
  return (
    <Stage>
      <div style={{display: 'flex', alignItems: 'center', gap: 50}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 70}}>
          <div style={{opacity: a.p(0.3)}}>
            <Label size={14} style={{marginBottom: 12}}>Product search</Label>
            <SearchBar text="wireless headphones" w={380} h={52} />
            <div style={{marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8}}>
              {[360, 300, 220].map((w, i) => <Glossy key={w} tone="green" w={w * a.p(0.8 + i * 0.2, 0.8)} h={14} r={5} glow={false} />)}
            </div>
          </div>
          <div style={{opacity: a.p(1.6)}}>
            <Label size={14} style={{marginBottom: 12}}>Log analysis</Label>
            <svg width={380} height={80}>
              <path d="M0,60 C40,10 80,70 120,40 S200,10 240,45 S320,70 380,20" fill="none" stroke="#ff5a1f" strokeWidth={4} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - a.p(1.8, 1.5)} />
            </svg>
          </div>
        </div>
        <div style={{width: 60, height: 2, background: '#3a4656', opacity: a.p(2.4)}} />
        <div style={{transform: `scale(${a.pop(2.4)})`}}><ESLogo size={140} /></div>
      </div>
    </Stage>
  );
};

/* ---------- 5:29 The one thing worth remembering ---------- */

export const S53Remember: React.FC = () => {
  const a = useAnim();
  const terms = ['wireless', 'headphones', 'sony', 'audio'];
  return (
    <Stage style={{alignItems: 'flex-start', paddingTop: 20}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 80, position: 'relative'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 14, marginTop: 80, opacity: a.p(0.3)}}>
          {[0, 1].map((i) => <Glossy key={i} tone="blue" w={120} h={44} r={10} glow={false} />)}
        </div>
        <Panel w={620} bg="#0a0f16" border="#1b2733" style={{padding: 22}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18}}>
            <ESLogo size={34} /><Bold size={17} style={{letterSpacing: 3}}>INDEX</Bold>
          </div>
          {terms.map((t, i) => (
            <div key={t} style={{display: 'flex', gap: 14, marginBottom: 12, opacity: a.p(0.6 + i * 0.3)}}>
              <Glossy tone="cyan" w={150} h={38} r={9} glow={false} style={{fontFamily: FONT_MONO, fontStyle: 'italic', fontWeight: 700, fontSize: 17, color: '#06303d'}}>{t}</Glossy>
              {range(3).map((k) => <Glossy key={k} tone="blue" w={110} h={38} r={9} glow={false} />)}
            </div>
          ))}
        </Panel>
        <div style={{transform: `scale(${a.pop(1.8)})`, alignSelf: 'flex-start'}}>
          <Glossy tone="pink" w={60} h={60} r={16}><Icon name="search" size={30} color="#2a0e1c" stroke={2.4} /></Glossy>
        </div>
      </div>
    </Stage>
  );
};

/* ---------- 5:38 That is the core idea ---------- */

export const S54CoreIdea: React.FC = () => {
  const a = useAnim();
  return (
    <Stage style={{flexDirection: 'column', gap: 36}}>
      <div style={{transform: `scale(${a.pop(0.2, 0.8)})`, width: 300, height: 300, borderRadius: '50%', border: '6px solid #26d4ee', boxShadow: '0 0 60px rgba(38,212,238,0.5), inset 0 0 40px rgba(38,212,238,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <ESLogo size={190} />
      </div>
      <Bold size={38} style={{letterSpacing: 6, opacity: a.p(1)}}>ELASTICSEARCH</Bold>
    </Stage>
  );
};
