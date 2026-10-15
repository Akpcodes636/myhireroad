"use client";

import CountUp from "./CountUp";

const stats = [
  { to: 97, suffix: "%", label: "Client satisfaction" },
  { to: 1000, suffix: "+", label: "Resumes rebuilt" },
  { to: 12, suffix:"+ years", label: "Hiring experience" },
];

export default function HeroStats() {
  return (
    <div className="grid grid-cols-3 divide-x divide-white/10">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center justify-center px-2 py-3 text-center"
        >
          <p className="bg-gradient-to-r from-white to-[#93C5FD] bg-clip-text text-xl md:text-3xl font-extrabold text-transparent">
            <CountUp to={stat.to} suffix={stat.suffix} duration={1800} />
          </p>
          <p className="mt-1.5 text-sm font-medium leading-relaxed text-[#94A3B8]">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
