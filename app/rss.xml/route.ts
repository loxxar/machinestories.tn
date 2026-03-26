import { getAllArticles } from '@/lib/content';

export async function GET() {
  const articles = getAllArticles();
  const baseUrl = 'https://machinestories.tn';

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Machine Stories - Blog Intelligence Artificielle</title>
    <link>${baseUrl}</link>
    <description>Blog dédié à l'intelligence artificielle : actualités, tutoriels, analyses et guides sur l'IA.</description>
    <language>fr-fr</language>
    <managingEditor>contact@machinestories.tn (Machine Stories)</managingEditor>
    <webMaster>contact@machinestories.tn (Machine Stories)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${articles
      .map(
        (article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${baseUrl}/blog/${article.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${article.slug}</guid>
      <description><![CDATA[${article.description}]]></description>
      <content:encoded><![CDATA[${article.description}]]></content:encoded>
      <dc:creator><![CDATA[${article.author}]]></dc:creator>
      <category><![CDATA[${article.category}]]></category>
      ${article.tags.map((tag) => `<category><![CDATA[${tag}]]></category>`).join('\n      ')}
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
