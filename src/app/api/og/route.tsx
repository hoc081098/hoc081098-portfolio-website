import { ImageResponse } from 'next/og'
import { type NextRequest } from 'next/server'

import { profileData } from '@/data/profile-data'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const title = searchParams.get('title') ?? profileData.displayName
  const description =
    searchParams.get('description') ?? profileData.ogDescription
  const isArticle = searchParams.get('type') === 'article'

  const truncatedDesc =
    description.length > 130 ? description.slice(0, 130) + '…' : description

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#18181b',
          display: 'flex',
          flexDirection: 'column',
          padding: '72px 80px',
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

        {/* Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              color: '#8b5cf6',
              fontSize: '20px',
              fontWeight: '700',
              letterSpacing: '-0.02em',
            }}
          >
            {profileData.handle}
          </div>
          {isArticle && (
            <>
              <div style={{ color: '#52525b', fontSize: '18px' }}>·</div>
              <div style={{ color: '#71717a', fontSize: '18px' }}>Article</div>
            </>
          )}
        </div>

        {/* Title */}
        <div
          style={{
            color: '#f4f4f5',
            fontSize: title.length > 60 ? '44px' : '52px',
            fontWeight: '700',
            lineHeight: '1.15',
            letterSpacing: '-0.03em',
            flex: 1,
            display: 'flex',
            alignItems: 'flex-start',
          }}
        >
          {title}
        </div>

        {/* Description */}
        <div
          style={{
            color: '#a1a1aa',
            fontSize: '22px',
            lineHeight: '1.55',
            marginTop: '20px',
            marginBottom: '48px',
          }}
        >
          {truncatedDesc}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid #27272a',
            paddingTop: '24px',
          }}
        >
          <div style={{ color: '#71717a', fontSize: '18px' }}>
            {profileData.displayName}
          </div>
          <div
            style={{
              color: '#52525b',
              fontSize: '17px',
              letterSpacing: '0.01em',
            }}
          >
            portfolio.hoc081098.dev
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
