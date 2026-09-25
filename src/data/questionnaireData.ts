export interface StepMeta {
  number: number;
  total: number;
  title: string;
  subtitle: string;
  accentBg: string;
  accentBorder: string;
  accentText: string;
  accentChip: string;
}

export const STEP_METADATA: Record<number, StepMeta> = {
  1: {
    number: 1,
    total: 8,
    title: 'Este mapa comienza contigo.',
    subtitle: 'No queremos decirte cómo deberías vivir, envejecer o planificar tu futuro. Queremos ayudarte a detenerte un momento y pensar en lo que hoy te importa y en aquello que quieres construir.',
    accentBg: '#FAF7F2',
    accentBorder: '#879B83',
    accentText: '#4F6757',
    accentChip: '#E3ECE1',
  },
  2: {
    number: 2,
    total: 8,
    title: 'Lo que le da sentido a mis días',
    subtitle: 'No tiene que ser una gran misión. El propósito también puede estar en las personas, actividades y pequeños proyectos que hacen que quieras comenzar un nuevo día.',
    accentBg: '#FDF5F1',
    accentBorder: '#E8B89F',
    accentText: '#C97863',
    accentChip: '#F6D9CB',
  },
  3: {
    number: 3,
    total: 8,
    title: 'Las personas con quienes comparto mi vida',
    subtitle: 'Los vínculos pueden cambiar con los años. Algunas personas permanecen, otras se alejan y también pueden aparecer relaciones nuevas.',
    accentBg: '#EEF6FB',
    accentBorder: '#B6D6EB',
    accentText: '#1D4F73',
    accentChip: '#D4E8F4',
  },
  4: {
    number: 4,
    total: 8,
    title: 'Sentir que tengo un lugar',
    subtitle: 'Participar no significa estar ocupado todo el tiempo. También puede ser compartir una experiencia, ayudar a alguien, pertenecer a una comunidad o aportar desde lo que sabes.',
    accentBg: '#F2F6F1',
    accentBorder: '#879B83',
    accentText: '#4F6757',
    accentChip: '#DFEBDE',
  },
  5: {
    number: 5,
    total: 8,
    title: 'Lo que todavía quiero descubrir',
    subtitle: 'Cumplir años no significa dejar de comenzar cosas.',
    accentBg: '#FCF9ED',
    accentBorder: '#E7D58B',
    accentText: '#7A6615',
    accentChip: '#F6EFD0',
  },
  6: {
    number: 6,
    total: 8,
    title: 'La vida cotidiana que quiero conservar',
    subtitle: 'También construimos nuestra longevidad pensando cómo queremos vivir, dónde queremos estar y qué cosas son importantes para sentir que nuestra vida sigue siendo nuestra.',
    accentBg: '#F2F6F1',
    accentBorder: '#879B83',
    accentText: '#4F6757',
    accentChip: '#DFEBDE',
  },
  7: {
    number: 7,
    total: 8,
    title: 'Pensar el futuro también es una forma de cuidarnos',
    subtitle: 'No podemos prever todo lo que ocurrirá, pero podemos conversar y tomar algunas decisiones antes de necesitarlas.',
    accentBg: '#EEF6FB',
    accentBorder: '#B6D6EB',
    accentText: '#1D4F73',
    accentChip: '#D4E8F4',
  },
  8: {
    number: 8,
    total: 8,
    title: 'Ahora mira hacia adelante',
    subtitle: 'Si pudieras darle más espacio a algunas cosas durante los próximos años, ¿cuáles elegirías?',
    accentBg: '#FDF5F1',
    accentBorder: '#E8B89F',
    accentText: '#C97863',
    accentChip: '#F6D9CB',
  },
};

export const AGE_STAGES = [
  '40–49',
  '50–59',
  '60–69',
  '70–79',
  '80+',
  'Prefiero no responder',
];

export const PURPOSE_OPTIONS = [
  'Esto está presente en mi vida',
  'Quiero fortalecerlo',
  'Quiero que algo cambie',
  'Nunca me lo había preguntado',
];

export const SOCIAL_PRESENCE_OPTIONS = [
  'Quiero conservar esto',
  'Quiero fortalecer mis vínculos',
  'Quiero conocer nuevas personas',
  'Me gustaría sentirme menos sola/o',
  'Prefiero no responder',
];

export const SOCIAL_WANTS_OPTIONS = [
  'Conocer personas',
  'Ver más a mis amistades',
  'Compartir más con mi familia',
  'Conocer personas de otras generaciones',
  'Encontrar personas con mis intereses',
  'Tener alguien con quien conversar',
  'Estoy bien como estoy',
];

export const PARTICIPATION_PRESENCE_OPTIONS = [
  'Sí, quiero conservarlos',
  'Me gustaría participar más',
  'Quiero encontrar algo nuevo',
  'No sé dónde podría participar',
  'No me interesa por ahora',
];

export const PARTICIPATION_WAYS_OPTIONS = [
  'Voluntariado',
  'Mentoría',
  'Enseñar algo',
  'Participar en mi comunidad',
  'Ayudar a otras personas',
  'Emprender o crear un proyecto',
  'No lo sé todavía',
];

export const PROJECTS_WANTS_OPTIONS = [
  'Aprender algo nuevo',
  'Viajar',
  'Crear algo',
  'Volver a estudiar',
  'Emprender',
  'Retomar un hobby',
  'Hacer actividad física o deportiva',
  'Aprender tecnología',
  'Otro',
  'Todavía no lo sé',
];

export const PROJECTS_OBSTACLES_OPTIONS = [
  'Las estoy haciendo',
  'Tengo ganas, pero las postergo',
  'No sé por dónde empezar',
  'Me faltan personas con quienes hacerlo',
  'Siento que no tengo oportunidades',
];

export const AUTONOMY_LIFESTYLE_OPTIONS = [
  'Sí, bastante',
  'Hay cosas que quiero cambiar',
  'Empiezo a necesitar más apoyo',
  'Nunca lo había pensado',
];

export const AUTONOMY_KEEP_OPTIONS = [
  'Mi independencia',
  'Mi casa o barrio',
  'Mis rutinas',
  'Vivir cerca de mi familia',
  'Mis mascotas',
  'Mis actividades',
  'Mi privacidad',
  'Mi vida social',
  'Otro',
];

export const FUTURE_TOPICS_OPTIONS = [
  'La jubilación',
  'Cómo quiero ocupar mi tiempo',
  'Dónde quiero vivir',
  'Mi situación económica',
  'Qué apoyos quisiera recibir si algún día los necesito',
  'Qué cosas quisiera que mi familia supiera',
  'Qué quiero hacer durante los próximos años',
  'Qué quiero dejar o transmitir',
  'Todavía no he pensado mucho en esto',
];

export const FUTURE_FEELINGS_OPTIONS = [
  'Entusiasmo',
  'Curiosidad',
  'Tranquilidad',
  'Incertidumbre',
  'Preocupación',
  'Una mezcla de varias',
];

export const PRIORITIES_OPTIONS = [
  'Amistades',
  'Familia',
  'Propósito',
  'Aprender',
  'Crear',
  'Viajar',
  'Contribuir',
  'Cuidarme',
  'Emprender',
  'Participar',
  'Descansar',
  'Naturaleza',
  'Espiritualidad',
  'Amor o pareja',
  'Autonomía',
  'Nuevas experiencias',
  'Legado',
  'Diversión',
  'Un proyecto propio',
  'Algo que no aparece aquí',
];

export const ECOSYSTEM_PRODUCTS = [
  {
    id: 'gerusia',
    name: 'GERUSIA',
    title: 'Propósito, trayectoria y legado',
    description: 'Para quienes quieren comprender lo vivido, reconectar con lo que les da sentido y proyectar lo que viene.',
    cta: 'Conocer Gerusia',
    accentColor: '#4F6757',
    bg: '#F2F6F1',
    border: '#879B83',
    badge: 'Próximamente',
  },
  {
    id: 'not-viejo',
    name: 'NOT VIEJO',
    title: 'Diseña tu próxima etapa',
    description: 'Para quienes quieren pensar cómo vivir los próximos años más allá de los caminos tradicionales de trabajo y jubilación.',
    cta: 'Conocer Not Viejo',
    accentColor: '#C97863',
    bg: '#FDF5F1',
    border: '#E8B89F',
    badge: 'Próximamente',
  },
  {
    id: 'como-en-su-casa',
    name: 'COMO EN SU CASA',
    title: 'Vivienda, apoyos y cuidados',
    description: 'Para quienes empiezan a preguntarse cómo y dónde quieren vivir, o están acompañando esas decisiones en alguien cercano.',
    cta: 'Conocer Como en su Casa',
    accentColor: '#7A6615',
    bg: '#FCF9ED',
    border: '#E7D58B',
    badge: 'Próximamente',
  },
  {
    id: 'explorar-oportunidades',
    name: 'EXPLORAR OPORTUNIDADES',
    title: 'Actividades, aprendizaje y comunidad',
    description: 'Actividades, aprendizaje, proyectos, participación y comunidad.',
    cta: 'Explorar',
    accentColor: '#1D4F73',
    bg: '#EEF6FB',
    border: '#B6D6EB',
    badge: 'Próximamente',
  },
];
