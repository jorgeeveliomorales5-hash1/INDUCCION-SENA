import { ModuleData, QuizQuestion, CaseStudy, Badge, ApprenticeProfile } from '../types/induction';

export const MODULES_INFO: ModuleData[] = [
  {
    id: 'identidad',
    number: '01',
    title: 'Identidad, Misión y Símbolos Institucionales',
    shortTitle: 'Identidad SENA',
    summary: 'Comprende el origen histórico de 1957, la misión estatal, la promesa de valor y el significado de los símbolos patrios e institucionales.',
    badgeName: 'Emblema Institucional',
    badgeIcon: 'Shield',
    estimatedMinutes: 15,
  },
  {
    id: 'formacion',
    number: '02',
    title: 'Formación Profesional Integral (FPI)',
    shortTitle: 'Modelo FPI',
    summary: 'Apropia el modelo pedagógico por competencias, las etapas lectiva y productiva, y el ecosistema de plataformas SofiaPlus y Zajuna.',
    badgeName: 'Artífice del Aprendizaje',
    badgeIcon: 'Compass',
    estimatedMinutes: 20,
  },
  {
    id: 'reglamento',
    number: '03',
    title: 'Reglamento del Aprendiz (Acuerdo 0009 de 2024)',
    shortTitle: 'Reglamento 2024',
    summary: 'Apropia el nuevo Acuerdo 0009 de 2024 (que deroga el Acuerdo 07 de 2012): 24 derechos, 24 deberes, enfoque diferencial, causales de deserción y debido proceso.',
    badgeName: 'Guardián del Reglamento',
    badgeIcon: 'Scale',
    estimatedMinutes: 25,
  },
  {
    id: 'bienestar',
    number: '04',
    title: 'Bienestar al Aprendiz y Liderazgo',
    shortTitle: 'Bienestar y Apoyos',
    summary: 'Explora las 9 dimensiones de bienestar: salud, cultura, deportes, apoyos de sostenimiento, liderazgo y elección de voceros.',
    badgeName: 'Líder de Comunidad',
    badgeIcon: 'HeartHandshake',
    estimatedMinutes: 15,
  },
  {
    id: 'innovacion',
    number: '05',
    title: 'Innovación, SENNOVA y Emprendimiento',
    shortTitle: 'SENNOVA y Futuro',
    summary: 'Conéctate con semilleros de investigación, TecnoParques, Fondo Emprender y la delegación nacional de WorldSkills.',
    badgeName: 'Pionero de Innovación',
    badgeIcon: 'Lightbulb',
    estimatedMinutes: 15,
  },
];

export const INSTITUTIONAL_IDENTITY = {
  foundationYear: 1957,
  founder: 'Dr. Rodolfo Martínez Tono',
  legalBasis: 'Decreto Ley 118 del 21 de junio de 1957',
  mision: 'El SENA está encargado de cumplir la función que le corresponde al Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral, para la incorporación y el desarrollo de las personas en actividades productivas que contribuyan al desarrollo social, económico y tecnológico del país.',
  vision: 'Ser una entidad referente de formación profesional integral, reconocida por su contribución a la productividad empresarial, la innovación social y el cierre de brechas de capital humano con equidad e inclusión en todo el territorio colombiano.',
  valores: [
    { name: 'Honestidad', desc: 'Actuamos con rectitud, transparencia y verdad en cada labor formativa y profesional.' },
    { name: 'Respeto', desc: 'Reconocemos el valor supremo de la dignidad humana, la diversidad y los derechos de los demás.' },
    { name: 'Compromiso', desc: 'Asumimos con pasión y entrega los retos para transformar vidas y construir país.' },
    { name: 'Diligencia', desc: 'Cumplimos con celeridad, eficiencia y calidad cada una de las metas asignadas.' },
    { name: 'Justicia', desc: 'Garantizamos trato equitativo, debido proceso e igualdad de oportunidades para todos.' },
    { name: 'Solidaridad', desc: 'Apoyamos a nuestros compañeros y comunidades en situaciones de vulnerabilidad.' },
  ],
  simbolos: {
    escudo: {
      nombre: 'Escudo del SENA',
      significado: 'Refleja los tres sectores económicos en los que el SENA forma el talento nacional.',
      elementos: [
        {
          sector: 'Sector Primario (Agropecuario)',
          simbolo: 'Hoja de Café',
          descripcion: 'Representa el campo colombiano, la producción agraria, pecuaria y agroindustrial que alimenta a la nación.',
          color: '#15803d'
        },
        {
          sector: 'Sector Secundario (Industria y Construcción)',
          simbolo: 'Rueda Dentada (Piñón)',
          descripcion: 'Evoca el poder de la manufactura, la ingeniería, la automatización, la edificación y la fuerza mecánica del trabajo.',
          color: '#00324d'
        },
        {
          sector: 'Sector Terciario (Comercio y Servicios)',
          simbolo: 'Caduceo de Mercurio',
          descripcion: 'Simboliza el comercio, la gestión administrativa, la tecnología digital, la logística, el turismo y los servicios.',
          color: '#0284c7'
        }
      ]
    },
    logosimbolo: {
      nombre: 'Logosímbolo Institucional',
      significado: 'Un ser humano marchando erguido y firme sobre caminos convergentes.',
      descripcion: 'Representa al aprendiz que ingresa al SENA para forjarse un sendero de oportunidades. La cabeza en círculo simboliza la plenitud del pensamiento, el torso y extremidades representan la acción y el movimiento hacia adelante, mientras las líneas inferiores configuran los caminos abiertos del conocimiento y el progreso laboral.'
    },
    bandera: {
      nombre: 'Bandera del SENA',
      significado: 'Fondo blanco puro con el escudo central.',
      descripcion: 'El blanco representa la paz, la tranquilidad, la rectitud y la libertad que promueve la educación pública en Colombia, albergando en su corazón el escudo de los tres sectores productivos.'
    },
    himno: {
      autorLetra: 'Luis Alfredo Osorio',
      autorMusica: 'Daniel Marlez',
      estrofas: [
        {
          tipo: 'Coro',
          versos: [
            'Estudiantes del SENA, ¡adelante!',
            'Por Colombia luchad con amor,',
            'con el ánimo noble y constante,',
            'al trabajo ponedle ardor.'
          ]
        },
        {
          tipo: 'Estrofa I',
          versos: [
            'Hoy la patria nos grita sentida,',
            'estudiantes del SENA triunfad,',
            'solo así lograreis en la vida,',
            'más justicia, mayor libertad.'
          ]
        },
        {
          tipo: 'Estrofa II',
          versos: [
            'Avancemos con fuerza guerrera,',
            'estudiantes con firme tesón,',
            'que la patria en su blanca bandera,',
            'vea en nosotros su gran redención.'
          ]
        },
        {
          tipo: 'Estrofa III',
          versos: [
            'En la fragua, en el surco y la ciencia,',
            'el futuro empezamos a abrir,',
            'conquistando con clara conciencia,',
            'el derecho a un mejor porvenir.'
          ]
        }
      ]
    }
  }
};

export const ETAPAS_PRODUCTIVAS = [
  {
    id: 'contrato_aprendizaje',
    titulo: 'Contrato de Aprendizaje',
    popularidad: 'Modalidad principal',
    descripcion: 'Vinculación formativa con una empresa patrocinadora regulada por la Ley 789 de 2002. No constituye contrato laboral pero otorga cuota de sostenimiento mensual y afiliación a EPS y ARL.',
    apoyoEconomico: '75% a 100% del SMMLV según tasa de desempleo nacional.',
    requisitos: 'Estar registrado en la plataforma SGVA (Sistema de Gestión Virtual de Aprendices) y no tener sanciones vigentes.',
    ventajas: ['Inmersión directa en el entorno empresarial real', 'Posibilidad alta de contratación laboral posterior', 'Apoyo económico garantizado durante la etapa']
  },
  {
    id: 'vinculo_laboral',
    titulo: 'Vínculo Laboral o Contractual',
    popularidad: 'Para aprendices con empleo afín',
    descripcion: 'Aplica cuando el aprendiz ya tiene una relación laboral formal con una empresa y sus funciones desempeñadas son directamente afines a las competencias de su programa formativo.',
    apoyoEconomico: 'Salario convenido en el contrato de trabajo.',
    requisitos: 'Carta de la empresa con funciones detalladas, contrato laboral y aprobación del comité académico del Centro.',
    ventajas: ['Continuidad laboral sin suspender ingresos', 'Convalidación del puesto de trabajo como práctica', 'Experiencia profesional acumulada en hoja de vida']
  },
  {
    id: 'proyecto_productivo',
    titulo: 'Proyecto Productivo (Emprendimiento)',
    popularidad: 'Innovadores y creadores de empresa',
    descripcion: 'Diseño, formulación y puesta en marcha de una idea de negocio rentable e innovadora orientada por instructores del SENA y articulada con Fondo Emprender o TecnoParque.',
    apoyoEconomico: 'Apalancamiento de recursos según convocatorias institucionales.',
    requisitos: 'Plan de negocio validado por la unidad de emprendimiento y cronograma de metas.',
    ventajas: ['Autonomía para crear tu propia empresa', 'Asesoría técnica de alto nivel', 'Acceso a capital semilla no reembolsable']
  },
  {
    id: 'pasanti_institucional',
    titulo: 'Pasantía (Institucional / Social / ONG)',
    popularidad: 'Sector público o comunitario',
    descripcion: 'Práctica concertada con entidades sin ánimo de lucro, fundaciones u organismos del Estado para solucionar problemáticas territoriales o comunitarias.',
    apoyoEconomico: 'Pasantía con o sin auxilio (según entidad convenida). ARL a cargo del SENA o de la empresa.',
    requisitos: 'Convenio formal entre el SENA y la entidad receptora.',
    ventajas: ['Impacto social directo en comunidades', 'Desarrollo de liderazgo ético y ciudadano', 'Flexibilidad en proyectos de desarrollo local']
  },
  {
    id: 'monitoria_sena',
    titulo: 'Monitoría en el SENA',
    popularidad: 'Aprendices destacados',
    descripcion: 'Apoyo pedagógico o técnico en ambientes de aprendizaje, laboratorios o centros de formación bajo la tutoría de un instructor líder.',
    apoyoEconomico: 'Resolución de estímulo económico mensual asignado por Bienestar al Aprendiz.',
    requisitos: 'Promedio académico sobresaliente, no tener sanciones y superar convocatoria.',
    ventajas: ['Fortalecimiento de habilidades pedagógicas', 'Certificado de monitoría con alto mérito institucional', 'Reconocimiento en la comunidad de instructores']
  },
  {
    id: 'unidad_familiar',
    titulo: 'Apoyo a Unidad Productiva Familiar',
    popularidad: 'Negocios y fincas familiares',
    descripcion: 'Aplicación de las competencias técnicas del programa para modernizar, tecnificar o formalizar el emprendimiento de la familia del aprendiz.',
    apoyoEconomico: 'Sustentado por la productividad del negocio familiar.',
    requisitos: 'Evidencias de mejoras implementadas y seguimiento bimensual de instructor.',
    ventajas: ['Crecimiento directo del patrimonio familiar', 'Transformación digital y técnica del negocio', 'Flexibilidad operativa']
  }
];

export const REGLAMENTO_HIGHLIGHTS = {
  acuerdo: 'Acuerdo 0009 de 2024',
  fechaExpedicion: '05 de noviembre de 2024',
  emisor: 'Consejo Directivo Nacional del SENA',
  tituloOficial: 'Por medio del cual se adopta el Reglamento del Aprendiz SENA y se derogan los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024',
  derogatorias: 'Deroga en su totalidad los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024.',
  firmantes: {
    presidente: 'Iván Daniel Jaramillo Jassit (Viceministro de Empleo y Pensiones)',
    secretaria: 'Katerine Grimaldos Robayo (Secretaria General E)'
  },
  considerandosPrincipales: [
    'Artículos 54 y 67 de la Constitución Política de Colombia sobre formación profesional y educación.',
    'Ley 30 de 1992, Ley 115 de 1994 y Ley 119 de 1994 relativas a la misión, objetivos y funcionamiento del SENA.',
    'Ley 361 de 1997 sobre integración social de personas en situación de discapacidad.',
    'Ley 2394 de 2024 sobre protección de derechos de estudiantes gestantes, en lactancia y licencias de paternidad.',
    'Ley 2365 de 2024 sobre prevención, protección y atención de acoso sexual en el ámbito laboral y educativo.',
    'Decreto 249 de 2004 (Artículo 3°, numeral 8) que faculta al Consejo Directivo a regular la promoción y régimen de los aprendices.'
  ],
  principiosOrientadores: [
    { nombre: 'Autonomía', desc: 'Capacidad de autogobierno ético, pensamiento crítico y toma de decisiones responsable.' },
    { nombre: 'Dignidad', desc: 'Respeto irrestricto e incondicional a la condición humana de toda persona.' },
    { nombre: 'Inclusión', desc: 'Acceso equitativo sin barreras económicas, físicas, cognitivas o sociales.' },
    { nombre: 'Enfoque diferencial', desc: 'Reconocimiento y acciones afirmativas para poblaciones históricamente vulneradas o diversas.' },
    { nombre: 'Enfoque territorial', desc: 'Pertinencia formativa según las realidades, vocaciones y saberes de cada región.' },
    { nombre: 'Participación', desc: 'Democracia activa en instancias de representación, vocerías y comités del Centro.' },
    { nombre: 'Desarrollo sostenible', desc: 'Compromiso ambiental, protección de los recursos naturales y justicia climática.' },
    { nombre: 'Solidaridad', desc: 'Ayuda mutua, empatía comunitaria y apoyo a compañeros en vulnerabilidad.' }
  ],
  definiciones: [
    { termino: 'Formación profesional integral (FPI)', definicion: 'Proceso educativo teórico-práctico orientado al desarrollo de conocimientos técnicos, tecnológicos, humanistas y de actitudes, valores y habilidades socioemocionales.' },
    { termino: 'Comunidad educativa SENA', definicion: 'Integrada por aprendices, instructores, personal administrativo, directivos, familias, egresados, empresarios y sectores sociales y poblacionales diversos.' },
    { termino: 'Aspirante', definicion: 'Persona que participa en el proceso de ingreso para matricularse en un programa de formación.' },
    { termino: 'Aprendiz', definicion: 'Persona matriculada en los programas de formación profesional del SENA en sus diferentes modalidades.' },
    { termino: 'Grupo', definicion: 'Conjunto de aprendices matriculados en un determinado Centro de Formación, programa, jornada e identificado con un número de ficha en el sistema académico-administrativo.' },
    { termino: 'Centro de Convivencia', definicion: 'Atención complementaria que brinda alojamiento y alimentación para aprendices seleccionados, regido por un manual específico.' }
  ],
  derechos: [
    { articulo: 'Art. 5 Num. 1', titulo: 'Inducción Integral', detalle: 'Recibir inducción institucional y contextualizada que facilite la apropiación del entorno formativo y normativo.' },
    { articulo: 'Art. 5 Num. 2', titulo: 'Formación de Calidad', detalle: 'Recibir formación profesional integral de calidad acorde al diseño curricular de su programa.' },
    { articulo: 'Art. 5 Num. 3', titulo: 'Acreditación Institucional', detalle: 'Ser acreditado y reconocido como aprendiz SENA mediante carné físico o digital vigente.' },
    { articulo: 'Art. 5 Num. 4', titulo: 'Recursos e Infraestructura', detalle: 'Disponer de infraestructura física, ambientes, talleres, herramientas y recursos bibliográficos institucionales.' },
    { articulo: 'Art. 5 Num. 5', titulo: 'Elementos de Protección Personal (EPP)', detalle: 'Recibir los EPP requeridos para las prácticas en talleres y ambientes de aprendizaje con riesgo ocupacional.' },
    { articulo: 'Art. 5 Num. 6', titulo: 'Beneficios de Bienestar al Aprendiz', detalle: 'Disfrutar de las estrategias y beneficios del Plan Nacional Integral de Bienestar al Aprendiz (salud, deporte, cultura, apoyos).' },
    { articulo: 'Art. 5 Num. 7', titulo: 'Orientación Humanista y Ocupacional', detalle: 'Recibir orientación integral en valores, proyecto de vida y fortalecimiento socioemocional.' },
    { articulo: 'Art. 5 Num. 8', titulo: 'Ajustes Razonables para Discapacidad', detalle: 'Ser reconocido y apoyado como persona con discapacidad mediante ajustes razonables que garanticen su proceso de aprendizaje.' },
    { articulo: 'Art. 5 Num. 9', titulo: 'Protección Poblacional y Diferencial', detalle: 'Ser reconocido como parte de grupos poblacionales de especial protección constitucional y enfoque diferencial.' },
    { articulo: 'Art. 5 Num. 10', titulo: 'Debido Proceso en Toda Instancia', detalle: 'Garantía del debido proceso en cualquier aspecto académico, administrativo o disciplinario, con derecho a defensa y contradicción.' },
    { articulo: 'Art. 5 Num. 11', titulo: 'Notificación de Novedades', detalle: 'Ser notificado oportunamente de novedades, citaciones a comités y decisiones administrativas.' },
    { articulo: 'Art. 5 Num. 12', titulo: 'Atención a Peticiones Respetuosas', detalle: 'Ser escuchado y atendido de manera ágil en peticiones, quejas y reclamos respetuosos.' },
    { articulo: 'Art. 5 Num. 13', titulo: 'Rutas ante Acoso o Vulneración', detalle: 'Recibir asesoría y activación inmediata de rutas institucionales de atención ante vulneración de derechos o acoso (Ley 2365 de 2024).' },
    { articulo: 'Art. 5 Num. 14', titulo: 'Autoevaluación e Instructores Idóneos', detalle: 'Participar en la evaluación del proceso formativo y contar con instructores pedagógica y técnicamente idóneos.' },
    { articulo: 'Art. 5 Num. 15', titulo: 'Evaluación Objetiva en 8 Días', detalle: 'Ser evaluado objetivamente según criterios curriculares y conocer resultados y retroalimentación dentro de 8 días hábiles.' },
    { articulo: 'Art. 5 Num. 16', titulo: 'Revisión de Calificaciones', detalle: 'Solicitar revisión argumentada de evaluaciones ante el instructor o un segundo evaluador si persisten inconformidades.' },
    { articulo: 'Art. 5 Num. 17', titulo: 'Orientación sobre Etapa Productiva', detalle: 'Recibir información clara y oportuna sobre alternativas, requisitos y fechas de la etapa productiva.' },
    { articulo: 'Art. 5 Num. 18', titulo: 'Trato Digno e Igualitario', detalle: 'Recibir trato digno, respetuoso e igualitario de parte de toda la comunidad educativa SENA.' },
    { articulo: 'Art. 5 Num. 19', titulo: 'Libertad de Expresión', detalle: 'Expresar libremente opiniones, ideas y posturas en un marco de respeto hacia los demás.' },
    { articulo: 'Art. 5 Num. 20', titulo: 'Fortalecimiento del Ser Integral', detalle: 'Postularse y acceder a estrategias extracurriculares de liderazgo y crecimiento personal.' },
    { articulo: 'Art. 5 Num. 21', titulo: 'Participación Democrática (Voto)', detalle: 'Elegir y ser elegido democráticamente en procesos de representación estudiantil y vocerías.' },
    { articulo: 'Art. 5 Num. 22', titulo: 'Evaluaciones Extemporáneas Justificadas', detalle: 'Presentar evidencias de aprendizaje extemporáneas cuando medie inasistencia justificada comprobada.' },
    { articulo: 'Art. 5 Num. 23', titulo: 'Acompañamiento en Etapa Productiva', detalle: 'Recibir asesoría y seguimiento del instructor asignado durante el desarrollo de la modalidad práctica elegida.' },
    { articulo: 'Art. 5 Num. 24', titulo: 'Titulación y Certificación Oportuna', detalle: 'Obtener la certificación o título formal expedido por el SENA tras aprobar el 100% de los resultados de aprendizaje.' }
  ],
  representatividad: {
    mecanismos: [
      '1. Elección democrática por voto secreto de representantes por jornada y modalidad.',
      '2. Elección de voceros por cada grupo de formación (ficha).',
      '3. Elección de vocerías de poblaciones con enfoque diferencial.'
    ],
    representantesJornadas: [
      'Jornada Diurna',
      'Jornada Nocturna',
      'Jornada Madrugada',
      'Jornada Mixta',
      'Jornada Fin de Semana',
      'Modalidad Virtual',
      'Modalidad a Distancia'
    ],
    voceriasEnfoqueDiferencial: [
      { cargo: 'Vocero por grupo de formación', descripcion: 'Elegido por votación en su propia ficha para coordinar con instructores y bienestar.' },
      { cargo: 'Vocero aprendiz indígena', descripcion: 'Representa a las comunidades y resguardos indígenas en el Centro de Formación.' },
      { cargo: 'Vocero comunidad NARP', descripcion: 'Representa a las comunidades Negras, Afrocolombianas, Raizales y Palenqueras.' },
      { cargo: 'Vocero comunidad LGTBIQ+', descripcion: 'Promueve la inclusión, no discriminación y respeto por las diversidades de género y orientación.' },
      { cargo: 'Vocero aprendiz campesino', descripcion: 'Voz del campesinado colombiano, economías rurales y saberes del agro.' },
      { cargo: 'Vocero aprendiz con discapacidad', descripcion: 'Vela por ajustes razonables, accesibilidad universal y eliminación de barreras.' },
      { cargo: 'Vocera aprendiz mujer', descripcion: 'Articula agendas de equidad de género, no violencias y liderazgo de mujeres aprendices.' }
    ]
  },
  deberes: [
    { articulo: 'Art. 8 Num. 1', titulo: 'Acta de Compromiso', detalle: 'Firmar el acta de compromiso institucional al momento de formalizar la matrícula.' },
    { articulo: 'Art. 8 Num. 2', titulo: 'Conocimiento Normativo', detalle: 'Conocer y cumplir el Reglamento del Aprendiz y las normativas institucionales del SENA.' },
    { articulo: 'Art. 8 Num. 3', titulo: 'Valores Institucionales', detalle: 'Actuar con base en los principios y valores del Código de Integridad de la entidad.' },
    { articulo: 'Art. 8 Num. 4', titulo: 'Actualización de Datos', detalle: 'Mantener actualizados datos de residencia, teléfono y correo electrónico en las plataformas oficiales.' },
    { articulo: 'Art. 8 Num. 5', titulo: 'Puntualidad y Asistencia', detalle: 'Asistir con puntualidad y permanencia a las sesiones formativas presenciales y virtuales programadas.' },
    { articulo: 'Art. 8 Num. 6', titulo: 'Entrega de Evidencias', detalle: 'Elaborar y radicar las evidencias de aprendizaje dentro de los plazos fijados en la planeación pedagógica.' },
    { articulo: 'Art. 8 Num. 7', titulo: 'Justificación Oportuna (5 Días)', detalle: 'Justificar inasistencias o incumplimientos dentro de los 5 días hábiles siguientes al hecho con soportes válidos.' },
    { articulo: 'Art. 8 Num. 8', titulo: 'Comunicación Asertiva', detalle: 'Reportar oportunamente situaciones que afecten el normal desarrollo de la formación a instructores y coordinadores.' },
    { articulo: 'Art. 8 Num. 9', titulo: 'Normas en Salidas y Pasantías', detalle: 'Acatar los protocolos y normas de seguridad en salidas de campo, visitas técnicas y eventos institucionales.' },
    { articulo: 'Art. 8 Num. 10', titulo: 'Trámite Formal de Novedades', detalle: 'Seguir el conducto regular para tramitar traslados, aplazamientos, reintegros o retiros.' },
    { articulo: 'Art. 8 Num. 11', titulo: 'Cuidado de Bienes del SENA', detalle: 'Hacer uso responsable y cuidar la infraestructura, mobiliario, herramientas y tecnologías del SENA.' },
    { articulo: 'Art. 8 Num. 12', titulo: 'Derechos de Autor y Citas', detalle: 'Respetar los derechos de autor, normas de citación bibliográfica y propiedad intelectual.' },
    { articulo: 'Art. 8 Num. 13', titulo: 'Autoría Personal', detalle: 'Realizar proyectos, exámenes y evidencias de forma auténtica, personal y sin suplantaciones ni plagios.' },
    { articulo: 'Art. 8 Num. 14', titulo: 'Cuidado Ambiental', detalle: 'Conservar los recursos naturales, depositar residuos en puntos ecológicos y promover la sostenibilidad.' },
    { articulo: 'Art. 8 Num. 15', titulo: 'Uso Obligatorio de EPP', detalle: 'Portar obligatoriamente los Elementos de Protección Personal exigidos en talleres, obras y laboratorios.' },
    { articulo: 'Art. 8 Num. 16', titulo: 'Bioseguridad y Salud', detalle: 'Cumplir los protocolos de bioseguridad y normas de seguridad y salud en el trabajo (SST).' },
    { articulo: 'Art. 8 Num. 17', titulo: 'Elección de Etapa Productiva', detalle: 'Seleccionar oportunamente una de las alternativas reglamentadas para su etapa práctica.' },
    { articulo: 'Art. 8 Num. 18', titulo: 'Aviso de Gestión Productiva', detalle: 'Informar al Centro si gestiona directamente una modalidad de etapa productiva para su debida legalización.' },
    { articulo: 'Art. 8 Num. 19', titulo: 'Controles de Identificación', detalle: 'Presentar el carné institucional y acatar controles de acceso en las porterías de las sedes.' },
    { articulo: 'Art. 8 Num. 20', titulo: 'Vestimenta / Sin Monopolio de Uniformes', detalle: 'Portar vestimenta adecuada/uniforme sin imposición de marcas o proveedores exclusivos; la falta de recursos para uniforme de diario no impedirá estudiar (salvo EPP obligatorios por seguridad).' },
    { articulo: 'Art. 8 Num. 21', titulo: 'Seguridad en Plataformas TIC', detalle: 'Proteger con celo el usuario y contraseña institucional en plataformas LMS/SofiaPlus; no ceder credenciales.' },
    { articulo: 'Art. 8 Num. 22', titulo: 'Reporte de Salud Relevante', detalle: 'Informar al Centro condiciones médicas o de salud que requieran atención preventiva o primeros auxilios.' },
    { articulo: 'Art. 8 Num. 23', titulo: 'Veracidad Documental', detalle: 'Aportar documentos auténticos y fidedignos en todos los trámites académicos y administrativos.' },
    { articulo: 'Art. 8 Num. 24', titulo: 'Corresponsabilidad en Discapacidad', detalle: 'Informar necesidades de ajustes razonables, vincular red de apoyo y procurar el autocuidado en salud.' }
  ],
  prohibiciones: [
    { articulo: 'Art. 9 Num. 1', titulo: 'Falsedad Documental', detalle: 'Suministrar documentos o información falsa en matrículas, convenios o trámites ante el SENA.' },
    { articulo: 'Art. 9 Num. 2', titulo: 'Suplantación de Identidad', detalle: 'Hacerse pasar por otro aprendiz o permitir ser suplantado en clases, talleres, evaluaciones o listados.' },
    { articulo: 'Art. 9 Num. 3', titulo: 'Alteración de Documentos', detalle: 'Modificar, falsificar, sustraer o destruir actas, libros de calificaciones o certificaciones institucionales.' },
    { articulo: 'Art. 9 Num. 4', titulo: 'Plagio Académico', detalle: 'Apropiarse de proyectos, códigos de software, textos o invenciones ajenas sin la debida cita y autorización.' },
    { articulo: 'Art. 9 Num. 5', titulo: 'Mal Uso de Redes y TIC', detalle: 'Utilizar internet y plataformas del SENA para difundir contenidos ilegales, confidenciales, agresivos o de acoso.' },
    { articulo: 'Art. 9 Num. 6', titulo: 'Sustancias Psicoactivas y Alcohol', detalle: 'Ingresar, comercializar, portar o consumir bebidas embriagantes o sustancias psicoactivas en sedes y eventos.' },
    { articulo: 'Art. 9 Num. 7', titulo: 'Porte de Armas', detalle: 'Portar armas de fuego, artefactos explosivos o elementos cortopunzantes no autorizados en las sedes.' },
    { articulo: 'Art. 9 Num. 8', titulo: 'Lucro Particular con Marca SENA', detalle: 'Utilizar el nombre, logosímbolo o instalaciones del SENA para beneficio económico privado o negocios particulares.' },
    { articulo: 'Art. 9 Num. 9', titulo: 'Comisión de Delitos', detalle: 'Participar o cometer actos tipificados como delitos contra miembros de la comunidad o la entidad.' },
    { articulo: 'Art. 9 Num. 10', titulo: 'Daño o Hurto de Bienes', detalle: 'Dañar intencionalmente, sabotear o sustraer herramientas, computadores o bienes del SENA o convenios.' },
    { articulo: 'Art. 9 Num. 11', titulo: 'Proselitismo Político o Religioso', detalle: 'Adelantar actividades de proselitismo político o religioso al interior de las instalaciones de formación.' },
    { articulo: 'Art. 9 Num. 12', titulo: 'Ingreso por Accesos No Autorizados', detalle: 'Entrar o salir del Centro saltando muros, forzando rejas o burlando la vigilancia institucional.' },
    { articulo: 'Art. 9 Num. 13', titulo: 'Vandalismo y Ciberacoso', detalle: 'Manchar o destruir muros y mobiliario, o publicar mensajes de acoso, difamación o bullying contra otros.' },
    { articulo: 'Art. 9 Num. 14', titulo: 'Actos de Discriminación', detalle: 'Discriminar a cualquier miembro de la comunidad por razón de raza, género, religión, discapacidad u orientación.' }
  ],
  novedadesYDesercion: {
    novedades: [
      { tipo: 'Traslado', condicion: 'Cambio de jornada, centro, programa afín o modalidad. Requiere haber cursado mínimo el 1er trimestre y no tener sanciones vigentes.' },
      { tipo: 'Aplazamiento', condicion: 'Suspensión temporal por 20 días o más por causas justificadas (médicas, gestación/paternidad Ley 2394, calamidad, servicio militar). Máximo 3 meses ampliables por otros 3 meses.' },
      { tipo: 'Reintegro', condicion: 'Solicitud formal para regresar tras un aplazamiento. Debe radicarse con mínimo 5 días hábiles de anticipación a la finalización de la causa.' },
      { tipo: 'Retiro Voluntario', condicion: 'Desvinculación definitiva del programa solicitada por el aprendiz en plataforma. Si es injustificada constituye falta grave.' }
    ],
    desercionCausales: [
      { modalidad: 'Formación Presencial', causal: 'Tres (3) días continuos o cinco (5) días discontinuos de inasistencia injustificada sin reporte.' },
      { modalidad: 'Formación Virtual', causal: 'No ingresar a la plataforma de aprendizaje (LMS) durante veinte (20) días consecutivos o faltar a tres (3) citaciones.' },
      { modalidad: 'Formación a Distancia', causal: 'Faltar a tres (3) encuentros presenciales obligatorios programados en el Centro.' },
      { modalidad: 'Etapa Productiva', causal: 'Tres (3) días consecutivos de inasistencia a la empresa o no presentar el plan de trabajo tras terminar la etapa lectiva.' },
      { modalidad: 'Vencimiento de Aplazamiento', causal: 'No solicitar reintegro al menos tres (3) días hábiles antes de cumplirse el plazo máximo fijado.' }
    ],
    consecuenciaDesercion: 'Calificación como falta grave académica y disciplinaria que da lugar a la Cancelación de Matrícula tras el debido proceso en el Comité de Evaluación y Seguimiento.'
  },
  medidasFormativas: [
    {
      tipo: 'Llamado de atención verbal',
      alcance: 'Formativo pedagógico inmediato',
      detalle: 'Diálogo reflexivo del instructor ante faltas leves para reorientar el proceso sin anotación sancionatoria en hoja de vida.'
    },
    {
      tipo: 'Plan de Mejoramiento Pedagógico',
      alcance: 'Acuerdo formativo vinculante',
      detalle: 'Plan concertado de actividades académicas o de convivencia con fechas límite y seguimiento personalizado para subsanar deficiencias.'
    },
    {
      tipo: 'Condicionamiento de Matrícula',
      alcance: 'Sanción disciplinaria formal',
      detalle: 'Acto administrativo emitido por el Subdirector de Centro tras audiencia de descargos en el Comité de Evaluación; el aprendiz queda en observación.'
    },
    {
      tipo: 'Cancelación de Matrícula',
      alcance: 'Máxima sanción institucional',
      detalle: 'Pérdida de la calidad de aprendiz del SENA e inhabilidad para ingresar a programas institucionales por el periodo estipulado en el debido proceso.'
    }
  ]
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'caso-asistencia-2024',
    title: 'Dilema de Inasistencia por Salud bajo el Acuerdo 0009 de 2024',
    context: 'Carlos es aprendiz de Electricidad Industrial. Debido a una hospitalización urgente comprobable, faltó a tres sesiones continuas de su formación práctica en taller.',
    question: 'Según el nuevo Acuerdo 0009 de 2024 (Artículos 27 a 29), ¿cuál es el plazo y procedimiento para radicar su justificación?',
    options: [
      {
        text: 'Esperar a final de mes y entregarle al instructor una excusa verbal sin documentos.',
        isCorrect: false,
        articleReference: 'Acuerdo 0009 de 2024 - Art. 27 a 29',
        feedback: 'Incorrecto. Si no presenta los soportes formales a tiempo, se configura inasistencia injustificada y causal de deserción.'
      },
      {
        text: 'Radicar formalmente la justificación médica con soportes dentro de los cinco (5) días hábiles siguientes.',
        isCorrect: true,
        articleReference: 'Acuerdo 0009 de 2024 - Art. 8 Num. 7 y Art. 27-29',
        feedback: '¡Correcto! El Acuerdo 0009 de 2024 amplió y unificó a cinco (5) días hábiles el plazo para reportar con soportes válidos las inasistencias por salud o fuerza mayor.'
      },
      {
        text: 'Pedirle a un compañero de ficha que marque su huella o lista de asistencia en su lugar.',
        isCorrect: false,
        articleReference: 'Acuerdo 0009 de 2024 - Art. 9 Num. 2 (Prohibiciones)',
        feedback: 'Incorrecto. La suplantación de identidad en controles o evaluaciones es una falta grave prohibida expresamente en el Art. 9 Num. 2.'
      }
    ]
  },
  {
    id: 'caso-plagio-2024',
    title: 'Derechos de Autor y Prohibición de Plagio (Art. 9)',
    context: 'Mariana y su equipo deben entregar el proyecto formativo de software. Un compañero copió código y textos completos de internet sin citar autores ni licencias.',
    question: 'Conforme al nuevo Reglamento del Aprendiz (Acuerdo 0009 de 2024), ¿qué implicaciones tiene el plagio?',
    options: [
      {
        text: 'No ocurre nada porque todo el código en internet es libre de citación en formación.',
        isCorrect: false,
        articleReference: 'Acuerdo 0009 de 2024 - Art. 8 Num. 12',
        feedback: 'Falso. El respeto a la propiedad intelectual y derechos de autor es un deber explícito del Art. 8 Num. 12.'
      },
      {
        text: 'Se configura la prohibición del Art. 9 Num. 4 (Plagio), abriendo proceso formativo ante el Comité de Evaluación y Seguimiento.',
        isCorrect: true,
        articleReference: 'Acuerdo 0009 de 2024 - Art. 9 Num. 4 y Art. 16',
        feedback: '¡Exacto! El plagio en trabajos, proyectos o evaluaciones atenta contra la honestidad institucional y amerita medidas formativas o sancionatorias.'
      },
      {
        text: 'El instructor modifica la calificación sin escuchar en descargos a los aprendices.',
        isCorrect: false,
        articleReference: 'Acuerdo 0009 de 2024 - Art. 5 Num. 10 (Debido Proceso)',
        feedback: 'Incorrecto. El aprendiz siempre tiene derecho al debido proceso y a ser escuchado antes de cualquier decisión administrativa.'
      }
    ]
  },
  {
    id: 'caso-uniforme-epp-2024',
    title: 'Vestimenta, EPP y no monopolio de marcas (Art. 8 Num. 20)',
    context: 'Un aprendiz de bajos recursos no ha podido comprar el uniforme de diario de una marca sugerida, pero cuenta con ropa adecuada de presentación y sus botas y careta EPP para el taller de soldadura.',
    question: '¿Qué dispone expresamente el nuevo Acuerdo 0009 de 2024 sobre uniformes y acceso a clases?',
    options: [
      {
        text: 'Debe prohibírsele la entrada al Centro hasta que compre el uniforme de la marca oficial recomendada.',
        isCorrect: false,
        articleReference: 'Acuerdo 0009 de 2024 - Art. 8 Num. 20',
        feedback: 'Totalmente incorrecto. El nuevo reglamento prohíbe exigir marcas o proveedores exclusivos.'
      },
      {
        text: 'La falta de recursos para uniforme diario no impedirá su acceso a formación; los EPP son los únicos de porte estricto por seguridad en taller.',
        isCorrect: true,
        articleReference: 'Acuerdo 0009 de 2024 - Art. 8 Num. 20 y Art. 5 Num. 5',
        feedback: '¡Excelente! Esta es una innovación clave del Acuerdo 0009 de 2024: protege el derecho a la educación de aprendices vulnerables sin barreras de marcas, manteniendo el rigor de los EPP.'
      },
      {
        text: 'Debe pagar una multa económica a la coordinación para permitirle ingresar.',
        isCorrect: false,
        articleReference: 'Acuerdo 0009 de 2024 - Principios',
        feedback: 'Incorrecto. El SENA es educación pública gratuita y ninguna falta genera cobros monetarios.'
      }
    ]
  },
  {
    id: 'caso-desercion-virtual-2024',
    title: 'Permanencia en Plataformas Virtuales (Art. 30 y 31)',
    context: 'Laura está matriculada en un tecnólogo en modalidad 100% virtual y lleva 22 días seguidos sin ingresar a la plataforma LMS ni reportar novedades a su tutor.',
    question: 'Bajo el Acuerdo 0009 de 2024, ¿cuál es la causal de deserción aplicable en modalidad virtual?',
    options: [
      {
        text: 'Faltar a 3 clases presenciales en la sede más cercana.',
        isCorrect: false,
        articleReference: 'Acuerdo 0009 de 2024 - Art. 30',
        feedback: 'Incorrecto. En modalidad virtual los encuentros no son presenciales obligatorios de sede física.'
      },
      {
        text: 'No ingresar a la plataforma LMS durante veinte (20) días consecutivos o no asistir a 3 citaciones justificadas.',
        isCorrect: true,
        articleReference: 'Acuerdo 0009 de 2024 - Art. 30 y 31 (Deserción Virtual)',
        feedback: '¡Correcto! En modalidad virtual, 20 días continuos sin ingreso al LMS constituye causal formal de deserción y apertura de trámite en Comité.'
      },
      {
        text: 'La modalidad virtual nunca declara deserción, no importa cuánto tiempo pase.',
        isCorrect: false,
        articleReference: 'Acuerdo 0009 de 2024 - Art. 31',
        feedback: 'Falso. El control de permanencia aplica a todas las modalidades para garantizar el aprovechamiento de los cupos públicos.'
      }
    ]
  }
];

export const MODULE_QUIZZES: Record<string, QuizQuestion[]> = {
  identidad: [
    {
      id: 'id-q1',
      question: '¿En qué año y por quién fue fundado el Servicio Nacional de Aprendizaje (SENA)?',
      options: [
        'En 1982 por Gabriel García Márquez.',
        'En 1957 por iniciativa del Dr. Rodolfo Martínez Tono.',
        'En 1930 por el Ministerio de Hacienda.',
        'En 1991 por la Asamblea Nacional Constituyente.'
      ],
      correctIndex: 1,
      explanation: 'El SENA nació el 21 de junio de 1957 mediante el Decreto Ley 118, gracias a la visión visionaria del cartagenero Rodolfo Martínez Tono.'
    },
    {
      id: 'id-q2',
      question: '¿Qué representa la rueda dentada (piñón) en el escudo oficial del SENA?',
      options: [
        'El sector agropecuario y la pesca.',
        'El sector industrial, manufacturero y de la construcción.',
        'El sector financiero y el comercio exterior.',
        'El sistema judicial de Colombia.'
      ],
      correctIndex: 1,
      explanation: 'El piñón simboliza la fuerza productiva de la industria, las fábricas y la construcción de infraestructura en Colombia.'
    },
    {
      id: 'id-q3',
      question: '¿Qué figura central define el logosímbolo institucional del SENA?',
      options: [
        'Un águila sobrevolando las cordilleras colombianas.',
        'Un libro abierto con una antorcha de sabiduría.',
        'Un ser humano marchando erguido hacia el futuro abriendo caminos de oportunidades.',
        'Una mano sosteniendo un engranaje mecánico.'
      ],
      correctIndex: 2,
      explanation: 'El logosímbolo representa al aprendiz que marcha firme hacia adelante, labrando su propio destino sobre los caminos del conocimiento técnico.'
    },
    {
      id: 'id-q4',
      question: '¿Cuál es el valor institucional que nos exige actuar con transparencia, rectitud y verdad?',
      options: ['Honestidad', 'Puntualidad informal', 'Astucia', 'Competitividad agresiva'],
      correctIndex: 0,
      explanation: 'La Honestidad es el primer valor del código de integridad del SENA: coherencia entre lo que decimos y hacemos.'
    }
  ],
  formacion: [
    {
      id: 'fo-q1',
      question: '¿Cuáles son las dos grandes etapas secuenciales que componen la formación técnica y tecnológica en el SENA?',
      options: [
        'Etapa de Admisión y Etapa de Graduación.',
        'Etapa Lectiva (apropiación de conocimientos) y Etapa Productiva (aplicación real en el entorno laboral).',
        'Etapa Teórica y Etapa de Exámenes Finales.',
        'Etapa Escrita y Etapa Oral.'
      ],
      correctIndex: 1,
      explanation: 'La Formación Profesional Integral articula la Etapa Lectiva en ambientes de aprendizaje y la Etapa Productiva en el contexto productivo real.'
    },
    {
      id: 'fo-q2',
      question: '¿Qué tipo de vínculo es el Contrato de Aprendizaje (Ley 789 de 2002)?',
      options: [
        'Un contrato laboral convencional a término indefinido.',
        'Una forma especial de vinculación formativa patrocinada por una empresa, con cuota de sostenimiento y sin salario prestacional.',
        'Un voluntariado social no remunerado.',
        'Un contrato de prestación de servicios por honorarios.'
      ],
      correctIndex: 1,
      explanation: 'El Contrato de Aprendizaje es una figura formativa donde la empresa patrocina al aprendiz con un auxilio de sostenimiento económico y cobertura de salud y riesgos laborales.'
    },
    {
      id: 'fo-q3',
      question: '¿Cuál es el enfoque pedagógico que rige el proceso formativo del SENA?',
      options: [
        'Modelo memorístico tradicional centrado en notas numéricas.',
        'Formación Profesional Integral basada en el Desarrollo de Competencias Laborales (Saber, Saber Hacer y Saber Ser).',
        'Modelo de libre cátedra sin resultados de aprendizaje.',
        'Enfoque únicamente virtual sin prácticas de taller.'
      ],
      correctIndex: 1,
      explanation: 'El SENA educa integralmente uniendo el conocimiento técnico (Saber), la destreza práctica (Saber Hacer) y la calidad humana y ética (Saber Ser).'
    },
    {
      id: 'fo-q4',
      question: '¿Cómo se califica el logro de los resultados de aprendizaje en el SENA?',
      options: [
        'Con escala de 1 a 100 puntos.',
        'Con letras de la A a la F.',
        'De manera cualitativa: "A" (Aprobado) o "D" (Deficiente / No Aprobado con derecho a plan de mejoramiento).',
        'Solo con caritas felices.'
      ],
      correctIndex: 2,
      explanation: 'El sistema evalúa evidencias de aprendizaje con juicio de A (Aprobado) o D (No Aprobado), habilitando planes de mejora pedagógica si es necesario.'
    }
  ],
  reglamento: [
    {
      id: 'reg-q1',
      question: '¿Cuál es la norma marco que rige el nuevo Reglamento del Aprendiz SENA?',
      options: [
        'Acuerdo 007 de 2012 (antiguo)',
        'Acuerdo 0009 de 2024 (que deroga en su totalidad los Acuerdos 07 de 2012, 02 de 2014, 06 de 2023 y 02 de 2024)',
        'Ley 100 de 1993',
        'Circular interna informal del Centro'
      ],
      correctIndex: 1,
      explanation: 'El Consejo Directivo Nacional del SENA expidió el Acuerdo 0009 de 2024 el 05 de noviembre de 2024, derogando el Acuerdo 07 de 2012 y modernizando todos los derechos, deberes y debido proceso.'
    },
    {
      id: 'reg-q2',
      question: 'Según el Acuerdo 0009 de 2024 (Art. 8 Num. 7 y Art. 27-29), ¿cuál es el plazo para justificar válidamente una inasistencia?',
      options: [
        'El mismo día antes del mediodía.',
        'Cinco (5) días hábiles siguientes al hecho con soportes válidos.',
        'Treinta (30) días calendario sin importar la fecha.',
        'No hay plazo, se puede entregar al graduarse.'
      ],
      correctIndex: 1,
      explanation: 'El Acuerdo 0009 de 2024 establece un término unificado de cinco (5) días hábiles para radicar las justificaciones médicas, licencias de gestación/paternidad (Ley 2394) o calamidades comprobadas.'
    },
    {
      id: 'reg-q3',
      question: '¿Cuáles son las causales de deserción según los Artículos 30 y 31 del nuevo reglamento?',
      options: [
        'Llegar 5 minutos tarde en una ocasión aislada.',
        'Presencial: 3 días continuos o 5 discontinuos sin justificar; Virtual: 20 días continuos sin ingresar al LMS; A distancia: 3 encuentros presenciales.',
        'Obtener una calificación D en una primera entrega.',
        'Solicitar cambio de jornada académica formalmente.'
      ],
      correctIndex: 1,
      explanation: 'El Artículo 30 define con precisión los umbrales de deserción para formación presencial (3 continuos o 5 discontinuos), virtual (20 días sin ingreso a plataforma LMS) y a distancia (faltar a 3 encuentros).'
    },
    {
      id: 'reg-q4',
      question: '¿Qué garantía consagra el Acuerdo 0009 de 2024 (Art. 8 Num. 20) sobre uniformes y vestimenta?',
      options: [
        'Se obliga a comprar el uniforme a un único proveedor designado por la dirección.',
        'No hay exigencias de marcas o proveedores específicos, y la falta de recursos para uniforme diario no impedirá estudiar (salvo el porte estricto de EPP por seguridad).',
        'Se cobrarán multas económicas a quien no porte uniforme completo.',
        'Queda prohibido el ingreso a talleres con botas o cascos protectores.'
      ],
      correctIndex: 1,
      explanation: 'El Art. 8 Num. 20 del nuevo reglamento protege a los aprendices vulnerables: no se pueden exigir marcas exclusivas y la falta de dinero para el uniforme de diario jamás impedirá el acceso a las clases, preservando la obligatoriedad estricta de los EPP en áreas de riesgo.'
    }
  ],
  bienestar: [
    {
      id: 'bie-q1',
      question: '¿Cuál es el propósito central del Plan Nacional de Bienestar al Aprendiz en el SENA?',
      options: [
        'Organizar fiestas exclusivamente los fines de semana.',
        'Propiciar condiciones que favorezcan la permanencia, el desarrollo humano integral, la salud, la cultura y el liderazgo de los aprendices.',
        'Cobrar mensualidades por uso de zonas verdes.',
        'Evaluar exámenes teóricos sorpresa.'
      ],
      correctIndex: 1,
      explanation: 'Bienestar al Aprendiz busca mitigar la deserción, fortalecer el tejido humano, la salud mental, el deporte, el arte y otorgar apoyos económicos de sostenimiento.'
    },
    {
      id: 'bie-q2',
      question: '¿Quién es el Vocero de Ficha y cómo es elegido?',
      options: [
        'Un aprendiz designado al azar por el celador.',
        'El representante elegido democráticamente por sus compañeros de grupo para servir de puente de comunicación con el equipo ejecutor e instructores.',
        'El aprendiz que tenga el promedio de edad más alto.',
        'Un funcionario contratado por la Dirección General.'
      ],
      correctIndex: 1,
      explanation: 'El Vocero es elegido por votación directa de su propia ficha para liderar iniciativas, canalizar inquietudes y promover la convivencia armónica.'
    },
    {
      id: 'bie-q3',
      question: '¿Qué es el Fondo FIC en el marco de los apoyos de sostenimiento?',
      options: [
        'Un fondo exclusivo para aprendices del sector de la Industria de la Construcción.',
        'Un préstamo bancario con cobro de intereses comerciales.',
        'Un seguro de desempleo para egresados antiguos.',
        'Un fondo para comprar computadores personales.'
      ],
      correctIndex: 0,
      explanation: 'El Fondo de la Industria de la Construcción (FIC) brinda apoyos de sostenimiento específicos a aprendices matriculados en programas afines a la construcción.'
    },
    {
      id: 'bie-q4',
      question: '¿Cuál de los siguientes servicios NO forma parte de las dimensiones de Bienestar al Aprendiz?',
      options: [
        'Orientación y asesoría psicosocial en salud mental.',
        'Actividades deportivas, torneos intercentros y grupos culturales.',
        'Cobro obligatorio de comisiones por trámite de carné.',
        'Convocatorias de monitorías académicas remuneradas.'
      ],
      correctIndex: 2,
      explanation: 'En el SENA todos los trámites, carnetización, orientación y servicios de bienestar son 100% gratuitos y públicos.'
    }
  ],
  innovacion: [
    {
      id: 'inn-q1',
      question: '¿Qué es SENNOVA en el ecosistema institucional?',
      options: [
        'Una marca de ropa deportiva de los instructores.',
        'El Sistema de Investigación, Innovación y Desarrollo Tecnológico que conecta a aprendices con proyectos de ciencia aplicada.',
        'Un software para ver películas de entretenimiento.',
        'Un periódico impreso de noticias políticas.'
      ],
      correctIndex: 1,
      explanation: 'SENNOVA articula la I+D+i en el SENA mediante semilleros, grupos de investigación, prototipado y transferencia tecnológica para los sectores productivos.'
    },
    {
      id: 'inn-q2',
      question: '¿Qué es un TecnoParque SENA?',
      options: [
        'Un parque de diversiones mecánicas con costo de entrada.',
        'Una red de aceleración tecnológica gratuita para que aprendices y colombianos desarrollen prototipos funcionales con laboratorios avanzados.',
        'Un estacionamiento para vehículos eléctricos.',
        'Una bodega de almacenamiento de computadores en desuso.'
      ],
      correctIndex: 1,
      explanation: 'TecnoParque es un programa de innovación abierta que ofrece laboratorios de biotecnología, nanotecnología, electrónica y software para materializar prototipos.'
    },
    {
      id: 'inn-q3',
      question: '¿Qué financia el Fondo Emprender del SENA a los aprendices y egresados?',
      options: [
        'Vacaciones familiares en el exterior.',
        'Capital semilla no reembolsable (condonable) para la creación de empresas formales sostenibles.',
        'Multas de tránsito de los aprendices.',
        'Compra de vehículos de lujo personales.'
      ],
      correctIndex: 1,
      explanation: 'El Fondo Emprender otorga capital semilla condonable a planes de negocio viables estructurados por aprendices y egresados colombianos.'
    },
    {
      id: 'inn-q4',
      question: '¿Qué es la competencia internacional WorldSkills en la que compiten aprendices SENA?',
      options: [
        'Un torneo de fútbol amateur internacional.',
        'Las olimpiadas mundiales de habilidades técnicas y tecnológicas donde aprendices representan a Colombia frente a más de 80 países.',
        'Un concurso de canto aficionado.',
        'Una feria de venta de maquinaria usada.'
      ],
      correctIndex: 1,
      explanation: 'WorldSkills es la máxima competencia global de formación técnica donde la delegación colombiana del SENA compite con los más altos estándares mundiales.'
    }
  ]
};

export const DEFAULT_APPRENTICE: ApprenticeProfile = {
  name: 'Alejandro Morales Rivera',
  docType: 'CC',
  docNumber: '1020789456',
  regional: 'Regional Distrito Capital',
  trainingCenter: 'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)',
  programName: 'Análisis y Desarrollo de Software (ADSO)',
  programLevel: 'Tecnólogo',
  fichaNumber: '2874102',
  email: 'amorales.adso@misena.edu.co',
  startDate: '2026-10-06'
};

export const BADGES_LIST: Badge[] = [
  {
    id: 'badge-identidad',
    name: 'Emblema Institucional',
    description: 'Apropiaste el origen histórico de 1957, el escudo de los 3 sectores y el logosímbolo del aprendiz.',
    icon: 'Shield',
    moduleId: 'identidad'
  },
  {
    id: 'badge-formacion',
    name: 'Artífice del Saber FPI',
    description: 'Dominas la ruta pedagógica por competencias y las 6 alternativas de Etapa Productiva.',
    icon: 'Compass',
    moduleId: 'formacion'
  },
  {
    id: 'badge-reglamento',
    name: 'Guardián del Reglamento',
    description: 'Resolviste con éxito los dilemas de convivencia y dominas los derechos y deberes del Acuerdo 007.',
    icon: 'Scale',
    moduleId: 'reglamento'
  },
  {
    id: 'badge-bienestar',
    name: 'Líder de Comunidad',
    description: 'Comprendes las 9 dimensiones de bienestar, apoyos de sostenimiento y participación democrática.',
    icon: 'HeartHandshake',
    moduleId: 'bienestar'
  },
  {
    id: 'badge-innovacion',
    name: 'Pionero de Innovación',
    description: 'Conectaste con el ecosistema de investigación SENNOVA, TecnoParques y Fondo Emprender.',
    icon: 'Lightbulb',
    moduleId: 'innovacion'
  }
];
