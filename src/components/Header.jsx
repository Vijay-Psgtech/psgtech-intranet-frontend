import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Virus Definition Update', href: '/virus-definition-update' },
  { label: 'Essential Utility Softwares', href: '/resources' },
  { label: 'CBCS', href: '/cbcs' },
  { label: 'Login', href: '/login' },
];

function Header({ sidebarOpen, onToggleSidebar }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="flex h-20 items-center justify-between px-[4.5vw] max-sm:h-16 max-sm:px-4">
      <a
        className="flex items-center gap-3 text-slate-900"
        href="/"
        aria-label="PSG Document Hub home"
      >
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal-700 text-xs font-bold tracking-wider text-white">
          PSG
        </span>
        <span className="max-sm:hidden">
          <strong className="block text-base font-bold">PSG Document Hub</strong>
          <small className="block text-[11px] text-slate-500">
            College of Technology
          </small>
        </span>
      </a>

      <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-full px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 xl:px-4"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-1 lg:hidden">
        <button
          className="border-0 bg-transparent p-2 text-slate-500"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <button
          className="border-0 bg-transparent p-2 text-slate-500 max-sm:block sm:hidden"
          aria-label="Toggle sidebar"
          aria-expanded={sidebarOpen}
          onClick={onToggleSidebar}
        >
          {sidebarOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      </div>

      {mobileMenuOpen && (
        <nav
          className="border-t border-slate-100 px-4 py-3 lg:hidden"
          aria-label="Mobile navigation"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Header;
