import React, { useState, useEffect } from 'react';
import { LongevityResponses, LongevityMap, ActivationItem, SavedState } from '../types';
import {
  STEP_METADATA,
  AGE_STAGES,
  PURPOSE_OPTIONS,
  SOCIAL_PRESENCE_OPTIONS,
  SOCIAL_WANTS_OPTIONS,
  PARTICIPATION_PRESENCE_OPTIONS,
  PARTICIPATION_WAYS_OPTIONS,
  PROJECTS_WANTS_OPTIONS,
  PROJECTS_OBSTACLES_OPTIONS,
  AUTONOMY_LIFESTYLE_OPTIONS,
  AUTONOMY_KEEP_OPTIONS,
  FUTURE_TOPICS_OPTIONS,
  FUTURE_FEELINGS_OPTIONS,
  PRIORITIES_OPTIONS,
} from '../data/questionnaireData';
import { OptionCard } from './OptionCard';
import { MultiSelectCard } from './MultiSelectCard';
import { LongevityMapCard } from './LongevityMapCard';
import { EcosystemSection } from './EcosystemSection';
import { PrintMapView } from './PrintMapView';
import { Modal } from './Modal';
import { generateLongevityMap, generateActivations } from '../services/mapEngine';
import { loadSavedProgress, saveProgress, clearProgress } from '../services/storage';
import { trackEvent } from '../services/analytics';
import { ArrowLeft, ArrowRight, RotateCcw, Compass, Sun, Sparkles, CheckCircle2 } from 'lucide-react';

interface QuestionnaireStepperProps {
  onExit: () => void;
  onUpdateHeaderState: (step: number, isActive: boolean) => void;
}

export const QuestionnaireStepper: React.FC<QuestionnaireStepperProps> = ({
  onExit,
  onUpdateHeaderState,
}) => {
  // Stepper state
  // Steps: 1..8, 9 = transition, 10 = results (map), 11 = activations
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [responses, setResponses] = useState<LongevityResponses>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Resume check
  const [hasUnfinishedPrompt, setHasUnfinishedPrompt] = useState<boolean>(false);
  const [savedResumeData, setSavedResumeData] = useState<SavedState | null>(null);

  // Restart confirmation modal
  const [showRestartModal, setShowRestartModal] = useState<boolean>(false);

  // Results
  const [generatedMap, setGeneratedMap] = useState<LongevityMap | null>(null);
  const [activations, setActivations] = useState<ActivationItem[]>([]);

  // Check saved state on mount
  useEffect(() => {
    const saved = loadSavedProgress();
    if (saved && saved.currentStep > 1 && !saved.isComplete) {
      setHasUnfinishedPrompt(true);
      setSavedResumeData(saved);
    } else if (saved && saved.isComplete && saved.responses) {
      // Completed previously, reconstruct map
      setResponses(saved.responses);
      const m = generateLongevityMap(saved.responses);
      setGeneratedMap(m);
      setActivations(generateActivations(saved.responses, m));
      setCurrentStep(saved.currentStep >= 10 ? saved.currentStep : 10);
    }
  }, []);

  // Sync header step counter
  useEffect(() => {
    const isStepper = currentStep >= 1 && currentStep <= 8;
    onUpdateHeaderState(currentStep, isStepper);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep, onUpdateHeaderState]);

  // Handle continuing saved progress
  const handleContinueSaved = () => {
    if (savedResumeData) {
      setResponses(savedResumeData.responses);
      setCurrentStep(savedResumeData.currentStep);
    }
    setHasUnfinishedPrompt(false);
  };

  // Handle discarding saved progress
  const handleDiscardSaved = () => {
    clearProgress();
    setResponses({});
    setCurrentStep(1);
    setHasUnfinishedPrompt(false);
    trackEvent('restarted_map');
  };

  // Restart map confirmation
  const handleConfirmRestart = () => {
    clearProgress();
    setResponses({});
    setGeneratedMap(null);
    setActivations([]);
    setCurrentStep(1);
    setShowRestartModal(false);
    trackEvent('restarted_map');
  };

  // Print helper
  const handlePrint = () => {
    trackEvent('printed_map');
    window.print();
  };

  // Multi-select toggle helper
  const toggleArrayItem = (list: string[] | undefined, item: string, maxLimit?: number): string[] => {
    const current = list || [];
    if (current.includes(item)) {
      return current.filter(x => x !== item);
    }
    if (maxLimit && current.length >= maxLimit) {
      setErrorMessage(`Puedes elegir hasta ${maxLimit}.`);
      return current;
    }
    setErrorMessage(null);
    return [...current, item];
  };

  // Validate step before advancing
  const validateAndAdvance = () => {
    setErrorMessage(null);

    if (currentStep === 1) {
      // Step 1 optional age stage is fine to leave empty or answered
      advanceToStep(2);
      trackEvent('start_map');
      return;
    }

    if (currentStep === 2) {
      if (!responses.purposePresent) {
        setErrorMessage('Antes de continuar, responde a la primera pregunta sobre el sentido de tus días.');
        return;
      }
      if (!responses.purposeFuture) {
        setErrorMessage('Antes de continuar, responde a la segunda pregunta sobre tus próximos años.');
        return;
      }
      advanceToStep(3);
      return;
    }

    if (currentStep === 3) {
      if (!responses.socialPresence) {
        setErrorMessage('Antes de continuar, elige una opción sobre cómo sientes hoy tus vínculos.');
        return;
      }
      if (!responses.socialWants || responses.socialWants.length === 0) {
        setErrorMessage('Elige al menos una opción sobre lo que te gustaría que ocurriera más.');
        return;
      }
      advanceToStep(4);
      return;
    }

    if (currentStep === 4) {
      if (!responses.participationPresence) {
        setErrorMessage('Elige una opción sobre tus espacios de participación actuales.');
        return;
      }
      if (!responses.participationWays || responses.participationWays.length === 0) {
        setErrorMessage('Selecciona al menos una alternativa sobre cómo te gustaría aportar.');
        return;
      }
      advanceToStep(5);
      return;
    }

    if (currentStep === 5) {
      if (!responses.projectsWants || responses.projectsWants.length === 0) {
        setErrorMessage('Selecciona al menos una idea o alternativa sobre lo que te gustaría aprender o probar.');
        return;
      }
      if (!responses.projectsObstacles) {
        setErrorMessage('Cuéntanos qué suele pasar con esas ideas.');
        return;
      }
      advanceToStep(6);
      return;
    }

    if (currentStep === 6) {
      if (!responses.autonomyLifestyle) {
        setErrorMessage('Elige una alternativa sobre tu forma de vivir actual.');
        return;
      }
      if (!responses.autonomyKeepSpecial || responses.autonomyKeepSpecial.length === 0) {
        setErrorMessage('Selecciona al menos un aspecto que te gustaría conservar especialmente.');
        return;
      }
      advanceToStep(7);
      return;
    }

    if (currentStep === 7) {
      if (!responses.futurePrepTopics || responses.futurePrepTopics.length === 0) {
        setErrorMessage('Elige los temas sobre los que has pensado, o selecciona "Todavía no he pensado mucho en esto".');
        return;
      }
      if (!responses.futureFeelings) {
        setErrorMessage('Cuéntanos cómo te hace sentir pensar en tus próximos años.');
        return;
      }
      advanceToStep(8);
      return;
    }

    if (currentStep === 8) {
      const pCount = responses.priorities?.length || 0;
      if (pCount === 0) {
        setErrorMessage('Por favor elige al menos 1 prioridad (puedes elegir hasta 5).');
        return;
      }
      if (pCount > 5) {
        setErrorMessage('Puedes elegir hasta 5 prioridades.');
        return;
      }

      // Generate results and go to transition screen (9)
      const map = generateLongevityMap(responses);
      const acts = generateActivations(responses, map);
      setGeneratedMap(map);
      setActivations(acts);

      saveProgress(9, responses, true);
      trackEvent('completed_map');
      setCurrentStep(9);
      return;
    }
  };

  const advanceToStep = (nextStep: number) => {
    trackEvent('completed_step', { step: currentStep });
    saveProgress(nextStep, responses, false);
    setCurrentStep(nextStep);
  };

  const goToPreviousStep = () => {
    setErrorMessage(null);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // --- RENDER RECOVERY PROMPT ---
  if (hasUnfinishedPrompt) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4">
        <div className="bg-white border border-[#2F312D]/15 rounded-3xl p-8 sm:p-10 shadow-sm text-center">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#DDD6F3] flex items-center justify-center text-[#4A3B69] mb-5">
            <Compass className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2F312D] tracking-tight">
            Parece que dejaste un mapa a medio construir.
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#2F312D]/80 leading-relaxed">
            Guardamos tus respuestas en este dispositivo para que puedas retomar tu reflexión exactamente donde la dejaste.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleDiscardSaved}
              className="px-5 py-3.5 text-base font-medium text-[#2F312D]/80 hover:text-[#2F312D] hover:bg-black/5 rounded-2xl transition-colors cursor-pointer"
            >
              Comenzar de nuevo
            </button>
            <button
              type="button"
              onClick={handleContinueSaved}
              className="px-7 py-3.5 text-base font-semibold text-white bg-[#2F312D] hover:bg-[#1E1F1C] rounded-2xl transition-all shadow-sm cursor-pointer"
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER TRANSITION SCREEN (STEP 9) ---
  if (currentStep === 9) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 animate-in fade-in duration-300">
        <div className="bg-white border border-[#2F312D]/15 rounded-3xl p-8 sm:p-12 text-center shadow-sm">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-[#D3E0D0] flex items-center justify-center text-[#324E2E] mb-6">
            <Sun className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2F312D] tracking-tight">
            Tus próximos años no están escritos.
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-[#2F312D]/85 leading-relaxed">
            Lo que acabas de hacer no busca definirte ni decirte cómo deberías vivir. Es simplemente una fotografía de este momento y una invitación a pensar qué quieres construir desde aquí.
          </p>
          <div className="mt-10">
            <button
              type="button"
              onClick={() => {
                setCurrentStep(10);
                saveProgress(10, responses, true);
              }}
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold text-white bg-[#2F312D] hover:bg-[#1E1F1C] active:scale-[0.99] rounded-2xl transition-all shadow-sm cursor-pointer"
            >
              <span>Ver mi mapa</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER RESULT: MAP VIEW (STEP 10) ---
  if (currentStep === 10 && generatedMap) {
    return (
      <div className="py-8 px-4 sm:px-6">
        <LongevityMapCard
          map={generatedMap}
          onGoToActivations={() => {
            setCurrentStep(11);
            trackEvent('selected_activation');
          }}
          onPrintMap={handlePrint}
          onRestartMap={() => setShowRestartModal(true)}
        />

        {/* Hidden printable layout triggered when window.print() is called */}
        <PrintMapView map={generatedMap} activations={activations} />

        {/* Modal for restart confirmation */}
        <Modal
          isOpen={showRestartModal}
          onClose={() => setShowRestartModal(false)}
          title="¿Deseas comenzar un nuevo mapa?"
          description="Si comienzas nuevamente, se borrarán las respuestas actuales guardadas en este dispositivo."
          primaryButtonText="Sí, comenzar de nuevo"
          onPrimaryClick={handleConfirmRestart}
          secondaryButtonText="Volver al mapa"
          onSecondaryClick={() => setShowRestartModal(false)}
        />
      </div>
    );
  }

  // --- RENDER RESULT: ACTIVATIONS SCREEN (STEP 11) ---
  if (currentStep === 11 && generatedMap) {
    return (
      <div className="py-8 px-4 sm:px-6 max-w-4xl mx-auto animate-in fade-in duration-300">
        <div className="text-center mb-10">
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#2F312D]/60 block mb-2">
            Paso a paso
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#2F312D] tracking-tight">
            No tienes que cambiar todo. Empecemos por algo.
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-[#2F312D]/80 max-w-2xl mx-auto leading-relaxed">
            Tres pequeñas acciones concretas basadas en lo que hoy expresaste como prioritario para tus próximos años.
          </p>
        </div>

        {/* 3 Activations Cards */}
        <div className="space-y-5">
          {activations.map((item, idx) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-[#2F312D]/15 shadow-2xs flex flex-col sm:flex-row items-start gap-5"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#DDD6F3] text-[#4A3B69] flex items-center justify-center font-bold text-lg shrink-0">
                {idx + 1}
              </div>
              <div className="flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2F312D]/60 block mb-1">
                  {item.category}
                </span>
                <p className="text-lg sm:text-xl font-medium text-[#2F312D] leading-relaxed">
                  {item.actionText}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Back to map & Print actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={() => setCurrentStep(10)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-[#2F312D] bg-white border border-[#2F312D]/20 hover:bg-[#F4F1FA] rounded-2xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a mi mapa
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-[#2F312D] hover:bg-[#1E1F1C] rounded-2xl transition-colors cursor-pointer"
          >
            Guardar o imprimir todo
          </button>
        </div>

        {/* Ecosystem Section */}
        <EcosystemSection
          onPrintMap={handlePrint}
          onBackToMap={() => setCurrentStep(10)}
        />

        {/* Print template */}
        <PrintMapView map={generatedMap} activations={activations} />
      </div>
    );
  }

  // --- STEPPER 1 TO 8 LAYOUT ---
  const currentMeta = STEP_METADATA[currentStep];

  return (
    <div className="py-6 px-4 sm:px-6 max-w-3xl mx-auto">
      {/* Step Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span
            className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-wider px-3 py-1 rounded-full text-[#2F312D]/80"
            style={{ backgroundColor: currentMeta.accentChip }}
          >
            Paso {currentStep} de 8
          </span>
          <span className="text-xs sm:text-sm text-[#2F312D]/60 font-medium">
            Mi Longevidad
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2F312D] tracking-tight leading-tight">
          {currentMeta.title}
        </h1>
        <p className="mt-3 text-base sm:text-lg text-[#2F312D]/80 leading-relaxed">
          {currentMeta.subtitle}
        </p>
      </div>

      {/* Step Specific Content */}
      <div className="space-y-8">
        {/* --- PASO 1: INTRODUCCIÓN --- */}
        {currentStep === 1 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-[#2F312D]/15">
                <h3 className="text-base font-bold text-[#2F312D] mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#4A3B69]" />
                  Mira tu presente
                </h3>
                <p className="text-sm sm:text-base text-[#2F312D]/80 leading-snug">
                  Reconoce aquello que quieres conservar o cambiar.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#2F312D]/15">
                <h3 className="text-base font-bold text-[#2F312D] mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2C495E]" />
                  Imagina lo que viene
                </h3>
                <p className="text-sm sm:text-base text-[#2F312D]/80 leading-snug">
                  Piensa qué quieres que tenga más espacio en tu vida.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#2F312D]/15">
                <h3 className="text-base font-bold text-[#2F312D] mb-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#324E2E]" />
                  Activa algo
                </h3>
                <p className="text-sm sm:text-base text-[#2F312D]/80 leading-snug">
                  Convierte esa reflexión en pequeños pasos concretos.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#2F312D]/15">
              <div className="flex items-baseline justify-between mb-4">
                <label className="text-lg font-bold text-[#2F312D] block">
                  ¿En qué etapa estás?
                </label>
                <span className="text-xs text-[#2F312D]/60 uppercase tracking-wider font-semibold">
                  Opcional
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" role="radiogroup">
                {AGE_STAGES.map((age) => (
                  <OptionCard
                    key={age}
                    label={age}
                    selected={responses.ageStage === age}
                    onSelect={() => setResponses({ ...responses, ageStage: age })}
                    accentBg={currentMeta.accentBg}
                    accentBorder={currentMeta.accentBorder}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- PASO 2: PROPÓSITO --- */}
        {currentStep === 2 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Q1 */}
            <div className="space-y-3">
              <label className="text-lg sm:text-xl font-bold text-[#2F312D] block leading-snug">
                Hoy siento que existen cosas que me entusiasman, me movilizan o hacen que mi tiempo tenga sentido.
              </label>
              <div className="space-y-2.5" role="radiogroup">
                {PURPOSE_OPTIONS.map((opt) => (
                  <OptionCard
                    key={opt}
                    label={opt}
                    selected={responses.purposePresent === opt}
                    onSelect={() => setResponses({ ...responses, purposePresent: opt })}
                    accentBg={currentMeta.accentBg}
                    accentBorder={currentMeta.accentBorder}
                  />
                ))}
              </div>
            </div>

            {/* Q2 */}
            <div className="space-y-3 pt-4 border-t border-[#2F312D]/10">
              <label className="text-lg sm:text-xl font-bold text-[#2F312D] block leading-snug">
                Cuando pienso en los próximos años, siento que todavía hay cosas que quiero hacer, aportar, descubrir o construir.
              </label>
              <div className="space-y-2.5" role="radiogroup">
                {PURPOSE_OPTIONS.map((opt) => (
                  <OptionCard
                    key={opt}
                    label={opt}
                    selected={responses.purposeFuture === opt}
                    onSelect={() => setResponses({ ...responses, purposeFuture: opt })}
                    accentBg={currentMeta.accentBg}
                    accentBorder={currentMeta.accentBorder}
                  />
                ))}
              </div>
            </div>

            {/* Optional text input */}
            <div className="space-y-2 pt-4 border-t border-[#2F312D]/10">
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor="purpose-enthusiasm"
                  className="text-base sm:text-lg font-bold text-[#2F312D]"
                >
                  ¿Hay algo que hoy te entusiasme especialmente?
                </label>
                <span className="text-xs text-[#2F312D]/60 uppercase tracking-wider font-semibold">
                  Opcional
                </span>
              </div>
              <input
                id="purpose-enthusiasm"
                type="text"
                value={responses.purposeSpecialText || ''}
                onChange={(e) => setResponses({ ...responses, purposeSpecialText: e.target.value })}
                placeholder="Escribe lo primero que se te venga a la cabeza…"
                className="w-full p-4 rounded-2xl bg-white border border-[#2F312D]/20 text-base sm:text-lg text-[#2F312D] placeholder:text-[#2F312D]/40 focus:border-[#2F312D] focus:ring-1 focus:ring-[#2F312D]"
              />
            </div>
          </div>
        )}

        {/* --- PASO 3: VÍNCULOS --- */}
        {currentStep === 3 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Q1 */}
            <div className="space-y-3">
              <label className="text-lg sm:text-xl font-bold text-[#2F312D] block leading-snug">
                Tengo personas con quienes puedo conversar, compartir, reír, pedir ayuda o simplemente estar.
              </label>
              <div className="space-y-2.5" role="radiogroup">
                {SOCIAL_PRESENCE_OPTIONS.map((opt) => (
                  <OptionCard
                    key={opt}
                    label={opt}
                    selected={responses.socialPresence === opt}
                    onSelect={() => setResponses({ ...responses, socialPresence: opt })}
                    accentBg={currentMeta.accentBg}
                    accentBorder={currentMeta.accentBorder}
                  />
                ))}
              </div>
            </div>

            {/* Q2 */}
            <div className="space-y-3 pt-4 border-t border-[#2F312D]/10">
              <div>
                <label className="text-lg sm:text-xl font-bold text-[#2F312D] block leading-snug">
                  ¿Qué te gustaría que ocurriera más?
                </label>
                <span className="text-xs sm:text-sm text-[#2F312D]/60 block mt-1">
                  Puedes seleccionar varias alternativas
                </span>
              </div>
              <div className="space-y-2.5">
                {SOCIAL_WANTS_OPTIONS.map((opt) => (
                  <MultiSelectCard
                    key={opt}
                    label={opt}
                    selected={responses.socialWants?.includes(opt) || false}
                    onToggle={() =>
                      setResponses({
                        ...responses,
                        socialWants: toggleArrayItem(responses.socialWants, opt),
                      })
                    }
                    accentBg={currentMeta.accentBg}
                    accentBorder={currentMeta.accentBorder}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- PASO 4: PARTICIPACIÓN --- */}
        {currentStep === 4 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Q1 */}
            <div className="space-y-3">
              <label className="text-lg sm:text-xl font-bold text-[#2F312D] block leading-snug">
                Siento que tengo espacios donde puedo participar, aportar o sentirme parte de algo.
              </label>
              <div className="space-y-2.5" role="radiogroup">
                {PARTICIPATION_PRESENCE_OPTIONS.map((opt) => (
                  <OptionCard
                    key={opt}
                    label={opt}
                    selected={responses.participationPresence === opt}
                    onSelect={() => setResponses({ ...responses, participationPresence: opt })}
                    accentBg={currentMeta.accentBg}
                    accentBorder={currentMeta.accentBorder}
                  />
                ))}
              </div>
            </div>

            {/* Q2 */}
            <div className="space-y-3 pt-4 border-t border-[#2F312D]/10">
              <div>
                <label className="text-lg sm:text-xl font-bold text-[#2F312D] block leading-snug">
                  ¿Hay alguna forma en que te gustaría aportar?
                </label>
                <span className="text-xs sm:text-sm text-[#2F312D]/60 block mt-1">
                  Puedes seleccionar varias opciones
                </span>
              </div>
              <div className="space-y-2.5">
                {PARTICIPATION_WAYS_OPTIONS.map((opt) => (
                  <MultiSelectCard
                    key={opt}
                    label={opt}
                    selected={responses.participationWays?.includes(opt) || false}
                    onToggle={() =>
                      setResponses({
                        ...responses,
                        participationWays: toggleArrayItem(responses.participationWays, opt),
                      })
                    }
                    accentBg={currentMeta.accentBg}
                    accentBorder={currentMeta.accentBorder}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- PASO 5: PROYECTOS Y APRENDIZAJE --- */}
        {currentStep === 5 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Q1 */}
            <div className="space-y-3">
              <div>
                <label className="text-lg sm:text-xl font-bold text-[#2F312D] block leading-snug">
                  ¿Hay algo que llevas tiempo queriendo aprender, retomar o probar?
                </label>
                <span className="text-xs sm:text-sm text-[#2F312D]/60 block mt-1">
                  Selección múltiple
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PROJECTS_WANTS_OPTIONS.map((opt) => (
                  <MultiSelectCard
                    key={opt}
                    label={opt}
                    selected={responses.projectsWants?.includes(opt) || false}
                    onToggle={() =>
                      setResponses({
                        ...responses,
                        projectsWants: toggleArrayItem(responses.projectsWants, opt),
                      })
                    }
                    accentBg={currentMeta.accentBg}
                    accentBorder={currentMeta.accentBorder}
                  />
                ))}
              </div>

              {responses.projectsWants?.includes('Otro') && (
                <div className="mt-3">
                  <input
                    type="text"
                    value={responses.projectsOtherText || ''}
                    onChange={(e) => setResponses({ ...responses, projectsOtherText: e.target.value })}
                    placeholder="Especifica qué te gustaría aprender o probar…"
                    className="w-full p-4 rounded-2xl bg-white border border-[#2F312D]/20 text-base sm:text-lg text-[#2F312D] placeholder:text-[#2F312D]/40 focus:border-[#2F312D] focus:ring-1 focus:ring-[#2F312D]"
                  />
                </div>
              )}
            </div>

            {/* Q2 */}
            <div className="space-y-3 pt-4 border-t border-[#2F312D]/10">
              <label className="text-lg sm:text-xl font-bold text-[#2F312D] block leading-snug">
                ¿Qué suele pasar con esas ideas?
              </label>
              <div className="space-y-2.5" role="radiogroup">
                {PROJECTS_OBSTACLES_OPTIONS.map((opt) => (
                  <OptionCard
                    key={opt}
                    label={opt}
                    selected={responses.projectsObstacles === opt}
                    onSelect={() => setResponses({ ...responses, projectsObstacles: opt })}
                    accentBg={currentMeta.accentBg}
                    accentBorder={currentMeta.accentBorder}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- PASO 6: AUTONOMÍA Y FORMA DE VIVIR --- */}
        {currentStep === 6 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Q1 */}
            <div className="space-y-3">
              <label className="text-lg sm:text-xl font-bold text-[#2F312D] block leading-snug">
                Hoy mi forma de vivir se parece, en general, a cómo quiero vivir.
              </label>
              <div className="space-y-2.5" role="radiogroup">
                {AUTONOMY_LIFESTYLE_OPTIONS.map((opt) => (
                  <OptionCard
                    key={opt}
                    label={opt}
                    selected={responses.autonomyLifestyle === opt}
                    onSelect={() => setResponses({ ...responses, autonomyLifestyle: opt })}
                    accentBg={currentMeta.accentBg}
                    accentBorder={currentMeta.accentBorder}
                  />
                ))}
              </div>
            </div>

            {/* Q2 */}
            <div className="space-y-3 pt-4 border-t border-[#2F312D]/10">
              <div>
                <label className="text-lg sm:text-xl font-bold text-[#2F312D] block leading-snug">
                  Cuando piensas en el futuro, ¿hay algo que te gustaría conservar especialmente?
                </label>
                <span className="text-xs sm:text-sm text-[#2F312D]/60 block mt-1">
                  Selección múltiple
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {AUTONOMY_KEEP_OPTIONS.map((opt) => (
                  <MultiSelectCard
                    key={opt}
                    label={opt}
                    selected={responses.autonomyKeepSpecial?.includes(opt) || false}
                    onToggle={() =>
                      setResponses({
                        ...responses,
                        autonomyKeepSpecial: toggleArrayItem(responses.autonomyKeepSpecial, opt),
                      })
                    }
                    accentBg={currentMeta.accentBg}
                    accentBorder={currentMeta.accentBorder}
                  />
                ))}
              </div>

              {responses.autonomyKeepSpecial?.includes('Otro') && (
                <div className="mt-3">
                  <input
                    type="text"
                    value={responses.autonomyOtherText || ''}
                    onChange={(e) => setResponses({ ...responses, autonomyOtherText: e.target.value })}
                    placeholder="¿Qué otra cosa te gustaría conservar especialmente?"
                    className="w-full p-4 rounded-2xl bg-white border border-[#2F312D]/20 text-base sm:text-lg text-[#2F312D] placeholder:text-[#2F312D]/40 focus:border-[#2F312D] focus:ring-1 focus:ring-[#2F312D]"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- PASO 7: PREPARAR LO QUE VIENE --- */}
        {currentStep === 7 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Q1 */}
            <div className="space-y-3">
              <div>
                <label className="text-lg sm:text-xl font-bold text-[#2F312D] block leading-snug">
                  ¿Sobre cuáles de estos temas has pensado?
                </label>
                <span className="text-xs sm:text-sm text-[#2F312D]/60 block mt-1">
                  Selección múltiple
                </span>
              </div>
              <div className="space-y-2.5">
                {FUTURE_TOPICS_OPTIONS.map((opt) => (
                  <MultiSelectCard
                    key={opt}
                    label={opt}
                    selected={responses.futurePrepTopics?.includes(opt) || false}
                    onToggle={() =>
                      setResponses({
                        ...responses,
                        futurePrepTopics: toggleArrayItem(responses.futurePrepTopics, opt),
                      })
                    }
                    accentBg={currentMeta.accentBg}
                    accentBorder={currentMeta.accentBorder}
                  />
                ))}
              </div>
            </div>

            {/* Q2 */}
            <div className="space-y-3 pt-4 border-t border-[#2F312D]/10">
              <label className="text-lg sm:text-xl font-bold text-[#2F312D] block leading-snug">
                ¿Cómo te hace sentir pensar en tus próximos años?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" role="radiogroup">
                {FUTURE_FEELINGS_OPTIONS.map((opt) => (
                  <OptionCard
                    key={opt}
                    label={opt}
                    selected={responses.futureFeelings === opt}
                    onSelect={() => setResponses({ ...responses, futureFeelings: opt })}
                    accentBg={currentMeta.accentBg}
                    accentBorder={currentMeta.accentBorder}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- PASO 8: PRIORIDADES (MAX 5) --- */}
        {currentStep === 8 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white border border-[#2F312D]/15">
              <div>
                <span className="text-base sm:text-lg font-bold text-[#2F312D]">
                  Elige hasta 5 prioridades
                </span>
                <p className="text-xs sm:text-sm text-[#2F312D]/70 mt-0.5">
                  Selecciona aquello a lo que quieres darle mayor espacio.
                </p>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-[#F7F3EC] border border-[#2F312D]/15 text-[#2F312D] text-sm sm:text-base font-semibold tabular-nums shrink-0">
                {(responses.priorities?.length || 0)} de 5 seleccionadas
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PRIORITIES_OPTIONS.map((opt) => {
                const isSelected = responses.priorities?.includes(opt) || false;
                const isMax = (responses.priorities?.length || 0) >= 5 && !isSelected;
                return (
                  <MultiSelectCard
                    key={opt}
                    label={opt}
                    selected={isSelected}
                    disabled={isMax}
                    onToggle={() =>
                      setResponses({
                        ...responses,
                        priorities: toggleArrayItem(responses.priorities, opt, 5),
                      })
                    }
                    accentBg="#F4F1FA"
                    accentBorder="#DDD6F3"
                  />
                );
              })}
            </div>

            {responses.priorities?.includes('Algo que no aparece aquí') && (
              <div className="p-4 rounded-2xl bg-white border border-[#2F312D]/20 mt-4">
                <label
                  htmlFor="priorities-other"
                  className="block text-sm font-semibold text-[#2F312D] mb-1.5"
                >
                  ¿Qué prioridad te gustaría agregar?
                </label>
                <input
                  id="priorities-other"
                  type="text"
                  value={responses.prioritiesOtherText || ''}
                  onChange={(e) => setResponses({ ...responses, prioritiesOtherText: e.target.value })}
                  placeholder="Escribe tu prioridad personalizada…"
                  className="w-full p-3.5 rounded-xl bg-[#F7F3EC] border border-[#2F312D]/20 text-base text-[#2F312D] placeholder:text-[#2F312D]/40 focus:border-[#2F312D] focus:ring-1 focus:ring-[#2F312D]"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Human error message */}
      {errorMessage && (
        <div
          role="alert"
          className="mt-6 p-4 rounded-2xl bg-[#FDF7F3] border border-[#ECCDBB] text-[#68402A] text-base font-medium flex items-center gap-3 animate-in fade-in"
        >
          <span className="w-2 h-2 rounded-full bg-[#68402A] shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Navigation Buttons: Anterior / Continuar */}
      <div className="mt-10 pt-6 border-t border-[#2F312D]/15 flex items-center justify-between gap-4">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={goToPreviousStep}
            className="inline-flex items-center gap-2 px-5 py-3.5 text-base font-semibold text-[#2F312D] hover:bg-black/5 rounded-2xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Anterior</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onExit}
            className="inline-flex items-center gap-2 px-5 py-3.5 text-base font-medium text-[#2F312D]/70 hover:text-[#2F312D] rounded-2xl transition-colors cursor-pointer"
          >
            Volver al inicio
          </button>
        )}

        <button
          type="button"
          onClick={validateAndAdvance}
          className="inline-flex items-center gap-2 px-8 py-3.5 text-lg font-bold text-white bg-[#2F312D] hover:bg-[#1E1F1C] active:scale-[0.99] rounded-2xl transition-all shadow-sm cursor-pointer"
        >
          <span>{currentStep === 1 ? 'Comenzar' : currentStep === 8 ? 'Construir mi mapa' : 'Continuar'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
