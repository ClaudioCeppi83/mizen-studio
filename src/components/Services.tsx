import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const services = [
    {
      id: '01',
      title: 'Auditoría de Fricción & Reingeniería Operativa',
      subtitle: 'Operational Friction Audit',
      iconDark: '/assets/services/cash-register-dark.svg',
      iconLight: '/assets/services/cash-register-light.svg',
      previewDark: '/assets/ui-previews/preview-cash-audit-dark.svg',
      previewLight: '/assets/ui-previews/preview-cash-audit-light.svg',
      forWhom: 'Grupos de restauración y operaciones con sistemas lentos que provocan esperas de comensales, fatiga en sala o discrepancias constantes entre el consumo real y la caja.',
      deliverables: [
        'Detección in situ y remota de cuellos de botella y clics superfluos en el servicio.',
        'Mapeo de fugas de margen entre escandallos teóricos y consumo real de inventario.',
        'Blueprint técnico de ergonomía y reestructuración de flujos de interacción.'
      ],
      ctaText: 'Solicitar Auditoría de Fricción'
    },
    {
      id: '02',
      title: 'Arquitectura de Interfaces de Alta Velocidad (POS, KDS & Turnos)',
      subtitle: 'High-Speed UI Architecture',
      iconDark: '/assets/services/kds-screen-dark.svg',
      iconLight: '/assets/services/kds-screen-light.svg',
      previewDark: '/assets/ui-previews/preview-kds-card-dark.svg',
      previewLight: '/assets/ui-previews/preview-kds-card-light.svg',
      forWhom: 'Operaciones que van a implantar herramientas táctiles internas y exigen pantallas que el personal domine en minutos, sin margen de error en horas punta.',
      deliverables: [
        'Vistas segmentadas por rol (versión táctil operario vs analítica directiva).',
        'Protocolos de diseño defensivo con target táctil de 48px y confirmación estricta.',
        'Sistema de diseño (Design System MIZEN) tokenizado y listo para desarrollo.',
        'Prototipos interactivos de alta fidelidad validados antes de programar código.'
      ],
      ctaText: 'Diseñar Sistema de Interfaz'
    },
    {
      id: '03',
      title: 'Desarrollo de Software a Medida & Plataformas Propias',
      subtitle: 'Turnkey Operational Engineering',
      iconDark: '/assets/services/recipe-costing-dark.svg',
      iconLight: '/assets/services/recipe-costing-light.svg',
      previewDark: '/assets/ui-previews/preview-dish-margin-dark.svg',
      previewLight: '/assets/ui-previews/preview-dish-margin-light.svg',
      forWhom: 'Compañías que necesitan sistemas propios independientes de suscripciones comerciales genéricas, con soberanía de datos y latencia inferior a 16ms.',
      deliverables: [
        'Aplicaciones web en React y TypeScript con render ultrarrápido (<16ms, 60 FPS).',
        'Persistencia offline-first y sincronización de datos de alta tolerancia a fallos.',
        'Integración nativa con impresoras de comandas (ESC/POS), pasarelas bancarias y ERPs.',
        'Soberanía total: código fuente, repositorios y despliegues propiedad 100% del cliente.'
      ],
      ctaText: 'Desarrollar Software a Medida'
    }
  ];

  return (
    <section id="capacidades" style={{
      paddingTop: '80px',
      paddingBottom: '80px',
      borderBottom: '1px solid var(--border-industrial)',
      backgroundColor: 'var(--canvas-bg)',
      position: 'relative'
    }} className="grid-bg-overlay">
      
      {/* Cartesian Markers */}
      <span className="cartesian-coord cartesian-tl">SYS_24:84 // SERVICIOS</span>
      <span className="cartesian-coord cartesian-tr">METHOD // CAPACIDADES</span>

      <div className="container-custom">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="badge-tag" style={{ marginBottom: '12px' }}>
            <span>// 03. CAPACIDADES & LÍNEAS DE INTERVENCIÓN</span>
          </div>
          
          <h2 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            marginBottom: '12px',
            color: 'var(--text-primary)'
          }}>
            Planos técnicos de intervención.
          </h2>
          
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '15px',
            maxWidth: '620px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Sin presupuestos inflados ni ambigüedades. Tres formatos de encargo con entregables exactos y garantía de ejecución profesional.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {services.map(srv => (
            <div
              key={srv.id}
              className="card-panel card-panel-interactive"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              <div>
                {/* Top Module Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '16px',
                  marginBottom: '16px',
                  borderBottom: '1px solid var(--border-industrial)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: 'var(--radius-control)',
                      backgroundColor: 'var(--canvas-bg)',
                      border: '1px solid var(--border-industrial)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <img
                        src={srv.iconLight}
                        alt={`Icono de ${srv.title}`}
                        className="theme-asset-light"
                        width={18}
                        height={18}
                      />
                      <img
                        src={srv.iconDark}
                        alt={`Icono de ${srv.title}`}
                        className="theme-asset-dark"
                        width={18}
                        height={18}
                      />
                    </div>
                    <span className="font-mono" style={{ fontSize: '11px', color: 'var(--accent-text)', fontWeight: 600 }}>
                      MOD_0{srv.id} // ATELIER
                    </span>
                  </div>

                  <span className="font-mono" style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: 'var(--text-secondary)'
                  }}>
                    {srv.id}
                  </span>
                </div>

                {/* Subtitle / English Descriptor */}
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}>
                  {srv.subtitle}
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '14px',
                  lineHeight: 1.3
                }}>
                  {srv.title}
                </h3>

                {/* Visual Preview Graphic from /assets/ */}
                <div style={{
                  margin: '16px 0',
                  padding: '12px',
                  backgroundColor: 'var(--canvas-bg)',
                  borderRadius: 'var(--radius-control)',
                  border: '1px solid var(--border-industrial)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '110px'
                }}>
                  <img
                    src={srv.previewLight}
                    alt={`Previsualización esquemática de ${srv.title}`}
                    className="theme-asset-light"
                    style={{ maxWidth: '100%', height: 'auto', maxHeight: '100px', objectFit: 'contain' }}
                  />
                  <img
                    src={srv.previewDark}
                    alt={`Previsualización esquemática de ${srv.title}`}
                    className="theme-asset-dark"
                    style={{ maxWidth: '100%', height: 'auto', maxHeight: '100px', objectFit: 'contain' }}
                  />
                </div>

                {/* Para quién es */}
                <p style={{
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                  marginBottom: '20px'
                }}>
                  <strong>Ideal para:</strong> {srv.forWhom}
                </p>

                {/* Deliverables */}
                <div style={{ marginBottom: '24px' }}>
                  <div className="font-mono" style={{
                    fontSize: '11px',
                    color: 'var(--text-primary)',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    marginBottom: '10px'
                  }}>
                    Entregables de la intervención:
                  </div>
                  
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {srv.deliverables.map((item, idx) => (
                      <li key={idx} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '13px',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.45
                      }}>
                        <CheckCircle2 size={14} style={{ color: 'var(--status-online)', flexShrink: 0, marginTop: '2px' }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom CTA Button */}
              <div style={{
                paddingTop: '20px',
                borderTop: '1px solid var(--border-industrial)'
              }}>
                <button
                  onClick={() => onSelectService(srv.title)}
                  className="btn-primary"
                  style={{ width: '100%' }}
                >
                  <span>{srv.ctaText}</span>
                  <ArrowRight size={14} />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Metodología de Trabajo: El Ciclo «Mise en Place» (Norma DOC 4 Sección 3) */}
        <div style={{
          marginTop: '60px',
          padding: '32px',
          backgroundColor: 'var(--surface-card)',
          borderRadius: 'var(--radius-panel)',
          border: '1px solid var(--border-industrial)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div className="badge-tag" style={{ marginBottom: '8px' }}>
              <span>// DOC 4.SEC 3: METODOLOGÍA DE INGENIERÍA</span>
            </div>
            <h3 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '18px',
              fontWeight: 600,
              color: 'var(--text-primary)'
            }}>
              El Ciclo «Mise en Place»: Proceso Cerrado en 4 Fases
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Garantía de ejecución sin desviaciones presupuestarias ni pantallas ornamentales.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px'
          }}>
            {[
              {
                step: 'FASE 1',
                name: 'DESPACHO',
                subtitle: 'Inmersión Operativa',
                desc: 'Comprensión exacta del modelo de negocio, tiempos de turno, perfiles de usuario y puntos de fricción reales.'
              },
              {
                step: 'FASE 2',
                name: 'PLANO',
                subtitle: 'Arquitectura Lógica',
                desc: 'Estructuración de datos, modelado de concurrencia y diseño de flujos de interacción por rol sin adornos.'
              },
              {
                step: 'FASE 3',
                name: 'CRAFT',
                subtitle: 'Diseño UI & Montaje',
                desc: 'Aplicación del sistema Warm Industrial, construcción modular de pantallas y ensamblaje de componentes atómicos.'
              },
              {
                step: 'FASE 4',
                name: 'EL PASE',
                subtitle: 'Control de Calidad',
                desc: 'Pruebas de estrés de latencia (<100ms), verificación de legibilidad periférica y entrega con documentación.'
              }
            ].map((phase, idx) => (
              <div
                key={phase.step}
                style={{
                  padding: '20px',
                  backgroundColor: 'var(--canvas-bg)',
                  border: '1px solid var(--border-industrial)',
                  borderRadius: 'var(--radius-control)',
                  position: 'relative'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '10px'
                }}>
                  <span className="font-mono" style={{ fontSize: '11px', color: 'var(--accent-text)', fontWeight: 600 }}>
                    {phase.step}
                  </span>
                  <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                    0{idx + 1}/04
                  </span>
                </div>
                
                <h4 style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '4px'
                }}>
                  {phase.name}
                </h4>
                
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                  marginBottom: '10px'
                }}>
                  {phase.subtitle}
                </div>

                <p style={{
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.45,
                  margin: 0
                }}>
                  {phase.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
