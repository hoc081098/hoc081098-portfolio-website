import { ogTheme } from '@/lib/og-theme'

export function OpenGraphBackdrop({ beamTop }: { beamTop?: number }) {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: ogTheme.background,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '-390px',
          right: '-170px',
          width: '780px',
          height: '780px',
          borderRadius: '9999px',
          background: ogTheme.violetGlow,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-390px',
          left: '-240px',
          width: '760px',
          height: '760px',
          borderRadius: '9999px',
          background: ogTheme.blueGlow,
        }}
      />
      {beamTop !== undefined && (
        <>
          <div
            style={{
              position: 'absolute',
              top: `${beamTop}px`,
              left: 0,
              width: '1200px',
              height: '10px',
              background: ogTheme.energyBeam,
              opacity: 0.22,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: `${beamTop + 4}px`,
              left: 0,
              width: '1200px',
              height: '2px',
              background: ogTheme.energyBeam,
              opacity: 0.78,
            }}
          />
        </>
      )}
    </>
  )
}
