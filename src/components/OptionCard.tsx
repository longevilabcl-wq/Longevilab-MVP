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
  accentBg = '#FDF5F1',
  accentBorder = '#C97863',
}) => {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-center justify-between gap-4 cursor-pointer focus-visible:ring-3 focus-visible:ring-[#4F6757] focus-visible:outline-none ${
        selected
          ? 'shadow-sm font-semibold'
          : 'border-[#879B83]/25 hover:border-[#879B83]/60 bg-white/95 hover:bg-white'
      }`}
      style={{
        backgroundColor: selected ? accentBg : undefined,
        borderColor: selected ? accentBorder : undefined,
      }}
    >
      <span
        className={`text-base sm:text-lg leading-snug ${
          selected ? 'text-[#303530] font-bold' : 'text-[#303530] font-medium'
        }`}
      >
        {label}
      </span>
      <div
        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors shadow-2xs ${
          selected ? 'text-white' : 'border-[#879B83]/40 bg-white'
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
