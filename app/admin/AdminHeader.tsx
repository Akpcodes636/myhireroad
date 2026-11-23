import Link from 'next/link';

const tabs = [
  { key: 'submissions', label: 'Submissions', href: '/admin' },
  { key: 'blog', label: 'Blog', href: '/admin/blog' },
] as const;

export default function AdminHeader({
  active,
  subtitle,
  children,
}: {
  active: (typeof tabs)[number]['key'];
  subtitle: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-[#E2E8F0] bg-white px-6 py-3 shadow-sm">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#061B55] to-[#0866E8]">
            <span className="text-[10px] font-extrabold text-white">MHR</span>
          </div>
          <div>
            <p className="text-sm font-extrabold text-[#061B55]">My Hire Roads</p>
            <p className="text-[11px] text-[#94A3B8]">{subtitle}</p>
          </div>
        </div>

        <nav className="flex items-center gap-1 rounded-xl bg-[#F1F5F9] p-1">
          {tabs.map((tab) => (
            <Link
              key={tab.key}
              href={tab.href}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                tab.key === active
                  ? 'bg-white text-[#061B55] shadow-sm'
                  : 'text-[#64748B] hover:text-[#061B55]'
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        {children}
        <a
          href="/api/admin/logout"
          className="flex items-center gap-1.5 rounded-xl border border-[#E2E8F0] px-3 py-2 text-xs font-semibold text-[#475569] transition hover:border-[#CBD5E1] hover:bg-[#F1F5F9]"
        >
          Log out
        </a>
      </div>
    </header>
  );
}
