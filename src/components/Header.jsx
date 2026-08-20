import { Bell, ChevronRight, Menu, X } from 'lucide-react';

function Header({ sidebarOpen, onToggleSidebar }) {
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-[4.5vw] backdrop-blur-md max-sm:h-16 max-sm:px-4">
      <a
        className="flex items-center gap-3 text-slate-900"
        href="/"
        aria-label="PSG Document Hub home"
      >
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal-700 text-xs font-bold tracking-wider text-white">
          PSG
        </span>
        <span>
          <strong className="block text-base font-bold">PSG Document Hub</strong>
          <small className="block text-[11px] text-slate-500">
            College of Technology
          </small>
        </span>
      </a>

      <div className="flex items-center gap-5 max-sm:gap-1">
        <button
          className="relative border-0 bg-transparent p-2 text-slate-500 max-sm:hidden"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={19} />
          <i className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-orange-500 ring-2 ring-white" />
        </button>

        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-teal-50 text-xs font-bold text-teal-700">
            AS
          </span>
          <span className="max-sm:hidden">
            <strong className="block text-sm">Arun S</strong>
            <small className="block text-[11px] text-slate-500">Staff account</small>
          </span>
          <ChevronRight className="max-sm:hidden" size={16} />
        </div>

        <button
          className="hidden border-0 bg-transparent p-2 text-slate-500 max-sm:block"
          aria-label="Toggle sidebar"
          onClick={onToggleSidebar}
        >
          {sidebarOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  );
}

export default Header;
