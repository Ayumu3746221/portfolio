import { useState } from "react";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/Ayumu3746221" },
  { name: "Twitter", href: "https://x.com/Ayumu3746221" },
  { name: "Zenn", href: "https://zenn.dev/ayumu3746221" },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/ayumu-kukutsu-699890352/",
  },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-100">
      <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
        <h1 className="text-xl font-medium">Ayumu Kukutsu</h1>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6 text-base text-gray-600">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-gray-900 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile navigation menu */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-gray-100 bg-white">
          <div className="max-w-3xl mx-auto px-6 py-4 flex flex-col gap-4 text-base text-gray-600">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-gray-900 transition-colors py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
