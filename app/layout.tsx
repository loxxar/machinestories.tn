import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ThemeScript from '@/components/layout/ThemeScript';
import JsonLd from '@/components/seo/JsonLd';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://machinestories.tn'),
  title: {
    default: 'Machine Stories - Blog Intelligence Artificielle',
    template: '%s | Machine Stories',
  },
  description: "Découvrez l'univers fascinant de l'intelligence artificielle : actualités, tutoriels, analyses et guides sur l'IA. Restez informé sur le machine learning, deep learning et IA générative.",
  keywords: ['intelligence artificielle', 'IA', 'machine learning', 'deep learning', 'chatgpt', 'IA générative', 'tutoriels IA', 'machine stories'],
  authors: [{ name: 'Machine Stories' }],
  creator: 'Machine Stories',
  publisher: 'Machine Stories',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://machinestories.tn',
    siteName: 'Machine Stories',
    title: 'Machine Stories - Blog Intelligence Artificielle',
    description: "Découvrez l'univers fascinant de l'intelligence artificielle : actualités, tutoriels, analyses et guides sur l'IA.",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Machine Stories - Blog Intelligence Artificielle',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Machine Stories - Blog Intelligence Artificielle',
    description: "Découvrez l'univers fascinant de l'intelligence artificielle : actualités, tutoriels, analyses et guides sur l'IA.",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://machinestories.tn',
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Machine Stories',
  description: "Blog dédié à l'intelligence artificielle : actualités, tutoriels, analyses et guides sur l'IA",
  url: 'https://machinestories.tn',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://machinestories.tn/recherche?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="alternate" type="application/rss+xml" title="Machine Stories RSS Feed" href="/rss.xml" />
        <ThemeScript />
        <JsonLd data={websiteJsonLd} />
      </head>
      <body className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans">
        <a href="#main-content" className="skip-to-content">
          Aller au contenu principal
        </a>
        <Header />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
