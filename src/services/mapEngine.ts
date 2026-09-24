import { ActivationItem, LongevityMap, LongevityResponses } from '../types';

export function formatSpanishDate(d: Date = new Date()): string {
  try {
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
    ];
    const day = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day} de ${month} de ${year}`;
  } catch {
    return 'Hoy';
  }
}

export function generateLongevityMap(responses: LongevityResponses): LongevityMap {
  const dateFormatted = formatSpanishDate();

  // 1. LO QUE HOY QUIERO CONSERVAR
  const toKeep: string[] = [];

  if (responses.autonomyKeepSpecial && responses.autonomyKeepSpecial.length > 0) {
    responses.autonomyKeepSpecial.forEach((item) => {
      if (item === 'Otro' && responses.autonomyOtherText?.trim()) {
        toKeep.push(responses.autonomyOtherText.trim());
      } else if (item !== 'Otro') {
        toKeep.push(item);
      }
    });
  }

  if (responses.purposePresent === 'Esto está presente en mi vida') {
    if (!toKeep.some(k => k.toLowerCase().includes('sentido'))) {
      toKeep.push('El sentido y entusiasmo en mis días actuales');
    }
  }

  if (responses.socialPresence === 'Quiero conservar esto') {
    if (!toKeep.some(k => k.toLowerCase().includes('vínculo') || k.toLowerCase().includes('amistad') || k.toLowerCase().includes('social'))) {
      toKeep.push('Mis vínculos y relaciones actuales');
    }
  }

  if (responses.participationPresence === 'Sí, quiero conservarlos') {
    if (!toKeep.some(k => k.toLowerCase().includes('participación') || k.toLowerCase().includes('actividades'))) {
      toKeep.push('Mis espacios de aporte y participación');
    }
  }

  if (responses.autonomyLifestyle === 'Sí, bastante' && !toKeep.some(k => k.toLowerCase().includes('independencia') || k.toLowerCase().includes('rutina'))) {
    toKeep.push('Mi autonomía y ritmo de vida cotidiana');
  }

  // Fallback if user didn't pick anything explicit to keep
  if (toKeep.length === 0) {
    toKeep.push('Mi autonomía e independencia cotidiana');
    toKeep.push('La tranquilidad y el ritmo de mis días');
  }

  // Limit to at most 4-5 key items for editorial clarity
  const trimmedToKeep = toKeep.slice(0, 5);

  // 2. QUIERO DARLE MÁS ESPACIO A (Step 8 Priorities, max 5)
  const rawPriorities = responses.priorities || [];
  const giveSpaceTo: string[] = [];

  rawPriorities.forEach((p) => {
    if (p === 'Algo que no aparece aquí' && responses.prioritiesOtherText?.trim()) {
      giveSpaceTo.push(responses.prioritiesOtherText.trim());
    } else if (p !== 'Algo que no aparece aquí') {
      giveSpaceTo.push(p);
    }
  });

  // If empty, take from wants in previous steps
  if (giveSpaceTo.length === 0) {
    if (responses.projectsWants && responses.projectsWants.length > 0) {
      giveSpaceTo.push(...responses.projectsWants.filter(w => w !== 'Todavía no lo sé' && w !== 'Otro').slice(0, 3));
    }
    if (responses.socialWants && responses.socialWants.length > 0) {
      giveSpaceTo.push(...responses.socialWants.filter(w => w !== 'Estoy bien como estoy').slice(0, 2));
    }
  }

  // Limit to 5
  const finalGiveSpaceTo = giveSpaceTo.slice(0, 5);

  // 3. QUIERO COMENZAR A PREPARAR (Step 7 topics)
  const toPrepare: string[] = [];
  if (responses.futurePrepTopics && responses.futurePrepTopics.length > 0) {
    responses.futurePrepTopics.forEach((topic) => {
      if (topic !== 'Todavía no he pensado mucho en esto') {
        toPrepare.push(topic);
      }
    });
  }

  if (toPrepare.length === 0) {
    toPrepare.push('Conversar y reflexionar sobre cómo quiero organizar mi tiempo y mis próximos años');
  }

  const trimmedToPrepare = toPrepare.slice(0, 4);

  // 4. LO QUE PARECE IMPORTANTE PARA MÍ (Up to 4 concepts)
  const conceptScores: Record<string, number> = {
    'Conexión': 0,
    'Propósito': 0,
    'Aprendizaje': 0,
    'Autonomía': 0,
    'Participación': 0,
    'Familia': 0,
    'Creatividad': 0,
    'Contribución': 0,
    'Descanso': 0,
    'Nuevas experiencias': 0,
  };

  // Evaluate scores based on choices
  finalGiveSpaceTo.forEach((p) => {
    const lower = p.toLowerCase();
    if (lower.includes('amistad') || lower.includes('amor') || lower.includes('social')) conceptScores['Conexión'] += 3;
    if (lower.includes('familia')) conceptScores['Familia'] += 3;
    if (lower.includes('propósito')) conceptScores['Propósito'] += 3;
    if (lower.includes('aprender')) conceptScores['Aprendizaje'] += 3;
    if (lower.includes('crear') || lower.includes('proyecto')) conceptScores['Creatividad'] += 3;
    if (lower.includes('viajar') || lower.includes('experiencias') || lower.includes('diversión')) conceptScores['Nuevas experiencias'] += 3;
    if (lower.includes('contribuir')) conceptScores['Contribución'] += 3;
    if (lower.includes('participar')) conceptScores['Participación'] += 3;
    if (lower.includes('descansar') || lower.includes('naturaleza') || lower.includes('cuidarme')) conceptScores['Descanso'] += 3;
    if (lower.includes('autonomía')) conceptScores['Autonomía'] += 3;
  });

  if (responses.purposePresent?.includes('presente') || responses.purposeFuture?.includes('fortalecer')) {
    conceptScores['Propósito'] += 2;
  }
  if (responses.socialWants?.some(w => w.includes('Conocer') || w.includes('amistades'))) {
    conceptScores['Conexión'] += 2;
  }
  if (responses.socialWants?.some(w => w.includes('familia'))) {
    conceptScores['Familia'] += 2;
  }
  if (responses.participationWays && responses.participationWays.length > 0) {
    if (responses.participationWays.some(w => w.includes('Voluntariado') || w.includes('Ayudar'))) conceptScores['Contribución'] += 2;
    if (responses.participationWays.some(w => w.includes('comunidad') || w.includes('Mentoría'))) conceptScores['Participación'] += 2;
  }
  if (responses.projectsWants?.some(w => w.includes('Aprender') || w.includes('estudiar'))) {
    conceptScores['Aprendizaje'] += 2;
  }
  if (responses.projectsWants?.some(w => w.includes('Crear') || w.includes('Emprender'))) {
    conceptScores['Creatividad'] += 2;
  }
  if (responses.projectsWants?.some(w => w.includes('Viajar'))) {
    conceptScores['Nuevas experiencias'] += 2;
  }
  if (trimmedToKeep.some(k => k.toLowerCase().includes('independencia') || k.toLowerCase().includes('autonomía'))) {
    conceptScores['Autonomía'] += 2;
  }

  // Sort and pick top 4 concepts with score > 0
  const sortedConcepts = Object.entries(conceptScores)
    .filter(([_, score]) => score > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([name]) => name);

  let importantThemes = sortedConcepts.slice(0, 4);
  if (importantThemes.length < 3) {
    const defaults = ['Autonomía', 'Propósito', 'Conexión', 'Aprendizaje'];
    defaults.forEach((d) => {
      if (!importantThemes.includes(d) && importantThemes.length < 4) {
        importantThemes.push(d);
      }
    });
  }

  // 5. FRASE PERSONALIZADA (Deterministic, respectful, tentative language)
  const hasAutonomy = importantThemes.includes('Autonomía') || trimmedToKeep.some(k => k.toLowerCase().includes('independencia'));
  const hasConnection = importantThemes.includes('Conexión') || finalGiveSpaceTo.some(p => p.toLowerCase().includes('amistad'));
  const hasFamily = importantThemes.includes('Familia') || finalGiveSpaceTo.some(p => p.toLowerCase().includes('familia'));
  const hasLearning = importantThemes.includes('Aprendizaje') || finalGiveSpaceTo.some(p => p.toLowerCase().includes('aprender'));
  const hasExperiences = importantThemes.includes('Nuevas experiencias') || finalGiveSpaceTo.some(p => p.toLowerCase().includes('viajar'));
  const hasProjects = importantThemes.includes('Creatividad') || finalGiveSpaceTo.some(p => p.toLowerCase().includes('crear') || p.toLowerCase().includes('proyecto'));
  const hasPurpose = importantThemes.includes('Propósito') || finalGiveSpaceTo.some(p => p.toLowerCase().includes('propósito'));
  const hasRest = importantThemes.includes('Descanso') || finalGiveSpaceTo.some(p => p.toLowerCase().includes('descansar'));
  const hasPrep = trimmedToPrepare.length > 0 && !responses.futurePrepTopics?.includes('Todavía no he pensado mucho en esto');

  let personalPhrase = 'En este momento parece importante para ti cuidar lo que te hace bien hoy y, al mismo tiempo, abrir espacio con calma para lo que quieres construir.';

  if (hasAutonomy && (hasConnection || hasFamily) && hasProjects) {
    personalPhrase = 'En este momento parece importante para ti conservar tu autonomía mientras abres espacio para nuevos vínculos y proyectos.';
  } else if (hasLearning && hasExperiences) {
    personalPhrase = 'Tu mapa muestra hoy un interés especial por seguir aprendiendo y abrir espacio para nuevas experiencias.';
  } else if (hasFamily && hasPurpose) {
    personalPhrase = 'Tus vínculos cercanos parecen ocupar un lugar importante, junto con el deseo de seguir construyendo experiencias con sentido.';
  } else if (hasRest && (hasAutonomy || hasPurpose)) {
    personalPhrase = 'Hoy parece prioritario encontrar un equilibrio propio: cuidar tus tiempos de descanso y conservar aquello que le da serenidad y sentido a tus días.';
  } else if (hasPrep && trimmedToKeep.length >= 2) {
    personalPhrase = 'Parece que hoy quieres cuidar lo que ya has construido y, al mismo tiempo, comenzar a pensar con mayor intención en lo que viene.';
  } else if (hasLearning && (hasPurpose || hasProjects)) {
    personalPhrase = 'En este momento parece que te entusiasma poner tu curiosidad en movimiento, combinando nuevos aprendizajes con proyectos personales.';
  } else if (hasConnection && hasPurpose) {
    personalPhrase = 'Tus relaciones y el sentido de tus actividades cotidianas parecen marcar el rumbo de lo que hoy quieres fortalecer.';
  }

  return {
    dateFormatted,
    toKeep: trimmedToKeep,
    giveSpaceTo: finalGiveSpaceTo,
    toPrepare: trimmedToPrepare,
    importantThemes,
    personalPhrase,
  };
}

export function generateActivations(responses: LongevityResponses, map: LongevityMap): ActivationItem[] {
  const activationsPool: Record<string, { category: string; actionText: string }> = {
    amistades: {
      category: 'Amistades / Conexión',
      actionText: 'Explora durante este mes una actividad o espacio donde puedas conocer personas con intereses similares.',
    },
    proyectos: {
      category: 'Crear / Proyectos',
      actionText: 'Elige una idea que llevas tiempo postergando y dedica 30 minutos esta semana a escribir cuál podría ser su primer paso.',
    },
    aprender: {
      category: 'Aprendizaje',
      actionText: 'Escoge algo que te genere curiosidad y busca una primera experiencia para probarlo antes de comprometerte a largo plazo.',
    },
    contribuir: {
      category: 'Participación / Contribuir',
      actionText: 'Explora una oportunidad de voluntariado, mentoría o participación donde puedas compartir algo que sabes o te importa.',
    },
    proposito: {
      category: 'Propósito',
      actionText: 'Reserva un momento para identificar tres experiencias de tu vida en las que hayas sentido que lo que hacías tenía sentido para ti.',
    },
    jubilacion: {
      category: 'Próxima etapa',
      actionText: 'Imagina cómo te gustaría que fuera un día común de tu vida cuando el trabajo ya no organice tu rutina.',
    },
    autonomia: {
      category: 'Vivienda / Autonomía',
      actionText: 'Haz una lista de las cosas de tu forma de vivir actual que te gustaría conservar aunque tus necesidades cambien en el futuro.',
    },
    legado: {
      category: 'Legado / Memoria',
      actionText: 'Piensa en una historia, aprendizaje o mensaje que te gustaría que alguien importante para ti conociera.',
    },
    descanso: {
      category: 'Descanso y Bienestar',
      actionText: 'Piensa qué significaría para ti tener más espacio para descansar sin sentir que debes llenarlo inmediatamente con nuevas obligaciones.',
    },
    familia: {
      category: 'Familia',
      actionText: 'Elige un momento durante las próximas semanas para compartir con alguien cercano algo que te gustaría vivir o construir en los próximos años.',
    },
  };

  const selectedKeys: string[] = [];

  // Match priorities first
  const prioritiesLower = (map.giveSpaceTo || []).map(p => p.toLowerCase());
  const prepLower = (map.toPrepare || []).map(p => p.toLowerCase());

  // Check priorities
  if (prioritiesLower.some(p => p.includes('amistad') || p.includes('social') || p.includes('conocer'))) {
    selectedKeys.push('amistades');
  }
  if (prioritiesLower.some(p => p.includes('familia'))) {
    selectedKeys.push('familia');
  }
  if (prioritiesLower.some(p => p.includes('crear') || p.includes('emprender') || p.includes('proyecto'))) {
    selectedKeys.push('proyectos');
  }
  if (prioritiesLower.some(p => p.includes('aprender'))) {
    selectedKeys.push('aprender');
  }
  if (prioritiesLower.some(p => p.includes('contribuir') || p.includes('participar'))) {
    selectedKeys.push('contribuir');
  }
  if (prioritiesLower.some(p => p.includes('propósito'))) {
    selectedKeys.push('proposito');
  }
  if (prioritiesLower.some(p => p.includes('descansar') || p.includes('naturaleza') || p.includes('cuidarme'))) {
    selectedKeys.push('descanso');
  }
  if (prioritiesLower.some(p => p.includes('legado'))) {
    selectedKeys.push('legado');
  }
  if (prioritiesLower.some(p => p.includes('autonomía'))) {
    selectedKeys.push('autonomia');
  }

  // Check future prep topics
  if (prepLower.some(p => p.includes('jubilación') || p.includes('tiempo'))) {
    selectedKeys.push('jubilacion');
  }
  if (prepLower.some(p => p.includes('dónde quiero vivir') || p.includes('apoyo'))) {
    selectedKeys.push('autonomia');
  }
  if (prepLower.some(p => p.includes('transmitir') || p.includes('dejar'))) {
    selectedKeys.push('legado');
  }

  // Fallbacks if not enough unique keys
  const defaultKeys = ['aprender', 'proposito', 'amistades', 'proyectos', 'descanso', 'autonomia'];
  for (const k of defaultKeys) {
    if (!selectedKeys.includes(k)) {
      selectedKeys.push(k);
    }
  }

  // Return at most 3 distinct activations
  const distinctKeys = Array.from(new Set(selectedKeys)).slice(0, 3);

  return distinctKeys.map((k) => ({
    id: k,
    category: activationsPool[k].category,
    actionText: activationsPool[k].actionText,
  }));
}
