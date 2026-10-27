import React from 'react';
import {C, FONT_MONO, FONT_TITLE, GRAD, Tone} from './theme';

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

const ICONS = {
  headphones: (
    <>
      <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
      <rect x="3" y="14" width="4.5" height="7" rx="2" />
      <rect x="16.5" y="14" width="4.5" height="7" rx="2" />
    </>
  ),
  laptop: (
    <>
      <rect x="4.5" y="5" width="15" height="11" rx="1.6" />
      <path d="M2.5 19.5h19" />
    </>
  ),
  cup: (
    <>
      <path d="M5 8h11v6a5.5 5.5 0 0 1-11 0z" />
      <path d="M16 9.5h1.5a2.3 2.3 0 0 1 0 4.6H16" />
    </>
  ),
  shoe: <path d="M3 17c0-3.5 2-5 4.5-5l3-3.5 3 2.2c3.5 0 7 1.2 7 5.3V18H3z" />,
  watch: (
    <>
      <rect x="7" y="6.5" width="10" height="11" rx="3" />
      <path d="M9 6.5l.8-3.5h4.4l.8 3.5M9 17.5l.8 3.5h4.4l.8-3.5" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2.2" />
      <path d="M10.5 18h3" />
    </>
  ),
  book: <path d="M3.5 5.5h6.5a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H3.5zM20.5 5.5H14a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h6.5z" />,
  camera: (
    <>
      <rect x="3" y="7" width="18" height="12" rx="2.2" />
      <circle cx="12" cy="13" r="3.4" />
      <path d="M9 7l1.2-2.2h3.6L15 7" />
    </>
  ),
  tag: (
    <>
      <path d="M3 12.5V4h8.5L21 13.5 12.5 22z" />
      <circle cx="7.6" cy="8.6" r="1.2" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5L21 21" />
    </>
  ),
  db: (
    <>
      <ellipse cx="12" cy="6" rx="7.5" ry="3" />
      <path d="M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" />
    </>
  ),
  chart: <path d="M4 20V4M4 20h16M8 16v-4M12 16V8M16 16v-6M20 16v-9" />,
  filter: <path d="M3 4.5h18l-7 8.5v6.5l-4-2V13z" />,
  check: <path d="M4.5 12.5l5 5 10-11" />,
  minus: <path d="M6 12h12" />,
  doc: (
    <>
      <path d="M6 2.8h8.5L19 7.3V21H6z" />
      <path d="M14.5 2.8v4.5H19M9 12h7M9 15.5h7M9 19h4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </>
  ),
  code: <path d="M8.5 7L3.5 12l5 5M15.5 7l5 5-5 5" />,
  user: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 20.5c.8-4 3.7-6 7.5-6s6.7 2 7.5 6" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h3l2.2 11h10l2-8H7" />
      <circle cx="9.5" cy="19" r="1.4" />
      <circle cx="17" cy="19" r="1.4" />
    </>
  ),
  bag: (
    <>
      <path d="M5 8h14l-1 12H6z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </>
  ),
  glasses: (
    <>
      <circle cx="7" cy="14" r="3.6" />
      <circle cx="17" cy="14" r="3.6" />
      <path d="M10.6 14h2.8M3.4 14L5 7M20.6 14L19 7" />
    </>
  ),
  speaker: (
    <>
      <rect x="6" y="3" width="12" height="18" rx="2.5" />
      <circle cx="12" cy="14.5" r="3.2" />
      <circle cx="12" cy="7.5" r="1" />
    </>
  ),
  plug: <path d="M9 3v5M15 3v5M6.5 8h11v3.5a5.5 5.5 0 0 1-11 0zM12 17v4" />,
  bulb: (
    <>
      <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3" />
    </>
  ),
  trophy: <path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H4.5c0 3 1.5 4.5 3.5 4.5M16 6h3.5c0 3-1.5 4.5-3.5 4.5M12 13v4M8.5 20.5h7M10 17h4" />,
  server: (
    <>
      <rect x="3.5" y="4" width="17" height="7" rx="2" />
      <rect x="3.5" y="13" width="17" height="7" rx="2" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </>
  ),
  layers: <path d="M12 3l9 5-9 5-9-5zM3 12.5l9 5 9-5M3 16.5l9 5 9-5" />,
  table: <path d="M3.5 5h17v14h-17zM3.5 10h17M3.5 14.5h17M9.5 5v14" />,
  apple: (
    <>
      <path d="M12 7.5c-2-1.5-6-.7-6 4 0 4 2.5 8.5 4.5 8.5 1 0 1-.6 1.5-.6s.5.6 1.5.6c2 0 4.5-4.5 4.5-8.5 0-4.7-4-5.5-6-4z" />
      <path d="M12 7c0-2 1-3.5 3-4" />
    </>
  ),
  star: <path d="M12 3l2.7 5.8 6.3.7-4.7 4.3 1.3 6.2L12 16.9 6.4 20l1.3-6.2L3 9.5l6.3-.7z" />,
} as const;

export type IconName = keyof typeof ICONS;
export const PRODUCT_ICONS: IconName[] = [
  'headphones', 'laptop', 'cup', 'shoe', 'watch', 'phone', 'book', 'camera',
  'glasses', 'bag', 'gear', 'speaker', 'plug', 'bulb', 'mic', 'tag',
];

export const Icon: React.FC<{
  name: IconName;
  size?: number;
  color?: string;
  stroke?: number;
  style?: React.CSSProperties;
}> = ({name, size = 24, color = '#fff', stroke = 1.8, style}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{flexShrink: 0, ...style}}
  >
    {ICONS[name]}
  </svg>
);

/* ------------------------------------------------------------------ */
/* Glossy blocks                                                       */
/* ------------------------------------------------------------------ */

export const gradientOf = (tone: Tone, dir = 180) => {
  const [a, b, c] = GRAD[tone];
  return `linear-gradient(${dir}deg, ${a} 0%, ${b} 52%, ${c} 100%)`;
};

export const glowOf = (tone: Tone, alpha = 0.28) => {
  const hex = GRAD[tone][1];
  const a = Math.round(alpha * 255).toString(16).padStart(2, '0');
  return `${hex}${a}`;
};

export const Glossy: React.FC<{
  tone: Tone;
  w?: number | string;
  h?: number | string;
  r?: number;
  glow?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({tone, w, h, r = 18, glow = true, style, children}) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: r,
      background: gradientOf(tone),
      boxShadow: `inset 0 3px 0 rgba(255,255,255,0.5), inset 0 -${Math.max(
        4,
        r / 3,
      )}px 10px rgba(0,0,0,0.22), ${glow ? `0 12px 40px ${glowOf(tone)}` : 'none'}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      ...style,
    }}
  >
    {children}
  </div>
);

/** Small square tile with a product icon. */
export const Tile: React.FC<{
  icon: IconName;
  tone?: Tone;
  size?: number;
  style?: React.CSSProperties;
}> = ({icon, tone = 'blue', size = 80, style}) => {
  const dark = tone === 'dark';
  return (
    <Glossy
      tone={tone}
      w={size}
      h={size}
      r={size * 0.22}
      glow={!dark}
      style={{
        border: dark ? '1.5px solid #1e3a63' : 'none',
        boxShadow: dark
          ? 'inset 0 2px 0 rgba(120,170,255,0.18), inset 0 -4px 8px rgba(0,0,0,0.4)'
          : undefined,
        ...style,
      }}
    >
      <Icon
        name={icon}
        size={size * 0.46}
        color={dark ? '#3d6fae' : tone === 'green' || tone === 'cyan' || tone === 'lime' ? '#06382a' : '#fff'}
        stroke={1.9}
      />
    </Glossy>
  );
};

/** Brand badge: white rounded square with a bold word. */
export const Brand: React.FC<{label: string; size?: number; dark?: boolean}> = ({label, size = 64, dark}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.24,
      background: dark ? 'linear-gradient(180deg,#2b3340,#14181f)' : 'linear-gradient(180deg,#fff,#dfe5ee)',
      boxShadow: '0 4px 14px rgba(0,0,0,0.35), inset 0 -3px 5px rgba(0,0,0,0.12)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: FONT_TITLE,
      fontWeight: 800,
      fontSize: size * 0.2,
      color: dark ? '#fff' : '#0b0f16',
      letterSpacing: -0.3,
      flexShrink: 0,
    }}
  >
    {label === 'apple' ? <Icon name="apple" size={size * 0.56} color={dark ? '#fff' : '#0b0f16'} stroke={2.2} /> : label}
  </div>
);

/* ------------------------------------------------------------------ */
/* Search bar / chips                                                  */
/* ------------------------------------------------------------------ */

export const SearchBar: React.FC<{
  text: string;
  w?: number;
  h?: number;
  caret?: boolean;
  fontSize?: number;
  dim?: boolean;
  style?: React.CSSProperties;
}> = ({text, w = 900, h = 76, caret = false, fontSize, dim, style}) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: h * 0.3,
      background: 'linear-gradient(90deg,#fda6cf 0%,#fc61a7 45%,#c41d6d 100%)',
      boxShadow:
        'inset 0 3px 0 rgba(255,255,255,0.55), inset 0 -5px 8px rgba(80,0,40,0.25), 0 0 50px rgba(255,80,160,0.35)',
      display: 'flex',
      alignItems: 'center',
      gap: h * 0.26,
      padding: `0 ${h * 0.32}px`,
      fontFamily: FONT_MONO,
      fontWeight: 700,
      fontSize: fontSize ?? h * 0.4,
      color: '#1b0a13',
      opacity: dim ? 0.8 : 1,
      flexShrink: 0,
      ...style,
    }}
  >
    <Icon name="search" size={h * 0.4} color="#2a0e1c" stroke={2.2} />
    <span style={{whiteSpace: 'pre'}}>
      {text}
      {caret && <span style={{display: 'inline-block', width: 3, height: '1em', background: '#1b0a13', marginLeft: 2, verticalAlign: 'text-bottom'}} />}
    </span>
  </div>
);

export const Chip: React.FC<{text: string; icon?: IconName; style?: React.CSSProperties; size?: number}> = ({
  text,
  icon = 'search',
  size = 26,
  style,
}) => (
  <div
    style={{
      height: size * 2,
      padding: `0 ${size * 0.8}px`,
      borderRadius: size * 0.6,
      background: 'linear-gradient(90deg,#fda6cf,#fc61a7 60%,#e0348a)',
      boxShadow: 'inset 0 2px 0 rgba(255,255,255,0.5), 0 0 30px rgba(255,80,160,0.35)',
      display: 'flex',
      alignItems: 'center',
      gap: size * 0.5,
      fontFamily: FONT_MONO,
      fontWeight: 700,
      fontSize: size * 0.9,
      color: '#1b0a13',
      ...style,
    }}
  >
    <Icon name={icon} size={size * 0.9} color="#2a0e1c" stroke={2.2} />
    {text}
  </div>
);

/* ------------------------------------------------------------------ */
/* Windows / panels                                                    */
/* ------------------------------------------------------------------ */

export const Win: React.FC<{
  w: number;
  h?: number;
  url?: string;
  icons?: boolean;
  colorDots?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({w, h, url = 'cloudxberry.store', icons = true, colorDots, style, children}) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: 26,
      background: '#04070b',
      border: `1.5px solid ${C.panelBorder}`,
      boxShadow: '0 0 0 1px rgba(255,255,255,0.02), 0 30px 80px rgba(0,0,0,0.6)',
      overflow: 'hidden',
      position: 'relative',
      flexShrink: 0,
      ...style,
    }}
  >
    <div
      style={{
        height: 38,
        background: '#0b1118',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '0 18px',
        fontFamily: FONT_MONO,
        fontSize: 14,
        color: C.dim,
      }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 9,
            height: 9,
            borderRadius: 5,
            background: colorDots ? ['#ff5f57', '#febc2e', '#28c840'][i] : '#27313d',
          }}
        />
      ))}
      <span style={{marginLeft: 8}}>{url}</span>
    </div>
    {icons && (
      <div style={{position: 'absolute', top: 52, left: 24, right: 24, display: 'flex', justifyContent: 'space-between'}}>
        <Icon name="bag" size={20} color="#9fb0c4" />
        <div style={{display: 'flex', gap: 14}}>
          <Icon name="user" size={20} color="#9fb0c4" />
          <Icon name="cart" size={20} color="#9fb0c4" />
        </div>
      </div>
    )}
    {children}
  </div>
);

export const Panel: React.FC<{
  w?: number | string;
  h?: number | string;
  border?: string;
  bg?: string;
  r?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}> = ({w, h, border = C.panelBorder, bg = '#080d14', r = 22, style, children}) => (
  <div
    style={{
      width: w,
      height: h,
      borderRadius: r,
      background: bg,
      border: `1.5px solid ${border}`,
      position: 'relative',
      flexShrink: 0,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Label: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({
  children,
  size = 16,
  color = C.dim,
  style,
}) => (
  <div
    style={{
      fontFamily: FONT_MONO,
      fontSize: size,
      letterSpacing: size * 0.18,
      textTransform: 'uppercase',
      color,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Mono: React.FC<{children: React.ReactNode; size?: number; color?: string; bold?: boolean; style?: React.CSSProperties}> = ({
  children,
  size = 20,
  color = C.text,
  bold,
  style,
}) => (
  <div style={{fontFamily: FONT_MONO, fontSize: size, color, fontWeight: bold ? 700 : 400, whiteSpace: 'pre', ...style}}>{children}</div>
);

export const Bold: React.FC<{children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties}> = ({
  children,
  size = 24,
  color = '#fff',
  style,
}) => <div style={{fontFamily: FONT_TITLE, fontWeight: 800, fontSize: size, color, ...style}}>{children}</div>;

/* ------------------------------------------------------------------ */
/* Logo, servers, docs                                                 */
/* ------------------------------------------------------------------ */

export const ESLogo: React.FC<{size?: number; style?: React.CSSProperties}> = ({size = 120, style}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.27,
      background: 'linear-gradient(180deg,#ffffff,#e6ebf2)',
      boxShadow: `0 ${size * 0.1}px ${size * 0.3}px rgba(0,0,0,0.45), inset 0 -${size * 0.04}px ${size * 0.06}px rgba(0,0,0,0.12)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      ...style,
    }}
  >
    <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 100 100">
      <rect x="14" y="12" width="72" height="20" rx="10" fill="#0b5f7a" />
      <rect x="14" y="40" width="58" height="20" rx="10" fill="#19b3c4" />
      <rect x="14" y="68" width="72" height="20" rx="10" fill="#0b5f7a" />
    </svg>
  </div>
);

export const DocIcon: React.FC<{size?: number; color?: string}> = ({size = 20, color = '#fff'}) => (
  <Icon name="doc" size={size} color={color} stroke={1.8} />
);

/** Glossy blue square with a doc glyph – "product document". */
export const DocTile: React.FC<{size?: number; tone?: Tone; style?: React.CSSProperties}> = ({size = 28, tone = 'blue', style}) => (
  <Glossy tone={tone} w={size} h={size} r={size * 0.22} glow={false} style={style}>
    <DocIcon size={size * 0.58} color={tone === 'green' ? '#06382a' : '#fff'} />
  </Glossy>
);

export const Server: React.FC<{w?: number; style?: React.CSSProperties}> = ({w = 200, style}) => (
  <div
    style={{
      width: w,
      height: w * 0.42,
      borderRadius: w * 0.1,
      background: 'linear-gradient(180deg,#ffffff 0%,#e8ecf2 55%,#b9c2d0 100%)',
      boxShadow: `0 ${w * 0.06}px ${w * 0.2}px rgba(0,0,0,0.5), inset 0 -${w * 0.03}px ${w * 0.04}px rgba(0,0,0,0.15)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      ...style,
    }}
  >
    <Icon name="server" size={w * 0.2} color="#445063" stroke={1.7} />
  </div>
);

/** Rack with N server slots and a gear underneath (log scenes). */
export const Rack: React.FC<{w?: number; active?: boolean; off?: boolean}> = ({w = 90, active, off}) => (
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, opacity: off ? 0.25 : 1}}>
    <div
      style={{
        width: w,
        padding: 8,
        borderRadius: 10,
        background: '#0b1118',
        border: `1.5px solid ${active ? C.orange : '#1a232e'}`,
        boxShadow: active ? '0 0 30px rgba(255,122,51,0.45)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
      }}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            height: w * 0.14,
            borderRadius: 4,
            background: 'linear-gradient(180deg,#f4f6fa,#bcc5d2)',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingRight: 6,
          }}
        >
          <span style={{width: 4, height: 4, borderRadius: 2, background: active ? C.orange : '#445063'}} />
        </div>
      ))}
    </div>
    <div style={{width: w * 0.62, height: w * 0.4, borderRadius: 8, background: '#0b1118', border: '1.5px solid #1a232e', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Icon name="gear" size={w * 0.26} color="#8392a6" stroke={1.7} />
    </div>
  </div>
);

/** Crude syntax-highlighted JSON-ish line. */
export const CodeLine: React.FC<{
  k?: string;
  v?: string;
  vColor?: string;
  raw?: string;
  size?: number;
  indent?: number;
}> = ({k, v, vColor = '#f0a35e', raw, size = 22, indent = 1}) => (
  <div style={{fontFamily: FONT_MONO, fontSize: size, whiteSpace: 'pre', color: '#cfd8e3', lineHeight: 1.65}}>
    {'  '.repeat(indent)}
    {raw ? (
      <span style={{color: '#5aa3ff'}}>{raw}</span>
    ) : (
      <>
        <span style={{color: '#9bd0ff'}}>"{k}"</span>: <span style={{color: vColor}}>{v}</span>,
      </>
    )}
  </div>
);

/* ------------------------------------------------------------------ */
/* Layout helpers                                                      */
/* ------------------------------------------------------------------ */

/** Area under the title. */
export const Stage: React.FC<{children?: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div
    style={{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 240,
      bottom: 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
    }}
  >
    {children}
  </div>
);

export const Abs: React.FC<{x: number; y: number; style?: React.CSSProperties; children?: React.ReactNode}> = ({x, y, style, children}) => (
  <div style={{position: 'absolute', left: x, top: y, ...style}}>{children}</div>
);

/** Straight connector line between two points (absolute coordinates). */
export const Line: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  width?: number;
  progress?: number;
  dashed?: boolean;
}> = ({x1, y1, x2, y2, color = '#26d4ee', width = 3, progress = 1, dashed}) => {
  const ex = x1 + (x2 - x1) * progress;
  const ey = y1 + (y2 - y1) * progress;
  const pad = 10;
  const minX = Math.min(x1, x2) - pad;
  const minY = Math.min(y1, y2) - pad;
  const w = Math.abs(x2 - x1) + pad * 2;
  const h = Math.abs(y2 - y1) + pad * 2;
  return (
    <svg style={{position: 'absolute', left: minX, top: minY, overflow: 'visible', pointerEvents: 'none'}} width={w} height={h}>
      <line
        x1={x1 - minX}
        y1={y1 - minY}
        x2={ex - minX}
        y2={ey - minY}
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeDasharray={dashed ? '8 8' : undefined}
      />
    </svg>
  );
};

export const Watermark: React.FC = () => (
  <div style={{position: 'absolute', top: 26, right: 34, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.85}}>
   
  </div>
);

export const Title: React.FC<{a: string; b: string; t: number}> = ({a, b, t}) => {
  const o = Math.min(1, t / 0.35);
  return (
    <div
      style={{
        position: 'absolute',
        top: 92,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontFamily: FONT_TITLE,
        fontWeight: 800,
        fontSize: 68,
        letterSpacing: -1.8,
        color: '#fff',
        opacity: o,
        transform: `translateY(${(1 - o) * 14}px)`,
        whiteSpace: 'nowrap',
        textShadow: '0 4px 24px rgba(0,0,0,0.6)',
      }}
    >
      {a}
      <span style={{color: C.purple, textShadow: '0 0 28px rgba(168,85,247,0.55)'}}>{b}</span>
    </div>
  );
};
