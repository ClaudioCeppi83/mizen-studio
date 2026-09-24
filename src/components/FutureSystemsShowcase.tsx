import React, { useState } from 'react';
import { Terminal, CheckCircle2, Layers } from 'lucide-react';

interface SystemPrototype {
  id: string;
  badge: string;
  navLabel: string;
  title: string;
  subtitle: string;
  description: string;
  previewLight: string;
  previewDark: string;
  iconLight: string;
  iconDark: string;
  features: string[];
  metrics: { label: string; value: string }[];
  statusTag: string;
}

const PROTOTYPES: SystemPrototype[] = [
  {
    id: 'tpv-pos',
    badge: '01. TPV // SALA & BARRA',
    navLabel: 'TPV Sala & Barra',
    title: 'TPV Táctil de Alta Velocidad para Sala y Barra',
    subtitle: 'Cobro y Comandas de Alta Velocidad para Sala',
    description: 'Diseñado para operar bajo la máxima presión de servicio en horas punta. Botones táctiles de 48px optimizados para evitar toques involuntarios, flujo de cobro resuelto en 2 toques y blindaje activo contra tickets duplicados o anulaciones no autorizadas.',
    previewLight: '/assets/ui-previews/preview-cash-audit-light.svg',
    previewDark: '/assets/ui-previews/preview-cash-audit-dark.svg',
    iconLight: '/assets/services/cash-register-light.svg',
    iconDark: '/assets/services/cash-register-dark.svg',
    features: [
      'Touch Targets ≥ 48px con confirmación visual instantánea (<80ms).',
      'Cobro ágil con división de cuenta y envío a datáfono en una sola pantalla.',
      'Modo offline automático que continúa cobrando si cae la conexión wifi.'
    ],
    metrics: [
      { label: 'TIEMPO / TICKET', value: '1.4s' },
      { label: 'TASA DE ERROR', value: '0.00%' },
      { label: 'TAMAÑO BOTÓN', value: '48px MIN' }
    ],
    statusTag: 'PROTOTIPO // SALA LISTA'
  },
  {
    id: 'kds-kitchen',
    badge: '02. KDS // PASE & COCINA',
    navLabel: 'KDS Pase & Cocina',
    title: 'Monitor de Cocina (KDS) & Coordinación de Pase',
    subtitle: 'Organización Visual de Comandas en Cocina y Pase',
    description: 'Visibilidad total de pedidos en tiempo real para jefes de cocina y partidas. Tickets modulares ordenados cronológicamente por tiempo de espera de mesa, cronómetros que alertan retrasos y alto contraste legible a distancia entre vapor y calor.',
    previewLight: '/assets/ui-previews/preview-kds-card-light.svg',
    previewDark: '/assets/ui-previews/preview-kds-card-dark.svg',
    iconLight: '/assets/services/kds-screen-light.svg',
    iconDark: '/assets/services/kds-screen-dark.svg',
    features: [
      'Cronometraje por mesa con avisos cromáticos según tiempo objetivo.',
      'Pantallas de alto contraste legibles a más de 3 metros en zonas de calor.',
      'Agrupación automática de platos idénticos por partida de preparación.'
    ],
    metrics: [
      { label: 'PASE PROMEDIO', value: '12 MIN' },
      { label: 'LATENCIA COMANDA', value: '< 100ms' },
      { label: 'DISPONIBILIDAD', value: '99.99%' }
    ],
    statusTag: 'PROTOTIPO // PASE ACTIVO'
  },
  {
    id: 'margin-audit',
    badge: '03. AUDITORÍA // CONTROL DIRECTIVO',
    navLabel: 'Auditoría & Márgenes',
    title: 'Dashboard de Control de Márgenes, Escandallos & Caja',
    subtitle: 'Control de Márgenes, Escandallos y Arqueo de Caja',
    description: 'El centro de mando para la dirección del negocio. Visibilidad instantánea del margen neto por plato, cálculo dinámico de escandallos según costes de compra y cuadre diario entre ventas registradas y efectivo en cajón sin discrepancias.',
    previewLight: '/assets/ui-previews/preview-dish-margin-light.svg',
    previewDark: '/assets/ui-previews/preview-dish-margin-dark.svg',
    iconLight: '/assets/services/recipe-costing-light.svg',
    iconDark: '/assets/services/recipe-costing-dark.svg',
    features: [
      'Cálculo de coste de materia prima y margen por plato en tiempo real.',
      'Auditoría automática entre comandas servidas y cobros registrados.',
      'Detección temprana de mermas y desvíos de stock antes del cierre.'
    ],
    metrics: [
      { label: 'MARGEN MEDIO', value: '74.2%' },
      { label: 'DESVÍO TEÓRICO', value: '-0.4%' },
      { label: 'ARQUEO CAJA', value: '100% EXACTO' }
    ],
    statusTag: 'PROTOTIPO // AUDIT READY'
  },
  {
    id: 'spatial-reservations',
    badge: '04. RESERVAS // PLANO ESPACIAL',
    navLabel: 'Plano de Mesas & Reservas',
    title: 'Plano Interactivo de Distribución de Mesas & Aforo',
    subtitle: 'Gestión de Mesas, Doblajes y Control de Aforo',
    description: 'Mapeo espacial de sala interactivo en tiempo real. Visualización limpia de mesas libres, ocupadas y en límite de turno, con asignación de rangos a camareros y rotación fluida sin solapamientos en reservas.',
    previewLight: '/assets/services/table-layout-light.svg',
    previewDark: '/assets/services/table-layout-dark.svg',
    iconLight: '/assets/services/table-reservation-light.svg',
    iconDark: '/assets/services/table-reservation-dark.svg',
    features: [
      'Plano visual interactivo de salón, terraza y barra en una sola vista.',
      'Alertas visuales preventivas cuando una mesa se acerca al límite de turno.',
      'Control de rotación de comensales y previsión de ocupación por tramos.'
    ],
    metrics: [
      { label: 'OCUPACIÓN ACTUAL', value: '86%' },
      { label: 'DOBLE TURNO', value: '94%' },
      { label: 'ROTACIÓN', value: '2.1x' }
    ],
    statusTag: 'PROTOTIPO // SALA MAPEADA'
  }
];

export const FutureSystemsShowcase: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('tpv-pos');
  const activeProto = PROTOTYPES.find(p => p.id === selectedId) || PROTOTYPES[0];

  return (
    <section id="prototipos-futuros" style={{
      paddingTop: '80px',
      paddingBottom: '80px',
      borderBottom: '1px solid var(--border-industrial)',
      backgroundColor: 'var(--canvas-bg)',
      position: 'relative'
    }} className="grid-bg-overlay">
      
      {/* Cartesian Markers */}
      <span className="cartesian-coord cartesian-tl">SYS_24:84 // SHOWCASE</span>
      <span className="cartesian-coord cartesian-tr">PROTO_SUITE // V0.1</span>

      <div className="container-custom">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="badge-tag" style={{ marginBottom: '12px' }}>
            <Layers size={12} style={{ color: 'var(--accent-amber)' }} />
            <span>GALERÍA DE SISTEMAS & PROTOTIPOS OPERATIVOS // FUTURE SUITE</span>
          </div>
          
          <h2 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            marginBottom: '14px',
            color: 'var(--text-primary)'
          }}>
            Herramientas diseñadas para el ritmo real del servicio.
          </h2>
          
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '15px',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Cuatro sistemas operativos concebidos para eliminar los cuellos de botella más comunes en sala, cocina y administración.
            Ergonomía táctil, visualización modular y respuesta instantánea.
          </p>
        </div>

        {/* Prototype Switcher Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          marginBottom: '28px'
        }}>
          {PROTOTYPES.map((proto) => {
            const isActive = proto.id === selectedId;
            return (
              <button
                key={proto.id}
                onClick={() => setSelectedId(proto.id)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: isActive ? 600 : 500,
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-control)',
                  border: isActive ? '1px solid var(--accent-amber)' : '1px solid var(--border-industrial)',
                  backgroundColor: isActive ? 'var(--surface-card)' : 'transparent',
                  color: isActive ? 'var(--accent-amber)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: isActive ? 'var(--accent-amber)' : 'var(--border-industrial)',
                  display: 'inline-block'
                }}></span>
                <span>{proto.navLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Master Showcase Card */}
        <div className="card-panel" style={{
          padding: '0',
          overflow: 'hidden',
          position: 'relative'
        }}>
          
          {/* Card Top Control Bar */}
          <div style={{
            padding: '12px 20px',
            borderBottom: '1px solid var(--border-industrial)',
            backgroundColor: 'var(--surface-card)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Terminal size={14} style={{ color: 'var(--accent-amber)' }} />
              <span className="font-mono" style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {activeProto.badge}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge-tag badge-live" style={{ fontSize: '10px', padding: '2px 6px' }}>
                <span className="status-dot"></span>
                <span>{activeProto.statusTag}</span>
              </span>
            </div>
          </div>

          {/* Split Body: Info & Vector Preview */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'stretch'
          }}>
            
            {/* Left Column: Conceptual Details & Technical Specs */}
            <div style={{
              padding: 'clamp(24px, 4vw, 36px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              borderRight: '1px solid var(--border-industrial)',
              backgroundColor: 'var(--surface-card)'
            }}>
              <div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--accent-text)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                  letterSpacing: '0.04em'
                }}>
                  {activeProto.subtitle}
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '22px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.25,
                  marginBottom: '16px'
                }}>
                  {activeProto.title}
                </h3>

                <p style={{
                  fontSize: '14px',
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                  marginBottom: '24px'
                }}>
                  {activeProto.description}
                </p>

                {/* Features Checklist */}
                <div style={{ marginBottom: '28px' }}>
                  <div className="font-mono" style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    color: 'var(--text-primary)',
                    marginBottom: '12px'
                  }}>
                    Especificaciones de Arquitectura:
                  </div>

                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {activeProto.features.map((feat, idx) => (
                      <li key={idx} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        fontSize: '13px',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.45
                      }}>
                        <CheckCircle2 size={15} style={{ color: 'var(--status-online)', flexShrink: 0, marginTop: '2px' }} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technical Metrics Strip */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                paddingTop: '20px',
                borderTop: '1px solid var(--border-industrial)'
              }}>
                {activeProto.metrics.map((m, idx) => (
                  <div key={idx} style={{
                    padding: '8px',
                    backgroundColor: 'var(--canvas-bg)',
                    borderRadius: 'var(--radius-control)',
                    border: '1px solid var(--border-industrial)',
                    textAlign: 'center'
                  }}>
                    <div className="font-mono" style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '2px'
                    }}>
                      {m.value}
                    </div>
                    <div className="font-mono" style={{
                      fontSize: '10px',
                      color: 'var(--text-secondary)',
                      textTransform: 'uppercase'
                    }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column: High-Fidelity Vector Preview Asset */}
            <div style={{
              padding: 'clamp(20px, 3vw, 32px)',
              backgroundColor: 'var(--canvas-bg)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              minHeight: '380px'
            }}>
              
              <div style={{
                width: '100%',
                maxWidth: '460px',
                backgroundColor: 'var(--surface-card)',
                border: '1px solid var(--border-industrial)',
                borderRadius: 'var(--radius-panel)',
                padding: '16px',
                boxShadow: 'none',
                position: 'relative'
              }}>
                {/* Internal window header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '12px',
                  marginBottom: '16px',
                  borderBottom: '1px solid var(--border-industrial)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--border-industrial)' }}></span>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--border-industrial)' }}></span>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--border-industrial)' }}></span>
                  </div>
                  <span className="font-mono" style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                    MZ-CORE // BLUEPRINT_RENDER
                  </span>
                </div>

                {/* Adaptive Theme Vector Images from /assets/ */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '240px' }}>
                  <img
                    src={activeProto.previewLight}
                    alt={activeProto.title}
                    className="theme-asset-light"
                    style={{ maxWidth: '100%', height: 'auto', display: 'block', borderRadius: 'var(--radius-control)' }}
                  />
                  <img
                    src={activeProto.previewDark}
                    alt={activeProto.title}
                    className="theme-asset-dark"
                    style={{ maxWidth: '100%', height: 'auto', display: 'none', borderRadius: 'var(--radius-control)' }}
                  />
                </div>

                {/* Watermark note */}
                <div style={{
                  marginTop: '12px',
                  paddingTop: '8px',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: 'var(--text-secondary)'
                }}>
                  <span>MIZEN SYSTEMS // VECTOR ENGINE</span>
                  <span style={{ color: 'var(--status-online)' }}>VERIFICADO</span>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Telemetry Bar */}
          <div style={{
            padding: '10px 20px',
            backgroundColor: 'var(--surface-card)',
            borderTop: '1px solid var(--border-industrial)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--text-secondary)',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <div>
              ENGINE: <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>WARM INDUSTRIAL</span> // LATENCY: <span style={{ color: 'var(--status-online)', fontWeight: 600 }}>&lt;16MS</span>
            </div>
            <div>
              ESTÁNDAR: <span style={{ color: 'var(--accent-text)', fontWeight: 600 }}>TOLERANCIA CERO A ERRORES EN SERVICIO</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
