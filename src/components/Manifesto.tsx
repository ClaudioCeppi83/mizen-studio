import React from 'react';
import { Check, X } from 'lucide-react';

export const Manifesto: React.FC = () => {
  return (
    <section id="manifiesto" style={{
      paddingTop: '80px',
      paddingBottom: '80px',
      borderBottom: '1px solid var(--border-industrial)',
      backgroundColor: 'var(--surface-card)',
      position: 'relative'
    }}>
      {/* Cartesian Markers */}
      <span className="cartesian-coord cartesian-tl">SYS_24:84 // MANIFIESTO</span>
      <span className="cartesian-coord cartesian-tr">PHILOSOPHY // 01</span>

      <div className="container-custom">
        <div className="manifesto-layout">
          
          {/* Left Column: Sticky on Desktop */}
          <div className="manifesto-sticky-col">
            <div className="badge-tag" style={{ marginBottom: '16px' }}>
              <span>// 02. MANIFIESTO OPERATIVO</span>
            </div>
            
            <h2 style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)',
              marginBottom: '20px'
            }}>
              El software debe servir al equipo.<br />
              <span style={{ color: 'var(--accent-amber)' }}>Nunca frenar el servicio.</span>
            </h2>

            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-secondary)',
              borderLeft: '2px solid var(--accent-amber)',
              paddingLeft: '12px',
              lineHeight: 1.6
            }}>
              DOCUMENTO: MZ-MAN-2026.REV4<br />
              DIRECCIÓN TÉCNICA // MIZEN SYSTEMS
            </div>
          </div>

          {/* Right Column: Editorial Body & Comparison Matrix */}
          <div>
            <div style={{
              fontSize: '15px',
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              marginBottom: '32px'
            }}>
              <p style={{ marginBottom: '16px' }}>
                La inmensa mayoría del software comercial para hostelería ha sido diseñado en despachos por personas
                que jamás han vivido una sala llena un sábado por la noche. El resultado son pantallas caóticas,
                botones diminutos que provocan toques erróneos y sistemas que se congelan justo cuando hay cola para cobrar.
              </p>
              
              <p style={{ marginBottom: '16px' }}>
                En <strong>MIZEN</strong> abordamos la tecnología desde la trinchera del servicio. Aplicamos la disciplina del
                <em> «mise en place»</em> a la ingeniería de software: todo en su sitio antes de abrir puertas, interfaces
                limpias donde cada botón mide al menos 48px y sistemas blindados para no colgarse bajo máxima presión.
              </p>

              <p>
                No vendemos licencias genéricas de alquiler mensual ni cosmética visual. Desarrollamos herramientas operativas
                a medida de su flujo de trabajo que eliminan pasos superfluos, protegen el arqueo de caja y devuelven la tranquilidad
                a quien dirige el turno.
              </p>
            </div>

            {/* Comparison Matrix: Hábito vs Estándar MIZEN */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '16px'
            }}>
              {/* Defecto Habitual */}
              <div style={{
                padding: '20px',
                backgroundColor: 'var(--canvas-bg)',
                border: '1px solid var(--border-industrial)',
                borderRadius: 'var(--radius-panel)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--status-danger)',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  marginBottom: '12px',
                  letterSpacing: '0.04em'
                }}>
                  <X size={14} />
                  <span>EL DEFECTO HABITUAL</span>
                </div>
                <ul style={{ listStyle: 'none', fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>• 4 toques de pantalla para una acción que debería tomar 5 segundos</li>
                  <li>• Pantallas congeladas y cobros bloqueados en hora punta</li>
                  <li>• Botones diminutos que provocan errores de cobro y platos equivocados</li>
                  <li>• Descuadres diarios de caja por tickets anulados sin control</li>
                </ul>
              </div>

              {/* Estándar MIZEN */}
              <div style={{
                padding: '20px',
                backgroundColor: 'var(--canvas-bg)',
                border: '1px solid var(--status-online)',
                borderRadius: 'var(--radius-panel)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--status-online)',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  marginBottom: '12px',
                  letterSpacing: '0.04em'
                }}>
                  <Check size={14} />
                  <span>EL ESTÁNDAR MIZEN</span>
                </div>
                <ul style={{ listStyle: 'none', fontSize: '13px', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>• Cobro y comandas resueltos en 1 o 2 toques instantáneos (&lt;80ms)</li>
                  <li>• Funcionamiento ininterrumpido offline ante caídas de internet</li>
                  <li>• Botones táctiles amplios (≥48px) con confirmación clara</li>
                  <li>• Doble verificación defensiva que blinda el arqueo de caja</li>
                </ul>
              </div>
            </div>

            {/* The 5 Laws of Digital Mise en Place (Norma DOC 1 Sección 4 y DOC 5 Índices LAW_01..05) */}
            <div style={{
              marginTop: '40px',
              paddingTop: '32px',
              borderTop: '1px solid var(--border-industrial)'
            }}>
              <div className="badge-tag" style={{ marginBottom: '12px' }}>
                <span>// DOC 1.SEC 4: DOCTRINA OPERATIVA</span>
              </div>
              
              <h3 style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '18px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '16px'
              }}>
                Las 5 Leyes del «Mise en Place Digital»
              </h3>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '12px'
              }}>
                {[
                  {
                    code: 'LAW_01',
                    title: 'La Realidad Ocurre Lejos de la Pantalla',
                    desc: 'Diseñamos para la imperfección física del entorno: dedos con prisa, luces tenues, sol y estrés operativo.'
                  },
                  {
                    code: 'LAW_02',
                    title: 'La Jerarquía Espacial Precede al Estilo',
                    desc: 'La proporción, contraste y bordes matemáticos de 1px resuelven el 90% antes del primer color.'
                  },
                  {
                    code: 'LAW_03',
                    title: 'La Velocidad es una Necesidad Psicológica',
                    desc: 'Microinteracciones <100ms. La latencia engendra desconfianza; el sistema debe responder al ritmo del operador.'
                  },
                  {
                    code: 'LAW_04',
                    title: 'El Diseño Defensivo Salva Operaciones',
                    desc: 'Separación física de acciones destructivas y dobles confirmaciones que protegen la caja y el inventario.'
                  },
                  {
                    code: 'LAW_05',
                    title: 'El Código Invisible Refleja la Belleza Visible',
                    desc: 'Datos tipados con rigor, validación en frontera y arquitectura sólida como fundamento del orden estético.'
                  }
                ].map((law) => (
                  <div
                    key={law.code}
                    style={{
                      padding: '16px',
                      backgroundColor: 'var(--canvas-bg)',
                      border: '1px solid var(--border-industrial)',
                      borderRadius: 'var(--radius-panel)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}
                  >
                    <span className="font-mono" style={{ fontSize: '11px', color: 'var(--accent-text)', fontWeight: 600 }}>
                      {law.code}
                    </span>
                    <h4 style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      lineHeight: 1.3
                    }}>
                      {law.title}
                    </h4>
                    <p style={{
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.45,
                      margin: 0
                    }}>
                      {law.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
