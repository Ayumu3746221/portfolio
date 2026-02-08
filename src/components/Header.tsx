import { useState, useEffect, useRef } from "react";

const navLinks = [{ name: "Blog", href: "/blog" }];

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
  const menuRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        buttonRef.current?.focus();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="border-b border-gray-100">
      <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
        <h1 className="text-xl font-medium">
          <a href="/">Ayumu Kukutsu</a>
        </h1>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6 text-base text-gray-600">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-gray-900 transition-colors"
            >
              {link.name}
            </a>
          ))}
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-900 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger button */}
        <button
          ref={buttonRef}
          className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
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
              aria-hidden="true"
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
        <nav
          id="mobile-navigation"
          ref={menuRef}
          className="md:hidden border-t border-gray-100 bg-white"
          aria-label="Navigation"
        >
          <div className="max-w-3xl mx-auto px-6 py-4 flex flex-col gap-4 text-base text-gray-600">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-gray-900 transition-colors py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
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
