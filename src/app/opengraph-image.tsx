import { ImageResponse } from 'next/og'

import { OpenGraphBackdrop } from '@/components/OpenGraphBackdrop'
import { profileData } from '@/data/profile-data'
import { ogTheme } from '@/lib/og-theme'

export const runtime = 'edge'
export const alt = `${profileData.displayName}: ${profileData.brandHeadline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: ogTheme.canvas,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
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

        {/* Name */}
        <div
          style={{
            position: 'relative',
            color: ogTheme.accentText,
            fontSize: '28px',
            fontWeight: '700',
            letterSpacing: '-0.02em',
            marginBottom: '16px',
          }}
        >
          {profileData.handle}
        </div>

        {/* Full name */}
        <div
          style={{
            position: 'relative',
            color: ogTheme.primaryText,
            fontSize: '60px',
            fontWeight: '800',
            letterSpacing: '-0.04em',
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          {profileData.displayName}
        </div>

        {/* Tagline */}
        <div
          style={{
            position: 'relative',
            color: ogTheme.secondaryText,
            fontSize: '26px',
            fontWeight: '500',
            textAlign: 'center',
            lineHeight: '1.5',
          }}
        >
          {profileData.brandHeadline}
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: 'absolute',
            bottom: '36px',
            color: ogTheme.mutedText,
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
