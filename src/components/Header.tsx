export function Header() {
  return (
    <header className="border-b border-gray-100">
      <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
        <h1 className="text-xl font-medium">Ayumu Kukutsu</h1>
        <nav className="flex items-center gap-6 text-base text-gray-600">
          <a
            href="https://github.com/Ayumu3746221"
            className="hover:text-gray-900 transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://x.com/Ayumu3746221"
            className="hover:text-gray-900 transition-colors"
          >
            Twitter
          </a>
          <a
            href="https://zenn.dev/ayumu3746221"
            className="hover:text-gray-900 transition-colors"
          >
            Zenn
          </a>
          <a
            href="https://www.linkedin.com/in/ayumu-kukutsu-699890352/"
            className="hover:text-gray-900 transition-colors"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </header>
  );
}
