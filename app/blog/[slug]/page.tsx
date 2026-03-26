import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllArticles, getArticleBySlug, getSimilarArticles, generateArticleMetadata } from '@/lib/content';
import { formatDate, formatDateISO } from '@/lib/utils';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Badge from '@/components/ui/Badge';
import ArticleJsonLd from '@/components/seo/ArticleJsonLd';
import TableOfContents from '@/components/blog/TableOfContents';
import ShareButtons from '@/components/blog/ShareButtons';
import AuthorBio from '@/components/blog/AuthorBio';
import SimilarArticles from '@/components/blog/SimilarArticles';
import ReadingProgress from '@/components/blog/ReadingProgress';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return generateArticleMetadata(article);
}

function extractHeadings(content: string) {
  const headings: { id: string; text: string; level: number }[] = [];
  const regex = /^(#{2,4})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    headings.push({ id, text, level });
  }
  return headings;
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const similarArticles = getSimilarArticles(article, 3);
  const headings = extractHeadings(article.body.raw);
  const categorySlug = article.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return (
    <>
      <ArticleJsonLd article={article} />
      <ReadingProgress />
      
      <article className="py-8">
        <Container>
          <Breadcrumb items={[{ name: 'Blog', href: '/blog' }, { name: article.title, href: article.route }]} />

          <header className="max-w-3xl mx-auto mb-6">
            <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
              <Badge variant="primary" href={`/categorie/${categorySlug}`}>{article.category}</Badge>
              <span className="text-slate-500">{article.readingTime} min</span>
              <span className="text-slate-500">• {article.wordCount} mots</span>
            </div>

            <h1 className="font-heading text-2xl md:text-4xl font-bold text-white mb-4">
              {article.title}
            </h1>

            <p className="text-base text-slate-400 mb-4">{article.description}</p>

            <div className="flex flex-wrap gap-2 mb-3">
              {article.tags.map((tag) => {
                const tagSlug = tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                return <Badge key={tag} variant="default" href={`/tag/${tagSlug}`}>{tag}</Badge>;
              })}
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500">
              <time dateTime={formatDateISO(article.date)}>Publié le {formatDate(article.date)}</time>
              {article.lastModified && article.lastModified !== article.date && (
                <>
                  <span>•</span>
                  <time dateTime={formatDateISO(article.lastModified)}>Mis à jour le {formatDate(article.lastModified)}</time>
                </>
              )}
            </div>
          </header>

          {article.image && (
            <figure className="max-w-4xl mx-auto mb-8">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.imageAlt || article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  priority
                />
              </div>
              {article.imageAlt && <figcaption className="mt-2 text-xs text-slate-500 text-center">{article.imageAlt}</figcaption>}
            </figure>
          )}

          <div className="grid lg:grid-cols-[1fr_240px] gap-8">
            <article className="prose prose-invert prose-sm max-w-none">
              <MDXRemote source={article.body.raw} />
            </article>
            <aside className="hidden lg:block"><TableOfContents headings={headings} /></aside>
          </div>

          <footer className="max-w-3xl mx-auto mt-8">
            <ShareButtons url={article.route} title={article.title} />
            <div className="mt-6"><AuthorBio name={article.author} /></div>
            <SimilarArticles articles={similarArticles} />
          </footer>
        </Container>
      </article>
    </>
  );
}
