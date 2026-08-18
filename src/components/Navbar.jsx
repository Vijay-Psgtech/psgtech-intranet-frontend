import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '/logo.jpg';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Virus Definition Update', href: '/virus-definition-update' },
  { label: 'Essential Utility Softwares', href: '/resources' },
  { label: 'CBCS', href: '/cbcs' },
  { label: 'Login', href: '/login' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-white/10 bg-gradient-to-r from-[#0d5ad6] via-[#0f66e8] to-[#0b4ab0] shadow-[0_12px_30px_rgba(13,89,214,0.25)] fixed top-0 z-50 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-[1800px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8 xl:px-10">
        <a href="/" className="flex min-w-0 items-center gap-3 text-white transition-opacity hover:opacity-95">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-sm sm:h-14 sm:w-14">
            <img src={Logo} alt="PSG College logo" className="h-full w-full object-cover" />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-extrabold tracking-tight sm:text-2xl lg:text-[2rem]">
              PSG College of Technology Intranet Website
            </h1>
          </div>
        </a>

        <div className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-base font-semibold text-white/90 transition-all duration-200 hover:bg-white/10 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/15 lg:hidden"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#0a47b7]/90 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-[1800px] flex-col gap-1 px-4 py-3 sm:px-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-semibold text-white/90 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar