"use client";

import { useState, useMemo } from "react";

export type Submission = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  services: string;
  target_role: string;
  career_stage: string;
  country: string;
  challenge: string;
  investment_ready: string;
  additional_info: string | null;
  resume_path: string | null;
  resumeUrl: string | null;
};

// Deterministic avatar color from name
const AVATAR_COLORS = [
  ["#0866E8", "#EFF6FF"],
  ["#7C3AED", "#F5F3FF"],
  ["#059669", "#ECFDF5"],
  ["#D97706", "#FFFBEB"],
  ["#DC2626", "#FEF2F2"],
  ["#0891B2", "#ECFEFF"],
];
function avatarColor(name: string) {
  const i = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[i];
}

function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  const [fg, bg] = avatarColor(name);
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full text-xs font-extrabold"
      style={{ width: size, height: size, background: bg, color: fg }}
    >
      {name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()}
    </div>
  );
}

function Field({ label, value, mono = false }: { label: string; value?: string | null; mono?: boolean }) {
  if (!value) return null;
  return (
    <div className="rounded-xl border border-[#F1F5F9] bg-[#F8FAFF] px-4 py-3">
      <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">{label}</p>
      <p className={`text-sm leading-6 text-[#0F172A] ${mono ? "font-mono" : ""} whitespace-pre-wrap`}>{value}</p>
    </div>
  );
}

function StatChip({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className={`flex items-center gap-2 rounded-xl px-4 py-2 ${accent ? "bg-[#0866E8]/10 text-[#0866E8]" : "bg-[#F1F5F9] text-[#475569]"}`}>
      <span className="text-xl font-extrabold leading-none">{value}</span>
      <span className="text-xs font-semibold">{label}</span>
    </div>
  );
}

export default function SubmissionsClient({ submissions }: { submissions: Submission[] }) {
  const [selected, setSelected] = useState<Submission | null>(null);
  const [search, setSearch] = useState("");

  const today = useMemo(() => {
    const d = new Date();
    return submissions.filter((s) => new Date(s.created_at).toDateString() === d.toDateString()).length;
  }, [submissions]);

  const withResume = useMemo(() => submissions.filter((s) => s.resume_path).length, [submissions]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return submissions;
    return submissions.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.services.toLowerCase().includes(q) ||
        s.target_role.toLowerCase().includes(q),
    );
  }, [submissions, search]);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#F8FAFF]" style={{ fontFamily: "var(--font-manrope, system-ui, sans-serif)" }}>

      {/* ── Top header ── */}
      <header className="flex shrink-0 items-center justify-between border-b border-[#E2E8F0] bg-white px-6 py-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#061B55] to-[#0866E8]">
            <span className="text-[10px] font-extrabold text-white">MHR</span>
          </div>
          <div>
            <p className="text-sm font-extrabold text-[#061B55]">My Hire Roads</p>
            <p className="text-[11px] text-[#94A3B8]">Submissions Dashboard</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <StatChip label="Total" value={submissions.length} />
          <StatChip label="With Resume" value={withResume} />
          <StatChip label="Today" value={today} accent />
          <a
            href="/api/admin/logout"
            className="ml-2 flex items-center gap-1.5 rounded-xl border border-[#E2E8F0] px-3 py-2 text-xs font-semibold text-[#475569] transition hover:border-[#CBD5E1] hover:bg-[#F1F5F9]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
            </svg>
            Log out
          </a>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Sidebar ── */}
        <div className="flex w-80 shrink-0 flex-col border-r border-[#E2E8F0] bg-[#061B55]">

          {/* Search */}
          <div className="p-3">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search submissions…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-9 pr-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-white/25 focus:bg-white/10"
              />
            </div>
          </div>

          {/* Count */}
          <div className="px-4 pb-2">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30">
              {filtered.length} submission{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <svg className="mb-3 text-white/20" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="text-sm text-white/30">No submissions found</p>
              </div>
            ) : (
              filtered.map((s) => {
                const isSelected = selected?.id === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelected(s)}
                    className={`group w-full border-b border-white/5 px-4 py-3.5 text-left transition ${
                      isSelected
                        ? "bg-[#0866E8]"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar name={s.name} size={36} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <p className={`truncate text-sm font-semibold ${isSelected ? "text-white" : "text-white/90"}`}>
                            {s.name}
                          </p>
                          <p className={`shrink-0 text-[10px] ${isSelected ? "text-white/70" : "text-white/30"}`}>
                            {new Date(s.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </p>
                        </div>
                        <p className={`mt-0.5 truncate text-xs ${isSelected ? "text-white/70" : "text-white/40"}`}>
                          {s.email}
                        </p>
                        <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                          {s.resume_path && (
                            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${isSelected ? "bg-white/20 text-white" : "bg-[#0866E8]/30 text-[#60A5FA]"}`}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              Resume
                            </span>
                          )}
                          <span className={`truncate text-[10px] ${isSelected ? "text-white/60" : "text-white/30"}`}>
                            {s.target_role}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* ── Main content ── */}
        {!selected ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
              <svg className="text-[#94A3B8]" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
              </svg>
            </div>
            <p className="text-base font-semibold text-[#334155]">Select a submission</p>
            <p className="mt-1 text-sm text-[#94A3B8]">Click any entry in the sidebar to view details</p>
          </div>
        ) : (
          <div className="flex flex-1 overflow-hidden">

            {/* ── Details column ── */}
            <div className="flex w-72 shrink-0 flex-col overflow-hidden border-r border-[#E2E8F0] bg-white">

              {/* Detail header */}
              <div className="border-b border-[#F1F5F9] p-5">
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-[#EFF6FF] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-[#0866E8]">
                    Submission
                  </span>
                  <button
                    onClick={() => setSelected(null)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#94A3B8] transition hover:bg-[#F1F5F9] hover:text-[#475569]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar name={selected.name} size={44} />
                  <div className="min-w-0">
                    <p className="truncate font-extrabold text-[#061B55]">{selected.name}</p>
                    <p className="truncate text-xs text-[#475569]">{selected.email}</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <a
                    href={`mailto:${selected.email}`}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-[#E2E8F0] py-2 text-xs font-semibold text-[#475569] transition hover:border-[#0866E8] hover:text-[#0866E8]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </a>
                  <a
                    href={`tel:${selected.phone}`}
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-[#E2E8F0] py-2 text-xs font-semibold text-[#475569] transition hover:border-[#0866E8] hover:text-[#0866E8]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call
                  </a>
                </div>
              </div>

              {/* Fields */}
              <div className="flex-1 space-y-2.5 overflow-y-auto p-4">
                <Field label="Services" value={selected.services} />
                <Field label="Target Role" value={selected.target_role} />
                <Field label="Career Stage" value={selected.career_stage} />
                <Field label="Country" value={selected.country} />
                <Field label="Investment Readiness" value={selected.investment_ready} />
                <Field label="Career Challenge" value={selected.challenge} />
                {selected.additional_info && (
                  <Field label="Additional Info" value={selected.additional_info} />
                )}
                <div className="rounded-xl border border-[#F1F5F9] bg-[#F8FAFF] px-4 py-3">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[#94A3B8]">Submitted</p>
                  <p className="text-sm text-[#0F172A]">
                    {new Date(selected.created_at).toLocaleDateString("en-US", {
                      weekday: "short", year: "numeric", month: "short", day: "numeric",
                    })}
                  </p>
                  <p className="text-xs text-[#94A3B8]">
                    {new Date(selected.created_at).toLocaleTimeString("en-US", {
                      hour: "2-digit", minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* ── PDF / Resume panel ── */}
            <div className="flex flex-1 flex-col overflow-hidden">
              <div className="flex shrink-0 items-center justify-between border-b border-[#E2E8F0] bg-white px-5 py-3">
                <div className="flex items-center gap-2">
                  <svg className="text-[#0866E8]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-sm font-semibold text-[#061B55]">Resume</p>
                  {selected.resume_path && (
                    <span className="rounded-full bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-bold text-[#0866E8]">PDF</span>
                  )}
                </div>
                {selected.resumeUrl && (
                  <a
                    href={selected.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-xl border border-[#E2E8F0] px-3 py-1.5 text-xs font-semibold text-[#475569] transition hover:border-[#0866E8] hover:text-[#0866E8]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Open in new tab
                  </a>
                )}
              </div>

              <div className="flex-1 overflow-hidden bg-[#F1F5F9]">
                {selected.resumeUrl ? (
                  <iframe
                    src={selected.resumeUrl}
                    className="h-full w-full border-0"
                    title={`Resume — ${selected.name}`}
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#E2E8F0] bg-white shadow-sm">
                      <svg className="text-[#CBD5E1]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-[#475569]">No resume uploaded</p>
                    <p className="mt-1 text-xs text-[#94A3B8]">This client did not attach a resume.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
