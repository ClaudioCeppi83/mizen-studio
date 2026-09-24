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
            // 01. ARQUITECTURA DE SOFTWARE OPERATIVO &amp; INTERFACES DE MISIÓN CRÍTICA
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
          SISTEMAS DIGITALES <br />
          <span style={{ color: 'var(--accent-amber)' }}>NACIDOS PARA OPERAR.</span>
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
          Diseñamos y construimos software a medida, terminales de alta velocidad y plataformas de gestión
          para grupos de restauración y operativas de alta exigencia. Aplicamos la disciplina del <em>«mise en place»</em> a
          la tecnología para eliminar la fricción entre personas, servicio y administración donde el margen de error es cero.
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
            Agendar Diagnóstico Operativo
          </button>
          
          <button onClick={onExploreShowcase} className="btn-secondary" style={{ padding: '10px 18px', fontSize: '14px' }}>
            <span>Explorar Prototipos del Atelier</span>
            <ArrowDown size={14} />
          </button>
        </div>

        {/* Engineering Performance Ribbon */}
        <div className="hero-ribbon">
          <div className="hero-ribbon-item">
            <Gauge size={16} style={{ color: 'var(--status-online)', flexShrink: 0 }} />
            <div style={{ textAlign: 'left' }}>
              <div className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>LATENCIA &lt; 16MS</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>60 FPS estricto</div>
            </div>
          </div>

          <div className="hero-ribbon-item">
            <Cpu size={16} style={{ color: 'var(--accent-amber)', flexShrink: 0 }} />
            <div style={{ textAlign: 'left' }}>
              <div className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>ZERO BLOAT</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Cero dependencias pesadas</div>
            </div>
          </div>

          <div className="hero-ribbon-item">
            <ShieldCheck size={16} style={{ color: 'var(--status-online)', flexShrink: 0 }} />
            <div style={{ textAlign: 'left' }}>
              <div className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>DISEÑO DEFENSIVO</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Protección activa de datos</div>
            </div>
          </div>

          <div className="hero-ribbon-item">
            <Layers size={16} style={{ color: 'var(--text-primary)', flexShrink: 0 }} />
            <div style={{ textAlign: 'left' }}>
              <div className="font-mono" style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>DISPONIBILIDAD 99.9%</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Resiliencia en segundo plano</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
