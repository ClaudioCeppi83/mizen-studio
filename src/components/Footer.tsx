import React from 'react';
import { Terminal, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      backgroundColor: 'var(--surface-card)',
      borderTop: '1px solid var(--border-industrial)',
      paddingTop: '60px',
      paddingBottom: '40px',
      fontSize: '13px',
      color: 'var(--text-secondary)'
    }}>
      <div className="container-custom">
        
        {/* Top Split */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '48px'
        }}>
          
          {/* Brand Col */}
          <div>
            <div style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: '18px',
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '10px'
            }}>
              MIZEN Studio & Systems
            </div>
            <p style={{ lineHeight: 1.5, marginBottom: '16px', maxWidth: '280px', color: 'var(--text-secondary)' }}>
              Atelier de ingeniería de software operativo y arquitectura de interfaces para negocios de alta exigencia.
            </p>
            <div className="badge-tag font-mono" style={{ fontSize: '10px' }}>
              <span>ENGINEERED FOR SERVICE. BUILT TO OPERATE.</span>
            </div>
          </div>

          {/* Corporate Contact */}
          <div>
            <div className="font-mono" style={{
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              textTransform: 'uppercase',
              marginBottom: '12px'
            }}>
              Despacho & Contacto Corporativo:
            </div>
            <p style={{ marginBottom: '8px' }}>
              Atelier: <strong>MIZEN Studio & Systems</strong>
            </p>
            <p style={{ marginBottom: '8px' }}>
              Contacto General: <a href="mailto:contacto@mizenstudio.com" style={{ color: 'var(--accent-text)', textDecoration: 'none', fontWeight: 500 }}>contacto@mizenstudio.com</a>
            </p>
            <p style={{ marginBottom: '8px' }}>
              Operaciones: <a href="mailto:operaciones@mizenstudio.com" style={{ color: 'var(--accent-text)', textDecoration: 'none', fontWeight: 500 }}>operaciones@mizenstudio.com</a>
            </p>
            <p style={{ marginBottom: '8px' }}>
              Centralita: <a href="tel:+34932204580" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>+34 932 20 45 80</a>
            </p>
            <p>
              Sede: Barcelona, España // Despliegue Global
            </p>
          </div>

          {/* Navigation Anchors */}
          <div>
            <div className="font-mono" style={{
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              textTransform: 'uppercase',
              marginBottom: '12px'
            }}>
              Secciones del Sistema:
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><a href="#prototipos-futuros" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>01 // Prototipos &amp; Sistemas</a></li>
              <li><a href="#manifiesto" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>02 // Manifiesto Operativo</a></li>
              <li><a href="#capacidades" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>03 // Capacidades &amp; Servicios</a></li>
              <li><a href="#direccion" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>04 // Dirección &amp; Autoridad</a></li>
              <li><a href="#faq" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>05 // Preguntas Frecuentes</a></li>
              <li><a href="#diagnostico" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>06 // Diagnóstico B2B</a></li>
            </ul>
          </div>

          {/* Telemetry Status Box */}
          <div style={{
            padding: '16px',
            backgroundColor: 'var(--canvas-bg)',
            border: '1px solid var(--border-industrial)',
            borderRadius: 'var(--radius-panel)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Terminal size={14} style={{ color: 'var(--status-online)' }} />
              <span className="font-mono" style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }}>
                TELEMETRÍA INFRAESTRUCTURA
              </span>
            </div>
            <div className="font-mono" style={{ fontSize: '11px', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
              UPTIME: 99.99% // ZERO JITTER<br />
              FRAME BUDGET: 16MS STABLE
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '24px',
          borderTop: '1px solid var(--border-industrial)',
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            MIZEN STUDIO © 2026 // ALL RIGHTS RESERVED // TOLERANCIA CERO A LA FRICCIÓN OPERATIVA
          </div>

          <button
            onClick={scrollToTop}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px'
            }}
          >
            <span>Volver al inicio</span>
            <ArrowUp size={12} />
          </button>
        </div>

      </div>
    </footer>
  );
};
