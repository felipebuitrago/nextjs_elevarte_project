"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Home, Users, Heart, MapPin, Globe, HandHelping } from 'lucide-react';
import ModalServices from './ui/ModalServices';
import ModalOfertas from './ui/ModalOfertas';
import { Oferta } from '@/types';
type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface Precio {
  tipo: string;
  valor: string;
}

interface OpcionesReiki {
  nombre: string;
  duracion: string;
  retroalimentacion?: string;
  inversion: { tipo: string; precio: string }[];
  idealPara: string;
  nota?: string;
}

export interface Servicio {
  id: string;
  icon: IconType;
  title: string;
  subtitle: string;
  shortDesc: string;
  fullDescription: string;
  queTrabajas?: string[];
  beneficios?: string[];
  duracion: string;
  precios?: string | Precio[];
  modalidad: string[];
  frecuencia?: string;
  notaEtica?: string;
  contenido?: string[];
  precio?: string;
  requisitos?: string;
  sesiones?: string;
  formato?: boolean;
  coverImage: string;
  opciones?: OpcionesReiki[];
  notaGeneral?: string;
  mensajeWhatsApp: string;
}

const servicios = [
  {
    id: 'terapia-reiki',
    icon: HandHelping,
    title: 'Terapia Reiki',
    coverImage: "https://yahanudbuxwjkhcybtsc.supabase.co/storage/v1/object/public/elevarte_imgs/reiki.jpg",
    subtitle: 'Canalización de la Energía Universal para sanar tu cuerpo, mente y espíritu.',
    shortDesc: 'Canaliza energía universal para restaurar tu equilibrio',
    fullDescription: 'El Reiki Usui es una técnica de sanación energética que canaliza la energía universal hacia tu cuerpo, mente y espíritu para restaurar el equilibrio natural. Se aplica a través de la imposición de manos (sin contacto físico necesario) y puede realizarse tanto de manera presencial como a distancia.',
    queTrabajas: [
      'Liberar estrés, ansiedad, tristeza, inseguridad y otras emociones agobiantes.',
      'Disolver bloqueos energéticos que afectan tu bienestar.',
      'Reducir dolores físicos y tensión muscular.',
      'Mejorar la calidad del descanso y del sueño.',
      'Sanar heridas emocionales y espirituales.',
      'Conectar con la divinidad y tu esencia interior.',
      'Complementar y potenciar tratamientos médicos tradicionales.'
    ],
    beneficios: ['Sanación profunda en cuerpo, mente y espíritu.', 'Sensación de calma, claridad y equilibrio interior.', 'Energía renovada y vitalidad.', 'Mayor conexión espiritual y confianza en la vida.'],
    duracion: '45min - 1h',
    precio: '$80 Presencial a domicilio (Calgary), $70 A distancia (online mundial)',
    modalidad: ['Presencial', 'Online'],
    opciones: [
      {
        nombre: 'Sesión Esencial',
        duracion: '30 minutos',
        retroalimentacion: 'Aproximadamente 15 minutos de retroalimentación, preguntas y respuestas',
        inversion: [
          { tipo: 'Presencial', precio: '$60' },
          { tipo: 'A distancia', precio: '$50' }
        ],
        idealPara: 'Ideal para quienes desean una primera experiencia con Reiki o mantener de forma frecuente y rutinaria su energía equilibrada de manera regular. Una sesión corta, pero profundamente revitalizante, especialmente si se realiza con cierta regularidad.',
      },
      {
        nombre: 'Sesión de Equilibrio',
        duracion: '1 hora',
        retroalimentacion: 'Aproximadamente 20 a 30 minutos de retroalimentación, preguntas y respuestas',
        inversion: [
          { tipo: 'Presencial', precio: '$80' },
          { tipo: 'A distancia', precio: '$70' }
        ],
        idealPara: 'Recomendada para quienes buscan liberar tensiones, equilibrar sus centros energéticos y conectar con mayor claridad interior. Incluye un espacio más amplio para integrar lo trabajado y recibir orientación personalizada.',
      },
      {
        nombre: 'Sesión Profunda',
        duracion: '1.5 horas',
        retroalimentacion: 'Aproximadamente 20 a 30 minutos de retroalimentación, preguntas y respuestas',
        inversion: [
          { tipo: 'Presencial', precio: '$100' }
        ],
        idealPara: 'Las sesiones presenciales de larga duración permiten un intercambio energético más profundo y personalizado. Esta opción es ideal para procesos de liberación, limpieza energética y expansión espiritual más intensa.',
        nota: 'Las sesiones de 1.5 y 2 horas están disponibles únicamente de forma presencial, ya que requieren un nivel de trabajo energético más profundo y un acompañamiento cercano que se facilita mejor en persona.',
      },
      {
        nombre: 'Sesión Integral Premium',
        duracion: '2 horas',
        retroalimentacion: 'Aproximadamente 20 a 30 minutos de retroalimentación, preguntas y respuestas',
        inversion: [
          { tipo: 'Presencial', precio: '$130' }
        ],
        idealPara: 'Diseñada para quienes desean una experiencia completa de sanación y guía espiritual. Permite trabajar profundamente a nivel físico, emocional, mental y espiritual, favoreciendo la apertura y reconexión con el ser interior.',
        nota: 'Las sesiones de 1.5 y 2 horas están disponibles únicamente de forma presencial, ya que requieren un nivel de trabajo energético más profundo y un acompañamiento cercano que se facilita mejor en persona.',
      }
    ],
    notaGeneral: 'El tiempo de retroalimentación puede variar ligeramente según la energía que se haya movido durante el proceso y las preguntas o sensaciones que el cliente desee compartir. Este espacio es fundamental para integrar conscientemente lo vivido y comprender los mensajes o bloqueos energéticos identificados.',
    notaEtica: 'El Reiki es un complemento holístico que favorece la sanación y el bienestar. No sustituye servicios médicos ni psicológicos, pero puede potenciar y acompañar tratamientos tradicionales al ser acompañamiento holístico.',
    mensajeWhatsApp: "https://wa.me/14035890618?text=Hola%20Camila,%20me%20gustaría%20agendar%20una%20sesión%20de%20Reiki",
  },
  {
    id: 'limpieza-espacios',
    icon: Home,
    coverImage: "https://yahanudbuxwjkhcybtsc.supabase.co/storage/v1/object/public/elevarte_imgs/limpieza_energetica.jpg",
    title: 'Limpieza Energética de Espacios',
    subtitle: 'Renueva y purifica la energía de tu hogar o negocio y crea armonía.',
    shortDesc: 'Armoniza y libera energías en tus espacios',
    fullDescription: 'Los lugares donde vivimos y trabajamos absorben la energía de lo que allí ocurre: emociones, tensiones, discusiones, rutinas cargadas… Con el tiempo, estas energías pueden quedarse estancadas y generar pesadez, incomodidad o sensación de desorden en el ambiente. La Limpieza Energética con Reiki ayuda a purificar, sanar y armonizar hogares, oficinas y empresas, liberando bloqueos para que la energía vuelva a fluir con ligereza.',
    queTrabajas: [
      'Mejorar el flujo energético: Una limpieza energética favorece un flujo de energía más armónico y positivo dentro del espacio del hogar.',
      'Mejorar el estado de ánimo: Al liberar la energía negativa, se crea un ambiente más liviano y armonioso, que influye positivamente en el bienestar emocional de quienes habitan el lugar.',
      'Reducir el estrés: Eliminar el desorden y realizar una limpieza energética genera un entorno más tranquilo y relajante, ayudando a disminuir el estrés y promover la calma interior.',
      'Mejorar descanso: Un hogar energéticamente equilibrado contribuye a mejorar la calidad del sueño, favoreciendo el descanso y la renovación física y mental.',
      'Crear intenciones positivas: Al establecer intenciones conscientes durante la limpieza, se potencia la manifestación de esas energías dentro del hogar.',
      "Liberar la energía estancada: Las técnicas de limpieza energética, como el sahumerio o la limpieza con hierbas, ayudan a disipar la energía densa o estancada, renovando el ambiente y llenándolo de vitalidad.",
      "Generar mayor conexión espiritual: Los rituales de limpieza del hogar suelen incluir elementos espirituales que fortalecen la conexión entre los habitantes y su espacio, elevando su frecuencia energética.",
      "Fomentar armonía: Al equilibrar la energía del hogar, se promueve un mayor sentido de paz, armonía y bienestar entre todos los miembros de la familia.",
      "Aumenta la productividad: Un espacio organizado y energéticamente limpio favorece la concentración, la creatividad y la eficiencia, generando un entorno ideal para trabajar o crear.",
      "Incrementar sensación de renovación: Una limpieza energética del hogar brinda una sensación de frescura, renovación y nuevos comienzos, ayudando a liberar cualquier influencia o energía negativa asociada al pasado."
    ],
    duracion: 'Entre 1 y 1.5 horas',
    precio: 'Hogares: desde $100\nOficinas: desde $120\nEmpresas (2 sesiones incluidas): desde $400',
    modalidad: ['Calgary, Canada'],
    notaEtica: 'Este servicio está únicamente disponible en Calgary (Airdrie, Chestermere, Okotoks y Cochrane también disponibles por un valor adicional).',
    mensajeWhatsApp: "https://wa.me/14035890618?text=Hola%20Camila,%20me%20gustaría%20agendar%20una%20limpieza%20energética%20de%20espacios",
  },
  {
    id: 'coaching-personal',
    icon: Users,
    coverImage: "https://yahanudbuxwjkhcybtsc.supabase.co/storage/v1/object/public/elevarte_imgs/coaching.jpg",
    title: 'Coaching Personal & PNL',
    subtitle: 'Transforma tus hábitos, pensamientos y emociones con guía consciente, y dale un cambio radical a tu vida.',
    shortDesc: 'Alcanza tus metas y transforma tu vida',
    fullDescription: 'El Coaching en Desarrollo Personal es un proceso de acompañamiento semanal o quincenal diseñado para ayudarte a alcanzar tus metas, superar bloqueos y generar cambios reales en tu vida. A través de herramientas prácticas como la Programación Neurolingüística (PNL), mindfulness, respiración consciente, entre otros, trabajamos en tus objetivos de manera clara y funcional.',
    queTrabajas: [
      'Toma de decisiones y cambios de vida.',
      'Procesos de duelo y aceptación.',
      'Regulación emocional y manejo del estrés.',
      'Construir hábitos saludables y funcionales.',
      'Fortalecer la autoestima y la confianza personal.',
      'Transformar creencias limitantes en nuevas posibilidades.'
    ],
    beneficios: ['Mayor claridad en tus metas.', 'Orden y estructura en tu día a día.', 'Regulación emocional y calma interior.', 'Crecimiento personal sostenido.', 'Autoconocimiento y comprensión de tus emociones.'],
    duracion: '75min',
    precio: '$80 Por sesión',
    modalidad: ['Presencial', 'Online'],
    notaEtica: 'El Coaching no reemplaza procesos médicos, psicológicos ni psiquiátricos. Es un acompañamiento complementario de orientación y crecimiento personal.',
    mensajeWhatsApp: "https://wa.me/14035890618?text=Hola%20Camila,%20me%20gustaría%20agendar%20una%20sesión%20de%20Coaching%20Personal%20y%20PNL",
  },
  {
    id: 'spiritual-coaching',
    icon: Heart,
    coverImage: "https://yahanudbuxwjkhcybtsc.supabase.co/storage/v1/object/public/elevarte_imgs/coaching(1).jpg",
    title: 'Spiritual Coaching',
    subtitle: 'Reconecta con tu esencia, tu intuición y tu propósito más profundo.',
    shortDesc: 'Descubre tu propósito espiritual',
    fullDescription: 'El Coaching Espiritual es un acompañamiento semanal o quincenal para quienes desean conectar con su esencia más profunda y darle un nuevo sentido a su vida. No se trata de religión, sino de un proceso de autodescubrimiento y conexión interior, donde encuentras herramientas para vivir con más armonía, propósito y plenitud.',
    queTrabajas: [
      'Reconocer tu propósito y tu camino espiritual.',
      'Explorar y desarrollar tus dones y fortalezas internas.',
      'Aprender a escuchar tu intuición y las señales de la vida.',
      'Meditaciones y visualizaciones para conectar con tu luz interior y con seres de luz.',
      'Comprender la espiritualidad como un camino de autoconocimiento y expansión personal.'
    ],
    beneficios: ['Mayor claridad en tu vida y decisiones.', 'Sentir mayor conexión contigo y con el todo.', 'Experiencias de calma, sanación y apertura interior.', 'Transformar miedos en confianza y dudas en propósito.'],
    duracion: '75min',
    precio: '$80 Por sesión',
    modalidad: ['Presencial', 'Online'],
    mensajeWhatsApp: "https://wa.me/14035890618?text=Hola%20Camila,%20me%20gustaría%20agendar%20una%20sesión%20de%20Spiritual%20Coaching",
  }
];

export default function ServiceSection({ ofertas }: { ofertas: Oferta[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedServicio, setSelectedServicio] = useState<Servicio | null>(null);
  const [openModalOfertas, setOpenModalOfertas] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cardsRef.current.forEach((card, i) => {
              if (card) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(80px) scale(0.9)';

                setTimeout(() => {
                  card.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
                  card.style.opacity = '1';
                  card.style.transform = 'translateY(0) scale(1)';
                }, 200 + (i * 150));
              }
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (selectedServicio) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedServicio]);

  return (
    <>
      <section
        ref={sectionRef}
        id='services-section'
        className="relative min-h-screen py-20 px-4 md:px-8"
      >

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-6xl lg:text-8xl font-Dongle text-[#8B4513] mb-4">
              Servicios
            </h2>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {servicios.map((servicio, index) => {

              return (
                <div
                  key={servicio.id}
                  ref={(el) => { cardsRef.current[index] = el; }}
                  onMouseEnter={() => setHoveredCard(servicio.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => setSelectedServicio(servicio)}
                  className="group relative cursor-pointer"
                >
                  {/* Card */}
                  <div className={`
                    relative h-full backdrop-blur-xl bg-white/40 rounded-3xl overflow-hidden
                    border border-white/50 shadow-xl
                    transition-all duration-500 ease-out
                    ${hoveredCard === servicio.id ? 'shadow-2xl scale-[1.02]' : ''}
                  `}>
                    {/* Gradient glow on hover */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#8B4513]/10 to-[#A0522D]/10 -z-10 blur-xl" />

                    {/* Top decoration line */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#8B4513] to-[#A0522D] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out z-10" />

                    {/* Image Container */}
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-amber-900/20 to-amber-800/20">
                      {/* Imagen */}
                      <img
                        src={servicio.coverImage || "/photo.jpg"}
                        alt={servicio.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Icon Badge flotante */}
                      <div className="absolute top-6 left-6 p-3 rounded-2xl bg-white/90 backdrop-blur-sm border border-white shadow-lg transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <servicio.icon className="w-6 h-6 text-amber-900" />
                      </div>

                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <div className="space-y-4 mb-6">
                        <div>
                          <h3 className="text-4xl md:text-5xl font-Dongle text-amber-900 mb-1 leading-none">
                            {servicio.title}
                          </h3>
                          <p className="text-sm text-amber-700/70 font-DMSans leading-tight">
                            {servicio.subtitle}
                          </p>
                        </div>

                      </div>

                      {/* Modalidad tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {servicio.modalidad.map((mod, i) => (
                          <div
                            key={i}
                            className="inline-flex items-center gap-1.5 text-sm font-Zain px-3 py-1.5 rounded-full bg-amber-900/10 text-amber-900 border border-amber-900/20"
                          >
                            {mod.includes('Calgary') ? (
                              <MapPin className="w-3 h-3" />
                            ) : mod.includes('Presencial') ? (
                              <Users className="w-3 h-3" />
                            ) : (
                              <Globe className="w-3 h-3" />
                            )}
                            {mod}
                          </div>
                        ))}
                      </div>

                      {/* Click hint con línea decorativa */}
                      <div className="pt-4 border-t border-amber-900/10">
                        <div className="flex items-center justify-between text-sm text-[#8B4513]/60 font-Zain group-hover:text-[#8B4513] transition-colors">
                          <span>Click para ver más información</span>
                          <svg
                            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ofertas button */}
          {
            ofertas.length > 0 && (
              <div className="text-center mt-12">
                <button
                  className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 via-amber-600 to-red-500 text-white rounded-2xl font-Zain font-bold text-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden cursor-pointer"
                  onClick={() => setOpenModalOfertas(true)}
                >
                  {/* Efecto de brillo animado */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  {/* Contenido */}
                  <span className="relative flex items-center gap-3">
                    Mira nuestras ofertas especiales
                  </span>
                </button>
              </div>
            )
          }

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-amber-800/70 text-lg mb-6 font-DMSans">
              ¿No estás seguro cuál servicio es para ti?
            </p>
            <button
              className="px-8 py-4 bg-white/40 backdrop-blur-sm text-amber-900 rounded-full font-Zain font-bold text-xl border-2 border-white/60 hover:bg-white/60 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => window.open("https://wa.me/14035890618?text=Hola%20Camila,%20me%20gustaría%20recibir%20orientación%20personalizada", '_blank')}
            >
              Contáctame para orientación personalizada
            </button>
          </div>

        </div>
      </section>

      {/* Modal */}
      {selectedServicio && (
        <ModalServices selectedServicio={selectedServicio} setSelectedServicio={setSelectedServicio} />
      )}

      {
        ofertas.length > 0 && (
          <ModalOfertas
            isOpen={openModalOfertas}
            onClose={() => setOpenModalOfertas(false)}
            ofertas={ofertas}
          />
        )
      }

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(139, 69, 19, 0.1);
          border-radius: 4px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(139, 69, 19, 0.3);
          border-radius: 4px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 69, 19, 0.5);
        }
      `}</style>
    </>
  );
}