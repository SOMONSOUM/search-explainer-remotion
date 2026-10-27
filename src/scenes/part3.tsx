import React from 'react';
import {useAnim, range, fade} from '../anim';
import {C, FONT_MONO} from '../theme';
import {
  Abs, Bold, CodeLine, ESLogo, Glossy, Icon, Label, Line, Mono, Panel, Rack, SearchBar, Stage, Win,
} from '../ui';

/* ---------- 2:48 Another common case: application logs ---------- */

export const S27Logs: React.FC = () => {
  const a = useAnim();
  return (
    <Stage>
      <Win w={380} h={290} url=">>> zt" icons={false}>
        <div style={{position: 'absolute', inset: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${a.pop(0.4)})`}}>
          <div style={{transform: `rotate(${a.t * 40}deg)`}}>
            <Icon name="gear" size={90} color="#7a8899" stroke={1.4} />
          </div>
        </div>
      </Win>
    </Stage>
  );
};

/* ---------- 2:52 Hundreds of servers, all writing logs ---------- */

export const S28Servers: React.FC = () => {
  const a = useAnim();
  const off = [2, 5];
  return (
    <Stage style={{flexDirection: 'column', gap: 0, transform: 'scale(1.35)'}}>
      <div style={{display: 'flex', gap: 26}}>
        {range(8).map((i) => (
          <div key={i} style={{opacity: a.p(0.2 + i * 0.12), transform: `translateY(${(1 - a.p(0.2 + i * 0.12)) * 30}px)`}}>
            <Rack w={100} off={off.includes(i)} active={!off.includes(i) && Math.floor(a.t * 5 + i * 3) % 4 === 0} />
          </div>
        ))}
      </div>
      <div style={{display: 'flex', gap: 26, marginTop: 6}}>
        {range(8).map((i) => (
          <div key={i} style={{width: 100, height: 140, position: 'relative', overflow: 'hidden', opacity: off.includes(i) ? 0 : 1}}>
            {range(4).map((k) => (
              <div key={k} style={{position: 'absolute', left: 50, top: ((a.t * 80 + k * 35 + i * 13) % 140), width: 2, height: 16, background: '#ff7a33', opacity: 0.7}} />
            ))}
          </div>
        ))}
      </div>
    </Stage>
  );
};

/* ---------- 2:58 An error, a timeout, a failed request ---------- */

export const S29Errors: React.FC = () => {
  const a = useAnim();
  const rows: Array<[string, string, string | null]> = [
    ['auth-service', 'invalid credentials', 'ERROR'],
    ['cart-service', 'upstream 30s', 'TIMEOUT'],
    ['pay-service', 'request failed 502', 'FAILED'],
  ];
  return (
    <Stage>
      <div style={{width: 980, position: 'relative'}}>
        {rows.map(([svc, msg, badge], i) => (
          <div key={svc} style={{display: 'flex', alignItems: 'center', height: 100, borderBottom: '1px solid #1a222c', opacity: a.p(0.3 + i * 0.9)}}>
            <Mono size={24} color="#fff" bold style={{width: 280}}>{svc}</Mono>
            <Mono size={19} color="#8392a6" style={{flex: 1}}>{msg}</Mono>
            <div style={{transform: `scale(${a.pop(1 + i * 0.9)})`}}>
              <Glossy tone="red" w={160} h={46} r={10} style={{fontFamily: FONT_MONO, fontWeight: 700, fontSize: 18, letterSpacing: 3, color: '#4a0d00'}}>{badge}</Glossy>
            </div>
          </div>
        ))}
        <div style={{position: 'absolute', right: 190, top: 0, width: 1, height: 300, background: '#1a222c'}} />
      </div>
    </Stage>
  );
};

/* ---------- 3:03 Millions of events, checked by hand ---------- */

const LogBlock: React.FC<{tone?: 'red' | 'orange'; w?: number; h?: number}> = ({tone = 'red', w = 110, h = 52}) => {
  const c = tone === 'red' ? '#ff4d33' : '#ff7a33';
  return (
    <div style={{width: w, height: h, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 5, padding: '0 10px'}}>
      {[1, 0.8, 0.9].map((k, i) => (
        <div key={i} style={{height: 4, width: `${k * 100}%`, borderRadius: 2, background: c, boxShadow: `0 0 8px ${c}88`}} />
      ))}
    </div>
  );
};

export const S30ByHand: React.FC = () => {
  const a = useAnim();
  const checked = Math.min(32, Math.floor(a.t * 3.2));
  const cur = checked % 32;
  return (
    <Stage style={{flexDirection: 'column', gap: 40}}>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(8, 120px)', gap: 18}}>
        {range(32).map((i) => (
          <div key={i} style={{border: `2px solid ${i === cur ? '#e8eef6' : 'transparent'}`, borderRadius: 8, opacity: fade((a.t - i * 0.01) * 6) * (i < cur ? 0.4 : 1), boxShadow: i === cur ? '0 0 18px rgba(255,255,255,0.4)' : 'none'}}>
            <LogBlock />
          </div>
        ))}
      </div>
      <div style={{width: 600}}>
        <Mono size={32} color="#e8eef6" bold>{Math.min(32, cur + 1)} / 32 <span style={{fontSize: 14, color: C.dim, letterSpacing: 4, marginLeft: 40}}>SERVERS CHECKED</span></Mono>
        <div style={{height: 6, background: '#161d26', borderRadius: 3, marginTop: 12}}>
          <div style={{height: 6, width: `${((cur + 1) / 32) * 100}%`, borderRadius: 3, background: '#e8eef6'}} />
        </div>
      </div>
    </Stage>
  );
};

/* ---------- 3:12 Collect them centrally, and index them ---------- */

export const S31Collect: React.FC = () => {
  const a = useAnim();
  const frame = a.p(2, 1);
  return (
    <Stage style={{transform: 'scale(1.9)'}}>
      <div style={{position: 'relative', padding: 14}}>
        <div style={{position: 'absolute', inset: 0, border: '3px solid #26d4ee', boxShadow: '0 0 24px rgba(38,212,238,0.5)', opacity: frame, borderRadius: 6}} />
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(6, 90px)', gap: 6}}>
          {range(24).map((i) => {
            const s = a.pop(0.2 + (i % 6) * 0.06 + Math.floor(i / 6) * 0.1, 0.5);
            return (
              <div key={i} style={{transform: `scale(${s})`}}>
                <Glossy tone="orange" w={90} h={52} r={8} glow={false} style={{flexDirection: 'column', gap: 5, alignItems: 'flex-start', padding: '0 14px'}}>
                  {[1, 0.8, 0.9].map((k, j) => <div key={j} style={{height: 4, width: `${k * 100}%`, borderRadius: 2, background: '#fff', opacity: 0.85}} />)}
                </Glossy>
              </div>
            );
          })}
        </div>
      </div>
    </Stage>
  );
};

/* ---------- 3:15 Now ask it questions about the logs ---------- */

export const S32AskLogs: React.FC = () => {
  const a = useAnim();
  const msgs = ['auth-service invalid credentials', 'auth-service token expired', 'auth-service invalid credentials', 'auth-service signature mismatch', 'auth-service invalid credentials', 'auth-service token expired', 'auth-service invalid credentials'];
  const n = Math.floor(a.lin(3.2, 5) * 482);
  return (
    <Stage style={{flexDirection: 'column', gap: 34}}>
      <SearchBar text={a.typed('authentication errors', 0.3, 14)} w={1060} h={68} caret={a.t < 3} />
      <div style={{display: 'flex', width: 1060, gap: 60, alignItems: 'flex-start'}}>
        <div style={{width: 540}}>
          {msgs.map((m, i) => (
            <div key={i} style={{height: 38, marginBottom: 6, padding: '0 14px', borderRadius: 4, background: '#1b0b08', fontFamily: FONT_MONO, fontSize: 15, color: '#ff6a4d', display: 'flex', alignItems: 'center', opacity: a.p(1.2 + i * 0.25)}}>{m}</div>
          ))}
        </div>
        <Mono size={110} color="#ff4d33" bold style={{marginLeft: 70, textShadow: '0 0 30px rgba(255,77,51,0.5)'}}>{n}</Mono>
      </div>
    </Stage>
  );
};

/* ---------- 3:24 Also used for logs and observability ---------- */

export const S33Observability: React.FC = () => {
  const a = useAnim();
  const pts = range(60).map((i) => {
    const x = 20 + (i / 59) * 860;
    const y = 160 - Math.sin(i / 59 * Math.PI * 3.2 - 0.4) * 80 * (0.5 + 0.5 * Math.sin(i / 59 * Math.PI));
    return `${i === 0 ? 'M' : 'L'}${x},${y}`;
  }).join(' ');
  return (
    <Stage>
      <Win w={920} h={420} url="" icons={false} style={{overflow: 'hidden'}}>
        <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 70, background: '#0b1118', display: 'flex', alignItems: 'center', gap: 18, padding: '0 24px'}}>
          <ESLogo size={40} />
          <Mono size={20} color="#8392a6" style={{letterSpacing: 6}}>LOG ANALYTICS</Mono>
        </div>
        <svg style={{position: 'absolute', top: 120, left: 0}} width={920} height={300}>
          {range(4).map((i) => <line key={i} x1={20} x2={900} y1={40 + i * 60} y2={40 + i * 60} stroke="#121a23" />)}
          <path d={pts} fill="none" stroke="#ff5a1f" strokeWidth={4} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - a.p(0.5, 3.5)} style={{filter: 'drop-shadow(0 0 8px rgba(255,90,31,0.7))'}} />
        </svg>
      </Win>
    </Stage>
  );
};

/* ---------- 3:30 What it stores: documents ---------- */

const MiniDoc: React.FC<{i: number; s: number}> = ({i, s}) => (
  <div style={{transform: `scale(${s})`, opacity: fade(s)}}>
    <Glossy tone="blue" w={150} h={200} r={18} style={{flexDirection: 'column', gap: 14, alignItems: 'flex-start', padding: '0 24px'}}>
      <Mono size={16} color="#cfe6ff" bold>doc {i + 1}</Mono>
      {[1, 0.75, 0.9, 0.6].map((k, j) => <div key={j} style={{height: 6, width: `${k * 100}%`, borderRadius: 3, background: 'rgba(255,255,255,0.8)'}} />)}
    </Glossy>
  </div>
);

export const S34Documents: React.FC = () => {
  const a = useAnim();
  return (
    <Stage>
      <div style={{position: 'relative', width: 980, height: 400, border: '2px solid #14766f', borderRadius: 22, boxShadow: '0 0 40px rgba(23,195,178,0.22)', opacity: a.p(0.1), display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 36}}>
        {range(4).map((i) => <MiniDoc key={i} i={i} s={a.pop(1.0 + i * 0.5)} />)}
      </div>
    </Stage>
  );
};

/* ---------- 3:34 A document is JSON ---------- */

export const S35Json: React.FC = () => {
  const a = useAnim();
  const lines: Array<[string, string, string?]> = [
    ['id', '2'],
    ['name', '"Sony Wireless Headphones"', '#8fe38f'],
    ['brand', '"Sony"', '#8fe38f'],
    ['price', '179.99'],
    ['category', '"Audio"', '#8fe38f'],
  ];
  return (
    <Stage>
      <div style={{width: 780, borderRadius: 18, background: '#0a0d12', border: '1.5px solid #1a222c', overflow: 'hidden'}}>
        <div style={{height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px', background: '#10151c'}}>
          <Mono size={18} color={C.dim}>doc 2</Mono>
          <ESLogo size={30} />
        </div>
        <div style={{padding: '22px 30px'}}>
          <CodeLine raw="{" indent={0} />
          {lines.map(([k, v, c], i) => (
            <div key={k} style={{opacity: a.p(0.6 + i * 0.4, 0.3)}}><CodeLine k={k} v={v} vColor={c ?? '#f0a35e'} /></div>
          ))}
          <CodeLine raw="}" indent={0} />
        </div>
      </div>
    </Stage>
  );
};

/* ---------- 3:40 Loosely, a row with columns ---------- */

export const S36Row: React.FC = () => {
  const a = useAnim();
  const rows = [['1', 'AirPods Pro', '249.00'], ['2', 'Sony Headphones', '179.99'], ['3', 'Galaxy Buds', '129.50']];
  const hl = a.p(1.2, 0.5);
  return (
    <Stage>
      <div style={{display: 'flex', alignItems: 'center', gap: 70}}>
        <Panel w={560} bg="#05080c" style={{padding: '10px 28px'}}>
          <div style={{display: 'flex', fontFamily: FONT_MONO, fontSize: 19, color: C.dim, height: 70, alignItems: 'center'}}>
            <span style={{width: 70}}>id</span><span style={{flex: 1}}>name</span><span>price</span>
          </div>
          {rows.map(([id, n, p], i) => (
            <div key={id} style={{display: 'flex', fontFamily: FONT_MONO, fontSize: 21, color: '#e8eef6', height: 78, alignItems: 'center', borderTop: '1px solid #121a23', background: i === 1 ? `rgba(63,147,245,${0.14 * hl})` : 'transparent'}}>
              <span style={{width: 70}}>{id}</span><span style={{flex: 1}}>{n}</span><span>{p}</span>
            </div>
          ))}
        </Panel>
        <Panel w={560} bg="#0a0d12" style={{padding: '24px 34px', opacity: a.p(1.8), transform: `translateX(${(1 - a.p(1.8)) * 40}px)`}}>
          <CodeLine raw="{" indent={0} size={22} />
          <CodeLine k="id" v="2" />
          <CodeLine k="name" v={'"Sony Headphones"'} vColor="#8fe38f" />
          <CodeLine k="price" v="179.99" />
          <CodeLine raw="}" indent={0} />
        </Panel>
      </div>
    </Stage>
  );
};

/* ---------- 3:48 Designed around searching them ---------- */

export const S37Designed: React.FC = () => {
  const a = useAnim();
  return (
    <Stage style={{flexDirection: 'column', gap: 0}}>
      <div style={{transform: `scale(${a.pop(0.3)})`, zIndex: 2}}><ESLogo size={80} style={{border: '4px solid #14766f', boxSizing: 'content-box'}} /></div>
      <div style={{width: 640, height: 40, borderLeft: '4px solid #26d4ee', borderTop: '4px solid #26d4ee', borderRight: '4px solid #26d4ee', borderTopLeftRadius: 8, borderTopRightRadius: 8, boxShadow: '0 0 14px rgba(38,212,238,0.4)', opacity: a.p(0.9), marginTop: -4}} />
      <div style={{display: 'flex', gap: 14, marginTop: 4}}>
        {range(5).map((i) => (
          <div key={i} style={{transform: `translateY(${(1 - a.pop(1.2 + i * 0.2)) * 50}px)`, opacity: a.p(1.2 + i * 0.2)}}>
            <Glossy tone="blue" w={116} h={134} r={14} style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', gap: 12, padding: '0 20px'}}>
              {[1, 0.7, 0.9, 0.6].map((k, j) => <div key={j} style={{height: 6, width: `${k * 100}%`, borderRadius: 3, background: 'rgba(255,255,255,0.85)'}} />)}
            </Glossy>
          </div>
        ))}
      </div>
    </Stage>
  );
};

/* ---------- 3:53 They talk to it over HTTP and JSON ---------- */

export const S38Http: React.FC = () => {
  const a = useAnim();
  const pkt = (off: number) => a.loop(1.6, off);
  return (
    <Stage>
      <div style={{display: 'flex', alignItems: 'center', gap: 0, position: 'relative'}}>
        <Win w={300} h={200} url=">>> cloudxberry-store" icons={false}>
          <div style={{position: 'absolute', inset: 38, display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Icon name="code" size={64} color="#5f6f82" stroke={1.5} /></div>
        </Win>
        <div style={{width: 110, height: 2, background: '#2a3541'}} />
        <Panel w={330} h={190} bg="#0a0f16" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Mono size={20} color="#37d3c8" style={{opacity: a.p(1)}}>{'{ "query": … }'}</Mono>
        </Panel>
        <div style={{width: 110, height: 2, background: '#2a3541'}} />
        <div style={{transform: `scale(${a.pop(0.4)})`}}><ESLogo size={92} /></div>
        {[0, 0.5].map((o) => (
          <div key={o} style={{position: 'absolute', top: 96, left: 300 + pkt(o) * 640, width: 14, height: 14, borderRadius: 7, background: '#26d4ee', boxShadow: '0 0 16px #26d4ee', opacity: a.p(1.2)}} />
        ))}
      </div>
    </Stage>
  );
};

/* ---------- 4:00 Any language, the same API ---------- */

export const S39Api: React.FC = () => {
  const a = useAnim();
  const langs = ['Python', 'Java', 'JavaScript', 'Go', 'Ruby', 'PHP'];
  return (
    <Stage>
      <div style={{display: 'flex', alignItems: 'center', gap: 70}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
          {langs.map((l, i) => (
            <div key={l} style={{width: 190, height: 44, borderRadius: 12, background: '#0b1118', border: '1.5px solid #17212c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT_MONO, color: '#9fb0c4', fontSize: 18, opacity: a.p(0.3 + i * 0.2), transform: `translateX(${(1 - a.p(0.3 + i * 0.2)) * -40}px)`}}>{l}</div>
          ))}
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 22, padding: '22px 34px', borderRadius: 24, background: '#0c1219', border: '1.5px solid #1b2733', transform: `scale(${a.pop(1.6)})`}}>
          <ESLogo size={64} />
          <Mono size={24} color="#e8eef6">POST /products/_search</Mono>
        </div>
      </div>
    </Stage>
  );
};
