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
  metadataBase: new URL('https://nodes.tn'),
  title: {
    default: 'Nodes.tn - Blog Intelligence Artificielle',
    template: '%s | Nodes.tn',
  },
  description: "Blog dédié à l'intelligence artificielle : actualités, tutoriels, analyses et guides sur l'IA. Découvrez les dernières innovations en machine learning, deep learning et IA générative.",
  keywords: ['intelligence artificielle', 'IA', 'machine learning', 'deep learning', 'chatgpt', 'IA générative', 'tutoriels IA', 'nodes.tn'],
  authors: [{ name: 'Nodes.tn' }],
  creator: 'Nodes.tn',
  publisher: 'Nodes.tn',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://nodes.tn',
    siteName: 'Nodes.tn',
    title: 'Nodes.tn - Blog Intelligence Artificielle',
    description: 'Blog dédié à l\'intelligence artificielle : actualités, tutoriels, analyses et guides sur l\'IA.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nodes.tn - Blog Intelligence Artificielle',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nodes.tn - Blog Intelligence Artificielle',
    description: 'Blog dédié à l\'intelligence artificielle : actualités, tutoriels, analyses et guides sur l\'IA.',
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
    canonical: 'https://nodes.tn',
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Nodes.tn',
  description: 'Blog dédié à l\'intelligence artificielle : actualités, tutoriels, analyses et guides sur l\'IA',
  url: 'https://nodes.tn',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://nodes.tn/recherche?q={search_term_string}',
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
        <link rel="alternate" type="application/rss+xml" title="Nodes.tn RSS Feed" href="/rss.xml" />
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
