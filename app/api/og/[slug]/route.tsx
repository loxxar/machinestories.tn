import { ImageResponse } from '@vercel/og';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function GET(req: Request, { params }: PageProps) {
  const { slug } = await params;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          backgroundColor: '#020617',
          padding: '60px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '40px',
            left: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0891b2 0%, #3b82f6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '24px',
            }}
          >
            M
          </div>
          <span style={{ color: '#67e8f9', fontSize: '18px' }}>machinestories.tn</span>
        </div>

        <div
          style={{
            display: 'flex',
            background: 'linear-gradient(135deg, #0891b2 0%, #3b82f6 100%)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            marginBottom: '24px',
          }}
        >
          Blog IA
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxWidth: '900px',
          }}
        >
          <h1
            style={{
              color: 'white',
              fontSize: '56px',
              fontWeight: 700,
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            {slug.replace(/-/g, ' ')}
          </h1>

          <p
            style={{
              color: '#67e8f9',
              fontSize: '20px',
              lineHeight: 1.5,
              margin: 0,
              maxWidth: '800px',
            }}
          >
            Machine Stories - Votre source sur l&apos;intelligence artificielle
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginTop: '32px',
          }}
        >
          <span style={{ color: '#64748b', fontSize: '16px' }}>
            machinestories.tn
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
