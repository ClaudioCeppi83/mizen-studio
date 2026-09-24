import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FAQItem {
  id: string;
  code: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-0',
    code: 'INQ_00',
    question: '¿Qué hace exactamente MIZEN Studio?',
    answer: 'Somos un estudio especializado en desarrollo de software y sistemas táctiles para hostelería y operativas de alta exigencia. Diseñamos y programamos a medida terminales de punto de venta (TPVs), monitores de cocina (KDS), paneles de escandallos y herramientas internas. No vendemos licencias genéricas ni cobramos comisiones por terminal: creamos herramientas que se adaptan al ritmo real de su negocio y que pasan a ser 100% de su propiedad.'
  },
  {
    id: 'faq-pricing',
    code: 'INQ_01',
    question: '¿Cuánto cuesta un proyecto o intervención a medida?',
    answer: 'El coste se adapta al alcance exacto del encargo mediante tres modalidades cerradas: desde diagnósticos puntuales de sala y rediseño ergonómico de pantallas, hasta el desarrollo completo de un sistema operativo llave en mano. En la sesión de 30 minutos evaluamos su operativa y le entregamos un presupuesto cerrado y transparente, sin cuotas sorpresa ni costes por ticket.'
  },
  {
    id: 'faq-1',
    code: 'INQ_02',
    question: '¿Por qué encargar un desarrollo a medida frente a un software comercial estándar (POS/ERP)?',
    answer: 'Las plataformas comerciales imponen tarifas periódicas crecientes, cobran comisiones indirectas y cargan las pantallas de funciones que su equipo jamás utiliza. Un sistema a medida desarrollado por MIZEN resuelve con precisión milimétrica su flujo exacto, sin peajes y con un código que es 100% de su propiedad.'
  },
  {
    id: 'faq-2',
    code: 'INQ_03',
    question: '¿Puede integrarse con nuestro hardware de servicio y periféricos actuales?',
    answer: 'Sí. Desarrollamos con arquitecturas abiertas capaces de comunicarse con impresoras de tickets (ESC/POS), terminales de pago, pasarelas bancarias y software contable ya existente.'
  },
  {
    id: 'faq-3',
    code: 'INQ_04',
    question: '¿La especialización de MIZEN aplica a otros sectores fuera de la restauración?',
    answer: 'La restauración de alta rotación es nuestro banco de pruebas más exigente debido a su estrés operativo constante. Sin embargo, aplicamos los mismos principios de latencia cero y diseño defensivo a logística, retail especializado y herramientas internas de misión crítica.'
  },
  {
    id: 'faq-4',
    code: 'INQ_05',
    question: '¿Cuánto tiempo requiere el desarrollo y puesta en marcha de un sistema?',
    answer: 'Seguimos el ciclo Mise en Place en 4 etapas acotadas. No dilatamos los proyectos: dispondrá de prototipos funcionales navegables en pocas semanas y despliegues por módulos operativos para no interrumpir su negocio.'
  },
  {
    id: 'faq-5',
    code: 'INQ_06',
    question: '¿Qué nivel de soberanía tenemos sobre la plataforma una vez entregada?',
    answer: 'Soberanía total. No aplicamos modelos cautivos: el código fuente, la infraestructura y los datos pertenecen íntegramente a su empresa, con documentación técnica exhaustiva para su equipo o futuros desarrollos.'
  },
  {
    id: 'faq-6',
    code: 'INQ_07',
    question: '¿Qué se evalúa durante la sesión técnica de diagnóstico de 30 minutos?',
    answer: 'Analizamos con usted los puntos críticos de su operativa actual (dónde se pierde tiempo, dónde se originan errores o qué sistemas fallan) y valoramos con total transparencia si una intervención a medida es viable y rentable para su modelo.'
  }
];

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-0');

  const toggleItem = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      style={{
        paddingTop: '80px',
        paddingBottom: '80px',
        borderBottom: '1px solid var(--border-industrial)',
        backgroundColor: 'var(--canvas-bg)',
        position: 'relative'
      }}
      className="grid-bg-overlay"
    >
      {/* Cartesian Markers */}
      <span className="cartesian-coord cartesian-tl">SYS_24:84 // FAQ</span>
      <span className="cartesian-coord cartesian-tr">INQUIRIES // ARCHITECTURE</span>

      <div className="container-custom" style={{ maxWidth: '860px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="badge-tag" style={{ marginBottom: '12px' }}>
            <HelpCircle size={12} style={{ color: 'var(--accent-amber)' }} />
            <span>// 05. PREGUNTAS FRECUENTES & MODELO DE ENCARGO</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            marginBottom: '12px',
            color: 'var(--text-primary)'
          }}>
            Claridad operativa antes del primer código.
          </h2>

          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '15px',
            maxWidth: '640px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Respuestas directas sobre soberanía técnica, plazos de implantación, integración con hardware existente y alcance de nuestras soluciones.
          </p>
        </div>

        {/* Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="card-panel"
                style={{
                  padding: '0',
                  overflow: 'hidden',
                  borderColor: isOpen ? 'var(--accent-amber)' : 'var(--border-industrial)',
                  transition: 'border-color var(--transition-fast)'
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`${item.id}-answer`}
                  id={`${item.id}-question`}
                  style={{
                    width: '100%',
                    padding: '18px 20px',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span
                      className="font-mono"
                      style={{
                        fontSize: '11px',
                        color: isOpen ? 'var(--accent-text)' : 'var(--text-secondary)',
                        fontWeight: 600,
                        flexShrink: 0
                      }}
                    >
                      {item.code}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '15px',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        lineHeight: 1.35
                      }}
                    >
                      {item.question}
                    </span>
                  </div>

                  <div style={{
                    color: isOpen ? 'var(--accent-amber)' : 'var(--text-secondary)',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform var(--transition-fast), color var(--transition-fast)',
                    flexShrink: 0
                  }}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`${item.id}-answer`}
                    role="region"
                    aria-labelledby={`${item.id}-question`}
                    style={{
                      padding: '0 20px 20px 44px',
                      fontSize: '14px',
                      lineHeight: 1.65,
                      color: 'var(--text-secondary)',
                      borderTop: '1px solid var(--border-industrial)',
                      paddingTop: '14px',
                      backgroundColor: 'var(--canvas-bg)'
                    }}
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
