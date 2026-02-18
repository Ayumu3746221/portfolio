import { useState, useEffect, useRef } from "react";

const navLinks = [{ name: "Blog", href: "/blog/" }];

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

  useEffect(() => {
    if (!isMenuOpen || !menuRef.current) return;

    // メニューが開いた時、最初のフォーカス可能要素にフォーカス
    const focusableElements = Array.from(
      menuRef.current.querySelectorAll<HTMLElement>('a[href], button')
    );
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    // フォーカストラップ
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const elements = Array.from(
        menuRef.current?.querySelectorAll<HTMLElement>('a[href], button') ?? []
      );
      if (elements.length === 0) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isMenuOpen]);

  return (
    <header className="border-b border-gray-100">
      <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
        <p className="text-xl font-medium">
          <a href="/">Ayumu Kukutsu</a>
        </p>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6 text-base text-gray-600" aria-label="メインナビゲーション">
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
              aria-label={`${link.name}（外部リンク、新しいタブで開きます）`}
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
                className="hover:text-gray-900 transition-colors py-3"
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
                className="hover:text-gray-900 transition-colors py-3"
                onClick={() => setIsMenuOpen(false)}
                aria-label={`${link.name}（外部リンク、新しいタブで開きます）`}
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
