import React from 'react';
import { Check } from 'lucide-react';

interface MultiSelectCardProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
  accentBg?: string;
  accentBorder?: string;
  disabled?: boolean;
}

export const MultiSelectCard: React.FC<MultiSelectCardProps> = ({
  label,
  selected,
  onToggle,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      disabled={disabled && !selected}
      onClick={onToggle}
      className={`group w-full text-left p-5 sm:p-6 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between gap-6 cursor-pointer focus-visible:ring-3 focus-visible:ring-[#4F6757] focus-visible:outline-none ${
        selected
          ? 'bg-[#FDF5F1] border-[#C97863] shadow-xs'
          : disabled
          ? 'opacity-35 cursor-not-allowed border-[#879B83]/15 bg-[#FAF7F2]'
          : 'bg-[#FAF7F2] border-[#879B83]/20 hover:border-[#879B83]/60 hover:bg-[#F4F1EB]'
      }`}
    >
      <span
        className={`text-lg sm:text-xl leading-snug transition-colors ${
          selected
            ? 'text-[#292D2A] font-bold'
            : 'text-[#292D2A]/85 font-medium group-hover:text-[#292D2A]'
        }`}
      >
        {label}
      </span>
      <div
        className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
          selected
            ? 'bg-[#C97863] border-[#C97863] text-white scale-105'
            : 'border-[#879B83]/40 bg-white group-hover:border-[#879B83]'
        }`}
        aria-hidden="true"
      >
        {selected && <Check className="w-4 h-4 stroke-[3] animate-in zoom-in-50 duration-150" />}
      </div>
    </button>
  );
};
