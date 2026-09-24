import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  primaryButtonText?: string;
  onPrimaryClick?: () => void;
  secondaryButtonText?: string;
  onSecondaryClick?: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  primaryButtonText = 'Aceptar',
  onPrimaryClick,
  secondaryButtonText,
  onSecondaryClick,
  children,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div
        className="w-full max-w-lg bg-[#F7F3EC] border border-[#2F312D]/15 rounded-3xl p-6 sm:p-8 shadow-xl transition-transform"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h3 id="modal-title" className="text-xl sm:text-2xl font-bold text-[#2F312D] leading-snug">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="p-1.5 text-[#2F312D]/60 hover:text-[#2F312D] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {description && (
          <p className="mt-3 text-base sm:text-lg text-[#2F312D]/85 leading-relaxed">
            {description}
          </p>
        )}

        {children && <div className="mt-4">{children}</div>}

        <div className="mt-8 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3">
          {secondaryButtonText && (
            <button
              type="button"
              onClick={onSecondaryClick || onClose}
              className="px-5 py-3 text-base font-medium text-[#2F312D] bg-transparent hover:bg-black/5 rounded-xl transition-colors cursor-pointer"
            >
              {secondaryButtonText}
            </button>
          )}
          <button
            type="button"
            onClick={onPrimaryClick || onClose}
            className="px-6 py-3 text-base font-semibold text-white bg-[#2F312D] hover:bg-[#1E1F1C] rounded-xl transition-colors shadow-sm cursor-pointer"
          >
            {primaryButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};
