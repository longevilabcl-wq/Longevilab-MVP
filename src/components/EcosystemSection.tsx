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
    <section className="mt-16 pt-12 border-t border-[#879B83]/20 no-print animate-in fade-in duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#4F6757] block mb-2">
            Ecosistema LongeviLab
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#303530] tracking-tight">
            Hay distintas formas de continuar
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#303530]/80 max-w-xl mx-auto">
            LongeviLab desarrolla espacios y metodologías especializadas para acompañar distintas dimensiones de una vida más larga.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ECOSYSTEM_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="p-7 rounded-3xl border-2 flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-md group shadow-2xs"
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
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/90 border border-[#879B83]/30 text-[#303530]">
                    {prod.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#303530] mb-3">
                  {prod.title}
                </h3>
                <p className="text-base text-[#303530]/85 leading-relaxed">
                  {prod.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/10">
                <button
                  type="button"
                  onClick={() => setSelectedProduct({ name: prod.name, title: prod.title })}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-base font-bold bg-white hover:bg-white/95 shadow-2xs transition-colors cursor-pointer border"
                  style={{ color: prod.accentColor, borderColor: prod.border }}
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
            className="inline-flex items-center gap-2 text-base font-semibold text-[#4F6757] hover:text-[#303530] underline underline-offset-4 py-2 px-3 rounded-lg cursor-pointer transition-colors"
          >
            <Printer className="w-4 h-4 text-[#4F6757]" />
            Por ahora quiero guardar mi mapa
          </button>
          <span className="hidden sm:inline text-[#879B83]/40">·</span>
          <button
            type="button"
            onClick={onBackToMap}
            className="text-base font-semibold text-[#303530] hover:text-[#C97863] underline underline-offset-4 py-2 px-3 cursor-pointer transition-colors"
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
