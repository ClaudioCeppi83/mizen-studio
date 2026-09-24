import React from 'react';
import { ArrowDown, Cpu, ShieldCheck, Gauge, Layers } from 'lucide-react';

interface HeroProps {
  onDiagnosticClick: () => void;
  onExploreShowcase: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onDiagnosticClick, onExploreShowcase }) => {
  return (
    <section style={{
      paddingTop: '80px',
      paddingBottom: '60px',
      borderBottom: '1px solid var(--border-industrial)',
      position: 'relative',
      backgroundColor: 'var(--canvas-bg)'
    }} className="grid-bg-overlay">
      
      {/* Cartesian Markers */}
      <span className="cartesian-coord cartesian-tl">SYS_24:84 // NORTE</span>
      <span className="cartesian-coord cartesian-tr">ELEV_00 // BASE</span>

      <div className="container-custom" style={{ maxWidth: '960px', textAlign: 'center', position: 'relative' }}>
        
        {/* Editorial Sub-Tag */}
        <div style={{ display: 'inline-block', marginBottom: '20px' }}>
          <span className="badge-tag" style={{
            fontSize: '11px',
            borderColor: 'var(--border-industrial)',
            color: 'var(--accent-text)',
            background: 'var(--surface-card)'
          }}>
            // SOFTWARE OPERATIVO &amp; TPVs A MEDIDA PARA RESTAURACIÓN
          </span>
        </div>

        {/* Master Headline (Norma DOC 5: 48px desktop / 32px mobile, peso 600, line-height 1.1, tracking -0.02em) */}
        <h1 style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: 600,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          marginBottom: '20px',
          textTransform: 'uppercase'
        }}>
          SOFTWARE Y TPVs A MEDIDA <br />
          <span style={{ color: 'var(--accent-amber)' }}>QUE NUNCA SE CUELGAN EN HORA PUNTA.</span>
        </h1>

        {/* Strategic Direct-Answer Block (AEO / GEO & Norma DOC 5: 15px regular, line-height 1.6, color --text-secondary) */}
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '15px',
          lineHeight: 1.65,
          color: 'var(--text-secondary)',
          maxWidth: '740px',
          margin: '0 auto 32px auto'
        }}>
          Diseñamos y programamos pantallas de comanderos, monitores de cocina (KDS) y paneles de control
          que su equipo domina en minutos. Construidos por profesionales con experiencia real en sala para
          eliminar errores de cobro, platos olvidados y pantallas congeladas cuando el salón está lleno.
        </p>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          marginBottom: '48px'
        }}>
          <button onClick={onDiagnosticClick} className="btn-primary" style={{ padding: '10px 20px', fontSize: '14px' }}>
            Solicitar Diagnóstico Operativo
          </button>
          
          <button onClick={onExploreShowcase} className="btn-secondary" style={{ padding: '10px 18px', fontSize: '14px' }}>
            <span>Ver Prototipos de Sala y Cocina</span>
            <ArrowDown size={14} />
          </button>
        </div>

        {/* Engineering Performance Ribbon */}
        <div className="hero-ribbon">
          <div className="hero-ribbon-item">
            <Gauge size={16} style={{ color: 'var(--status-online)', flexShrink: 0 }} />
            <div style={{ textAlign: 'left' }}>
              <div className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>LATENCIA &lt; 16MS</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Respuesta táctil instantánea</div>
            </div>
          </div>

          <div className="hero-ribbon-item">
            <Cpu size={16} style={{ color: 'var(--accent-amber)', flexShrink: 0 }} />
            <div style={{ textAlign: 'left' }}>
              <div className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>100% FLUIDO</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Sin pantallas congeladas</div>
            </div>
          </div>

          <div className="hero-ribbon-item">
            <ShieldCheck size={16} style={{ color: 'var(--status-online)', flexShrink: 0 }} />
            <div style={{ textAlign: 'left' }}>
              <div className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>DISEÑO DEFENSIVO</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Blindaje contra errores de caja</div>
            </div>
          </div>

          <div className="hero-ribbon-item">
            <Layers size={16} style={{ color: 'var(--text-primary)', flexShrink: 0 }} />
            <div style={{ textAlign: 'left' }}>
              <div className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>SOBERANÍA TOTAL</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Sin cuotas abusivas por terminal</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
