import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'hoc081098 – Petrus Nguyễn Thái Học'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#18181b',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily:
            'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          position: 'relative',
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #8b5cf6, #a78bfa)',
          }}
        />

        {/* Name */}
        <div
          style={{
            color: '#8b5cf6',
            fontSize: '28px',
            fontWeight: '700',
            letterSpacing: '-0.02em',
            marginBottom: '16px',
          }}
        >
          hoc081098
        </div>

        {/* Full name */}
        <div
          style={{
            color: '#f4f4f5',
            fontSize: '60px',
            fontWeight: '800',
            letterSpacing: '-0.04em',
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          Petrus Nguyễn Thái Học
        </div>

        {/* Tagline */}
        <div
          style={{
            color: '#a1a1aa',
            fontSize: '26px',
            textAlign: 'center',
            lineHeight: '1.5',
          }}
        >
          Senior Mobile & Backend Developer
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: 'absolute',
            bottom: '36px',
            color: '#52525b',
            fontSize: '18px',
            letterSpacing: '0.02em',
          }}
        >
          portfolio.hoc081098.dev
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
