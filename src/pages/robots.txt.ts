import type { APIContext } from "astro";

export function GET(context: APIContext) {
  const siteUrl =
    context.site?.toString().replace(/\/$/, "") ||
    "https://portfolio-9m6.pages.dev";

  const body = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap-index.xml
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
