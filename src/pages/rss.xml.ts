import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  if (!context.site) {
    throw new Error(
      "`site` が astro.config.mjs に設定されていないため、RSS フィードを生成できません。`site` を設定してください。"
    );
  }

  const blog = await getCollection("blog", ({ data }) => !data.draft);

  return rss({
    title: "Ayumu Kukutsu Blog",
    description: "ソフトウェアエンジニアの技術ブログ",
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}`,
    })),
  });
}
