import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllArticles, getArticleBySlug, getSimilarArticles, generateArticleMetadata } from '@/lib/content';
import { formatDate, formatDateISO, slugify } from '@/lib/utils';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Badge from '@/components/ui/Badge';
import ArticleJsonLd from '@/components/seo/ArticleJsonLd';
import TableOfContents from '@/components/blog/TableOfContents';
import ShareButtons from '@/components/blog/ShareButtons';
import AuthorBio from '@/components/blog/AuthorBio';
import SimilarArticles from '@/components/blog/SimilarArticles';
import ReadingProgress from '@/components/blog/ReadingProgress';
import Newsletter from '@/components/layout/Newsletter';

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
  const categorySlug = slugify(article.category);

  return (
    <>
      <ArticleJsonLd article={article} />
      <ReadingProgress />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 pt-12 pb-8">
          <Breadcrumb items={[
            { name: 'Blog', href: '/blog' },
            { name: article.category, href: `/categorie/${categorySlug}` },
          ]} />
          
          {/* Category & Reading time */}
          <div className="flex flex-wrap items-center gap-3 mt-6 mb-4">
            <Badge variant="primary" href={`/categorie/${categorySlug}`}>
              {article.category}
            </Badge>
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {article.readingTime} min de lecture
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
              {article.wordCount.toLocaleString()} mots
            </span>
          </div>

          {/* Title */}
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-4xl leading-tight">
            {article.title}
          </h1>

          {/* Description */}
          <p className="text-lg text-slate-400 mb-6 max-w-3xl leading-relaxed">
            {article.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="default" href={`/tag/${slugify(tag)}`}>
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Author & Date */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 pb-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                {article.author.charAt(0)}
              </div>
              <div>
                <span className="text-white font-medium">{article.author}</span>
                <div className="flex items-center gap-2 text-xs">
                  <time dateTime={formatDateISO(article.date)}>Publié le {formatDate(article.date)}</time>
                  {article.lastModified && article.lastModified !== article.date && (
                    <>
                      <span>•</span>
                      <time dateTime={formatDateISO(article.lastModified)}>Mis à jour le {formatDate(article.lastModified)}</time>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {article.image && (
        <section className="relative bg-slate-950 pb-8">
          <div className="container mx-auto px-4">
            <div className="relative max-w-5xl mx-auto">
              <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 rounded-2xl blur-sm" />
              <div className="relative rounded-2xl overflow-hidden aspect-[2/1]">
                <Image
                  src={article.image}
                  alt={article.imageAlt || article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              </div>
              {article.imageAlt && (
                <figcaption className="mt-3 text-sm text-slate-500 text-center">
                  {article.imageAlt}
                </figcaption>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="relative bg-slate-950 py-12">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-cyan-500/5 rounded-full blur-[100px] -translate-y-1/2" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12 max-w-6xl mx-auto">
            <article className="prose prose-invert prose-lg max-w-none 
              prose-headings:font-heading prose-headings:text-white 
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-3
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white prose-strong:font-semibold
              prose-ul:text-slate-300 prose-ul:my-4 prose-li:my-1
              prose-li:marker:text-cyan-500
              prose-blockquote:border-l-cyan-500 prose-blockquote:text-slate-400 prose-blockquote:italic
              prose-code:text-cyan-400 prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
              prose-pre:bg-slate-900 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
              prose-img:rounded-xl prose-img:border prose-img:border-white/10
              prose-hr:border-white/10">
              <MDXRemote source={article.body.raw} />
            </article>
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents headings={headings} />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Share & Author & Related */}
      <section className="bg-slate-950 border-t border-white/5 py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Share */}
          <div className="flex items-center gap-4 p-6 bg-slate-900/50 border border-white/5 rounded-xl mb-8">
            <div className="flex-1">
              <h3 className="font-heading text-lg font-bold text-white mb-1">Tu as aimé cet article ?</h3>
              <p className="text-sm text-slate-400">Partage-le avec tes contacts</p>
            </div>
            <ShareButtons url={article.route} title={article.title} />
          </div>

          {/* Author Bio */}
          <div className="mb-12">
            <AuthorBio name={article.author} />
          </div>

          {/* Newsletter */}
          <div className="mb-12">
            <Newsletter />
          </div>

          {/* Related Articles */}
          <SimilarArticles articles={similarArticles} />
        </div>
      </section>
    </>
  );
}
