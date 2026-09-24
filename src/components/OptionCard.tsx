import React from 'react';
import { Check } from 'lucide-react';

interface OptionCardProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
  accentBg?: string;
  accentBorder?: string;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  label,
  selected,
  onSelect,
  accentBg = '#F5EFFB',
  accentBorder = '#9A5FE8',
}) => {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-center justify-between gap-4 cursor-pointer focus-visible:ring-3 focus-visible:ring-[#2F312D] focus-visible:outline-none ${
        selected
          ? 'shadow-sm font-semibold'
          : 'border-[#2F312D]/15 hover:border-[#2F312D]/35 bg-white/90 hover:bg-white'
      }`}
      style={{
        backgroundColor: selected ? accentBg : undefined,
        borderColor: selected ? accentBorder : undefined,
      }}
    >
      <span
        className={`text-base sm:text-lg leading-snug ${
          selected ? 'text-[#1F201D] font-bold' : 'text-[#2F312D] font-medium'
        }`}
      >
        {label}
      </span>
      <div
        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors shadow-2xs ${
          selected ? 'text-white' : 'border-[#2F312D]/25 bg-white'
        }`}
        style={{
          backgroundColor: selected ? accentBorder : undefined,
          borderColor: selected ? accentBorder : undefined,
        }}
        aria-hidden="true"
      >
        {selected && <Check className="w-4 h-4 stroke-[3]" />}
      </div>
    </button>
  );
};
