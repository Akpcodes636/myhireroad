interface SectionLabelProps {
  children: React.ReactNode;
  light?: boolean;
}

export default function SectionLabel({ children, light = false }: SectionLabelProps) {
  return (
    <div className="mb-3 inline-flex">
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] ${
          light
            ? 'border border-[#0866E8]/40 bg-[#0866E8]/15 text-[#93C5FD]'
            : 'border border-[#DCEBFF] bg-[#F4F8FF] text-[#0866E8]'
        }`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${light ? 'bg-[#60A5FA]' : 'bg-[#0866E8]'}`} />
        {children}
      </span>
    </div>
  );
}
