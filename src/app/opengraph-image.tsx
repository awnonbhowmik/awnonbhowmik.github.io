import { ImageResponse } from 'next/og';

export const alt = 'Awnon Bhowmik — doctoral researcher and software engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: '#f8fafc',
          background: '#111827',
          padding: '72px 80px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            color: '#38bdf8',
            fontSize: 26,
            letterSpacing: 4,
            textTransform: 'uppercase',
          }}
        >
          Academic Portfolio
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 74, fontWeight: 700, letterSpacing: -2 }}>
            Awnon Bhowmik
          </div>
          <div style={{ marginTop: 18, fontSize: 34, color: '#cbd5e1' }}>
            Doctoral Researcher · Software Engineer
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '2px solid #1e3a5f',
            paddingTop: 28,
            color: '#94a3b8',
            fontSize: 24,
          }}
        >
          <span>Cybersecurity · Privacy · Cryptography · Applied Mathematics</span>
          <span style={{ color: '#38bdf8' }}>awnon.netlify.app</span>
        </div>
      </div>
    ),
    size,
  );
}
