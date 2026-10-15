"use client";

import CountUp from "./CountUp";

const stats = [
  { to: 97, suffix: "%", label: "Client satisfaction" },
  { to: 1000, suffix: "+", label: "Resumes rebuilt" },
  { to: 12, suffix: "+ years", label: "Hiring experience" },
];

export default function HeroStats() {
  return (
    <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center justify-center px-4 py-4 text-center sm:py-3"
        >
          <p className="bg-gradient-to-r from-white to-[#93C5FD] bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl">
            <CountUp to={stat.to} suffix={stat.suffix} duration={1800} />
          </p>
          <p className="mt-1.5 text-xs font-medium leading-relaxed text-[#94A3B8] sm:text-sm">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
