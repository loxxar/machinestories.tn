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
          backgroundColor: '#0f172a',
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
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#0ea5e9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '20px',
            }}
          >
            N
          </div>
          <span style={{ color: '#94a3b8', fontSize: '18px' }}>nodes.tn</span>
        </div>

        <div
          style={{
            display: 'flex',
            backgroundColor: '#0ea5e9',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '6px',
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
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            {slug.replace(/-/g, ' ')}
          </h1>

          <p
            style={{
              color: '#94a3b8',
              fontSize: '20px',
              lineHeight: 1.5,
              margin: 0,
              maxWidth: '800px',
            }}
          >
           nodes.tn - Votre blog sur l&apos;intelligence artificielle
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
            nodes.tn
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
