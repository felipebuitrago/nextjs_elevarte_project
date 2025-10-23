"use client";
import React, { useEffect, useRef, useState } from 'react';
import { GraduationCap, Sparkles, Star, Award, Globe, Users } from 'lucide-react';
import ModalServicesCourses from './ui/ModalServicesCourses';
import type { Servicio } from './ServicesSection';

export type Modalidad = 'Presencial' | 'Online';

export interface Curso {
    id: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    subtitle: string;
    shortDesc: string;
    fullDescription: string;
    contenido: string[];
    beneficios: string[];
    duracion: string;
    precio: string;
    requisitos: string;
    modalidad: Modalidad[];
    sesiones: string;
}

export type CursoId = Curso['id'];
export type SelectedCurso = Curso | null;

const cursos: Servicio[] = [
  {
    id: 'desarrollo-intuitivo',
    icon: Sparkles,
    title: 'Desarrollo Intuitivo',
    subtitle: 'Energía y Meditación',
    shortDesc: 'Conecta con tu energía e intuición',
    fullDescription: 'Un taller práctico de 1 día para conectar con tu energía e intuición. Ideal para quienes inician su camino espiritual.',
    contenido: [
      'Comprensión del concepto de energía',
      'Reconocer tu energía y la de otros',
      'Técnicas de respiración consciente',
      'Meditación guiada para sanación',
      'Conexión con seres de luz',
      'Primeros pasos de autoconocimiento',
      'Diferenciar pensamientos de intuición',
      'Comunicación con ser superior'
    ],
    beneficios: [
      'Bases energéticas para tu camino espiritual',
      'Mayor calma y claridad mental',
      'Fortalecimiento de intuición',
      'Técnicas de protección energética',
      'Preparación para Reiki'
    ],
    duracion: '3.5-4h',
    precio: '$180',
    requisitos: 'Ninguno - Ideal para iniciar',
    modalidad: ['Presencial', 'Online'],
    formato: true,
  },
  {
    id: 'reiki-nivel-1',
    icon: Star,
    title: 'Reiki Usui Nivel I',
    subtitle: 'Iniciación',
    shortDesc: 'Tu primer contacto con Reiki',
    fullDescription: 'Primer contacto con Reiki: teoría, historia e iniciación en conceptos claves de energía, meditación y práctica guiada.',
    contenido: [
      'Teoría e historia del Reiki',
      'Conceptos claves de energía',
      'Meditación y enfoque',
      'Imposición de manos',
      'Uso del péndulo',
      'Primer símbolo de Reiki',
      'Attunement del Nivel I',
      'Práctica guiada'
    ],
    beneficios: [
      'Certificación Reiki Nivel I',
      'Capacidad de auto-sanación',
      'Aplicar Reiki a otros',
      'Base para niveles avanzados'
    ],
    duracion: '3.5-4h',
    precio: '$180',
    requisitos: 'Disposición y apertura',
    modalidad: ['Presencial', 'Online'],
    formato: true,
  },
  {
    id: 'reiki-nivel-2',
    icon: Award,
    title: 'Reiki Usui Nivel II',
    subtitle: 'Armonía y Reiki a Distancia',
    shortDesc: 'Expande tu práctica sin límites',
    fullDescription: 'Profundización de conceptos y técnicas avanzadas: Reiki a distancia sin limitación espacial ni temporal.',
    contenido: [
      'Profundización de conceptos',
      'Preguntas sobre práctica Nivel I',
      'Energía a través del espacio y tiempo',
      'Reiki a distancia',
      'Sanación espiritual',
      'Sanación de vidas pasadas',
      'Símbolo de armonía',
      'Símbolo de distancia',
      'Attunement del Nivel II'
    ],
    beneficios: [
      'Certificación Reiki Nivel II',
      'Practicar Reiki a distancia',
      'Sanación profunda espiritual',
      'Trabajo con vidas pasadas'
    ],
    duracion: '3h',
    precio: '$180',
    requisitos: 'Nivel I + 1 mes de práctica',
    modalidad: ['Presencial', 'Online'],
    formato: true,
  },
  {
    id: 'reiki-nivel-3',
    icon: GraduationCap,
    title: 'Reiki Usui Nivel III',
    subtitle: 'Maestría - Reiki Master',
    shortDesc: 'Conviértete en Maestro Reiki',
    fullDescription: 'Formación completa de Maestro Reiki. Aprende a realizar iniciaciones y guiar a otros en su camino.',
    contenido: [
      'Formación de Maestro Reiki',
      'Realizar iniciaciones a otros',
      'Símbolo de maestría',
      'Acompañamiento de procesos',
      'Programar energía Reiki',
      'Limpiezas energéticas de espacios',
      'Attunement del Nivel III'
    ],
    beneficios: [
      'Certificación Reiki Master',
      'Realizar iniciaciones',
      'Enseñar Reiki a otros',
      'Limpiezas energéticas profesionales'
    ],
    duracion: '3h',
    precio: '$220',
    requisitos: 'Nivel II + 2 meses práctica',
    modalidad: ['Presencial', 'Online'],
    formato: true,
  }
];

export default function Cursos() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedCurso, setSelectedCurso] = useState<Servicio | null>(null);

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

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            
          <h2 className="text-6xl lg:text-8xl font-Dongle text-[#8B4513] mb-4">
            Cursos & Formación
          </h2>

        </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {cursos.map((curso, index) => {
              
              return (
                <div
                  key={curso.id}
                  ref={(el) => { cardsRef.current[index] = el; }}
                  onMouseEnter={() => setHoveredCard(curso.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => setSelectedCurso(curso)}
                  className="group relative cursor-pointer"
                >
                  {/* Card */}
                  <div className={`
                    relative h-full backdrop-blur-xl bg-white/40 rounded-3xl p-8
                    border border-white/50 shadow-xl
                    transition-all duration-500 ease-out
                    ${hoveredCard === curso.id ? 'shadow-2xl scale-[1.02]' : ''}
                  `}>
                    {/* Gradient border effect on hover */}
                    <div className={`
                      absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100
                      transition-opacity duration-500
                      bg-gradient-to-br from-[#8B4513]/10 to-[#A0522D]/10
                      -z-10 blur-xl
                    `} />

                    {/* Top decoration line */}
                    <div className={`
                      absolute top-0 left-8 right-8 h-[3px] rounded-full
                      bg-gradient-to-r from-[#8B4513] to-[#A0522D]
                      transform origin-left scale-x-0 group-hover:scale-x-100
                      transition-transform duration-700 ease-out
                    `} />

                    {/* Content */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <h3 className="text-4xl md:text-5xl font-Dongle text-amber-900 mb-1">
                          {curso.title}
                        </h3>
                        <p className="text-sm text-amber-700/70 font-DMSans">
                          {curso.subtitle}
                        </p>
                      </div>

                      <p className="text-amber-800/80 leading-relaxed font-DMSans">
                        {curso.shortDesc}
                      </p>
                    </div>

                    {/* Info bar */}
                    <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-white/30 rounded-2xl border border-white/40">
                      <div>
                        <div className="text-xs text-amber-700/60 mb-1 font-DMSans">Inversión</div>
                        <div className="text-lg font-bold text-[#8B4513]">{curso.precio}</div>
                      </div>
                      <div>
                        <div className="text-xs text-amber-700/60 mb-1 font-DMSans">Duración</div>
                        <div className="text-lg font-bold text-[#8B4513]">{curso.duracion}</div>
                      </div>
                    </div>

                    {/* Modalidad tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {curso.modalidad.map((mod, i) => (
                        <div
                          key={i}
                          className="inline-flex items-center gap-1.5 text-sm font-Zain px-3 py-1.5 rounded-full bg-[#8B4513]/10 text-[#8B4513] border border-[#8B4513]/20"
                        >
                          {mod.includes('Presencial') ? (
                            <Users className="w-3 h-3" />
                          ) : (
                            <Globe className="w-3 h-3" />
                          )}
                          {mod}
                        </div>
                      ))}
                    </div>

                    {/* Click to view more hint */}
                    <div className="text-center py-3 text-sm text-[#8B4513]/60 font-Zain group-hover:text-[#8B4513] transition-colors">
                      Click para ver más información →
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-amber-800/70 text-lg mb-6 font-DMSans">
              ¿Primera vez en prácticas energéticas?
            </p>
            <button className="px-8 py-4 bg-white/40 backdrop-blur-sm text-amber-900 rounded-full font-Zain font-bold text-xl border-2 border-white/60 hover:bg-white/60 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Comienza con Desarrollo Intuitivo
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedCurso && (
        <ModalServicesCourses
          selectedServicio={selectedCurso}
          setSelectedServicio={setSelectedCurso}
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