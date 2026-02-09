import type { APIContext } from "astro";

export function GET(context: APIContext) {
  const siteUrl =
    context.site?.toString().replace(/\/$/, "") ||
    "https://ayumu3746221.dev";

  const body = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap-index.xml
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
