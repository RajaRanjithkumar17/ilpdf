import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'iLovePDF Pink — Free Online PDF & Image Tools';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 50%, #a93226 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '30px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              fontWeight: 900,
              color: '#e74c3c',
            }}
          >
            IL
          </div>
          <div
            style={{
              fontSize: '52px',
              fontWeight: 800,
              color: 'white',
              letterSpacing: '-1px',
            }}
          >
            iLovePDF Pink
          </div>
        </div>
        <div
          style={{
            fontSize: '28px',
            color: 'rgba(255,255,255,0.95)',
            textAlign: 'center',
            maxWidth: '800px',
            lineHeight: 1.4,
            fontWeight: 600,
          }}
        >
          Free Online PDF & Image Tools
        </div>
        <div
          style={{
            fontSize: '20px',
            color: 'rgba(255,255,255,0.75)',
            textAlign: 'center',
            maxWidth: '700px',
            lineHeight: 1.5,
            marginTop: '16px',
          }}
        >
          Merge, Split, Compress, Convert — 100% Private, No Uploads
        </div>
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '40px',
          }}
        >
          {['Merge PDF', 'Compress PDF', 'PDF to Word', 'Split PDF'].map(
            (tool) => (
              <div
                key={tool}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  padding: '10px 20px',
                  color: 'white',
                  fontSize: '16px',
                  fontWeight: 600,
                }}
              >
                {tool}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
