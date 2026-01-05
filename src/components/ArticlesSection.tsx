export function ArticlesSection() {
  return (
    <section className="mb-20">
      <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200">
        Articles
      </h3>
      <ul className="space-y-6">
        <li>
          <a
            href="https://tech.excite.co.jp/entry/2025/08/29/120314"
            className="group block"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h4 className="font-medium group-hover:text-blue-600 transition-colors">
              就業型インターン「Booost!!!」でのAPIのリビルドを通じて学んだこと
            </h4>
            <p className="text-base text-gray-500 mt-1">2025.08.29</p>
          </a>
        </li>
      </ul>
    </section>
  );
}
