import React, { useState } from 'react';
import { ECOSYSTEM_PRODUCTS } from '../data/questionnaireData';
import { Modal } from './Modal';
import { Printer, ArrowRight } from 'lucide-react';

interface EcosystemSectionProps {
  onPrintMap: () => void;
  onBackToMap: () => void;
}

export const EcosystemSection: React.FC<EcosystemSectionProps> = ({
  onPrintMap,
  onBackToMap,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<{ name: string; title: string } | null>(null);

  return (
    <section className="mt-16 pt-12 border-t border-[#2F312D]/15 no-print animate-in fade-in duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#2F312D]/60 block mb-2">
            Ecosistema LongeviLab
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2F312D] tracking-tight">
            Hay distintas formas de continuar
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#2F312D]/75 max-w-xl mx-auto">
            LongeviLab desarrolla espacios y metodologías especializadas para acompañar distintas dimensiones de una vida más larga.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ECOSYSTEM_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="p-7 rounded-3xl border-2 flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-md group"
              style={{
                backgroundColor: prod.bg,
                borderColor: prod.border,
              }}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: prod.accentColor }}
                  >
                    {prod.name}
                  </span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/80 border border-black/10 text-[#1F201D]">
                    {prod.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#1F201D] mb-3">
                  {prod.title}
                </h3>
                <p className="text-base text-[#2F312D]/85 leading-relaxed">
                  {prod.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/10">
                <button
                  type="button"
                  onClick={() => setSelectedProduct({ name: prod.name, title: prod.title })}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-base font-bold bg-white hover:bg-white/90 shadow-2xs transition-colors cursor-pointer"
                  style={{ color: prod.accentColor }}
                >
                  <span>{prod.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA option */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onPrintMap}
            className="inline-flex items-center gap-2 text-base font-medium text-[#2F312D]/80 hover:text-[#2F312D] underline underline-offset-4 py-2 px-3 rounded-lg cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Por ahora quiero guardar mi mapa
          </button>
          <span className="hidden sm:inline text-[#2F312D]/40">·</span>
          <button
            type="button"
            onClick={onBackToMap}
            className="text-base font-semibold text-[#2F312D] hover:underline underline-offset-4 py-2 px-3 cursor-pointer"
          >
            Ver mi mapa nuevamente
          </button>
        </div>
      </div>

      {/* Modal for upcoming solutions */}
      <Modal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        title="Estamos construyendo esta experiencia."
        description="LongeviLab está comenzando. Esta solución estará disponible próximamente."
        primaryButtonText="Volver a mi mapa"
        onPrimaryClick={() => setSelectedProduct(null)}
      />
    </section>
  );
};
