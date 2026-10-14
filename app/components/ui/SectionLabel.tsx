interface SectionLabelProps {
  children: React.ReactNode;
  light?: boolean;
}

export default function SectionLabel({ children, light = false }: SectionLabelProps) {
  return (
    <p
      className={`text-xs font-semibold uppercase tracking-[0.15em] mb-3 ${
        light ? 'text-[#93aafa]' : 'text-[#1450F5]'
      }`}
    >
      {children}
    </p>
  );
}
