export interface ReglamentoEvaluationQuestion {
  id: string;
  sectionId: 'principios_definiciones' | 'derechos' | 'deberes' | 'prohibiciones' | 'medidas_debido_proceso';
  sectionTitle: string;
  questionNumberInSection: number; // 1 to 5
  question: string;
  options: string[];
  correctIndex: number;
  articleReference: string;
  positiveReinforcement: {
    title: string;
    message: string;
    normDetail: string;
  };
  correctiveReinforcement: {
    title: string;
    whyWrong: string;
    correctNorm: string;
    keyLearning: string;
  };
}

export interface EvaluationSectionMeta {
  id: 'principios_definiciones' | 'derechos' | 'deberes' | 'prohibiciones' | 'medidas_debido_proceso';
  title: string;
  shortTitle: string;
  articlesRange: string;
  iconName: string;
  color: string;
}

export const REGLAMENTO_SECTIONS_META: EvaluationSectionMeta[] = [
  {
    id: 'principios_definiciones',
    title: 'Capítulo I: Principios Orientadores y Definiciones',
    shortTitle: '01. Principios y Definiciones',
    articlesRange: 'Artículos 1 al 4',
    iconName: 'Compass',
    color: '#00e5ff',
  },
  {
    id: 'derechos',
    title: 'Capítulo II: Derechos del Aprendiz SENA',
    shortTitle: '02. 24 Derechos del Aprendiz',
    articlesRange: 'Artículo 5',
    iconName: 'Award',
    color: '#39A900',
  },
  {
    id: 'deberes',
    title: 'Capítulo III: Deberes del Aprendiz SENA',
    shortTitle: '03. 24 Deberes del Aprendiz',
    articlesRange: 'Artículo 8',
    iconName: 'ShieldCheck',
    color: '#38bdf8',
  },
  {
    id: 'prohibiciones',
    title: 'Capítulo IV: Prohibiciones y Faltas Disciplinarias',
    shortTitle: '04. Prohibiciones y Faltas',
    articlesRange: 'Artículos 9, 10 y 11',
    iconName: 'ShieldAlert',
    color: '#f59e0b',
  },
  {
    id: 'medidas_debido_proceso',
    title: 'Capítulo V: Medidas Formativas, Trámites y Debido Proceso',
    shortTitle: '05. Medidas y Debido Proceso',
    articlesRange: 'Artículos 22 al 35',
    iconName: 'Scale',
    color: '#a855f7',
  },
];

export const REGLAMENTO_UNIFIED_QUESTIONS: ReglamentoEvaluationQuestion[] = [
  // ==========================================
  // SECCIÓN 1: PRINCIPIOS Y DEFINICIONES (5 Preguntas)
  // ==========================================
  {
    id: 'sec1-q1',
    sectionId: 'principios_definiciones',
    sectionTitle: 'Sección 1: Principios y Definiciones',
    questionNumberInSection: 1,
    question: 'Según el Artículo 1 del Acuerdo 0009 de 2024, ¿cómo se define la Formación Profesional Integral (FPI) en el SENA?',
    options: [
      'Un proceso educativo teórico-práctico orientado al desarrollo de conocimientos técnicos, tecnológicos, humanistas y de actitudes, valores y habilidades socioemocionales.',
      'Un curso exclusivamente virtual enfocado únicamente en la memorización de leyes colombianas.',
      'Un examen de ingreso estandarizado para calificar la velocidad dactilográfica de los aspirantes.',
      'Un programa asistencial de empleo directo sin componente pedagógico ni ético.'
    ],
    correctIndex: 0,
    articleReference: 'Artículo 1, Definición 1 - Acuerdo 0009 de 2024',
    positiveReinforcement: {
      title: '¡Excelente apropiación pedagógica!',
      message: 'Comprendes con claridad la esencia de la FPI: articulación armónica entre la técnica, la ciencia, el humanismo y las habilidades socioemocionales.',
      normDetail: 'El Artículo 1 establece que la FPI integra de manera indivisible el Saber, el Saber Hacer y el Saber Ser para la vida productiva y social.'
    },
    correctiveReinforcement: {
      title: '¡Ojo al dato formativo!',
      whyWrong: 'El SENA no imparte educación puramente teórica ni memorística, ni es una agencia sin formación.',
      correctNorm: 'La FPI es un proceso teórico-práctico integral que abarca lo técnico, tecnológico, humanista, axiológico y socioemocional.',
      keyLearning: 'Recuerda que en el SENA no solo aprendemos un oficio, sino que nos formamos como ciudadanos íntegros para transformar a Colombia.'
    }
  },
  {
    id: 'sec1-q2',
    sectionId: 'principios_definiciones',
    sectionTitle: 'Sección 1: Principios y Definiciones',
    questionNumberInSection: 2,
    question: '¿Quiénes integran la "Comunidad Educativa SENA" de acuerdo con las definiciones del nuevo reglamento?',
    options: [
      'Únicamente los instructores contratados a término indefinido.',
      'Aprendices, instructores, personal administrativo, directivos, familias, egresados, empresarios y sectores sociales y poblacionales diversos.',
      'Exclusivamente los aprendices matriculados en programas presenciales diurnos.',
      'Solamente los miembros del Consejo Directivo Nacional en Bogotá.'
    ],
    correctIndex: 1,
    articleReference: 'Artículo 1, Definición 2 - Acuerdo 0009 de 2024',
    positiveReinforcement: {
      title: '¡Correcto! Visión comunitaria incluyente',
      message: 'Identificas que el SENA es un ecosistema tripartito y social abierto donde todos los actores colaboran activamente.',
      normDetail: 'El nuevo reglamento reconoce explícitamente a las familias, egresados y empresarios como parte viva de la comunidad educativa institucional.'
    },
    correctiveReinforcement: {
      title: '¡Refuerzo clave sobre la Comunidad SENA!',
      whyWrong: 'Limitar la comunidad educativa a solo instructores o aprendices desconoce la riqueza del modelo tripartito.',
      correctNorm: 'La comunidad comprende aprendices, instructores, administrativos, directivos, familias, egresados, empresarios y sectores sociales diversos.',
      keyLearning: 'Tu formación cuenta con el respaldo articulado de la academia, el sector productivo y el núcleo familiar.'
    }
  },
  {
    id: 'sec1-q3',
    sectionId: 'principios_definiciones',
    sectionTitle: 'Sección 1: Principios y Definiciones',
    questionNumberInSection: 3,
    question: 'El Artículo 3 consagra los principios orientadores del reglamento. ¿Cuáles de los siguientes son principios rectores?',
    options: [
      'Autonomía, Dignidad, Inclusión, Enfoque diferencial, Enfoque territorial, Participación, Desarrollo sostenible y Solidaridad.',
      'Rentabilidad financiera individual, competencia desleal y secreto institucional.',
      'Privilegios por estrato socioeconómico, exclusividad de género y centralismo.',
      'Severidad punitiva sin derecho a réplica ni defensa.'
    ],
    correctIndex: 0,
    articleReference: 'Artículo 3 - Principios Orientadores del Acuerdo 0009 de 2024',
    positiveReinforcement: {
      title: '¡Respuesta impecable en valores!',
      message: 'Dominas los principios constitucionales que guían la convivencia armónica y el respeto a la diversidad en todos los Centros de Formación.',
      normDetail: 'El enfoque diferencial y territorial garantiza que cada aprendiz sea respetado en su identidad étnica, de género, discapacidad y contexto regional.'
    },
    correctiveReinforcement: {
      title: '¡Identifica los principios orientadores!',
      whyWrong: 'El SENA no promueve la competencia agresiva ni privilegios socioeconómicos.',
      correctNorm: 'Los 8 principios rectores son: Autonomía, Dignidad, Inclusión, Enfoque diferencial, Enfoque territorial, Participación, Desarrollo sostenible y Solidaridad.',
      keyLearning: 'Cualquier decisión disciplinaria o académica debe interpretarse siempre a la luz de estos principios humanistas.'
    }
  },
  {
    id: 'sec1-q4',
    sectionId: 'principios_definiciones',
    sectionTitle: 'Sección 1: Principios y Definiciones',
    questionNumberInSection: 4,
    question: 'Según el Artículo 2, ¿cuál es el alcance y ámbito de aplicación del Reglamento del Aprendiz SENA?',
    options: [
      'Aplica únicamente a los aprendices de formación técnica presencial en ciudades capitales.',
      'Aplica para el aspirante en el ingreso y para el aprendiz durante todo su proceso formativo y certificación, en todas las sedes, jornadas, niveles y modalidades.',
      'Aplica solo durante los primeros tres meses de la etapa lectiva.',
      'Aplica exclusivamente para quienes tengan contrato de aprendizaje remunerado.'
    ],
    correctIndex: 1,
    articleReference: 'Artículo 2 - Alcance del Acuerdo 0009 de 2024',
    positiveReinforcement: {
      title: '¡Exacto! Cobertura total y universal',
      message: 'El reglamento te cobija desde que eres aspirante hasta el momento solemne de tu certificación en cualquier rincón del país.',
      normDetail: 'El Artículo 2 no hace distinciones: cobija modalidades presenciales, virtuales, a distancia, jornadas diurnas, nocturnas, mixtas y fines de semana.'
    },
    correctiveReinforcement: {
      title: '¡Punto clave sobre el alcance!',
      whyWrong: 'El reglamento no se limita a un nivel o ciudad; su vigencia abarca toda la trayectoria formativa.',
      correctNorm: 'Rige desde la condición de aspirante hasta la certificación, en todas las sedes, niveles (operario, técnico, tecnólogo) y modalidades (virtual o presencial).',
      keyLearning: 'Tus derechos y deberes están plenamente vigentes tanto en la etapa lectiva como en la etapa productiva.'
    }
  },
  {
    id: 'sec1-q5',
    sectionId: 'principios_definiciones',
    sectionTitle: 'Sección 1: Principios y Definiciones',
    questionNumberInSection: 5,
    question: '¿Qué es un Centro de Convivencia según el Artículo 4 del Acuerdo 0009 de 2024?',
    options: [
      'Un calabozo de castigo para infractores disciplinarios.',
      'Una atención complementaria que brinda alojamiento y alimentación para aprendices seleccionados, regido por un manual de convivencia específico.',
      'Un restaurante comercial abierto al público en general con fines de lucro.',
      'Una oficina administrativa exclusiva para la Dirección General en Bogotá.'
    ],
    correctIndex: 1,
    articleReference: 'Artículo 4 - Centro de Convivencia (Acuerdo 0009 de 2024)',
    positiveReinforcement: {
      title: '¡Muy bien! Espacio de bienestar y equidad',
      message: 'Reconoces el Centro de Convivencia como un servicio social que cobija con hospedaje y alimentación a aprendices provenientes de zonas rurales o vulnerables.',
      normDetail: 'El manual específico de cada Centro de Convivencia armoniza con el reglamento general para garantizar respeto mutuo, seguridad y vida digna.'
    },
    correctiveReinforcement: {
      title: '¡Comprende el propósito del Centro de Convivencia!',
      whyWrong: 'No es un espacio de castigo ni un negocio privado con ánimo de lucro.',
      correctNorm: 'Es una atención complementaria de bienestar que ofrece albergue y comida a aprendices que lo requieren por distancia geográfica o vulnerabilidad.',
      keyLearning: 'Los internados y centros de convivencia del SENA son una oportunidad dorada para el desarrollo territorial.'
    }
  },

  // ==========================================
  // SECCIÓN 2: DERECHOS DEL APRENDIZ (5 Preguntas)
  // ==========================================
  {
    id: 'sec2-q1',
    sectionId: 'derechos',
    sectionTitle: 'Sección 2: Derechos del Aprendiz',
    questionNumberInSection: 1,
    question: 'Según el Artículo 5 (numerales 1 y 2), ¿cuáles son los derechos fundamentales formativos al iniciar en el SENA?',
    options: [
      'Recibir inducción integral y recibir formación profesional integral de calidad acorde con el diseño curricular del programa.',
      'Exigir que no se realicen evaluaciones de ningún tipo durante el año formativo.',
      'Recibir un subsidio económico sin necesidad de asistir a clases ni talleres.',
      'Elegir los horarios de los instructores a discreción personal.'
    ],
    correctIndex: 0,
    articleReference: 'Artículo 5, numerales 1 y 2 - Derechos del Aprendiz (Acuerdo 0009 de 2024)',
    positiveReinforcement: {
      title: '¡Correcto! Fundamento del derecho a la educación',
      message: 'La inducción integral es tu puerta de entrada garantizada para apropiar la filosofía, normas y oportunidades del SENA.',
      normDetail: 'El SENA está obligado por mandato legal a proveerte ambientes de aprendizaje dotados, instructores calificados y pedagogía por competencias.'
    },
    correctiveReinforcement: {
      title: '¡Refuerza tus derechos de inicio!',
      whyWrong: 'El derecho a la formación de calidad incluye procesos de evaluación constante; no implica exoneración de responsabilidades académicas.',
      correctNorm: 'Tienes derecho a recibir inducción integral y formación profesional integral de alta calidad desde tu primer día de matrícula.',
      keyLearning: 'La inducción que estás cursando en esta plataforma es el cumplimiento directo de este derecho consagrado.'
    }
  },
  {
    id: 'sec2-q2',
    sectionId: 'derechos',
    sectionTitle: 'Sección 2: Derechos del Aprendiz',
    questionNumberInSection: 2,
    question: '¿Qué garantía especial introduce el Acuerdo 0009 de 2024 (Art. 5, Num. 8) para aprendices con discapacidad?',
    options: [
      'Ser exonerados de aprender las competencias técnicas requeridas.',
      'Ser reconocido y apoyado como persona con discapacidad con ajustes razonables en infraestructura, materiales y métodos evaluativos.',
      'Ser separados en aulas aisladas lejos del resto de compañeros.',
      'Tener que pagar un costo adicional por adaptación de software o rampas.'
    ],
    correctIndex: 1,
    articleReference: 'Artículo 5, numeral 8 (Ley 361 de 1997 e inclusión) - Acuerdo 0009 de 2024',
    positiveReinforcement: {
      title: '¡Excelente! Enfoque de inclusión sin barreras',
      message: 'Comprendes el concepto de "ajuste razonable": adaptar los recursos pedagógicos para garantizar equidad sin menoscabar el aprendizaje.',
      normDetail: 'El SENA garantiza intérpretes de lengua de señas (LSC), material braille, lectores de pantalla y adaptaciones curriculares personalizadas.'
    },
    correctiveReinforcement: {
      title: '¡Identifica la garantía de inclusión!',
      whyWrong: 'La inclusión nunca aísla ni cobra tarifas; tampoco regala títulos sin adquisición de competencias.',
      correctNorm: 'Garantiza ajustes razonables (físicos, técnicos y pedagógicos) para que la persona con discapacidad aprenda en igualdad de condiciones.',
      keyLearning: 'En el SENA la diversidad es una fortaleza que enriquece a toda la comunidad.'
    }
  },
  {
    id: 'sec2-q3',
    sectionId: 'derechos',
    sectionTitle: 'Sección 2: Derechos del Aprendiz',
    questionNumberInSection: 3,
    question: 'En concordancia con la Ley 2394 de 2024, ¿qué protección otorga el nuevo reglamento a personas gestantes y en lactancia?',
    options: [
      'La pérdida automática del cupo para evitar riesgos de salud.',
      'Garantía de permisos justificados, flexibilidad académica, descanso de lactancia y no discriminación ni sanción por su condición biológica o de cuidado.',
      'Obligación de renunciar a la etapa productiva.',
      'Sanción por inasistencia si acude a controles prenatales médicos.'
    ],
    correctIndex: 1,
    articleReference: 'Considerandos y Art. 5, Num. 9 y 22 (Ley 2394 de 2024) - Acuerdo 0009 de 2024',
    positiveReinforcement: {
      title: '¡Muy bien! Protección a la maternidad y paternidad',
      message: 'El nuevo Acuerdo 0009 de 2024 es pionero en alinear la formación técnica con la protección legal integral a la maternidad y licencias de paternidad.',
      normDetail: 'Los controles médicos prenatales, licencias y períodos de lactancia constituyen inasistencias plenamente justificadas por mandato legal.'
    },
    correctiveReinforcement: {
      title: '¡Conoce esta protección legal histórica!',
      whyWrong: 'Nunca se cancela la matrícula por embarazo ni se imponen sanciones por citas médicas de maternidad.',
      correctNorm: 'La Ley 2394 de 2024 y el Acuerdo 0009 brindan acompañamiento, justificación de ausencias, adaptación de entregas y lactarios dignos.',
      keyLearning: 'La maternidad y paternidad son derechos protegidos que no riñen con el sueño de graduarse en el SENA.'
    }
  },
  {
    id: 'sec2-q4',
    sectionId: 'derechos',
    sectionTitle: 'Sección 2: Derechos del Aprendiz',
    questionNumberInSection: 4,
    question: 'Respecto a la evaluación y retroalimentación (Art. 5, Num. 15 y 16), ¿cuál es el plazo para que el instructor publique resultados?',
    options: [
      'Seis meses después de finalizado el trimestre.',
      'Conocer los resultados y retroalimentación dentro de los ocho (8) días hábiles siguientes a la entrega, con derecho a solicitar revisión ante desacuerdo.',
      'El instructor no tiene ninguna obligación de informar notas.',
      'Solo al día de la ceremonia de grado institucional.'
    ],
    correctIndex: 1,
    articleReference: 'Artículo 5, numerales 15 y 16 - Acuerdo 0009 de 2024',
    positiveReinforcement: {
      title: '¡Correcto! Garantía del Debido Proceso Académico',
      message: 'Tienes derecho a recibir retroalimentación oportuna en 8 días hábiles para saber exactamente en qué acertaste y cómo mejorar.',
      normDetail: 'Si estás en desacuerdo fundamentado con un juicio de evaluación, puedes solicitar formalmente la designación de un segundo evaluador idóneo.'
    },
    correctiveReinforcement: {
      title: '¡Ten muy presente este término legal!',
      whyWrong: 'Los instructores no pueden tardar meses en evaluar sin retroalimentación.',
      correctNorm: 'El término obligatorio es de ocho (8) días hábiles para registrar el juicio y brindar retroalimentación constructiva al aprendiz.',
      keyLearning: 'Conocer tus resultados a tiempo te permite presentar planes de mejoramiento pedagógico con tranquilidad.'
    }
  },
  {
    id: 'sec2-q5',
    sectionId: 'derechos',
    sectionTitle: 'Sección 2: Derechos del Aprendiz',
    questionNumberInSection: 5,
    question: 'Bajo la Ley 2365 de 2024 y el Artículo 5 Num. 13, ¿qué ruta de protección tiene el aprendiz ante vulneración de derechos o acoso?',
    options: [
      'Debe guardar silencio para evitar problemas en el Centro.',
      'Recibir asesoría inmediata, activación de rutas de atención y protección institucional ante cualquier forma de acoso sexual o violencia de género, sin revictimización.',
      'Tener que pagar un abogado externo para que la institución le preste atención.',
      'Ser suspendido automáticamente mientras se investiga el hecho.'
    ],
    correctIndex: 1,
    articleReference: 'Artículo 5, numeral 13 (Ley 2365 de 2024) - Acuerdo 0009 de 2024',
    positiveReinforcement: {
      title: '¡Cero tolerancia a la violencia!',
      message: 'Dominas la ruta de género y convivencia: el SENA cuenta con protocolos rigurosos de atención psicosocial, jurídica y de protección inmediata.',
      normDetail: 'Cualquier queja por acoso activa protocolos prioritarios de bienestar y talento humano con reserva estricta y protección a la víctima.'
    },
    correctiveReinforcement: {
      title: '¡Información vital para tu seguridad!',
      whyWrong: 'El silencio nunca es la respuesta institucional y jamás se revictimiza o suspende a quien denuncia.',
      correctNorm: 'El SENA activa de inmediato rutas de protección, apoyo psicológico y medidas preventivas frente a cualquier conducta de acoso sexual o laboral.',
      keyLearning: 'Los ambientes de aprendizaje del SENA son territorios seguros de paz, respeto y dignidad humana.'
    }
  },

  // ==========================================
  // SECCIÓN 3: DEBERES DEL APRENDIZ (5 Preguntas)
  // ==========================================
  {
    id: 'sec3-q1',
    sectionId: 'deberes',
    sectionTitle: 'Sección 3: Deberes del Aprendiz',
    questionNumberInSection: 1,
    question: 'Según el Artículo 8 (numerales 1 y 20), ¿cuál es el deber del aprendiz respecto al carné y la seguridad personal?',
    options: [
      'Portar siempre el carné institucional visible y utilizar los Elementos de Protección Personal (EPP) exigidos en ambientes de riesgo, laboratorios y talleres.',
      'Prestar el carné a personas ajenas al SENA para que ingresen a la sede.',
      'Ingresar a talleres de maquinaria pesada en sandalias y sin gafas de seguridad.',
      'Vender el carné al finalizar la etapa lectiva.'
    ],
    correctIndex: 0,
    articleReference: 'Artículo 8, numerales 1 y 20 - Acuerdo 0009 de 2024',
    positiveReinforcement: {
      title: '¡Excelente! Cultura del autocuidado y la seguridad',
      message: 'El carné te identifica como aprendiz de la institución más querida de Colombia y los EPP salvan tu vida en el taller productivo.',
      normDetail: 'El porte de EPP (casco, botas dieléctricas, monogafas, guantes) es de cumplimiento estricto y su omisión constituye falta grave por riesgo vital.'
    },
    correctiveReinforcement: {
      title: '¡La seguridad es tu primer deber!',
      whyWrong: 'El carné es personal e intransferible y jamás se puede ingresar a zonas de riesgo sin el equipo de protección normativo.',
      correctNorm: 'Debes portar el carné visible y usar obligatoriamente los EPP en laboratorios, talleres y ambientes con maquinaria.',
      keyLearning: 'En la industria colombiana, la disciplina de seguridad ocupacional (SST) es el rasgo distintivo de un egresado SENA de clase mundial.'
    }
  },
  {
    id: 'sec3-q2',
    sectionId: 'deberes',
    sectionTitle: 'Sección 3: Deberes del Aprendiz',
    questionNumberInSection: 2,
    question: '¿Cuál es el plazo reglamentario que tiene el aprendiz para presentar los soportes válidos de una inasistencia (Art. 8 Num. 7)?',
    options: [
      'El mismo día antes de las 8:00 a.m. sin excepción.',
      'Dentro de los cinco (5) días hábiles siguientes a la ocurrencia del hecho.',
      'Al terminar el año lectivo durante la semana de cierre.',
      'Treinta días calendario sin necesidad de certificado médico.'
    ],
    correctIndex: 1,
    articleReference: 'Artículo 8, numeral 7 - Justificación de Inasistencias (Acuerdo 0009 de 2024)',
    positiveReinforcement: {
      title: '¡Muy bien! Término procesal dominado',
      message: 'Tienes exactamente 5 días hábiles para radicar ante tu instructor o coordinación la incapacidad de la EPS o soporte de fuerza mayor.',
      normDetail: 'Presentar el soporte dentro de los 5 días hábiles evita que el sistema compute la falta para deserción y te habilita para presentar actividades extemporáneas.'
    },
    correctiveReinforcement: {
      title: '¡Cuidado con los tiempos de justificación!',
      whyWrong: 'Dejar pasar semanas sin justificar acumula fallas que pueden derivar en proceso de deserción irreversible.',
      correctNorm: 'El plazo máximo legal es de cinco (5) días hábiles contados a partir del momento en que cesó la causa de inasistencia.',
      keyLearning: 'Ante una calamidad o enfermedad, comunícate de inmediato con tu instructor o vocero y guarda tus soportes médicos de la EPS.'
    }
  },
  {
    id: 'sec3-q3',
    sectionId: 'deberes',
    sectionTitle: 'Sección 3: Deberes del Aprendiz',
    questionNumberInSection: 3,
    question: 'Respecto a la ética académica y derechos de autor (Art. 8 Num. 12), ¿cuál es el deber frente a tareas, proyectos e Inteligencia Artificial?',
    options: [
      'Copiar y pegar textos completos de internet haciéndolos pasar como propios.',
      'Respetar los derechos de autor, normas de citación (APA), declarar el uso ético de herramientas de IA y presentar evidencias fruto del esfuerzo propio.',
      'Pagar a un tercero para que elabore las evidencias de SofiaPlus.',
      'Usar IA para falsificar firmas de bitácoras de etapa productiva.'
    ],
    correctIndex: 1,
    articleReference: 'Artículo 8, numeral 12 - Honestidad Académica (Acuerdo 0009 de 2024)',
    positiveReinforcement: {
      title: '¡Honestidad e Integridad profesional!',
      message: 'La honestidad es el primer valor del SENA: las herramientas tecnológicas se aprovechan éticamente citando siempre las fuentes originales.',
      normDetail: 'El nuevo reglamento reconoce el uso formativo de la IA siempre que sea asistencial, transparente y con autoría responsable.'
    },
    correctiveReinforcement: {
      title: '¡Refuerzo clave sobre propiedad intelectual!',
      whyWrong: 'El plagio y la suplantación atentan contra el desarrollo de tus propias competencias y conllevan sanciones disciplinarias graves.',
      correctNorm: 'Debes citar rigurosamente las fuentes consultadas, respetar los derechos de autor y ser transparente en el uso de tecnologías asistidas.',
      keyLearning: 'Tu reputación profesional se construye desde el primer trabajo presentado en el aula.'
    }
  },
  {
    id: 'sec3-q4',
    sectionId: 'deberes',
    sectionTitle: 'Sección 3: Deberes del Aprendiz',
    questionNumberInSection: 4,
    question: '¿Qué deber le asiste al aprendiz en relación con los bienes, maquinaria e infraestructura del Centro (Art. 8 Num. 14)?',
    options: [
      'Cuidar, mantener en buen estado y hacer uso racional de los equipos, herramientas, software y materiales puestos a su disposición.',
      'Modificar las configuraciones de red de los equipos para bloquear a los instructores.',
      'Llevarse los materiales de soldadura o cables a la casa sin autorización.',
      'Rayar las mesas de dibujo técnico con grafitis personales.'
    ],
    correctIndex: 0,
    articleReference: 'Artículo 8, numeral 14 - Cuidado de Bienes Públicos (Acuerdo 0009 de 2024)',
    positiveReinforcement: {
      title: '¡Excelente! Sentido de pertenencia institucional',
      message: 'Los talleres del SENA son patrimonio de todos los colombianos; cuidarlos garantiza que nuevas generaciones sigan aprendiendo con tecnología de punta.',
      normDetail: 'El reporte oportuno de fallas o averías mecánicas demuestra madurez y previene accidentes laborales en el ambiente formativo.'
    },
    correctiveReinforcement: {
      title: '¡Los bienes del SENA son de todos los colombianos!',
      whyWrong: 'El deterioro intencional o el hurto de insumos constituyen faltas disciplinarias gravísimas y pueden tipificar delitos penales.',
      correctNorm: 'Es tu deber usar adecuadamente y preservar los simuladores, computadores, herramientas y materiales de formación.',
      keyLearning: 'Un buen aprendiz deja el ambiente de aprendizaje más limpio y ordenado de lo que lo encontró.'
    }
  },
  {
    id: 'sec3-q5',
    sectionId: 'deberes',
    sectionTitle: 'Sección 3: Deberes del Aprendiz',
    questionNumberInSection: 5,
    question: 'En cuanto al uniforme y presentación personal (Art. 8 Num. 20), ¿cuál es la regla fijada por el Consejo Directivo Nacional?',
    options: [
      'El Centro de Formación debe imponer una marca exclusiva de ropa que debe comprarse obligatoriamente.',
      'El aprendiz debe portar el uniforme con pulcritud según su especialidad, pero la falta de recursos para adquirirlo jamás le impedirá ingresar a clase (salvo los EPP de rigor).',
      'El aprendiz que no tenga zapatos de marca será expulsado del SENA de inmediato.',
      'No se permite el uso de vestimenta tradicional étnica bajo ninguna circunstancia.'
    ],
    correctIndex: 1,
    articleReference: 'Artículo 8, numeral 20 - Vestimenta y Equidad (Acuerdo 0009 de 2024)',
    positiveReinforcement: {
      title: '¡Respuesta justa y equitativa!',
      message: 'El nuevo reglamento prohíbe monopolios de uniformes: la dignidad y el derecho a la educación prevalecen sobre exigencias suntuarias de vestimenta.',
      normDetail: 'La norma enfatiza que lo innegociable en talleres de riesgo es el EPP, pero jamás se puede excluir a alguien por no tener el uniforme de diario.'
    },
    correctiveReinforcement: {
      title: '¡Conoce esta regla de equidad institucional!',
      whyWrong: 'Está terminantemente prohibido prohibir el ingreso por carencia de recursos para uniforme diario o monopolizar proveedores.',
      correctNorm: 'Se debe portar el uniforme institucional con decoro, pero su falta temporal por motivos económicos no puede impedir el derecho a estudiar.',
      keyLearning: 'La inclusión y la empatía son sellos inconfundibles de la familia SENA.'
    }
  },

  // ==========================================
  // SECCIÓN 4: PROHIBICIONES Y FALTAS (5 Preguntas)
  // ==========================================
  {
    id: 'sec4-q1',
    sectionId: 'prohibiciones',
    sectionTitle: 'Sección 4: Prohibiciones y Faltas',
    questionNumberInSection: 1,
    question: '¿Qué determina el Artículo 10 (numeral 1) sobre el ingreso de sustancias alcohólicas o psicoactivas a las sedes del SENA?',
    options: [
      'Está permitido su consumo si el aprendiz está en semana de receso.',
      'Constituye falta gravísima ingresar, portar, comercializar o consumir bebidas embriagantes o sustancias psicoactivas en sedes y ambientes de formación.',
      'Se permite si se hace en áreas verdes alejadas de los instructores.',
      'Solo se prohíbe si el aprendiz es menor de 16 años.'
    ],
    correctIndex: 1,
    articleReference: 'Artículo 10, numeral 1 - Prohibiciones (Acuerdo 0009 de 2024)',
    positiveReinforcement: {
      title: '¡Correcto! Ambientes seguros y libres de drogas',
      message: 'En ambientes técnicos con maquinaria industrial y electricidad, la sobriedad absoluta es un requisito innegociable de vida o muerte.',
      normDetail: 'Esta prohibición aplica en sedes físicas, internados, eventos pedagógicos institucionales, visitas empresariales y giras técnicas.'
    },
    correctiveReinforcement: {
      title: '¡Falta gravísima de seguridad!',
      whyWrong: 'El consumo de alcohol o drogas jamás está permitido en ningún espacio institucional ni horario.',
      correctNorm: 'Ingresar, comercializar o consumir alcohol o sustancias psicoactivas es una falta gravísima sujeta a sanción disciplinaria y cancelación de matrícula.',
      keyLearning: 'El SENA promueve estilos de vida saludables a través de sus programas de Bienestar al Aprendiz.'
    }
  },
  {
    id: 'sec4-q2',
    sectionId: 'prohibiciones',
    sectionTitle: 'Sección 4: Prohibiciones y Faltas',
    questionNumberInSection: 2,
    question: '¿Cómo califica el reglamento la suplantación de identidad en plataformas oficiales (SofiaPlus / Zajuna) o en evaluaciones?',
    options: [
      'Como un juego inocente entre compañeros de ficha.',
      'Como una falta académica y disciplinaria gravísima que vulnera la fe pública institucional y acarrea medidas disciplinarias severas.',
      'Como una práctica recomendada para ayudar a amigos ocupados.',
      'Como un trámite normal sin consecuencias.'
    ],
    correctIndex: 1,
    articleReference: 'Artículo 10, numerales 7 y 8 - Acuerdo 0009 de 2024',
    positiveReinforcement: {
      title: '¡Exacto! Fe pública e identidad digital',
      message: 'Las credenciales de acceso a SofiaPlus y Zajuna son personales e intransferibles; suplantar a otro aprendiz compromete la legalidad de los certificados del Estado.',
      normDetail: 'La suplantación puede dar lugar tanto a la cancelación de matrícula como a traslados ante las autoridades judiciales correspondientes.'
    },
    correctiveReinforcement: {
      title: '¡Refuerzo clave sobre identidad y fraude!',
      whyWrong: 'Hacer pruebas o firmar por otro no es "ayudar", es un fraude que anula el aprendizaje y viola la ley.',
      correctNorm: 'La suplantación de identidad en evaluaciones o plataformas es una falta gravísima contra la fe pública y el debido proceso.',
      keyLearning: 'Tu usuario y contraseña son tu firma digital como futuro tecnólogo o técnico de Colombia.'
    }
  },
  {
    id: 'sec4-q3',
    sectionId: 'prohibiciones',
    sectionTitle: 'Sección 4: Prohibiciones y Faltas',
    questionNumberInSection: 3,
    question: 'Bajo el Artículo 10 (numerales 4 y 15), ¿qué postura tiene el SENA frente al ciberacoso, intimidación o discriminación?',
    options: [
      'Se tolera si ocurre en grupos de WhatsApp creados por fuera del horario de clase.',
      'Queda terminantemente prohibido cualquier acto de acoso escolar (bullying), ciberacoso, discriminación por raza, género, credo o condición socioeconómica.',
      'Solo se atiende si hay agresiones físicas con lesiones certificadas.',
      'Se considera libertad de expresión sin límite alguno.'
    ],
    correctIndex: 1,
    articleReference: 'Artículo 10, numerales 4 y 15 - Convivencia y No Discriminación (Acuerdo 0009 de 2024)',
    positiveReinforcement: {
      title: '¡Cultura de paz y respeto mutuo!',
      message: 'Identificas con claridad que el ciberacoso en redes sociales y chats entre compañeros de ficha tiene consecuencias disciplinarias directas.',
      normDetail: 'El respeto a la dignidad ajena es la base de la convivencia: la burla, la difamación y el ciberbullying no tienen cabida en la familia SENA.'
    },
    correctiveReinforcement: {
      title: '¡Tolerancia cero a la discriminación y el acoso!',
      whyWrong: 'El ciberacoso en grupos de mensajería vinculados a la formación sí es competencia del Comité de Convivencia y acarrea sanciones.',
      correctNorm: 'Toda forma de agresión, burla, intimidación o discriminación está prohibida y calificada como falta contra la dignidad humana.',
      keyLearning: 'Construyamos redes de apoyo, solidaridad y camaradería entre compañeros.'
    }
  },
  {
    id: 'sec4-q4',
    sectionId: 'prohibiciones',
    sectionTitle: 'Sección 4: Prohibiciones y Faltas',
    questionNumberInSection: 4,
    question: '¿Qué dispone el reglamento sobre la comercialización de rifas, cobro de trámites o retención de bienes institucionales (Art. 10 Num. 12 y 16)?',
    options: [
      'Cualquier aprendiz puede cobrar dinero a sus compañeros por registrarlos en SofiaPlus.',
      'Está prohibido comercializar rifas, prestar dinero con usura o cobrar por trámites institucionales que son 100% gratuitos y públicos.',
      'Se permite cobrar peajes o cuotas para ingresar a la biblioteca del Centro.',
      'Los voceros de ficha están autorizados para vender certificados de estudio.'
    ],
    correctIndex: 1,
    articleReference: 'Artículo 10, numerales 12 y 16 - Gratuidad de los Servicios SENA (Acuerdo 0009 de 2024)',
    positiveReinforcement: {
      title: '¡Muy bien! Principio de gratuidad absoluta',
      message: 'Todos los servicios del SENA: matrículas, inducción, exámenes, certificados y trámites son TOTALMENTE GRATUITOS.',
      normDetail: 'Cobrar por trámites oficiales o realizar actividades lucrativas no autorizadas dentro de la sede constituye falta disciplinaria grave.'
    },
    correctiveReinforcement: {
      title: '¡El SENA es público y gratuito!',
      whyWrong: 'Ninguna persona puede cobrar por intermediar en matrículas, exámenes o expedición de certificados.',
      correctNorm: 'Todos los trámites del SENA son gratuitos; está prohibido cobrar por gestiones institucionales o realizar rifas no autorizadas.',
      keyLearning: 'La gratuidad del SENA es una conquista social que debemos defender con transparencia.'
    }
  },
  {
    id: 'sec4-q5',
    sectionId: 'prohibiciones',
    sectionTitle: 'Sección 4: Prohibiciones y Faltas',
    questionNumberInSection: 5,
    question: 'Respecto al porte de armas y elementos cortopunzantes en las sedes del SENA (Art. 10 Num. 2), ¿cuál es la prohibición?',
    options: [
      'Se prohíbe terminantemente ingresar o portar armas de fuego, cortopunzantes, artefactos explosivos o réplicas en cualquier sede o ambiente institucional.',
      'Se permite si el aprendiz tiene permiso verbal de sus compañeros.',
      'Solo se prohíbe durante los días de ceremonias de graduación.',
      'Está permitido si se guardan en el casillero personal de la biblioteca.'
    ],
    correctIndex: 0,
    articleReference: 'Artículo 10, numeral 2 - Seguridad Institucional (Acuerdo 0009 de 2024)',
    positiveReinforcement: {
      title: '¡Correcto! Territorio seguro para el aprendizaje',
      message: 'Las sedes del SENA son zonas de paz y convivencia: la presencia de armas atenta contra la tranquilidad y vida de toda la comunidad.',
      normDetail: 'Las herramientas propias del taller (como bisturís o formones en ebanistería) solo pueden usarse dentro del ambiente técnico pedagógico asignado.'
    },
    correctiveReinforcement: {
      title: '¡Norma estricta de seguridad física!',
      whyWrong: 'El porte de armas no está condicionado a permisos verbales; es una causal directa de expulsión y acción policial.',
      correctNorm: 'Queda estrictamente prohibido portar armas de fuego, armas blancas o artefactos peligrosos en todas las sedes del SENA.',
      keyLearning: 'La mejor herramienta que portamos los aprendices SENA es el conocimiento, el respeto y la pasión por aprender.'
    }
  },

  // ==========================================
  // SECCIÓN 5: MEDIDAS FORMATIVAS Y DEBIDO PROCESO (5 Preguntas)
  // ==========================================
  {
    id: 'sec5-q1',
    sectionId: 'medidas_debido_proceso',
    sectionTitle: 'Sección 5: Medidas Formativas y Debido Proceso',
    questionNumberInSection: 1,
    question: 'Según los Artículos 30 y 31, ¿cuándo se configura legalmente la causal de "Deserción del Aprendiz"?',
    options: [
      'Presencial: 3 días consecutivos o 5 discontinuos sin justificar; Virtual: 20 días continuos sin ingresar al LMS; A distancia: 3 encuentros presenciales sin justificar.',
      'Faltar a una sola clase de dos horas un día lunes festivo.',
      'Llegar 10 minutos tarde a una sesión virtual con problemas de conexión.',
      'Solicitar aplazamiento por motivos de viaje familiar con anticipación.'
    ],
    correctIndex: 0,
    articleReference: 'Artículos 30 y 31 - Deserción (Acuerdo 0009 de 2024)',
    positiveReinforcement: {
      title: '¡Dominio exacto de los umbrales de deserción!',
      message: 'Tienes claros los límites normativos que diferencian una falta justificada de una deserción formal del programa.',
      normDetail: 'Antes de declarar la deserción, el Centro debe requerir al aprendiz por correo formal dándole 5 días hábiles para justificar su ausencia.'
    },
    correctiveReinforcement: {
      title: '¡Aprende las causales formales de deserción!',
      whyWrong: 'La deserción no se configura por un retraso de 10 minutos; requiere los umbrales específicos de ausencia continuada.',
      correctNorm: 'Son 3 días consecutivos o 5 discontinuos sin justificar en formación presencial, y 20 días continuos sin ingreso al LMS en formación virtual.',
      keyLearning: 'Si tienes dificultades para asistir, solicita oportunamente un aplazamiento o traslado antes de acumular fallas de deserción.'
    }
  },
  {
    id: 'sec5-q2',
    sectionId: 'medidas_debido_proceso',
    sectionTitle: 'Sección 5: Medidas Formativas y Debido Proceso',
    questionNumberInSection: 2,
    question: '¿Cuáles son las "Medidas Formativas" pedagógicas de carácter preventivo previstas en el nuevo reglamento (Artículos 24 al 26)?',
    options: [
      'Expulsión fulminante sin escuchar al estudiante.',
      'Llamado de atención verbal y Llamado de atención por escrito acompañado de un Plan de Mejoramiento Pedagógico concertado.',
      'Multas económicas descontadas de los auxilios de transporte.',
      'Labores forzadas de limpieza fuera del horario de formación.'
    ],
    correctIndex: 1,
    articleReference: 'Artículos 24, 25 y 26 - Medidas Formativas (Acuerdo 0009 de 2024)',
    positiveReinforcement: {
      title: '¡Pedagogía por encima del castigo!',
      message: 'Comprendes que el espíritu del SENA es formativo: el Plan de Mejoramiento busca recuperar el nivel de competencias y encauzar tu proceso.',
      normDetail: 'El Plan de Mejoramiento establece metas claras, plazos acordados y acompañamiento pedagógico por parte del instructor ejecutor.'
    },
    correctiveReinforcement: {
      title: '¡El SENA forma, no castiga arbitrariamente!',
      whyWrong: 'El SENA no impone multas económicas ni trabajos forzados; sus herramientas buscan el crecimiento del ser.',
      correctNorm: 'Las medidas formativas son preventivas: llamado de atención verbal y llamado escrito con suscripción de Plan de Mejoramiento.',
      keyLearning: 'Un plan de mejoramiento es una segunda oportunidad de oro para consolidar tus aprendizajes.'
    }
  },
  {
    id: 'sec5-q3',
    sectionId: 'medidas_debido_proceso',
    sectionTitle: 'Sección 5: Medidas Formativas y Debido Proceso',
    questionNumberInSection: 3,
    question: '¿Qué es el Comité de Evaluación y Seguimiento y cuál es su rol principal (Artículos 32 y 33)?',
    options: [
      'Un tribunal judicial externo sin presencia de miembros del SENA.',
      'Una instancia asesora del Subdirector de Centro que analiza casos académicos y disciplinarios, garantizando el derecho a la defensa y recomendando medidas.',
      'Un grupo de estudiantes que decide unilateralmente quién aprueba el trimestre.',
      'Una reunión secreta de la que el aprendiz no es notificado.'
    ],
    correctIndex: 1,
    articleReference: 'Artículos 32 y 33 - Comité de Evaluación y Seguimiento (Acuerdo 0009 de 2024)',
    positiveReinforcement: {
      title: '¡Correcto! Máxima instancia asesora del Centro',
      message: 'El Comité está integrado por coordinadores, instructores, bienestar, el vocero del grupo y garantiza el debido proceso del aprendiz.',
      normDetail: 'El aprendiz es convocado formalmente, puede presentar pruebas, descargos orales o escritos y contar con el acompañamiento de su vocero.'
    },
    correctiveReinforcement: {
      title: '¡Conoce cómo opera el Comité de Seguimiento!',
      whyWrong: 'No es una reunión secreta ni un tribunal externo; es una instancia institucional abierta al diálogo con el aprendiz citado.',
      correctNorm: 'El Comité analiza los informes, escucha los descargos del aprendiz con plenas garantías de defensa y recomienda medidas al Subdirector.',
      keyLearning: 'Tu vocero de ficha tiene voz en el Comité para velar por las garantías procesales de tu grupo.'
    }
  },
  {
    id: 'sec5-q4',
    sectionId: 'medidas_debido_proceso',
    sectionTitle: 'Sección 5: Medidas Formativas y Debido Proceso',
    questionNumberInSection: 4,
    question: 'En materia de sanciones disciplinarias (Art. 28), ¿cuáles son las sanciones máximas que puede imponer el Subdirector de Centro?',
    options: [
      'Prisión en estación de policía local.',
      'Condicionamiento de matrícula y Cancelación de la matrícula (con inhabilidad de 6 meses a 3 años según gravedad de la falta).',
      'Pérdida perpetua de los derechos ciudadanos en Colombia.',
      'Embargo del sueldo futuro del aprendiz.'
    ],
    correctIndex: 1,
    articleReference: 'Artículo 28 - Sanciones Disciplinarias (Acuerdo 0009 de 2024)',
    positiveReinforcement: {
      title: '¡Muy bien! Graduación y proporcionalidad sancionatoria',
      message: 'Las sanciones están taxativamente fijadas en la ley: el condicionamiento alerta al aprendiz y la cancelación es la última ratio institucional.',
      normDetail: 'El tiempo de inhabilidad depende de si la falta fue calificada como grave o gravísima tras agotar todas las etapas de la investigación.'
    },
    correctiveReinforcement: {
      title: '¡Distingue las sanciones reglamentarias!',
      whyWrong: 'El SENA no tiene facultades penales ni embarga cuentas; sus sanciones son estrictamente formativas y disciplinarias de matrícula.',
      correctNorm: 'Las sanciones son: Condicionamiento de matrícula o Cancelación de matrícula con inhabilidad temporal para reingresar al SENA.',
      keyLearning: 'Conocer las consecuencias de las faltas nos ayuda a cuidar con celo nuestra oportunidad formativa.'
    }
  },
  {
    id: 'sec5-q5',
    sectionId: 'medidas_debido_proceso',
    sectionTitle: 'Sección 5: Medidas Formativas y Debido Proceso',
    questionNumberInSection: 5,
    question: 'Frente a una sanción adoptada por acto administrativo (Art. 35), ¿qué recurso legal tiene el aprendiz para impugnar la decisión?',
    options: [
      'Ninguno, las decisiones del Subdirector son incuestionables.',
      'Recurso de Reposición, presentado por escrito y debidamente sustentado dentro de los cinco (5) días hábiles siguientes a la notificación de la resolución.',
      'Una tutela directa sin agotar la vía gubernativa interna.',
      'Esperar diez años para solicitar revocatoria.'
    ],
    correctIndex: 1,
    articleReference: 'Artículo 35 - Recurso de Reposición (Acuerdo 0009 de 2024)',
    positiveReinforcement: {
      title: '¡Excelente! Cierre maestro de Garantías Constitucionales',
      message: 'El Recurso de Reposición es la garantía suprema del derecho de defensa: permite solicitar la revisión de la sanción con nuevas pruebas o argumentos.',
      normDetail: 'El Subdirector tiene la obligación de estudiar de fondo tus argumentos y resolver si revoca, modifica o ratifica la medida dentro de los términos legales.'
    },
    correctiveReinforcement: {
      title: '¡Ejerce tu derecho a la contradicción!',
      whyWrong: 'Las decisiones administrativas disciplinarias no son absolutas; la ley siempre garantiza el derecho a impugnarlas.',
      correctNorm: 'Tienes derecho a interponer el Recurso de Reposición dentro de los cinco (5) días hábiles siguientes a la notificación personal.',
      keyLearning: 'El debido proceso es una conquista sagrada de la Constitución colombiana incorporada en el Acuerdo 0009 de 2024.'
    }
  }
];

export interface GamifiedLeaderboardEntry {
  id: string;
  name: string;
  docNumber: string;
  fichaNumber: string;
  programName: string;
  regional: string;
  totalScore: number;
  totalTimeSeconds: number;
  accuracyPercent: number;
  correctAnswers: number;
  totalQuestions: number;
  date: string;
  rank?: number;
}

export const INITIAL_SEEDED_LEADERBOARD: GamifiedLeaderboardEntry[] = [
  {
    id: 'lb-1',
    name: 'Valentina Gómez Restrepo',
    docNumber: '1033456789',
    fichaNumber: '2874102',
    programName: 'Desarrollo de Medios Gráficos Visuales',
    regional: 'Regional Antioquia',
    totalScore: 3680,
    totalTimeSeconds: 215, // 3m 35s
    accuracyPercent: 96,
    correctAnswers: 24,
    totalQuestions: 25,
    date: '06/10/2026',
  },
  {
    id: 'lb-2',
    name: 'Alejandro Morales Rivera',
    docNumber: '1020789456',
    fichaNumber: '2874102',
    programName: 'Análisis y Desarrollo de Software (ADSO)',
    regional: 'Regional Distrito Capital',
    totalScore: 3540,
    totalTimeSeconds: 248, // 4m 08s
    accuracyPercent: 92,
    correctAnswers: 23,
    totalQuestions: 25,
    date: '06/10/2026',
  },
  {
    id: 'lb-3',
    name: 'Mariana Silva Quintero',
    docNumber: '1015678923',
    fichaNumber: '2901234',
    programName: 'Gestión Administrativa',
    regional: 'Regional Valle del Cauca',
    totalScore: 3410,
    totalTimeSeconds: 260, // 4m 20s
    accuracyPercent: 88,
    correctAnswers: 22,
    totalQuestions: 25,
    date: '07/10/2026',
  },
  {
    id: 'lb-4',
    name: 'Carlos Andrés Benítez',
    docNumber: '1098765432',
    fichaNumber: '2901234',
    programName: 'Mantenimiento Electromecánico Industrial',
    regional: 'Regional Santander',
    totalScore: 3220,
    totalTimeSeconds: 295, // 4m 55s
    accuracyPercent: 84,
    correctAnswers: 21,
    totalQuestions: 25,
    date: '07/10/2026',
  },
  {
    id: 'lb-5',
    name: 'Daniela Ospina Castro',
    docNumber: '1028345612',
    fichaNumber: '2874102',
    programName: 'ADSO',
    regional: 'Regional Caldas',
    totalScore: 3090,
    totalTimeSeconds: 310, // 5m 10s
    accuracyPercent: 80,
    correctAnswers: 20,
    totalQuestions: 25,
    date: '07/10/2026',
  },
];

const LEADERBOARD_STORAGE_KEY = 'sena_gamified_leaderboard_v1';

export const getLeaderboard = (): GamifiedLeaderboardEntry[] => {
  try {
    const raw = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(INITIAL_SEEDED_LEADERBOARD));
      return INITIAL_SEEDED_LEADERBOARD;
    }
    const list: GamifiedLeaderboardEntry[] = JSON.parse(raw);
    return list.sort((a, b) => b.totalScore - a.totalScore || a.totalTimeSeconds - b.totalTimeSeconds);
  } catch {
    return INITIAL_SEEDED_LEADERBOARD;
  }
};

export const saveLeaderboardEntry = (entry: GamifiedLeaderboardEntry): GamifiedLeaderboardEntry[] => {
  const current = getLeaderboard();
  const existingIdx = current.findIndex(e => e.docNumber === entry.docNumber);
  if (existingIdx >= 0) {
    if (entry.totalScore > current[existingIdx].totalScore) {
      current[existingIdx] = entry;
    }
  } else {
    current.push(entry);
  }

  const sorted = current
    .sort((a, b) => b.totalScore - a.totalScore || a.totalTimeSeconds - b.totalTimeSeconds)
    .slice(0, 50); // Top 50

  try {
    localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(sorted));
  } catch {
    // Ignore
  }
  return sorted;
};
