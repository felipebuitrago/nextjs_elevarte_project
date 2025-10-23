"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Home, Users, Heart, MapPin, Globe } from 'lucide-react';
import ModalServicesCourses from './ui/ModalServicesCourses';
type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface Precio {
  tipo: string;
  valor: string;
}

export interface Servicio {
  id: string;
  icon: IconType;
  title: string;
  subtitle: string;
  shortDesc: string;
  fullDescription: string;
  queTrabajas?: string[];
  beneficios: string[];
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
}

const servicios = [
  {
    id: 'terapia-reiki',
    icon: Sparkles,
    title: 'Terapia Reiki',
    subtitle: 'Sanación Energética Holística',
    shortDesc: 'Canaliza energía universal para restaurar tu equilibrio',
    fullDescription: 'El Reiki Usui es una técnica de sanación energética que canaliza la energía universal hacia tu cuerpo, mente y espíritu para restaurar el equilibrio natural. Se aplica a través de la imposición de manos (sin contacto físico necesario) y puede realizarse tanto de manera presencial como a distancia.',
    queTrabajas: [
      'Liberar estrés, ansiedad, tristeza, inseguridad',
      'Disolver bloqueos energéticos',
      'Reducir dolores físicos y tensión muscular',
      'Mejorar la calidad del descanso y del sueño',
      'Sanar heridas emocionales y espirituales',
      'Conectar con la divinidad y tu esencia interior',
      'Complementar tratamientos médicos tradicionales'
    ],
    beneficios: ['Sanación profunda', 'Calma y equilibrio', 'Complementa tratamientos'],
    duracion: '45min - 1h',
    precio: '$80 Presencial a domicilio (Calgary), $70 A distancia (online mundial)',
    modalidad: ['Presencial', 'Online'],
    notaEtica: 'El Reiki es un complemento holístico que favorece la sanación y el bienestar. No sustituye servicios médicos ni psicológicos, pero puede potenciar y acompañar tratamientos tradicionales.',
  },
  {
    id: 'limpieza-espacios',
    icon: Home,
    title: 'Limpieza Energética',
    subtitle: 'Purificación de Espacios',
    shortDesc: 'Armoniza y libera energías en tus espacios',
    fullDescription: 'Los lugares donde vivimos y trabajamos absorben la energía de lo que allí ocurre: emociones, tensiones, discusiones, rutinas cargadas… Con el tiempo, estas energías pueden quedarse estancadas y generar pesadez, incomodidad o sensación de desorden en el ambiente. La Limpieza Energética con Reiki ayuda a purificar, sanar y armonizar hogares, oficinas y empresas.',
    queTrabajas: [
      'Disolver estancamientos energéticos',
      'Recuperar la armonía y ligereza del ambiente',
      'Favorecer la concentración, la calma y el descanso',
      'Atraer nuevas oportunidades y bienestar',
      'Liberar bloqueos para que la energía fluya'
    ],
    beneficios: ['Ambiente armonioso', 'Mayor concentración', 'Atrae bienestar'],
    duracion: 'Variable',
    precio: '$100 Desde Hogares, $120 Desde Oficinas, $400 Desde Empresas (2 sesiones)',
    modalidad: ['Calgary, Canada'],
    notaEtica: 'Servicio únicamente disponible en Calgary (Airdrie, Chestermere, Okotoks y Cochrane también disponibles por un valor adicional).',
  },
  {
    id: 'coaching-personal',
    icon: Users,
    title: 'Coaching Personal & PNL',
    subtitle: 'Desarrollo y Transformación',
    shortDesc: 'Alcanza tus metas y transforma tu vida',
    fullDescription: 'El Coaching en Desarrollo Personal es un proceso de acompañamiento semanal o quincenal diseñado para ayudarte a alcanzar tus metas, superar bloqueos y generar cambios reales en tu vida. A través de herramientas prácticas como la Programación Neurolingüística (PNL), mindfulness, respiración consciente, trabajamos en tus objetivos de manera clara y funcional.',
    queTrabajas: [
      'Toma de decisiones y cambios de vida',
      'Procesos de duelo y aceptación',
      'Regulación emocional y manejo del estrés',
      'Construir hábitos saludables y funcionales',
      'Fortalecer la autoestima y la confianza personal',
      'Transformar creencias limitantes en nuevas posibilidades'
    ],
    beneficios: ['Claridad en metas', 'Regulación emocional', 'Hábitos saludables'],
    duracion: '90min',
    precio: '$80 Por sesión',
    modalidad: ['Presencial', 'Online'],
    notaEtica: 'El Coaching no reemplaza procesos médicos, psicológicos ni psiquiátricos. Es un acompañamiento complementario de orientación y crecimiento personal.',
  },
  {
    id: 'spiritual-coaching',
    icon: Heart,
    title: 'Spiritual Coaching',
    subtitle: 'Conexión con tu Esencia',
    shortDesc: 'Descubre tu propósito espiritual',
    fullDescription: 'El Coaching Espiritual es un acompañamiento semanal o quincenal para quienes desean conectar con su esencia más profunda y darle un nuevo sentido a su vida. No se trata de religión, sino de un proceso de autodescubrimiento y conexión interior, donde encuentras herramientas para vivir con más armonía, propósito y plenitud.',
    queTrabajas: [
      'Reconocer tu propósito y tu camino espiritual',
      'Explorar y desarrollar tus dones y fortalezas internas',
      'Aprender a escuchar tu intuición y las señales de la vida',
      'Meditaciones y visualizaciones para conectar con tu luz interior',
      'Conexión con seres de luz',
      'Comprender la espiritualidad como camino de autoconocimiento'
    ],
    beneficios: ['Claridad de propósito', 'Conexión interior', 'Confianza y paz'],
    duracion: '90min',
    precio: '$80 Por sesión' ,
    modalidad: ['Presencial', 'Online'],
    notaEtica: 'Este es un proceso espiritual no religioso enfocado en el autodescubrimiento y la conexión interior.',
  }
];

export default function ServiceSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedServicio, setSelectedServicio] = useState<Servicio | null>(null);

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

        <div className="relative z-10 max-w-7xl mx-auto">
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
                  className="group relative"
                >
                  {/* Card */}
                  <div className={`
                  relative h-full backdrop-blur-xl bg-white/40 rounded-3xl p-8
                  border border-white/50 shadow-xl
                  transition-all duration-500 ease-out
                  ${hoveredCard === servicio.id ? 'shadow-2xl scale-[1.02]' : ''}
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
                          {servicio.title}
                        </h3>
                        <p className="text-sm text-amber-700/70 font-DMSans">
                          {servicio.subtitle}
                        </p>
                      </div>

                      <p className="text-amber-800/80 leading-relaxed font-DMSans">
                        {servicio.shortDesc}
                      </p>

                      {/* Benefits */}
                      <div className="flex flex-wrap gap-2">
                        {servicio.beneficios.map((benefit, i) => (
                          <span
                            key={i}
                            className="text-md px-3 py-1.5 rounded-full bg-white/50 text-amber-800 border border-white/50 font-Zain"
                          >
                            ✓ {benefit}
                          </span>
                        ))}
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

                    {/* Click hint */}
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
              ¿No estás seguro cuál servicio es para ti?
            </p>
            <button className="px-8 py-4 bg-white/40 backdrop-blur-sm text-amber-900 rounded-full font-Zain font-bold text-xl border-2 border-white/60 hover:bg-white/60 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Contáctame para orientación personalizada
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedServicio && (
        <ModalServicesCourses selectedServicio={selectedServicio} setSelectedServicio={setSelectedServicio} />
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