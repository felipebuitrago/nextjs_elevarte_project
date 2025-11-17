"use client";
import { useEffect, useRef, useState } from 'react';
import { Globe, Users } from 'lucide-react';
import ModalCourses from './ui/ModalCourses';
import { agendarDesarrolloIntuitivoWhatsApp } from '@/lib/utils';

interface PracticaAdicional {
  presencial: string;
  virtual: string;
}

export interface Curso {
  id: string;
  title: string;
  subtitle: string;
  nivel?: string; // Para identificar visualmente el nivel
  fullDescription: string;
  incluye: string[];
  beneficios: string[];
  duracion: string;
  precio: string;
  requisitos: string;
  modalidad: string[];
  notaFinal?: string;
  practicaAdicional?: PracticaAdicional;
  esReiki: boolean; // Para agrupar visualmente
  orden: number; // Para ordenar los cursos
  badge?: string; // "Recomendado", "Popular", etc.
  mensajeWhatsApp: string;
}

const cursos: Curso[] = [
  {
    id: 'desarrollo-intuitivo',
    title: 'Desarrollo Intuitivo, Energía y Meditación',
    subtitle: 'Conecta con tu energía e intuición',
    fullDescription: 'Un taller vivencial y personalizado donde aprenderás a reconectar con tu energía, despertar tu intuición y cultivar una mayor conciencia espiritual. Ideal como primer paso para quienes desean comenzar su camino energético o profundizar en prácticas de sanación y autoconocimiento.',
    incluye: [
      'Comprensión del concepto de energía.',
      'Reconocer tu energía y la de otros.',
      'Técnicas de respiración consciente.',
      'Meditación guiada de sanación y conexión con seres de luz.',
      'Primeros pasos de autoconocimiento e intuición.',
      'Bases para aprender a diferenciar pensamientos intrusivos de mensajes intuitivos, y comunicación con el Ser Superior.'
    ],
    beneficios: [
      'Bases energéticas para tu camino y cuidado espiritual',
      'Mayor calma y claridad mental',
      'Fortalecimiento de la intuición y autoconfianza',
      'Aprendizaje de técnicas de protección energéticas y espirituales',
      'Preparación para Reiki y otras prácticas espirituales'
    ],
    duracion: '3.5-4 horas (1 sesión)',
    precio: '$180',
    requisitos: 'Ninguno - Ideal para principiantes',
    modalidad: ['Presencial', 'Online'],
    esReiki: false,
    orden: 1,
    badge: 'Recomendado para iniciar',
    mensajeWhatsApp: "https://wa.me/14035890618?text=Hola%20Camila,%20me%20gustaría%20agendar%20un%20taller%20de%20Desarrollo%20Intuitivo",
  },
  {
    id: 'reiki-nivel-1',
    title: 'Reiki Usui Nivel I',
    subtitle: 'Iniciación',
    nivel: 'I',
    fullDescription: 'Un curso personalizado donde aprenderás a canalizar energía vital para equilibrarte, sanar y reconectar contigo desde lo más profundo, así como asistir a otros en su proceso.',
    incluye: [
      'Introducción a la historia y filosofía del Reiki',
      'Fundamentos de la energía y su flujo en el cuerpo',
      'Práctica de meditación y enfoque energético',
      'Imposición de manos (presencial y a distancia)',
      'Uso básico del péndulo para lectura energética',
      'Enseñanza y activación del primer símbolo de Reiki',
      'Ceremonia simbólica de iniciación energética (Attunement Nivel I)',
      'Práctica guiada para integrar lo aprendido',
      'Acompañamiento posterior vía WhatsApp o correo electrónico para resolver dudas o preguntas teóricas, durante horario diurno y según disponibilidad del maestro.'
    ],
    beneficios: [
      'Conexión profunda con tu energía vital y espiritual',
      'Aprendes a canalizar energía para ti y para otros',
      'Bases de desarrollo de la intuición y sensibilidad energética',
      'Base sólida para tu camino en terapias energéticas y sanación',
      'Iniciación al camino de vida Reiki desde la consciencia y el respeto'
    ],
    duracion: '3.5-4 horas (1 sesión)',
    precio: '$180',
    requisitos: 'Disposición y apertura',
    modalidad: ['Presencial', 'Online'],
    notaFinal: 'La práctica individual posterior a cada clase es esencial para integrar lo aprendido. El avance y profundidad del proceso dependen del compromiso, constancia y disciplina personal de cada estudiante.',
    practicaAdicional: {
      presencial: '$60 (1 hora)',
      virtual: '$50 (1 hora)'
    },
    esReiki: true,
    orden: 2,
    mensajeWhatsApp: "https://wa.me/14035890618?text=Hola%20Camila,%20me%20gustaría%20agendar%20un%20curso%20de%20Reiki%20Nivel%201",
  },
  {
    id: 'reiki-nivel-2',
    title: 'Reiki Usui Nivel II',
    subtitle: 'Armonía y Reiki a Distancia',
    nivel: 'II',
    fullDescription: 'Un curso para profundizar tu práctica energética y expandir tu capacidad de sanación más allá del tiempo y el espacio. Ideal para quienes ya completaron el Nivel I y desean seguir creciendo en conciencia, técnica y conexión espiritual.',
    incluye: [
      'Resolución de dudas y repaso de prácticas del Nivel I',
      'Profundización en conceptos de energía a distancia',
      'Reiki a través del espacio y el tiempo (Reiki a distancia)',
      'Reiki como sanación espiritual y de vidas pasadas',
      'Enseñanza y activación de los símbolos de armonía y distancia',
      'Práctica de meditación y enfoque energético',
      'Ceremonia simbólica de iniciación energética (Attunement Nivel II)',
      'Práctica guiada para aplicar lo aprendido',
      'Acompañamiento posterior vía WhatsApp o correo electrónico para resolver dudas o preguntas teóricas, durante horario diurno y según disponibilidad del maestro.'
    ],
    beneficios: [
      'Capacidad de enviar Reiki a distancia a personas, situaciones y lugares',
      'Expansión de tu percepción energética y canal intuitivo',
      'Mayor profundidad en procesos de sanación emocional y espiritual',
      'Herramientas para acompañar a otros en procesos más complejos',
      'Fortalecimiento de tu compromiso con el camino del Reiki'
    ],
    duracion: '3 horas (1 sesión)',
    precio: '$180',
    requisitos: 'Nivel I + mínimo 1 mes de práctica continua',
    modalidad: ['Presencial', 'Online'],
    notaFinal: 'La práctica individual posterior a cada clase es esencial para integrar lo aprendido. El avance y profundidad del proceso dependen del compromiso, constancia y disciplina personal de cada estudiante.',
    practicaAdicional: {
      presencial: '$60 (1 hora)',
      virtual: '$50 (1 hora)'
    },
    esReiki: true,
    orden: 3,
    mensajeWhatsApp: "https://wa.me/14035890618?text=Hola%20Camila,%20me%20gustaría%20agendar%20un%20curso%20de%20Reiki%20Nivel%202",
  },
  {
    id: 'reiki-nivel-3',
    title: 'Reiki Usui Nivel III',
    subtitle: 'Maestría (Reiki Master)',
    nivel: 'III',
    fullDescription: 'Un encuentro profundo con tu rol de guía energética. Este nivel te prepara para formar a otros, transmitir el legado del Reiki y expandir tu práctica hacia espacios más conscientes, comprometidos y transformadores.',
    incluye: [
      'Aprendizaje para realizar iniciaciones (Attunements) a nuevos practicantes',
      'Datos legales y éticos a tener en cuenta para ejercer como terapeuta Reiki en Canadá',
      'Técnicas para programar energía Reiki en beneficio de proyectos',
      'Formación en limpiezas energéticas de espacios físicos (hogares, oficinas, etc.)',
      'Enseñanza y activación del símbolo de maestría Reiki',
      'Reflexión sobre el rol del Maestro como canal, guía y aprendiz continuo',
      'Espacio para práctica guiada, preguntas y cierre ceremonial',
      'Acompañamiento posterior vía WhatsApp o correo electrónico para resolver dudas o preguntas teóricas, durante horario diurno y según disponibilidad del maestro.'
    ],
    beneficios: [
      'Habilitado/a para enseñar Reiki y formar a nuevos practicantes',
      'Mayor integración de la energía Reiki en todos los aspectos de tu vida',
      'Fortalecimiento de tu liderazgo interior y claridad espiritual',
      'Conexión profunda con tu propósito de vida como canal de sanación',
      'Expansión de tu práctica energética hacia espacios más amplios y colectivos'
    ],
    duracion: '3 horas (1 sesión)',
    precio: '$220',
    requisitos: 'Nivel II + al menos 2 meses de práctica continua',
    modalidad: ['Presencial', 'Online'],
    notaFinal: 'La práctica individual posterior a cada clase es esencial para integrar lo aprendido. El avance y profundidad del proceso dependen del compromiso, constancia y disciplina personal de cada estudiante.',
    practicaAdicional: {
      presencial: '$60 (1 hora)',
      virtual: '$50 (1 hora)'
    },
    esReiki: true,
    orden: 4,
    mensajeWhatsApp: "https://wa.me/14035890618?text=Hola%20Camila,%20me%20gustaría%20agendar%20un%20curso%20de%20Reiki%20Nivel%203",
    badge: 'Maestría'
  }
];

export default function Cursos() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedCurso, setSelectedCurso] = useState<Curso | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cardsRef.current.forEach((card: HTMLDivElement | null, i) => {
              if (!(card instanceof HTMLDivElement)) return;
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
    if (selectedCurso) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCurso]);

  return (
    <>
      <section
        ref={sectionRef}
        id='courses-section'
        className="relative min-h-screen py-20 px-4 md:px-8"
      >
        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-6xl lg:text-8xl font-Dongle text-[#8B4513] mb-4">
              Cursos & Formación
            </h2>
            <p className="text-lg text-amber-900/70 font-DMSans max-w-2xl mx-auto">
              Clases personalizadas (1 a 1 o máximo 2 personas), con teoría y práctica
            </p>
          </div>

          {/* Curso Introductorio - Featured Card */}
          {cursos.filter(c => !c.esReiki).map((curso, index) => (
            <div
              key={curso.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              onMouseEnter={() => setHoveredCard(curso.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setSelectedCurso(curso)}
              className="group relative cursor-pointer mb-8"
            >
              <div className={`
                relative backdrop-blur-xl bg-white/40 rounded-3xl overflow-hidden
                border border-white/50 shadow-xl
                transition-all duration-500 ease-out
                ${hoveredCard === curso.id ? 'shadow-2xl scale-[1.02]' : ''}
              `}>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-amber-900/10 to-amber-800/10 -z-10 blur-xl" />

                {/* Top decoration line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-900 to-amber-800 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out z-10" />

                <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-0">
                  {/* Image Section */}
                  <div className="relative h-48 md:h-auto bg-gradient-to-br from-amber-900/20 to-amber-800/20">
                    <img
                      src="https://yahanudbuxwjkhcybtsc.supabase.co/storage/v1/object/public/elevarte_imgs/img1.jpg"
                      alt={curso.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                  </div>

                  {/* Content Section */}
                  <div className="p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-3xl md:text-4xl font-Dongle text-amber-900 mb-2 leading-none">
                        {curso.title}
                      </h3>
                      <p className="text-sm md:text-base text-amber-900/70 font-DMSans leading-relaxed mb-6 line-clamp-3">
                        {curso.fullDescription}
                      </p>
                    </div>

                    {/* Info Footer */}
                    <div className="space-y-3">

                      {/* Modalidad tags */}
                      <div className="flex flex-wrap gap-2">
                        {curso.modalidad.map((mod, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full bg-amber-900/10 text-amber-900 border border-amber-900/20 font-DMSans"
                          >
                            {mod.includes('Presencial') ? (
                              <Users className="w-3 h-3" />
                            ) : (
                              <Globe className="w-3 h-3" />
                            )}
                            {mod}
                          </span>
                        ))}
                      </div>

                      {/* CTA hint */}
                      <div className="pt-3 flex items-center justify-center text-sm text-amber-900/60 font-Zain group-hover:text-amber-900 transition-colors">
                        <span>Click para ver más información</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Sección Reiki */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h3 className="text-5xl md:text-6xl font-Dongle text-amber-900 mb-2">
                Formación en Reiki Usui
              </h3>
              <p className="text-amber-900/70 font-DMSans">
                Camino progresivo de 3 niveles
              </p>
            </div>

            {/* Reiki Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cursos.filter(c => c.esReiki).map((curso, index) => (
                <div
                  key={curso.id}
                  ref={(el) => { cardsRef.current[index + 1] = el; }}
                  onMouseEnter={() => setHoveredCard(curso.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => setSelectedCurso(curso)}
                  className="group relative cursor-pointer"
                >
                  <div className={`
              relative h-full backdrop-blur-xl bg-white/40 rounded-3xl p-6
              border border-white/50 shadow-xl
              transition-all duration-500 ease-out
              ${hoveredCard === curso.id ? 'shadow-2xl scale-[1.02]' : ''}
            `}>
                    {/* Glow */}
                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#8B4513]/10 to-[#A0522D]/10 -z-10 blur-xl" />

                    {/* Top line */}
                    <div className="absolute top-0 left-8 right-8 h-[3px] rounded-full bg-gradient-to-r from-[#8B4513] to-[#A0522D] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />

                    {/* Content */}
                    <h3 className="text-3xl md:text-4xl font-Dongle text-amber-900 mb-1 leading-tight">
                      {curso.title}
                    </h3>
                    <p className="text-sm text-amber-700/70 font-DMSans mb-4">
                      {curso.subtitle}
                    </p>

                    {/* Requisitos */}
                    <div className="p-3 rounded-xl bg-amber-50/50 border border-amber-900/10 mb-4">
                      <p className="text-xs text-amber-900/70 font-DMSans">
                        <strong className="font-Zain">Requisito:</strong> {curso.requisitos}
                      </p>
                    </div>

                    {/* Modalidad */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {curso.modalidad.map((mod, i) => (
                        <div key={i} className="inline-flex items-center gap-1 text-xs font-Zain px-2 py-1 rounded-full bg-amber-900/10 text-amber-900 border border-amber-900/20">
                          {mod.includes('Presencial') ? (
                            <Users className="w-3 h-3" />
                          ) : (
                            <Globe className="w-3 h-3" />
                          )}
                          {mod.split(' ')[0]}
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="pt-3">
                      <div className="flex items-center justify-center text-sm text-[#8B4513]/60 font-Zain group-hover:text-[#8B4513] transition-colors">
                        <span>Click para ver más información</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Final */}
          <div className="text-center mt-16">
            <p className="text-amber-800/70 text-lg mb-6 font-DMSans">
              ¿Aprendiendo sobre terapias energéticas por primera vez?
            </p>
            <button 
              onClick={() => window.open(agendarDesarrolloIntuitivoWhatsApp, '_blank')}
              className="px-8 py-4 bg-white/40 backdrop-blur-sm text-amber-900 rounded-full font-Zain font-bold text-xl border-2 border-white/60 hover:bg-white/60 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Comienza con Desarrollo Intuitivo
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedCurso && (
        <ModalCourses
          selectedCurso={selectedCurso}
          setSelectedCurso={setSelectedCurso}
        />
      )}

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

        /* Custom scrollbar for modal */
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