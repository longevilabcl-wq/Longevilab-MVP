export type ViewType = 'home' | 'mi-longevidad' | 'sobre-longevilab' | 'privacidad' | 'contacto';

export interface LongevityResponses {
  // Step 1: Introducción
  ageStage?: string;

  // Step 2: Propósito
  purposePresent?: string; // 'Esto está presente en mi vida' | 'Quiero fortalecerlo' | 'Quiero que algo cambie' | 'Nunca me lo había preguntado'
  purposeFuture?: string;  // Same 4 options
  purposeSpecialText?: string;

  // Step 3: Vínculos
  socialPresence?: string; // 'Quiero conservar esto' | 'Quiero fortalecer mis vínculos' | 'Quiero conocer nuevas personas' | 'Me gustaría sentirme menos sola/o' | 'Prefiero no responder'
  socialWants?: string[];   // Multi-select

  // Step 4: Participación
  participationPresence?: string; // 'Sí, quiero conservarlos' | 'Me gustaría participar más' | 'Quiero encontrar algo nuevo' | 'No sé dónde podría participar' | 'No me interesa por ahora'
  participationWays?: string[];   // Multi-select

  // Step 5: Proyectos y Aprendizaje
  projectsWants?: string[]; // Multi-select
  projectsOtherText?: string;
  projectsObstacles?: string; // 'Las estoy haciendo' | 'Tengo ganas, pero las postergo' | 'No sé por dónde empezar' | 'Me faltan personas con quienes hacerlo' | 'Siento que no tengo oportunidades'

  // Step 6: Autonomía y Forma de Vivir
  autonomyLifestyle?: string; // 'Sí, bastante' | 'Hay cosas que quiero cambiar' | 'Empiezo a necesitar más apoyo' | 'Nunca lo había pensado'
  autonomyKeepSpecial?: string[]; // Multi-select
  autonomyOtherText?: string;

  // Step 7: Preparar lo que viene
  futurePrepTopics?: string[]; // Multi-select
  futureFeelings?: string; // 'Entusiasmo' | 'Curiosidad' | 'Tranquilidad' | 'Incertidumbre' | 'Preocupación' | 'Una mezcla de varias'

  // Step 8: Prioridades (Max 5)
  priorities?: string[];
  prioritiesOtherText?: string;
}

export interface LongevityMap {
  dateFormatted: string;
  toKeep: string[];        // LO QUE HOY QUIERO CONSERVAR
  giveSpaceTo: string[];   // QUIERO DARLE MÁS ESPACIO A (max 5)
  toPrepare: string[];     // QUIERO COMENZAR A PREPARAR
  importantThemes: string[]; // LO QUE PARECE IMPORTANTE PARA MÍ (up to 4)
  personalPhrase: string;  // Deterministic reflection phrase
}

export interface ActivationItem {
  id: string;
  category: string;
  name: string;
  explanation: string;
  whyUseful: string;
  concreteAction: string;
  ctaText: string;
}

export interface SavedState {
  currentStep: number; // 1 to 8, or 9 for transition, 10 for results, 11 for activations
  responses: LongevityResponses;
  updatedAt: string;
  isComplete: boolean;
}
