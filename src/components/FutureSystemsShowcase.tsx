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
    subtitle: 'High-Speed Operational POS & Instant Order Engine',
    description: 'Diseñado para operar bajo la máxima presión de servicio en horas punta. Botones táctiles de 48px optimizados para evitar toques involuntarios, flujo de cobro en 2 toques de pantalla y diseño defensivo con doble confirmación para anulación de tickets.',
    previewLight: '/assets/ui-previews/preview-cash-audit-light.svg',
    previewDark: '/assets/ui-previews/preview-cash-audit-dark.svg',
    iconLight: '/assets/services/cash-register-light.svg',
    iconDark: '/assets/services/cash-register-dark.svg',
    features: [
      'Touch Targets ≥ 48px con retroalimentación física instantánea (80ms).',
      'Flujo de adición de pedidos y cobro resuelto en una sola pantalla, cero scroll.',
      'Persistencia defensiva offline con sincronización asíncrona en milisegundos.'
    ],
    metrics: [
      { label: 'VELOCIDAD / TICKET', value: '1.4s' },
      { label: 'ERROR RATE', value: '0.00%' },
      { label: 'TOUCH TARGET', value: '48px MIN' }
    ],
    statusTag: 'PROTOTIPO // SALA LISTA'
  },
  {
    id: 'kds-kitchen',
    badge: '02. KDS // PASE & COCINA',
    navLabel: 'KDS Pase & Cocina',
    title: 'Monitor de Cocina (KDS) & Coordinación de Pase',
    subtitle: 'Kitchen Display System & Zero-Latency Order Dispatch',
    description: 'Visibilidad total de comandas en tiempo real para jefes de cocina y partidas. Tickets modulares ordenados matemáticamente por tiempo de espera de mesa, cronómetros en Geist Mono que no bailan y contraste absoluto contra el vapor y la luz intensa del pase.',
    previewLight: '/assets/ui-previews/preview-kds-card-light.svg',
    previewDark: '/assets/ui-previews/preview-kds-card-dark.svg',
    iconLight: '/assets/services/kds-screen-light.svg',
    iconDark: '/assets/services/kds-screen-dark.svg',
    features: [
      'Cronometraje de mesa con números monoespaciados que alertan tiempos críticos.',
      'Superficies antirreflejo en modo Hierro Colado para pantallas de acero inoxidable.',
      'Consolidación automática de platos idénticos por partida de cocina.'
    ],
    metrics: [
      { label: 'PASE PROMEDIO', value: '12 MIN' },
      { label: 'LATENCIA COMANDA', value: '< 100ms' },
      { label: 'SLA SINCRONIZACIÓN', value: '99.99%' }
    ],
    statusTag: 'PROTOTIPO // PASE ACTIVO'
  },
  {
    id: 'margin-audit',
    badge: '03. AUDITORÍA // CONTROL DIRECTIVO',
    navLabel: 'Auditoría & Márgenes',
    title: 'Dashboard de Control de Márgenes, Escandallos & Caja',
    subtitle: 'Real-Time Financial Audit & Recipe Costing Intelligence',
    description: 'El centro de mando para la dirección del negocio. Visibilidad instantánea de rentabilidad plato a plato, cálculo de escandallos en vivo según fluctuación de precios de compra y detección automática de descuadres o roturas de stock antes de cerrar la jornada.',
    previewLight: '/assets/ui-previews/preview-dish-margin-light.svg',
    previewDark: '/assets/ui-previews/preview-dish-margin-dark.svg',
    iconLight: '/assets/services/recipe-costing-light.svg',
    iconDark: '/assets/services/recipe-costing-dark.svg',
    features: [
      'Cálculo de coste de materia prima y margen de contribución en tiempo real.',
      'Auditoría cruzada automática entre ventas emitidas y arqueo de caja final.',
      'Tablas numéricas compactas con alineación decimal a la derecha.'
    ],
    metrics: [
      { label: 'MARGEN MEDIO', value: '74.2%' },
      { label: 'DESVÍO TEÓRICO', value: '-0.4%' },
      { label: 'ARQUEO CAJA', value: 'CUADRADO' }
    ],
    statusTag: 'PROTOTIPO // AUDIT READY'
  },
  {
    id: 'spatial-reservations',
    badge: '04. RESERVAS // PLANO ESPACIAL',
    navLabel: 'Plano de Mesas & Reservas',
    title: 'Plano Interactivo de Distribución de Mesas & Aforo',
    subtitle: 'Spatial Table Management & Capacity Allocation Grid',
    description: 'Mapeo espacial de sala interactivo en tiempo real. Visualización limpia de mesas libres, ocupadas y en aviso de doblaje, con asignación táctica de rangos de camarero y gestión fluida de reservas sin solapamientos.',
    previewLight: '/assets/services/table-layout-light.svg',
    previewDark: '/assets/services/table-layout-dark.svg',
    iconLight: '/assets/services/table-reservation-light.svg',
    iconDark: '/assets/services/table-reservation-dark.svg',
    features: [
      'Representación a escala milimétrica del salón, terraza y zonas de barra.',
      'Alertas visuales en ámbar cuando una mesa se aproxima a su límite de turno.',
      'Cómputo instantáneo de comensales en sala y previsiones de llegada.'
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
            Plataformas digitales nacidas para resolver la trinchera.
          </h2>
          
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '15px',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Una muestra interactiva de las aplicaciones web y herramientas internas que MIZEN Studio diseña y programa a medida.
            Ergonomía táctil, visualización modular y telemetría de alto rendimiento.
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
              ESTÁNDAR: <span style={{ color: 'var(--accent-text)', fontWeight: 600 }}>TOLERANCIA CERO A LA FRICCIÓN OPERATIVA</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
