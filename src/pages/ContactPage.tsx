import React, { useState } from 'react';
import { ViewType } from '../types';
import { saveLeadSubmission } from '../services/leadService';
import { COUNTRIES } from '../data/countries';
import { ArrowLeft, Check, Send, ShieldCheck } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (view: ViewType) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Chile');
  const [region, setRegion] = useState('');
  const [profileType, setProfileType] = useState('Persona interesada en la experiencia');
  const [message, setMessage] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const PROFILE_TYPES = [
    'Persona interesada en su longevidad',
    'Familiar o acompañante de persona mayor',
    'Organización comunitaria o municipal',
    'Empresa o espacio de innovación',
    'Profesional o educador/a',
    'Otro motivo',
  ];

  const INTEREST_AREAS = [
    'Talleres y actividades presenciales / online',
    'Alianzas o proyectos colaborativos',
    'Conocer más sobre el ecosistema LongeviLab',
    'Invitar a una charla o encuentro',
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
      setErrorMessage('Por favor ingresa tu nombre.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Por favor ingresa un correo electrónico válido.');
      return;
    }

    if (!message.trim()) {
      setErrorMessage('Por favor escribe un mensaje o tu consulta.');
      return;
    }

    setIsSubmitting(true);

    try {
      saveLeadSubmission({
        source: 'contacto_general',
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        country: country || undefined,
        region: region.trim() || undefined,
        interests: [profileType, ...interests],
        message: message.trim(),
      });

      setIsSubmitting(false);
      setSubmitted(true);
    } catch {
      setIsSubmitting(false);
      setErrorMessage('Hubo un error al enviar el formulario. Intenta nuevamente.');
    }
  };

  return (
    <div className="py-10 sm:py-16 px-4 sm:px-8 max-w-3xl mx-auto space-y-12 animate-in fade-in duration-200">
      {/* Page Header */}
      <div className="space-y-4">
        <span className="inline-block text-xs sm:text-sm font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#FDF5F1] border border-[#E8B89F] text-[#C97863]">
          Contacto y Comunidad
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#303530] tracking-tight leading-tight">
          Hablemos sobre longevidad con sentido.
        </h1>
        <p className="text-lg sm:text-xl text-[#303530]/85 leading-relaxed">
          ¿Tienes dudas, te gustaría que colaboremos o quieres sumarte a los proyectos de LongeviLab? Déjanos tu mensaje y nos pondremos en contacto contigo.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 sm:p-12 rounded-3xl bg-[#F2F6F1] border-2 border-[#879B83] text-center space-y-5 shadow-sm">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-[#DFEBDE] border border-[#879B83] flex items-center justify-center text-[#4F6757] shadow-2xs">
            <Check className="w-8 h-8 stroke-[2.5]" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#303530]">
            ¡Mensaje recibido!
          </h2>
          <p className="text-base sm:text-lg text-[#303530]/85 max-w-lg mx-auto leading-relaxed">
            Gracias por escribirnos, <strong>{name}</strong>. Hemos registrado tu consulta y te responderemos a la brevedad al correo <strong>{email}</strong>.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setMessage('');
              }}
              className="px-6 py-3 rounded-xl text-base font-bold text-[#4F6757] bg-white border border-[#879B83]/40 hover:bg-[#F2F6F1] cursor-pointer transition-colors"
            >
              Enviar otro mensaje
            </button>
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="px-7 py-3 rounded-xl text-base font-bold text-white bg-[#C97863] hover:bg-[#B56652] cursor-pointer transition-all shadow-sm"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white border-2 border-[#879B83]/30 rounded-3xl p-7 sm:p-10 shadow-sm space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Nombre */}
              <div className="space-y-1.5">
                <label htmlFor="contact-name" className="block text-base font-bold text-[#303530]">
                  Tu nombre completo <span className="text-[#C97863]">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Carmen Gloria Soto"
                  className="w-full p-4 rounded-xl bg-[#FAF7F2] border-2 border-[#879B83]/30 text-base text-[#303530] focus:border-[#4F6757] focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="contact-email" className="block text-base font-bold text-[#303530]">
                  Correo electrónico <span className="text-[#C97863]">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ej: carmen@ejemplo.com"
                  className="w-full p-4 rounded-xl bg-[#FAF7F2] border-2 border-[#879B83]/30 text-base text-[#303530] focus:border-[#4F6757] focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              {/* Teléfono */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-baseline">
                  <label htmlFor="contact-phone" className="block text-base font-bold text-[#303530]">
                    Teléfono o WhatsApp
                  </label>
                  <span className="text-xs text-[#303530]/60 uppercase font-semibold">Opcional</span>
                </div>
                <input
                  id="contact-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ej: +34 612 345 678, +56 9 8765 4321, +52..."
                  className="w-full p-4 rounded-xl bg-[#FAF7F2] border-2 border-[#879B83]/30 text-base text-[#303530] focus:border-[#4F6757] focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              {/* País */}
              <div className="space-y-1.5">
                <label htmlFor="contact-country" className="block text-base font-bold text-[#303530]">
                  País
                </label>
                <select
                  id="contact-country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full p-4 rounded-xl bg-[#FAF7F2] border-2 border-[#879B83]/30 text-base text-[#303530] focus:border-[#4F6757] focus:bg-white focus:outline-none transition-colors"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Región o Ciudad */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-baseline">
                  <label htmlFor="contact-region" className="block text-base font-bold text-[#303530]">
                    Ciudad o Región / Provincia
                  </label>
                  <span className="text-xs text-[#303530]/60 uppercase font-semibold">Opcional</span>
                </div>
                <input
                  id="contact-region"
                  type="text"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  placeholder="Ej: Madrid, Barcelona, Santiago, CDMX, Bogotá…"
                  className="w-full p-4 rounded-xl bg-[#FAF7F2] border-2 border-[#879B83]/30 text-base text-[#303530] focus:border-[#4F6757] focus:bg-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Perfil */}
            <div className="space-y-2">
              <label htmlFor="contact-profile" className="block text-base font-bold text-[#303530]">
                ¿Cómo te vinculas con LongeviLab?
              </label>
              <select
                id="contact-profile"
                value={profileType}
                onChange={(e) => setProfileType(e.target.value)}
                className="w-full p-4 rounded-xl bg-[#FAF7F2] border-2 border-[#879B83]/30 text-base text-[#303530] focus:border-[#4F6757] focus:bg-white focus:outline-none transition-colors"
              >
                {PROFILE_TYPES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Áreas de interés */}
            <div className="space-y-2.5">
              <label className="block text-base font-bold text-[#303530]">
                ¿En qué aspectos tienes mayor interés? (Opcional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {INTEREST_AREAS.map((item) => {
                  const checked = interests.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleInterest(item)}
                      className={`text-left p-3 rounded-xl border-2 transition-all flex items-center gap-3 cursor-pointer ${
                        checked
                          ? 'bg-[#F2F6F1] border-[#879B83] text-[#4F6757] font-semibold'
                          : 'bg-[#FAF7F2]/60 border-[#879B83]/20 hover:border-[#879B83]/50 text-[#303530]/80'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                          checked ? 'bg-[#4F6757] border-[#4F6757] text-white' : 'border-[#879B83]/40 bg-white'
                        }`}
                      >
                        {checked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-sm">{item}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mensaje */}
            <div className="space-y-1.5">
              <label htmlFor="contact-message" className="block text-base font-bold text-[#303530]">
                Tu mensaje, consulta o propuesta <span className="text-[#C97863]">*</span>
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Cuéntanos brevemente en qué podemos ayudarte o qué te gustaría explorar con nosotros…"
                className="w-full p-4 rounded-xl bg-[#FAF7F2] border-2 border-[#879B83]/30 text-base text-[#303530] focus:border-[#4F6757] focus:bg-white focus:outline-none transition-colors"
              />
            </div>

            {errorMessage && (
              <div className="p-4 rounded-xl bg-[#FDF5F1] border-2 border-[#C97863] text-[#C97863] text-sm font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C97863]" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="text-xs text-[#303530]/65 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#879B83] shrink-0" />
                <span>Tratamos tus datos con estricta confidencialidad institucional.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-lg font-bold text-white bg-[#C97863] hover:bg-[#B56652] active:bg-[#A35542] rounded-2xl transition-all shadow-md hover:shadow-lg shadow-[#C97863]/25 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
                <span>{isSubmitting ? 'Enviando...' : 'Enviar mensaje'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Back to home */}
      <div className="pt-6 border-t border-[#879B83]/20 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-base font-semibold text-[#4F6757] hover:text-[#303530] hover:bg-[#F2F6F1] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#4F6757]" />
          <span>Volver al inicio</span>
        </button>
      </div>
    </div>
  );
};
