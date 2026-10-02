import React, { useState } from 'react';
import { LongevityMap } from '../types';
import { saveLeadSubmission } from '../services/leadService';
import { Mail, Check, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

interface MapLeadFormProps {
  map: LongevityMap;
}

export const MapLeadForm: React.FC<MapLeadFormProps> = ({ map }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState('');
  const [interests, setInterests] = useState<string[]>([
    'Recibir una copia digital de mi Mapa de Longevidad',
    'Avisarme de talleres y actividades en mi zona',
  ]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const AVAILABLE_INTERESTS = [
    'Recibir una copia digital de mi Mapa de Longevidad',
    'Avisarme de talleres y actividades en mi zona',
    'Conocer comunidades y proyectos para participar',
    'Espacios de conversación y mentoría intergeneracional',
  ];

  const CHILE_REGIONS = [
    'Región Metropolitana de Santiago',
    'Región de Valparaíso',
    'Región del Biobío',
    'Región de Antofagasta',
    'Región de Coquimbo',
    'Región de O’Higgins',
    'Región del Maule',
    'Región de La Araucanía',
    'Región de Los Lagos',
    'Región de Los Ríos',
    'Región de Arica y Parinacota',
    'Región de Tarapacá',
    'Región de Atacama',
    'Región de Ñuble',
    'Región de Aysén',
    'Región de Magallanes',
    'Fuera de Chile / Otra',
  ];

  const toggleInterest = (item: string) => {
    if (interests.includes(item)) {
      setInterests(interests.filter((i) => i !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('Por favor cuéntanos cómo te gusta que te llamemos.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Por favor ingresa un correo electrónico válido para poder contactarte.');
      return;
    }

    setIsSubmitting(true);

    try {
      saveLeadSubmission({
        source: 'mapa_longevidad',
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        region: region || undefined,
        interests,
        mapSummary: {
          date: map.dateFormatted,
          phrase: map.personalPhrase,
          priorities: map.giveSpaceTo || [],
          importantThemes: map.importantThemes || [],
        },
      });

      setIsSubmitting(false);
      setSubmitted(true);
    } catch {
      setIsSubmitting(false);
      setErrorMessage('Ocurrió un error al guardar. Por favor intenta de nuevo.');
    }
  };

  if (submitted) {
    return (
      <div className="p-8 sm:p-10 rounded-3xl bg-[#F2F6F1] border-2 border-[#879B83] text-center space-y-4 animate-in fade-in duration-300 shadow-sm no-print">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-[#DFEBDE] border border-[#879B83] flex items-center justify-center text-[#4F6757] mb-2 shadow-2xs">
          <Check className="w-8 h-8 stroke-[2.5]" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#303530]">
          ¡Muchas gracias, {name}!
        </h3>
        <p className="text-base sm:text-lg text-[#303530]/85 max-w-xl mx-auto leading-relaxed">
          Guardamos tus datos con total cuidado y confidencialidad. Te escribiremos a <strong className="text-[#303530]">{email}</strong> con novedades relevantes y oportunidades para seguir activando tu longevidad.
        </p>
        <div className="pt-2 text-xs sm:text-sm text-[#4F6757] font-semibold flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#879B83]" />
          Tus datos no serán compartidos con terceros ni utilizados para spam comercial.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-white border-2 border-[#E8B89F] p-7 sm:p-10 shadow-sm no-print space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#879B83]/20 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#FDF5F1] text-[#C97863] border border-[#E8B89F] mb-2">
            <HeartHandshake className="w-4 h-4 text-[#C97863]" />
            Continuar el camino juntos (Opcional)
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#303530] tracking-tight">
            ¿Te gustaría que te acompañemos en los siguientes pasos?
          </h3>
          <p className="mt-2 text-base sm:text-lg text-[#303530]/80 leading-relaxed max-w-2xl">
            Si quieres recibir una copia de tu mapa, avisos cuando abramos talleres de tu interés o conectarte con otras personas con tus mismas afinidades, déjanos tu contacto.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Nombre */}
          <div className="space-y-1.5">
            <label htmlFor="map-lead-name" className="block text-base font-bold text-[#303530]">
              Tu nombre o cómo te gusta que te llamen <span className="text-[#C97863]">*</span>
            </label>
            <input
              id="map-lead-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Carmen, Roberto, María José…"
              className="w-full p-4 rounded-xl bg-[#FAF7F2] border-2 border-[#879B83]/30 text-base text-[#303530] focus:border-[#4F6757] focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="map-lead-email" className="block text-base font-bold text-[#303530]">
              Correo electrónico <span className="text-[#C97863]">*</span>
            </label>
            <input
              id="map-lead-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ej: nombre@correo.cl"
              className="w-full p-4 rounded-xl bg-[#FAF7F2] border-2 border-[#879B83]/30 text-base text-[#303530] focus:border-[#4F6757] focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          {/* Teléfono / WhatsApp */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-baseline">
              <label htmlFor="map-lead-phone" className="block text-base font-bold text-[#303530]">
                Teléfono o WhatsApp
              </label>
              <span className="text-xs text-[#303530]/60 uppercase font-semibold">Opcional</span>
            </div>
            <input
              id="map-lead-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+56 9 1234 5678"
              className="w-full p-4 rounded-xl bg-[#FAF7F2] border-2 border-[#879B83]/30 text-base text-[#303530] focus:border-[#4F6757] focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          {/* Región / Ciudad */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-baseline">
              <label htmlFor="map-lead-region" className="block text-base font-bold text-[#303530]">
                Región o Ciudad
              </label>
              <span className="text-xs text-[#303530]/60 uppercase font-semibold">Opcional</span>
            </div>
            <select
              id="map-lead-region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full p-4 rounded-xl bg-[#FAF7F2] border-2 border-[#879B83]/30 text-base text-[#303530] focus:border-[#4F6757] focus:bg-white focus:outline-none transition-colors"
            >
              <option value="">Selecciona tu región...</option>
              {CHILE_REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Qué te gustaría recibir */}
        <div className="space-y-3 pt-2">
          <label className="block text-base font-bold text-[#303530]">
            ¿Qué tipo de información te gustaría recibir de LongeviLab?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {AVAILABLE_INTERESTS.map((item) => {
              const isChecked = interests.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleInterest(item)}
                  className={`w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-start gap-3 cursor-pointer ${
                    isChecked
                      ? 'bg-[#FDF5F1] border-[#C97863] text-[#303530] font-semibold shadow-2xs'
                      : 'bg-[#FAF7F2]/60 border-[#879B83]/20 hover:border-[#879B83]/60 text-[#303530]/80'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md border-2 mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                      isChecked ? 'bg-[#C97863] border-[#C97863] text-white' : 'border-[#879B83]/40 bg-white'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <span className="text-sm sm:text-base leading-snug">{item}</span>
                </button>
              );
            })}
          </div>
        </div>

        {errorMessage && (
          <div className="p-4 rounded-xl bg-[#FDF5F1] border-2 border-[#C97863] text-[#C97863] text-sm font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C97863]" />
            <span>{errorMessage}</span>
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="text-xs text-[#303530]/65 leading-relaxed flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#879B83] shrink-0" />
            <span>Respetamos tu privacidad. Solo te contactaremos para fines vinculados a LongeviLab.</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base sm:text-lg font-bold text-white bg-[#C97863] hover:bg-[#B56652] active:bg-[#A35542] rounded-2xl transition-all shadow-md hover:shadow-lg shadow-[#C97863]/25 cursor-pointer disabled:opacity-50"
          >
            <Mail className="w-5 h-5" />
            <span>{isSubmitting ? 'Guardando...' : 'Quiero recibir información'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
