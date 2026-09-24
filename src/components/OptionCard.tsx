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
  accentBg = '#F4F1FA',
  accentBorder = '#DDD6F3',
}) => {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-center justify-between gap-4 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#2F312D] focus-visible:outline-none ${
        selected
          ? 'border-[#2F312D] shadow-sm'
          : 'border-[#2F312D]/15 hover:border-[#2F312D]/40 bg-white/70 hover:bg-white'
      }`}
      style={{
        backgroundColor: selected ? accentBg : undefined,
        borderColor: selected ? '#2F312D' : undefined,
      }}
    >
      <span className="text-base sm:text-lg text-[#2F312D] font-medium leading-snug">
        {label}
      </span>
      <div
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
          selected ? 'border-[#2F312D] bg-[#2F312D] text-white' : 'border-[#2F312D]/30 bg-transparent'
        }`}
        aria-hidden="true"
      >
        {selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
      </div>
    </button>
  );
};
