import { useMemo, useState } from 'react';
import {
  BookOpen,
  CalendarDays,
  ChevronRight,
  Clock3,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Search,
  Settings,
  Users,
} from 'lucide-react';

const nav =
  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-teal-50 hover:text-teal-700';
const panel = 'rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm';
const label =
  'mb-2 text-[10px] font-bold uppercase tracking-[.14em] text-orange-600';

const categories = [
  'Administration',
  'Academic',
  'Autonomous',
  'Regulations',
  'COE',
  'CBCS',
  'Students Union',
];

const feed = [
  {
    category: 'Administration',
    title: 'Faculty appraisal form - 2026 submission cycle',
    meta: 'PDF · 1.2 MB',
    date: 'Today',
    tone: 'bg-teal-50 text-teal-700',
    icon: FileText,
  },
  {
    category: 'Academic',
    title: 'End semester examination timetable - Nov 2026',
    meta: 'PDF · 840 KB',
    date: 'Yesterday',
    tone: 'bg-orange-50 text-orange-600',
    icon: CalendarDays,
  },
  {
    category: 'Autonomous',
    title: 'Academic council meeting minutes - July 2026',
    meta: 'PDF · 2.4 MB',
    date: '18 Aug',
    tone: 'bg-violet-50 text-violet-700',
    icon: BookOpen,
  },
  {
    category: 'Regulations',
    title: 'Rules and regulations handbook - 2026 edition',
    meta: 'PDF · 3.1 MB',
    date: '16 Aug',
    tone: 'bg-amber-50 text-amber-700',
    icon: Settings,
  },
  {
    category: 'COE',
    title: 'Continuous assessment marks submission guidelines',
    meta: 'DOCX · 420 KB',
    date: '14 Aug',
    tone: 'bg-rose-50 text-rose-700',
    icon: GraduationCap,
  },
  {
    category: 'CBCS',
    title: 'Choice based credit system course structure',
    meta: 'PDF · 1.8 MB',
    date: '12 Aug',
    tone: 'bg-cyan-50 text-cyan-700',
    icon: BookOpen,
  },
  {
    category: 'Students Union',
    title: 'Student activities and events permission form',
    meta: 'PDF · 620 KB',
    date: '10 Aug',
    tone: 'bg-emerald-50 text-emerald-700',
    icon: Users,
  },
];

const quickLinks = categories.map((category, index) => ({
  label: category,
  detail: `${
    feed.filter((item) => item.category === category).length + (index + 2) * 3
  } documents`,
  icon: [FileText, BookOpen, GraduationCap, Settings, CalendarDays, BookOpen, Users][index],
  color: [
    'bg-teal-50 text-teal-700',
    'bg-orange-50 text-orange-600',
    'bg-violet-50 text-violet-700',
    'bg-amber-50 text-amber-700',
    'bg-rose-50 text-rose-700',
    'bg-cyan-50 text-cyan-700',
    'bg-emerald-50 text-emerald-700',
  ][index],
}));

function Dashboard({ sidebarOpen, onCloseSidebar }) {
  const [activeCategory, setActiveCategory] = useState('All updates');
  const [query, setQuery] = useState('');

  const filteredFeed = useMemo(
    () =>
      feed.filter((item) => {
        const matchesCategory =
          activeCategory === 'All updates' || item.category === activeCategory;
        const searchableText = `${item.title} ${item.category} ${item.meta}`.toLowerCase();

        return matchesCategory && searchableText.includes(query.toLowerCase());
      }),
    [activeCategory, query],
  );

  return (
    <div className="mx-auto flex max-w-[1500px] max-sm:block">
      <aside
        className={`fixed bottom-0 top-16 z-10 flex w-60 flex-col justify-between border-r border-slate-200 bg-slate-50 px-4 py-10 transition-transform sm:static sm:min-h-[calc(100vh-5rem)] sm:translate-x-0 sm:bg-transparent sm:shadow-none max-sm:shadow-xl ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <nav>
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Document hub
          </p>
          <a
            className={`${nav} bg-teal-50 font-semibold text-teal-700`}
            href="#overview"
            onClick={onCloseSidebar}
          >
            <LayoutDashboard size={18} /> Overview
          </a>
          <a className={nav} href="#documents" onClick={onCloseSidebar}>
            <FileText size={18} /> All documents
            <span className="ml-auto rounded-full bg-teal-700 px-2 py-0.5 text-[10px] text-white">
              {feed.length}
            </span>
          </a>

          <p className="mb-2 mt-8 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Categories
          </p>
          {categories.map((category) => (
            <a
              className={nav}
              href="#documents"
              key={category}
              onClick={() => {
                setActiveCategory(category);
                onCloseSidebar();
              }}
            >
              {category}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 border-t border-slate-200 p-3 text-[10px] text-slate-500">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Document hub online
          <small className="ml-auto text-slate-400">v2.4</small>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-[5.5vw] pb-16 pt-10 max-lg:px-7 max-sm:px-4 max-sm:pb-10 max-sm:pt-7">
        <section
          className="mb-8 flex items-center justify-between max-sm:mb-6 max-sm:items-start"
          id="overview"
        >
          <div>
            <p className={label}>PSG institutional resources</p>
            <h1 className="m-0 text-4xl font-bold tracking-tight text-slate-900 max-sm:max-w-[220px] max-sm:text-3xl">
              Find the right document.
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Browse circulars, forms, handbooks and academic records in one place.
            </p>
          </div>

          <div className="grid h-24 w-24 rotate-6 place-content-center rounded-full bg-teal-50 text-center text-teal-700 max-sm:h-20 max-sm:w-20">
            <span className="text-2xl font-bold">PSG</span>
            <small className="text-[8px] tracking-widest">DOCS</small>
          </div>
        </section>

        <section
          className="mb-10 grid grid-cols-3 gap-4 max-sm:grid-cols-1"
          aria-label="Campus snapshot"
        >
          {[
            [Users, 'Active departments', '42', '+2 this year', 'bg-teal-50 text-teal-700'],
            [FileText, 'New documents', '18', '+6 this week', 'bg-orange-50 text-orange-600'],
            [CalendarDays, 'Upcoming events', '07', 'Next: tomorrow', 'bg-emerald-50 text-emerald-700'],
          ].map(([Icon, title, value, trend, tone]) => (
            <div
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/80 p-4"
              key={title}
            >
              <span className={`grid h-10 w-10 place-items-center rounded-lg ${tone}`}>
                <Icon size={19} />
              </span>
              <div>
                <small className="block whitespace-nowrap text-[11px] text-slate-500">
                  {title}
                </small>
                <strong className="block text-2xl font-bold text-slate-900">
                  {value}
                </strong>
              </div>
              <span className="ml-auto whitespace-nowrap text-[10px] text-emerald-700">
                {trend}
              </span>
            </div>
          ))}
        </section>

        <section className="grid grid-cols-[minmax(0,1.45fr)_minmax(280px,.75fr)] gap-7 max-lg:grid-cols-1">
          <div className={`${panel} max-sm:p-4`} id="updates">
            <div className="flex items-start justify-between">
              <div>
                <p className={label}>Stay in the loop</p>
                <h2 className="m-0 text-xl font-bold text-slate-900">Campus updates</h2>
              </div>
              <button className="flex items-center gap-1 border-0 bg-transparent text-xs text-teal-700">
                View archive <ChevronRight size={16} />
              </button>
            </div>

            <div className="my-6 flex items-center justify-between gap-4 max-lg:flex-col max-lg:items-start">
              <div className="flex w-48 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-400 max-lg:w-full">
                <Search size={17} />
                <input
                  className="w-full border-0 bg-transparent text-xs outline-none"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search updates"
                  aria-label="Search updates"
                />
              </div>

              <div className="flex gap-1 overflow-x-auto">
                {['All updates', 'Administration', 'Academic', 'Student Life'].map((category) => (
                  <button
                    key={category}
                    className={`whitespace-nowrap rounded-md border-0 px-2 py-1.5 text-[10px] ${activeCategory === category ? 'bg-teal-50 text-teal-700' : 'bg-transparent text-slate-500 hover:bg-teal-50 hover:text-teal-700'}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              {filteredFeed.length ? (
                filteredFeed.map((item) => {
                  const Icon = item.icon;

                  return (
                    <article
                      className="flex items-center gap-3 border-t border-slate-200 py-4 max-sm:items-start"
                      key={item.title}
                    >
                      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${item.tone}`}>
                        <Icon size={18} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] text-orange-600">{item.category}</span>
                        <h3 className="m-0 mt-1 text-[13px] font-semibold leading-snug">
                          {item.title}
                        </h3>
                      </div>
                      <time className="whitespace-nowrap text-[10px] text-slate-400 max-sm:ml-auto">
                        {item.date}
                      </time>
                      <ChevronRight className="text-slate-300" size={17} />
                    </article>
                  );
                })
              ) : (
                <p className="py-5 text-sm text-slate-500">
                  No updates match your search.
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5 max-lg:grid max-lg:grid-cols-2 max-sm:flex">
            <section className={`${panel} max-sm:p-4`} id="directory">
              <p className={label}>Jump right in</p>
              <h2 className="m-0 text-xl font-bold text-slate-900">Quick access</h2>

              <div className="mt-5">
                {quickLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <a
                      href={`#${link.label.toLowerCase().replaceAll(' ', '-')}`}
                      className="flex gap-3 border-t border-slate-200 py-3 text-slate-900"
                      key={link.label}
                    >
                      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${link.color}`}>
                        <Icon size={18} />
                      </span>
                      <span className="flex-1">
                        <strong className="block text-xs">{link.label}</strong>
                        <small className="mt-0.5 block text-[10px] text-slate-500">
                          {link.detail}
                        </small>
                      </span>
                      <ChevronRight className="text-slate-300" size={16} />
                    </a>
                  );
                })}
              </div>
            </section>

            <section className="rounded-2xl border border-emerald-100 bg-emerald-50 px-6 py-5 max-sm:px-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className={label}>Need a hand?</p>
                  <h2 className="m-0 text-xl font-bold text-slate-900">Office hours</h2>
                </div>
                <Clock3 className="text-teal-700" size={19} />
              </div>

              <p className="my-5 mb-3 text-xs leading-relaxed text-emerald-900">
                Most campus offices are open today until <strong>5:00 PM</strong>.
              </p>

              <a
                href="#directory"
                className="flex items-center gap-1 border-0 bg-transparent text-xs text-teal-700"
              >
                Browse directory <ChevronRight size={16} />
              </a>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
