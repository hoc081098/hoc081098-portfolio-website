import { ImageResponse } from 'next/og'
import { type NextRequest } from 'next/server'

import { OpenGraphBackdrop } from '@/components/OpenGraphBackdrop'
import { profileData } from '@/data/profile-data'
import { ogTheme } from '@/lib/og-theme'

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
          background: ogTheme.canvas,
          display: 'flex',
          flexDirection: 'column',
          padding: '72px 80px',
          fontFamily:
            'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          position: 'relative',
        }}
      >
        <OpenGraphBackdrop />

        {/* Top accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: ogTheme.accentGradient,
          }}
        />

        {/* Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
            position: 'relative',
          }}
        >
          <div
            style={{
              color: ogTheme.accentText,
              fontSize: '20px',
              fontWeight: '700',
              letterSpacing: '-0.02em',
            }}
          >
            {profileData.handle}
          </div>
          {isArticle && (
            <div
              style={{
                color: ogTheme.mutedText,
                fontSize: '18px',
                marginLeft: '14px',
                whiteSpace: 'pre',
              }}
            >
              {'·  Article'}
            </div>
          )}
        </div>

        {/* Title */}
        <div
          style={{
            position: 'relative',
            color: ogTheme.primaryText,
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
            position: 'relative',
            color: ogTheme.secondaryText,
            fontSize: '22px',
            fontWeight: '500',
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
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: `1px solid ${ogTheme.divider}`,
            paddingTop: '24px',
          }}
        >
          <div style={{ color: ogTheme.mutedText, fontSize: '18px' }}>
            {profileData.displayName}
          </div>
          <div
            style={{
              color: ogTheme.mutedText,
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
