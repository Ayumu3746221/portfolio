export function ArticlesSection() {
  return (
    <section className="mb-20">
      <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200">
        Articles
      </h2>
      <ul className="space-y-6">
        <li>
          <a
            href="https://tech.excite.co.jp/entry/2025/08/29/120314"
            className="group block"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="就業型インターン「Booost!!!」でのAPIのリビルドを通じて学んだこと（外部リンク、新しいタブで開きます）"
          >
            <h4 className="font-medium group-hover:text-blue-600 transition-colors">
              就業型インターン「Booost!!!」でのAPIのリビルドを通じて学んだこと
            </h4>
            <time dateTime="2025-08-29" className="text-base text-gray-500 mt-1 block">2025.08.29</time>
          </a>
        </li>
      </ul>
    </section>
  );
}
